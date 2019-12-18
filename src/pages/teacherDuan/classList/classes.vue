<template>
  <div class="wrapper">
    <el-breadcrumb style="margin-bottom:10px;cursor: pointer;">
      <el-breadcrumb-item :to="{ path: '/classList' }" class="daohang" v-if="identity == '1' ||identity == '0'" style="cursor: pointer;">返回上一页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/classList' }" class="daohang" v-if="identity == '2'" style="cursor: pointer;">返回上一页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
    :data="tableData"
    stripe
    style="width: 100%" stripe  border>
    <el-table-column
      prop="id"
      label="编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="account"
      label="账号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="nickname"
      label="姓名">
    </el-table-column>
      <el-table-column
      prop="addtime"
      label="创建时间">
      <template slot-scope="scope">
            {{scope.row.addtime | time}}
        </template>
    </el-table-column>
  </el-table>


      <!-- 分页 -->
    <div style="float:right">
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentpage"
      :page-size="pagesize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import axios from "axios";
export default {
  components: {},
  props: {},
  data() {
    return {
        currentpage:1,
        class_id:'',
        tableData:[],
        total:0,
        pagesize:17

    };
  },
  watch: {},
  computed: {},
  methods: {
   getList() {
        axios
          .post(`${BASE_URL}index/login/classuserlst`, qs.stringify({
            class_id: this.class_id, 
            currentpage:this.currentpage,
          }))
          .then(res => {
              console.log(res);           
            if ( res.data.code === "1") {
           
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
          this.currentpage=val
          this.getList()
      },
  },
  created() {
      this.class_id=localStorage.getItem('classesid')
      console.log(this.class_id);     
      this.getList()
    let identity = localStorage.getItem("identity");
    this.identity = identity
  },
  mounted() {}
};
</script>
<style  scoped>

.daohang {
  border: 1px solid #409EFF;
  padding: 10px 15px;
}


.wrapper {
  padding: 20px;
  background-color: #fff;
  overflow: hidden;
}
</style>