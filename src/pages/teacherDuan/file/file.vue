<template>
  <div class="rights">
    <el-card style="margin-bottom:20px">
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

    <el-card>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="视频类型">
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in videoList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="视频名称">
        <el-input v-model="name"></el-input>
      </el-form-item>
    </el-form>
    <div class="tishi">* 选择视频类型，输入视频名称，显示上传按钮</div>
    <el-upload
      :action="actionPath"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :on-success="onSuccess"
      :file-list="fileList"
      style="position: relative;padding-left: 12px"
      v-if="name !== '' && value !==''" >
      <el-button size="small" type="primary" class="btn" :loading="isLoading">点击上传</el-button>
      <!-- <div slot="tip" class="el-upload__tip">只能上传mp4文件哦</div> -->
    </el-upload>
    </el-card>
  </div>
</template>
<!-- :src="require(`${mrUrl}item.url`)" -->
<script>
import axios from "axios";
export default {
  data() {
    return {
      isLoading: false,
      name: '',
      fileList: [],
      form: {},
      videoList: '',
      value: '',
      info: '',
      actionPath: '',
      // form: {},
      titleName: '',
    };
  },
  created() {
    this.videoGet()
    this.actionPath = `${BASE_URL}index/Addpaper/img`
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    onSuccess(e){
      this.isLoading = true;
      this.info = e.info
      axios
        .post(
          `${BASE_URL}index/Addpaper/addfile`,{
            url: this.info,
            f_id: this.value,
            name: this.name
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
    videoGet() {
      axios
        .get(
          `${BASE_URL}index/Addpaper/addfile`)
        .then(res => {
          if (res.status === 200 & res.data.code === "1") {
            this.videoList = res.data.info
          } else {
            this.$message({ message: res.data.info, type: "error", duration: 1000 });
          }
        });
    },
    onSubmit() {
      this.isLoading = true;
      if(this.name == '') {
        this.$message({
          message: "请填写视频类型",
          type: "warning"
        });
        this.isLoading = false;
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
.tishi {
  color: red;
  font-size: 14px;
  height: 28px;
  line-height: 28px;
  overflow: hidden;
  margin-bottom: 30px;
  text-indent: 12px;
}
.btn {
  position: absolute;
  left: 12px;
  top: -15px;
}
.rights {
  padding: 0;
  background-color: #F0F3F8;
}
</style>