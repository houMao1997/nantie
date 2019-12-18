<template>
  <div class="rights" v-loading="isLoading" element-loading-text="拼命加载中">
    <!-- 学习进度表格 -->
    <el-table :data="stydyList" style="width: 150%" min-height="640px" border>
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column align="center" prop="user_name" label="用户名称" width="150"></el-table-column>
      <el-table-column align="center" prop="filetypename" label="查看视频类型" width="100"></el-table-column>
      <el-table-column align="center" prop="filename" label="视频名称"></el-table-column>
      <el-table-column align="center" prop="start_time" label="开始时间"></el-table-column>
      <el-table-column align="center" prop="end_time" label="结束时间"></el-table-column>
      <el-table-column align="center" prop="duration" label="观看时长" width="220"></el-table-column>
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
export default {
  data() {
    return {
      isLoading: true,
      use_user: "",
      t_id: "",
      stydyList: [],
      pagesize: 15,
      currentPage: 1,
      total: 0,
    };
  },
  created() {
    let t_id = localStorage.getItem("id");
    let use_user = localStorage.getItem("identity");
    this.t_id = t_id;
    this.use_user = use_user;
    this.getShujv();
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getShujv();
    },
    getShujv() {
      this.isLoading = true,
      axios
        .get(
          `${BASE_URL}index/Addpaper/videoround?identity=${
            this.use_user
          }&u_id=${this.t_id}&currentpage=${this.currentPage}`
        )
        .then(res => {
          if (res.status === 200 && res.data.code === "1") {
            // console.log("this.res.data::", res.data.info);
            // this.stydyList = res.data.info;
            this.stydyList = res.data.info.info;
            this.total= res.data.info.pageinfo.sum;
            this.pagesize = parseInt(res.data.info.pageinfo.page)
            this.isLoading = false
          } else {
            this.$message({
              message: res.data.info,
              type: "error",
              duration: 1000
            });
          }
        });
    }
  }
};
</script>

<style scoped>
.el-table::before {
  height: 0;
}
.rights {
  /* height: 100%; */
}
</style>