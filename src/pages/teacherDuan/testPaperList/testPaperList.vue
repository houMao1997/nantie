<template>
  <div class="rights" v-loading="isLoading" element-loading-text="拼命加载中">
    <!-- 试卷表格 -->
    <el-table :data="list.slice((currentPage -1) * pagesize, currentPage * pagesize)" style="width: 100%" border>
      <el-table-column prop="id" label="Id" width="70"></el-table-column>
      <el-table-column prop="name" label="试卷名称" width="240" align="center"></el-table-column>
      <el-table-column prop="addtime" label="添加时间" align="center">
        <template slot-scope="scope">{{ scope.row.addtime | time}}</template>
      </el-table-column>
      <!-- <el-table-column prop="tongguo" label="通过人数"  align="center"></el-table-column>
      <el-table-column prop="notongguo" label="未通过人数" align="center"></el-table-column> -->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            v-if="use_user === '0'"
          >查看</el-button>
          <el-button size="mini" @click="goKaoshi(scope.$index, scope.row)" v-else>前往考试</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页插件。 -->
    <div  style="float:right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="pagesize"
        layout="total, prev, pager, next"
        :total="list.length"
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
      list: [],
      isVideoShow: "",
      t_id: "",
      use_user: "",
      pagesize: 15,
      currentPage: 1,
    };
  },
  created() {
    let t_id = localStorage.getItem("id");
    let use_user = localStorage.getItem("identity");
    this.t_id = t_id;
    this.use_user = use_user;
    this.getList();
  },

  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val
    },
    getList() {
      this.isLoading = true;
      axios
        .get(
          `${BASE_URL}index/Addpaper/paperlst?id=${this.t_id}&identity=${this.use_user}`
        )
        .then(res => {
          if (res.status === 200 && res.data.code === "1") {
            this.list = res.data.info;
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
    handleEdit(index, row) {
      let id = row.id;
      localStorage.setItem("yulanId", id);
      this.$router.push({
        name: `testPreview`,
        params: {
          id: id
        }
      });
    },
    goKaoshi(index, row) {
      let id = row.id;
      localStorage.setItem("kaoshiId", id);
      this.$router.push({
        name: `examination`,
        params: {
          id: id
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
.show {
  display: block;
}
.hidden {
  display: none;
}
.rights {
  /* height: 100%; */
}
</style>