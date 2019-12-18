<template>
  <div class="rights">
    <el-card>
    <el-form ref="form" :model="form" label-width="80px" :rules="pdform">
      <el-form-item label="输入账号" prop="zhang">
        <el-input v-model="form.zhang"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="输入密码" prop="psd">
        <el-input v-model="form.psd" type="password"></el-input>
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
      form: {
        zhang: "",
        name: "",
        psd: ""
      },
      pdform: {
        zhang: [{ required: true, message: "请输入账号", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        psd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "密码长度为6到12个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {},
  methods: {
    onSubmit() {
      this.isLoading = true;
      if (
        this.form.zhang !== "" &&
        this.form.psd !== "" &&
        this.form.name !== ""
      ) {
        axios
          .post(`${BASE_URL}index/login/accountAdd`, {
            account: this.form.zhang,
            pwd: this.form.psd,
            nickname: this.form.name
          })
          .then(res => {
            if (res.status === 200 && res.data.code === "1") {
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
.show {
  display: block;
}
.hidden {
  display: none;
}
.rights {
  padding: 0;
}
</style>