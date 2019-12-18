<template>
  <div class="rights">
    <!-- 提交公告 -->
    <el-card>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="公告标题" >
        <el-input v-model="form.name" style="width: 450px;"></el-input>
      </el-form-item>
      <el-form-item label="公告图片(可以不传)">
        <el-upload
        :action="actionPath"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="1"
        :on-exceed="handleExceed"
        :on-success="onSuccess"
        :file-list="fileList"
        style="margin-bottom: 0px">
        <el-button size="small" type="primary">点击上传图片</el-button>
        <div slot="tip" class="el-upload__tip">只能上图片哦</div>
      </el-upload>
      </el-form-item>
      <!-- <el-form-item label="公告内容">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item> -->
      <el-form-item label="公告内容">
        <quill-editor v-model="form.desc" style="width: 450px;" :options="editorOption"></quill-editor>
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
import { quillEditor } from 'vue-quill-editor';
export default {
  data() {
    return {
      isLoading: false,
      use_user: "",
      t_id: "",
      form: {
        name: '',
        desc: '',
      },
      actionPath: '',
      fileList: [],
      info: '',
      editorOption: { // 自定义富文本
        modules:{
          toolbar:[
            [{ 'align': [] }],[{ 'color': [] }, { 'background': [] }],[{ 'direction': 'rtl' }],
            ['bold', 'italic', 'underline', 'strike','image','italic','video','size'],
          ]
        }
      }, 
    };
  },
  created() {
    let t_id = localStorage.getItem("id");
    let use_user = localStorage.getItem("identity");
    this.t_id = t_id;
    this.use_user = use_user;
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
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    onSuccess(e){
      this.info = e.info
      console.log(this.info)
      
    },
    // 提交上传公告
    onSubmit() {
      this.isLoading = true;
      if(this.form.name !== '' && this.form.desc !== ''){
        axios
        .post(
          `${BASE_URL}index/login/addnotice`,{
            url: this.info,
            name: this.form.name,
            count: this.form.desc,
            teacher_id: this.t_id
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
/* .el-main {
  height: 100%;
} */
.rights {
  /* height: 100%; */
  padding: 0;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner {
  cursor: hand;
}
h2 {
  text-align: center;
  margin-bottom: 15px;
}
h3 {
  margin: 15px 0;
}
p {
  margin: 5px 0;
}
.pd-box {
  padding: 10px 20px;
}
.dx-box {
  padding: 10px 20px;
}
.duox-box {
  padding: 10px 20px;
}
.daohang {
  border: 1px solid #409eff;
  padding: 10px 15px;
}
.big {
  padding: 15px 25px;
}

</style>