<template>
  <div class="rights">
    <el-card>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="选择试卷">
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in classList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题目">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item label="选项A">
        <el-input v-model="one"></el-input>
      </el-form-item>
      <el-form-item label="选项B">
        <el-input v-model="two"></el-input>
      </el-form-item>
      <el-form-item label="选项C">
        <el-input v-model="there"></el-input>
      </el-form-item>
      <el-form-item label="选项D">
        <el-input v-model="four"></el-input>
      </el-form-item>
      <el-form-item label="正确答案">
        <el-input v-model="yes"></el-input>
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
      t_id: "",
      use_user: "",
      classList: "",
      value: "",
      name: "",
      one: '',
      two: '',
      there: '',
      four: '',
      yes: '',
      form: {},
    };
  },

  created() {
    // console.log(BASE_URL)
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
          `${BASE_URL}index/Addpaper/paperlst?id=${
            this.t_id
          }&identity=${this.use_user}`
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
      const check = [this.one, this.two, this.there, this.four];
      if(this.value == '') {
        this.$message({
          message: "请选择试卷",
          type: "warning"
        });
        return false;
      };
      if(this.name == '') {
        this.$message({
          message: "请填写题目",
          type: "warning"
        });
        return false;
      };
      if(this.yes == '') {
        this.$message({
          message: "请填写正确答案",
          type: "warning"
        });
        return false;
      };
      axios
        .post(
          `${BASE_URL}index/Addpaper/theorydan`,{
            wenti: this.name,
            count: [this.one, this.two, this.there, this.four],
            daan: this.yes,
            t_id: this.value
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