<template>
  <div class="rights">
    <el-card>
      <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="选择试卷">
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in classList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题  目">
        <el-input v-model="name" class="ipt" ></el-input>
      </el-form-item>
      <el-form-item label="答 案">
        <el-radio v-model="radio" label="1">正确</el-radio>
        <el-radio v-model="radio" label="0">错误</el-radio>
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
      t_id: "",
      use_user: "",
      classList: "",
      value: "",
      radio: "",
      name: "",
      form: {}
    };
  },
  created: function() {
    let t_id = localStorage.getItem("id");
    let use_user = localStorage.getItem("identity");
    this.t_id = t_id;
    this.use_user = use_user;
    this.postIdentity();
  },
  methods: {
    postIdentity() {
      axios
        .get(
          `${BASE_URL}index/Addpaper/paperlst?id=${this.t_id}&identity=${
            this.use_user
          }`
        )
        .then(res => {
          if (res.status === 200 && res.data.code === "1") {
            console.log("this.res.data::", res.data.info);
            this.classList = res.data.info;
          } else {
            this.$message({
              message: res.data.info,
              type: "error",
              duration: 1000
            });
          }
        });
    },
    onSubmit() {
      this.isLoading = true;
      if (this.name !== ''&& this.radio !== ''&& this.value !==''){
        axios
          .post(`${BASE_URL}index/Addpaper/addjudge`, {
            wenti: this.name,
            daan: this.radio,
            t_id: this.value
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
          message: '请将信息填写完整',
          type: 'warning'
        });
        this.isLoading = false;
      }
    }
  }
};
</script>
<style scoped>
@import '../../../assets/css/gloab.css';
.rights {
  padding: 0;
}
</style>