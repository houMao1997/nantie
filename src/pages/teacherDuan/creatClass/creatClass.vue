<template>
  <div class="rights">
    <el-card>
    <el-form ref="form" :model="form" label-width="90px">
      <el-form-item label="班级名称">
        <el-input v-model="form.bjname"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="isLoading">立即创建</el-button>
        <!-- <el-button>取消</el-button> -->
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
        bjname: '',
        t_id: ''
      }
    };
  },
  created() {
    let t_id = localStorage.getItem("id");
    this.t_id = t_id;
  },
  methods: {
    onSubmit() {
      this.isLoading = true;
      if(this.form.bjname !== ''){
        axios
          .post(`${BASE_URL}index/login/addclass`,{
            t_id: this.t_id,
            name: this.form.bjname
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