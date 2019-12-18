<template>
  <div class="wrapper">
  

 <el-table
    :data="list"
    stripe
    style="width: 100%" border>
    <el-table-column
       prop="id"
      label="编号"
      width="100">
    </el-table-column>
    <el-table-column
      prop="wenti"
      label="问题"
      width="260">
    </el-table-column>
    <el-table-column
      prop="xuanxiang[0]"
      label="选项A">
    </el-table-column>
     <el-table-column
      prop="xuanxiang[1]"
      label="选项B">
    </el-table-column>
     <el-table-column
      prop="xuanxiang[2]"
      label="选项C">
    </el-table-column>
     <el-table-column
      prop="xuanxiang[3]"
      label="选项D">
    </el-table-column>
     <el-table-column
      prop="daan"
      label="正确答案">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="danger" @click="open(scope.row.id)">删除</el-button>
        </template>
    </el-table-column>
  </el-table>

    <!-- 分页列表 -->
    <div style="float:right;padding-top:5px">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentpage"
        :page-size="pagesize"
        layout="total, prev, pager, next"
        :total="total">
        </el-pagination>
    </div>
      <!-- 导出Excel  :href="downloadUrl" href="javascript:;" -->
    <a  style="height:24px; width:102px;display: inline-block;float: right;" download  ref="herf" :href="aherf()">
      <el-button type="primary"  icon="el-icon-upload2" class="excels">导出Excel</el-button>
    </a>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
//   components: {},
//   props: {},
  data() {
    return {
        currentpage:1,
        list:[],
        pagesize:17,
        total:0
    };
  },
  methods: {
    //   获取列表数据
      getList() {
           axios
          .post(`${BASE_URL}index/login/tikulist`,  {
            type: 1,
            currentpage:this.currentpage
          }).then(res => {
            console.log(res);
            
          if (res.status === 200 && res.data.code === "1") {
            this.list = res.data.info.info;
            this.total=res.data.info.pageinfo.sum
            this.pagesize=parseInt(res.data.info.pageinfo.page)
            //将获取的每条数据选项数据count进行截取
            for (let index = 0; index < this.list.length; index++) {
                this.list[index].xuanxiang = this.list[index].count.split(',|');    
            }
            console.log(this.list);
          } else {
            this.$message({
              message: res.data.info,
              type: "error",
              duration: 1000
            });
          }
        });
     },
// 是否确定删除弹框
    open(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        //点击确定删除，调用删除事件
          this.delete(id)
          this.getList()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 删除事件
    delete(id){
         axios
          .post(`${BASE_URL}index/login/tikulistdel`,  {
            type: 1,
            id:id
          }).then(res => {
             console.log(res);
            //   this.getList()
            this.$message({
              message: res.data.info,
              type: "success",
              duration: 1000
            });
        });
    },
    handleSizeChange(val){
        this.pagesize=val
    },
    handleCurrentChange(val){
        this.currentpage=val
        this.getList()
    },
    aherf(){
    //   return `${BASE_URL}admin/teacher/studentexcl?school_id=${this.school_id}&teacher_id=${this.teacheride}&class_id=${this.classide}&u_id=${this.uide}&start_time=${this.start_time}&end_time=${this.end_time}`;
    },
  },
  created() {
    this.getList()
  },
  mounted() {}
};
</script>
<style scoped>
.excels {
  padding: 4px 9px;
  font-size: 12px;
  float: right;
  margin-right: 12px;
  margin-top: 10px;
}
.wrapper {
  padding: 20px;
  background-color: #fff;
  overflow: hidden;
}
</style>