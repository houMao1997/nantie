<template>
  <div class="rights">
    <el-card>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="视频类型">
        <el-input v-model="titleName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="isLoading">立即创建</el-button>
        <el-button>取消</el-button>
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
      form: {},
      titleName: '',
    };
  },
  created() {
  
  },

  methods: {
    onSubmit() {
      this.isLoading = true;
      if(this.name == '') {
        this.$message({
          message: "请填写视频类型",
          type: "warning"
        });
        return false;
      };
      axios
        .post(
          `${BASE_URL}index/Addpaper/filetype`,{
            name: this.titleName
          })
        .then(res => {
          if (res.status === 200 & res.data.code === "1") {
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
    },
  }
};
</script>

<style scoped>
@import '../../../assets/css/gloab.css';
.rights {
  padding: 0;
}
</style>