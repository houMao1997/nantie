<template>
  <div class="rights" v-loading="isLoading" element-loading-text="拼命加载中">
    <div>
      <!-- 教师相关 -->
        <!-- 选择教师 -->
          <el-select v-model="teacherid" placeholder="请选择教师" @change="getBanji" clearable style="width:200px;margin:10px;margin-left:0">
            <el-option
              v-for="item in teacherList"
              :key="item.id"
              :label="item.nickname"
              :value="item.id"
            ></el-option>
          </el-select>
        <!-- 选择班级 -->
          <el-select v-model="classId" placeholder="请选择班级" @change="getStudent" clearable style="width:200px;margin:10px;margin-left:0">
            <el-option v-for="item in classList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        <!-- 选择学生 -->
          <el-select v-model="studentId" placeholder="请选择学生" clearable style="width:200px;margin:10px;margin-left:0">
            <el-option
              v-for="item in studentList"
              :key="item.id"
              :label="item.nickname"
              :value="item.id"
            ></el-option>
          </el-select>
      <!-- 视频相关 -->
        <!-- 选择视频类型 -->
          <el-select v-model="videoId" placeholder="请选择视频类型" @change="getVideoName"  clearable style="width:200px;margin:10px;margin-left:0">
            <el-option
              v-for="item in videoList"
              :key="item.id"
              :label="item.name"
              :value="[item.id,item.name]"
            ></el-option>
          </el-select>
        <!-- 选择视频名称 -->
          <el-select v-model="videoNameId" placeholder="请选择视频名称" clearable style="width:200px;margin:10px;margin-left:0">
            <el-option
              v-for="item in videoNameList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
      <!-- 时间类型选择 -->
      <!-- <div class="block"> -->
        <el-date-picker
          style="margin:10px"
          v-model="value2"
          type="datetimerange"
          range-separator="至"
          value-format="timestamp"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :clearable="false"
        ></el-date-picker>
        <!-- @change="getTime" -->
      <!-- </div> -->
      <!-- 搜索按钮 -->
      <el-button type="primary" icon="el-icon-search" style="padding:8px 15px;transform: translateY(-1px);" @click="search">搜索</el-button>
      <!-- 试卷表格 -->
      <el-table
        :data="list"
        style="width: 100%;margin-top:15px;border-top: 1px solid rgb(235,238,245);"
        :cell-class-name="cell"
        class="table"
        border
      >
        <el-table-column prop="id" label="Id" width="70"></el-table-column>
        <el-table-column prop="teacher_name" label="教师姓名" width="120" align="center"></el-table-column>
        <el-table-column prop="class_name" label="班级" width="200" align="center"></el-table-column>
        <el-table-column prop="user_name" label="学生姓名" width="120" align="center"></el-table-column>
        <el-table-column prop="filetypename" label="查看视频类型" width="120" align="center"></el-table-column>
        <el-table-column prop="filename" label="视频名称" width="160" align="center"></el-table-column>
        <el-table-column prop="start_time" label="开始观看时间" width="220" align="center">
          <template slot-scope="scope">{{ scope.row.start_time | time}}</template>
        </el-table-column>
        <el-table-column prop="end_time" label="结束观看时间" align="center">
          <template slot-scope="scope">{{ scope.row.end_time | time}}</template>
        </el-table-column>
        <el-table-column prop="duration" label="观看时长" align="center"></el-table-column>
      </el-table>
      <!-- 分页插件。 -->
      <div style="float:right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="pagesize"
          :current-page="currentPage"
          layout="total, prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
      <!-- 导出Excel表格 -->
      <el-button  @click="exportExcel" type="primary" class="button">导出Excel表格</el-button>
    </div>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
import axios from "axios";
export default {
  data() {
    return {
      isLoading: true,
      list: [],
      pagesize: 15,
      currentPage: 1,
      // 总页数
      total:'',
      value2: '',
      options: [],
      value: "",
      teacherList: [],
      teacherid: "",
      classList: [],
      classId: "",
      studentList: [],
      studentId: "",
      videoList: [],
      videoId: [],
      videoNameList: [],
      videoNameId: "",
      start_time: "",
      end_time: ""
    };
  },
  created() {
    this.getList();
    this.getTeacher();
    this.getVideoList();
  },

  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList()
    },
    getList() {
      this.isLoading = true;
      // if (!this.value2[0]){this.value2 = ["", ""]};
      axios
        .post(`${BASE_URL}index/Login/videoschool`, {
          t_id: this.teacherid,
          class_id: this.classId,
          u_id: this.studentId,
          file_id: this.videoId[1],
          filename: this.videoNameId,
          start_time: this.value2[0],
          end_time: this.value2[1],
          currentpage:this.currentPage
        })
        .then(res => {
          console.log(res);
          
          if (res.status == 200 && res.data.code === "1") {
            this.list = res.data.info.file_round
            console.log(this.list);
            this.total=res.data.info.pageinfo.sum
            this.pagesize=parseInt(res.data.info.pageinfo.page)
            this.isLoading = false;
          } else {
          }
        });
    },
    flatten(arr) {
      var res = [];
      arr.map(item => {
        if (Array.isArray(item)) {
          res = res.concat(flatten(item));
        } else {
          res.push(item);
        }
      });
      return res;
    },
    getTeacher() {
      axios.post(`${BASE_URL}index/Login/searchinfo`).then(res => {
        if (res.status === 200 && res.data.code === "1") {
          this.teacherList = res.data.info;
        }
      });
    },
    getBanji() {
      this.classId = "";
      this.studentId = "";
      axios
        .post(`${BASE_URL}index/Login/searchinfo`, {
          teacher_id: this.teacherid
        })
        .then(res => {
          console.log(res.data);
          if (res.status === 200 && res.data.code === "1") {
            this.classList = res.data.info;
          }
        });
    },
    getStudent() {
      this.studentId = "";
      axios
        .post(`${BASE_URL}index/Login/searchinfo`, {
          class_id: this.classId
        })
        .then(res => {
          console.log(res.data);
          if (res.status === 200 && res.data.code === "1") {
            this.studentList = res.data.info;
          }
        });
    },
    getVideoList() {
      axios
        .post(`${BASE_URL}index/Login/searchinfo`, {
          file_type: "type"
        })
        .then(res => {
          if (res.status === 200 && res.data.code === "1") {
            this.videoList = res.data.info;
          }
        });
    },
    getVideoName() {
      this.videoNameId = "";
      axios
        .post(`${BASE_URL}index/Login/searchinfo`, {
          file_type: this.videoId[0]
        })
        .then(res => {
          if (res.status === 200 && res.data.code === "1") {
            this.videoNameList = res.data.info;
          }
        });
    },
    search(){
      this.currentPage=1,
      this.getList()
    },
    getTime() {
      if (this.value2 == null) {
        this.killNull();
      } else {
        this.getList();
      }
    },
    postStudent() {
      if (this.value2 == null) {
        this.killNull();
      } else {
        this.getList();
      }
    },
    postVideoName() {
      if (this.value2 == null) {
        this.killNull();
      } else {
        this.getList();
      }
    },
    killNull() {
      this.isLoading = true;
      axios
        .post(`${BASE_URL}index/Login/videoschool`, {
          t_id: this.teacherid,
          class_id: this.classId,
          u_id: this.studentId,
          file_id: this.videoId[1],
          filename: this.videoNameId,
          start_time: "",
          end_time: ""
        })
        .then(res => {
          if (res.status === 200 && res.data.code === "1") {
            this.list = res.data.info;
            this.isLoading = false;
          } else {
          }
        });
    },
    cell({row, column, rowIndex, columnIndex}) {
      if( columnIndex == 1 || columnIndex == 4 || columnIndex == 7 || columnIndex == 10){
        return 'red'
      }
      if( columnIndex == 2 || columnIndex == 5 || columnIndex == 8 || columnIndex == 11){
        return 'yellow'
      }
      if( columnIndex == 3 || columnIndex == 6 || columnIndex == 9 || columnIndex == 12){
        return 'lime'
      }
    },
    exportExcel() {
      // 设置当前日期
      let getCurrentPage = this.currentPage;
      this.pagesize = 99999;
      this.currentPage = 1;
      this.$nextTick(function () {
        let time = new Date();
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let day = time.getDate();
        let name = year + "" + month + "" + day;
        // console.log(name)
        /* generate workbook object from table */
        //  .table要导出的是哪一个表格
        var wb = XLSX.utils.table_to_book(document.querySelector(".table"));
        /* get binary string as output */
        var wbout = XLSX.write(wb, {
          bookType: "xlsx",
          bookSST: true,
          type: "array"
        });
        try {
          //  name+'.xlsx'表示导出的excel表格名字
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
    },
  },
};
</script>

<style scoped>
.el-table::before {
  height: 0;
}
.show {
  display: block;
}
.hidden {
  display: none;
}
.el-row {
  margin-bottom: 10px;
}
.col-totle {
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  padding: 0 10px 0 0;
}
.rights {
  /* height: 100%; */
  overflow: hidden;
  box-sizing: border-box;
}
.button {
  float: right;
  height: 32px;
  border-radius: 0;
  margin-right: 10px;
}
</style>