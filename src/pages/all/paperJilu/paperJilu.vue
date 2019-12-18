<template>
  <div class="rights" v-loading="isLoading" element-loading-text="拼命加载中">
    <!-- 考试记录 -->
    <el-table :data="paperList"
      style="width: 100%" border>
      <el-table-column
      type="index"
      width="60">
    </el-table-column>
      <el-table-column
        align="center"
        prop="u_name"
        label="姓名"
        width="70">
      </el-table-column>
      <el-table-column
        align="center"
        prop="paper_name"
        label="试卷名称"
        width="220">
      </el-table-column>
      <el-table-column
        align="center"
        prop="addtime"
        label="添加时间">
      </el-table-column>
      <el-table-column prop="defen" label="得分" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)"
          >查看</el-button>
      </template>
    </el-table-column>
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
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      isLoading: true,
      pagesize: 15,
      currentPage: 1,
      paperList: [],
      t_id: '',
      use_user: '',
      total: 0,
    };
  },
  created() {
    let t_id = localStorage.getItem("id");
    let use_user = localStorage.getItem("identity");
    this.t_id = t_id;
    this.use_user = use_user;
    this.getData();
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    getData(){
      this.isLoading = true;
      axios
        .post(`${BASE_URL}index/login/userpaperrecord`,qs.stringify({
          id: this.t_id,
          identity: this.use_user,
          currentpage:this.currentPage
        }))
        .then(res => {
          if (res.status === 200 && res.data.code === "1") {
            console.log(res.data.info)
            this.paperList = res.data.info.info;
            this.total= res.data.info.pageinfo.sum;
            this.pagesize=parseInt(res.data.info.pageinfo.page);
            this.isLoading = false;
          } else {
            this.$message({
              message: res.data.info,
              type: "error",
              duration: 1000
            });
          }
        });
    },
    handleEdit(index, row){
      let id = row.id
      localStorage.setItem('kaoShiId', id)
      this.$router.push({
        name: `testScore`,
        params: {
          id: id
        }
      })
    },
  }
};
</script>

<style scoped>
.show {
  display: block;
}
.hidden {
  display: none;
}
.el-table::before {
  height: 0;
}
</style>