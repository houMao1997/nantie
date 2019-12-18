<template>
  <div class="wrapper" >
       <el-table
      :data="tableData"
      style="width: 100%" stripe border>
      <el-table-column
        prop="id"
        label="编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="班级名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="addtime"
        label="创建时间">
         <template slot-scope="scope">
            {{scope.row.addtime | time}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
            <el-button type="primary" plain size="mini" @click="handleEdit(scope.row.id)">查看学生</el-button>
             <el-button type="primary" plain size="mini" @click="daochu(scope.row.id)">导出学生成绩</el-button>
               <el-button type="primary" plain size="mini" @click="shipin(scope.row.id)">导出学生视频</el-button>
        </template>
      </el-table-column>
    </el-table>   
    <!-- 分页 -->
     <div  style="float:right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="pagesize"
          :current-page="currentpage"
          layout="total, prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>

    <!--  导出成绩的表格  -->
    <div class="table-box" v-show="false">
     <el-table :data="dataList" style="width: 100%" stripe border class="chengji">
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="nickname" label="学生姓名"></el-table-column>
        <el-table-column prop="banji" label="班级名称"></el-table-column>
        <el-table-column prop="jiaoshixingming" label="教师名称"></el-table-column>
        <el-table-column prop="zuigaofeng" label="最高分"></el-table-column> 
         <el-table-column prop="zuidifeng" label="最低分"></el-table-column> 
        <el-table-column prop="pingjunfen" label="平均分"></el-table-column>
      </el-table>
    </div>
     <!--  导出视频  -->
    
    <!--  导出视频的表格  -->
    <div class="table-box" v-show="false">
     <el-table :data="videoList" style="width: 100%" stripe border class="shipin">
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="nickname" label="学生姓名"></el-table-column>
        <el-table-column prop="banji" label="班级名称"></el-table-column>
        <el-table-column prop="jiaoshixingming" label="教师名称"></el-table-column>
          <el-table-column prop="cishu" label="次数"></el-table-column>
        <el-table-column prop="g_time" label="最高时长">
             <template slot-scope="scope">{{SecondToDate(scope.row.g_time )}}</template>
        </el-table-column> 
         <el-table-column prop="d_time" label="最低时长">
              <template slot-scope="scope">{{ SecondToDate(scope.row.d_time )}}</template>
        </el-table-column> 
        <el-table-column prop="p_time" label="平均时长">
             <template slot-scope="scope">{{ SecondToDate(scope.row.p_time)}}</template>
        </el-table-column>
      </el-table>
    </div>


  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import XLSX from "xlsx";
import FileSaver from "file-saver";
export default {
  components: {},
  props: {},
  data() {
    return {
        currentpage:1,
        teacher_id:'',
        tableData:[],
        pagesize:17,
        total:0,
        dataList:[],
        videoList:[]
    };
  },
  watch: {},
  computed: {},
  methods: {
         getList() {
        axios
          .post(`${BASE_URL}index/login/classlstall`, qs.stringify({
            currentpage:this.currentpage,
          }))
          .then(res => {
              console.log(res);           
            if (res.status === 200 && res.data.code === "1") {
           
            this.tableData = res.data.info.info;
            this.total=res.data.info.pageinfo.sum;
            this.pagesize=parseInt(res.data.info.pageinfo.page)
            console.log(this.tableData);
          }
          });
      },
    handleSizeChange(val){
          this.pagesize=val
      },
      handleCurrentChange(val){
          console.log(val);
          this.currentpage=val
          this.getList()
      },
    handleEdit( id){
        console.log(id);
        
      localStorage.setItem('classesids', id)
      this.$router.push({
        name: `classess`,
        params: {
          id: id
        }
      })
    },
     daochu(id){
             axios
          .post(`${BASE_URL}index/addpaper/recordteacher`, qs.stringify({
            class_id:id, 
          }))
          .then(res => {
              console.log(res);           
            if (res.status === 200 && res.data.code === "1") {
           
            this.dataList = res.data.info;
            console.log(this.dataList);
            let getCurrentPage = this.currentPage;
            this.pagesize = 99999;
            this.currentPage = 1;
            this.$nextTick(function () {
            let time = new Date();
            let year = time.getFullYear();
            let month = time.getMonth() + 1;
            let day = time.getDate();
            let name = year + "" + month + "" + day;
            var wb = XLSX.utils.table_to_book(document.querySelector(".chengji"));
                var wbout = XLSX.write(wb, {
            bookType: "xlsx",
            bookSST: true,
            type: "array"
            });
            try {
            FileSaver.saveAs(
                new Blob([wbout], { type: "application/octet-stream" }),
                name + ".xlsx"
            );
            } catch (e) {
            if (typeof console !== "undefined") console.log(e, wbout);
            }
            this.pagesize = 15;
            this.currentPage = getCurrentPage;
            return wbout;
        })        
         }
                
        });
    },
    shipin(id){
              axios
          .post(`${BASE_URL}index/addpaper/videoexck`, qs.stringify({
            class_id:id, 
          }))
          .then(res => {
              console.log(res);           
            if (res.status === 200 && res.data.code === "1") {
           
            this.videoList = res.data.info;
            console.log(this.videoList);
            let getCurrentPage = this.currentPage;
            this.pagesize = 99999;
            this.currentPage = 1;
            this.$nextTick(function () {
            let time = new Date();
            let year = time.getFullYear();
            let month = time.getMonth() + 1;
            let day = time.getDate();
            let name = year + "" + month + "" + day;
            var wb = XLSX.utils.table_to_book(document.querySelector(".shipin"));
                var wbout = XLSX.write(wb, {
            bookType: "xlsx",
            bookSST: true,
            type: "array"
            });
            try {
            FileSaver.saveAs(
                new Blob([wbout], { type: "application/octet-stream" }),
                name + ".xlsx"
            );
            } catch (e) {
            if (typeof console !== "undefined") console.log(e, wbout);
            }
            this.pagesize = 15;
            this.currentPage = getCurrentPage;
            return wbout;
        })        
         }
                
        });
    },
    SecondToDate: function(msd) {
    var time =msd
    if (null != time && "" != time) {
    if (time > 60 && time < 60 * 60) {
    time = parseInt(time / 60.0) + "分钟" + parseInt((parseFloat(time / 60.0) -
     parseInt(time / 60.0)) * 60) + "秒";
    } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
    time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
    parseInt(time / 3600.0)) * 60) + "分钟" +
    parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
    parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
    } else if (time >= 60 * 60 * 24) {
    time = parseInt(time / 3600.0/24) + "天" +parseInt((parseFloat(time / 3600.0/24)-
    parseInt(time / 3600.0/24))*24) + "小时" + parseInt((parseFloat(time / 3600.0) -
    parseInt(time / 3600.0)) * 60) + "分钟" +
    parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
    parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
    } else {
     time = parseInt(time) + "秒";
    }
    }
    return time;
    },

    





  },
  created() {
      this.getList()
  },
  mounted() {}
};
</script>
<style  scoped>
.wrapper {
  padding: 20px;
  background-color: #fff;
  overflow: hidden;
}
</style>