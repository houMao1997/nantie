<template>
  <div class="rights">
    <!-- 新增讨论 -->
    <el-card>
    <el-form ref="form" :model="form" label-width="90px">
      <el-form-item label="标题">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="讨论内容">
        <el-input type="textarea" v-model="form.count"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="isLoading">立即创建</el-button>
      </el-form-item>
    </el-form>
    </el-card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      isLoading: false,
      use_user: "",
      t_id: "",
      form: {
        name: "",
        count: ""
      }
    };
  },
  created() {
    let t_id = localStorage.getItem("id");
    let use_user = localStorage.getItem("identity");
    this.t_id = t_id;
    this.use_user = use_user;
  },
  methods: {
    // 提交新增的讨论
    onSubmit() {
      this.isLoading = true;
      if (this.form.name !== "" && this.form.count !== "") {
        axios
          .post(`${BASE_URL}index/login/discuss`, {
            name: this.form.name,
            count: this.form.count,
            teacher_id: this.t_id
          })
          .then(res => {
            if ((res.status === 200) & (res.data.code === "1")) {
              this.$message({
                message: res.data.info,
                type: "success",
                duration: 1000
              });
              this.isLoading = false;
            } else {
              this.$message({
                message: res.data.info,
                type: "error",
                duration: 1000
              });
              this.isLoading = false;
            }
          });
      } else {
        this.$message({
          message: "请将信息填写完整",
          type: "warning"
        });
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
@import '../../../assets/css/gloab.css';
/* .el-form-item{
  width: 480px;
} */
.rights {
  padding: 0;
}
</style>