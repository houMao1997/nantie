<template>
  <div class="login">
    <!-- 学生 -->
    <div class="login-teb-box" >
      <div class="tabs">
        <div class="tab-title" @click="change(1)" :class="[this.checkTab == 1?'tabcheck':'']">学生登录</div>
        <div class="tab-title" @click="change(2)" :class="[this.checkTab == 2?'tabcheck':'']">教师登录</div>
        <div class="tab-title" @click="change(3)" :class="[this.checkTab == 3?'tabcheck':'']">管理员登录</div>
      </div>
      <div class="content-box">

        <div class="check-from" v-show="checkTab == 1">
          <el-form ref="studentForm" :model="studentForm" label-width="80px" class="login-form" :rules="rules" >
            <!-- <div class="cont" @click.stop="ret">返回公告页</div> -->
            <el-form-item label="账号" prop="account">
              <el-input v-model="studentForm.account"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input v-model="studentForm.pwd" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('studentForm')" class="loginButtom" style="width: 30%;padding-top: 12px;padding-bottom: 12px;border-radius: 4px;">登 录</el-button>
              <el-button type="warning" class="loginButtom two" @click="isRegisterBlock" style="width: 30%;padding-top: 12px;padding-bottom: 12px;border-radius: 4px;">点击注册</el-button>
              <el-button type="info" class="loginButtom three" @click.stop="ret" style="width: 30%;padding-top: 12px;padding-bottom: 12px;border-radius: 4px;">返回公告页</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div class="check-from" v-show="checkTab == 2">
          <el-form ref="teacherForm" :model="teacherForm" label-width="80px" class="login-form" :rules="rules" >
            <!-- <div class="title">教师登录</div> -->
            <!-- <div class="cont" @click.stop="ret">返回公告页</div> -->
            <el-form-item label="账号" prop="account">
              <el-input v-model="teacherForm.account"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input v-model="teacherForm.pwd" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('teacherForm')" class="loginButtom" style="width: 100%;padding-top: 12px;padding-bottom: 12px;border-radius: 4px;">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
            </el-form-item>
            <!-- <el-button type="text" class="span" @click="isAdministrator = true">管理员登录</el-button> -->
          </el-form>
        </div>

        <div class="check-from" v-show="checkTab == 3">

          <el-form :model="adminForm"  label-width="80px" class="login-form">
            <el-form-item label="账号" >
              <el-input v-model="adminForm.account" ></el-input>
            </el-form-item>
            <el-form-item label="密码" >
              <el-input type="password" v-model="adminForm.pwd" ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="adminSubmit" class="loginButtom" style="width: 100%;padding-top: 12px;padding-bottom: 12px;border-radius: 4px;">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
            </el-form-item>
          </el-form>
          <!-- <span slot="footer" class="dialog-footer" style="width:315px;margin: 0 auto">
            <el-button @click="isAdministrator = false">取 消</el-button>
            <el-button type="primary" @click="adminSubmit">确 定</el-button>
          </span> -->
        </div>
      </div>
    </div>
    <!-- 学生登录 -->
    <!-- <div class="studentForm" :class="[this.checked?'show':'hidden']">
      <el-row type="flex" justify="center" align="middle" class="login-row">
        <el-col :xs="14" :sm="12" :md="8" :lg="6" :xl="6">
          <el-form
            ref="studentForm"
            :model="studentForm"
            label-width="80px"
            class="login-form"
            :rules="rules"
          >
            <div class="title">学生登录</div>
            <div class="cont" @click.stop="ret">返回公告页</div>
            <el-form-item label="账号" prop="account">
              <el-input v-model="studentForm.account"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input v-model="studentForm.pwd" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('studentForm')" class="loginButtom" style="padding: 10px 50px;border-radius: 34px">登录</el-button>
              <el-button
                class="loginButtom"
                type="primary"
                style="float:right;padding:10px 40px;margin-right:10px;border-radius: 34px"
                @click="check"
              >教师登录</el-button>
            </el-form-item>
            <el-button type="text" class="span" @click="isRegisterBlock">还没有账号，点击注册</el-button>
          </el-form>
        </el-col>
      </el-row>
    </div> -->
    <!-- 老师登录 -->
    <!-- <div class="studentForm" :class="[this.checked?'hidden':'show']">
      <el-row type="flex" justify="center" align="middle" class="login-row">
        <el-col :xs="14" :sm="12" :md="8" :lg="6" :xl="6">
          <el-form
            ref="teacherForm"
            :model="teacherForm"
            label-width="80px"
            class="login-form"
            :rules="rules"
          >
            <div class="title">教师登录</div>
            <div class="cont" @click.stop="ret">返回公告页</div>
            <el-form-item label="账号" prop="account">
              <el-input v-model="teacherForm.account"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input v-model="teacherForm.pwd" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('teacherForm')" class="loginButtom" style="padding: 10px 50px;border-radius: 34px">登录</el-button>
              <el-button class="loginButtom"
                type="primary"
                style="float:right;padding:10px 40px;margin-right:10px;border-radius: 34px;" @click="check">学生登录</el-button>
            </el-form-item>
            <el-button type="text" class="span" @click="isAdministrator = true">管理员登录</el-button>
          </el-form>
        </el-col>
      </el-row>
    </div> -->
    <!-- 注册账号 -->
    <el-dialog title="学生账号注册" :visible.sync="dialogFormVisible" width="365px" style="margin-top: 10vh;">
      <el-form :model="form" :rules="registerRules" ref="form" label-position="left">
        <el-form-item label="请选择教师" :label-width="formLabelWidth" prop="teacher_value" style="width:315px;margin: 10px auto;">
          <el-select v-model="form.teacher_value" placeholder="请选择教师" @change="getBanji">
            <el-option
              v-for="item in form.options"
              :key="item.id"
              :label="item.nickname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请选择班级" :label-width="formLabelWidth" prop="class_value" style="width:315px;margin: 10px auto;">
          <el-select v-model="form.class_value" placeholder="请选择班级" @change="getBanjiId">
            <el-option
              v-for="item in form.class_opt"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="真实姓名" prop="nickname" style="width:315px;margin: 10px auto;">
          <el-input v-model="form.nickname" style="width:212px;float:right"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="registerAccount" style="width:315px;margin: 10px auto;">
          <el-input v-model="form.registerAccount"  style="width:212px;float:right"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" style="width:315px;margin: 10px auto;">
          <el-input v-model="form.pass" type="password" style="width:212px;float:right"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" style="width:315px;margin: 10px auto;padding-left:11px">
          <el-input type="password" v-model="form.checkPass" style="width:212px;float:right;margin-right:7px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="width:315px;margin: 0 auto">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="theRegistration" :loading="isLoading">提交注册</el-button>
      </div>
    </el-dialog>
    <!-- 管理员登录 -->
    <el-dialog title="管理员登录" :visible.sync="isAdministrator" width="365px" style="margin-top: 23vh;">
      <el-form :model="adminForm" :rules="registerRules" style="margin-bottom: 0">
        <el-form-item label="账号" style="width:315px;margin: 0 auto;">
          <el-input v-model="adminForm.account" style="width:270px"></el-input>
        </el-form-item>
        <el-form-item label="密码" style="width:315px;margin: 10px auto;">
          <el-input type="password" v-model="adminForm.pwd" style="width:270px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" style="width:315px;margin: 0 auto">
        <el-button @click="isAdministrator = false">取 消</el-button>
        <el-button type="primary" @click="adminSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      isAdministrator: false,
      flag: false,
      checked: true,
      key: "",
      isLoading: false,
      studentForm: {
        account: "",
        pwd: ""
      },
      teacherForm: {
        account: "",
        pwd: ""
      },
      dialogFormVisible: false,
      adminForm: {
        account: "",
        pwd: ""
      },
      form: {
        options: [],
        class_opt: [],
        teacher_value: "",
        class_value: "",
        teacher_id: "",
        class_id: "",
        registerAccount: "",
        pass: "",
        nickname: "",
        checkPass: ""
      },
      cateAddList: [],
      formLabelWidth: "100px",
      rules: {
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "用户名长度为5到12个字符",
            trigger: "blur"
          }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "密码长度为6到12个字符", trigger: "blur" }
        ]
      },
      registerRules: {
        teacher_value: [
          { required: true, message: "请输入教师名称", trigger: "blur" }
        ],
        class_value: [
          { required: true, message: "请输入教师名称", trigger: "blur" }
        ],
        registerAccount: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "用户名长度为5到12个字符",
            trigger: "blur"
          }
        ],
        pass: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
            validator: validatePass
          },
          { min: 6, max: 12, message: "密码长度为6到12个字符", trigger: "blur" }
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        nickname: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
          // { min: 6, max: 12, message: "密码长度为6到12个字符", trigger: "blur" }
        ]
      },
      checkTab: 1,
    };
  },
  created: function() {
    this.getClass();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        }
        if (formName == "studentForm") {
          axios
            .post(`${BASE_URL}index/Login/studentlogin`, this.studentForm)
            .then(res => {
              if (res.status === 200) {
                if (res.data.code === "1") {
                  localStorage.setItem(
                    "identity",
                    res.data.info.userinfo.identity
                  );
                  localStorage.setItem("id", res.data.info.userinfo.id);
                  this.$router.push({ name: "index" });
                  // console.log('res:,',res.data)
                } else {
                  this.$message({
                    message: res.data.info,
                    type: "error",
                    duration: 1000
                  });
                }
              } else {
                this.$message({
                  message: res.data.info,
                  type: "error",
                  duration: 1000
                });
              }
            });
        } else {
          axios
            .post(`${BASE_URL}index/Login/adminlogin`, this.teacherForm)
            .then(res => {
              console.log("GET请求获取到的结果为：", res.data);
              if (res.status === 200) {
                if (res.data.code === "1") {
                  localStorage.setItem(
                    "identity",
                    res.data.info.userinfo.identity
                  );
                  localStorage.setItem("id", res.data.info.userinfo.id);
                  this.$router.push({ name: "index" });
                } else {
                  this.$message({
                    message: res.data.info,
                    type: "error",
                    duration: 1000
                  });
                }
              } else {
                this.$message({
                  message: res.data.info,
                  type: "error",
                  duration: 1000
                });
              }
            });
        }
      });
    },
    open() {
      this.$prompt("", "密匙", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[0-9]*$/,
        inputErrorMessage: "密匙不能为空，且密匙为数字"
      })
        .then(({ value }) => {
          console.log("value：：", value);
          this.key = value;
          console.log("this.key", this.key);
          axios
            .post(`${BASE_URL}index/Login/secretkey`, {
              key: this.key
            })
            .then(res => {
              console.log("GET请求获取到的结果为：", res.data);
              if (res.status === 200) {
                if (res.data.code === "1") {
                  this.flag = true;
                  this.check();
                } else {
                  this.$message({
                    message: res.data.info,
                    type: "error",
                    duration: 1000
                  });
                }
              } else {
                this.$message({
                  message: res.data.info,
                  type: "error",
                  duration: 1000
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    check() {
      this.checked == true ? (this.checked = false) : (this.checked = true);
    },
    isRegisterBlock() {
      this.dialogFormVisible = true;
    },
    getClass() {
      axios.post(`${BASE_URL}index/Login/teacherinfo`).then(res => {
        this.form.options = res.data.info;
      });
    },
    getBanji(e) {
      this.form.teacher_id = e;
      axios
        .get(`${BASE_URL}index/Login/teacherinfo?id=${this.form.teacher_id}`)
        .then(res => {
          this.form.class_opt = res.data.info;
        });
    },
    getBanjiId(e) {
      this.form.class_id = e;
    },
    theRegistration() {
      if(this.form.teacher_id == '' || this.form.class_id == '' || this.form.pass == '' || this.form.nickname == '' ||this.form.registerAccount == ''){
        this.$message({
          message: '请填写完整信息',
          type: "error",
          duration: 1000
        });
        return false;
      }
      this.isLoading = true;
      axios
        .get(
          `${BASE_URL}index/Login/studentreg?t_id=${
            this.form.teacher_id
          }&class_id=${this.form.class_id}&account=${
            this.form.registerAccount
          }&pwd=${this.form.pass}&nickname=${this.form.nickname}`
        )
        .then(res => {
          console.log("GET请求获取到的结果为：", res.data);
          if (res.status === 200 && res.data.code == "1") {
            this.$message({
              message: res.data.info,
              type: "success",
              duration: 1000
            });
            this.dialogFormVisible = false;
          } else {
            this.$message({
              message: res.data.info,
              type: "error",
              duration: 1000
            });
          }
        });
      this.isLoading = false;
    },
    ret() {
      this.$router.push("/content");
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    adminSubmit() {
      if(this.adminForm.account == ''){
        this.$message({
          message: '账号不能为空',
          type: "error",
          duration: 2000
        });
        return false;
      }
      if(this.adminForm.pwd == ''){
        this.$message({
          message: '密码不能为空',
          type: "error",
          duration: 2000
        });
        return false;
      }
      axios
        .get(
          `${BASE_URL}index/Login/adminlogin_teacher?account=${
            this.adminForm.account
          }&pwd=${this.adminForm.pwd}`
        )
        .then(res => {
          if (res.status === 200 && res.data.code == "1") {
            localStorage.setItem("identity", res.data.info.identity);
            this.$router.push({ name: "index" });
            this.$message({
              message: res.data.info.tishi,
              type: "success",
              duration: 1000
            });
            this.isAdministrator = false;
          } else {
            this.$message({
              message: res.data.info,
              type: "error",
              duration: 1000
            });
          }
        });
    },
    change(val){ this.checkTab = val;},
  }
};
</script>
<style>
.show {
  display: block;

}
.hidden {
  display: none;
}
.login {
  height: 100%;
  background-image: url('../assets/image/login-bg.jpg');
  background-size: cover;
}
.login .login-teb-box {
  min-height: 200px;
  width: 400px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(280px, -332px);
  opacity: 0.6
}

.login-teb-box>.content-box {
  /* margin: 2%; */
  box-sizing: border-box;
  
}
.login-teb-box>.content-box .check-from {
  border-radius: 6px;
}
.login .login-teb-box .tabs {
  height: 54px;
  width: 100%;
  overflow: hidden;
  line-height: 54px;
  /* padding:  */
  background-color: #fff;
  border-bottom: 2px solid #409EFF;
}
.login .login-teb-box .tabs .tab-title {
  width: 33.33%;
  float: left;
  text-align: center;
  height: 54px;
  line-height: 54px;
  /* margin: 0 2%; */
  cursor: pointer;
  box-sizing: border-box;
  /* background-color: lime; */
  /* border-radius: 6px; */
  
}
.login .login-teb-box .tabs .tab-title:nth-child(1) {
  margin-right: 0;
}
.studentForm {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='rgba(53, 57, 74, 0)', endColorstr='rgb(0, 0, 0)',GradientType=1 );
  -webkit-box-shadow: -15px 15px 15px rgba(0, 0, 0, 0.4);
  box-shadow: -15px 15px 15px rgba(0, 0, 0, 0.4);
  -webkit-transition: all 1s;
  -o-transition: all 1s;
  transition: all 1s;
}
.login-row {
  height: 100%;
}
.login-form {
  /* min-width: 380px; */
  padding: 30px 20px;
  background-color: #fff;
  padding-left: 0;
  color: #fff;
}
.loginButtom {
  /* padding: 10px 50px; */
  border: 2px solid #4fa1d9;
  border-radius: 50px;
  background: transparent;
  font-size: 11px;
  color: #4fa1d9;
  -webkit-transition: all 0.2s;
  -o-transition: all 0.2s;
  transition: all 0.2s;
}
.loginButtom.two {
  border: 2px solid #E6A23C;
  /* color: #E6A23C !important; */
}
.loginButtom.two:hover {
  color: #fff !important;
}
.loginButtom.three {
  border: 2px solid #909399;
  /* color: #909399 !important; */
}
.loginButtom.three:hover {
  color: #fff !important;
}
.checkBottom {
  border: none;
}
.switch {
  display: none;
}
.title {
  text-indent: 1em;
  color: #4fa1d9;
  font-size: 30px;
  margin-bottom: 25px;
}
.span {
  font-size: 12px;
  color: #4fa1d9;
  text-indent: 90px;
}
form {
  position: relative;
}
.cont {
  position: absolute;
  bottom: 38px;
  right: 48px;
  cursor: pointer;
  color: #4fa1d9;
  font-size: 12px;
}
.el-dialog {
  width: 30%;
}
/* .dialog-footer {
  width: 315px;
  margin: 0 auto;
} */
.el-dialog__header {
  width: 315px;
  margin: 0 auto;
}
.el-dialog__body {
  padding-top: 10px;
  padding-bottom: 10px;
}
.tabcheck{
  background-color: #409EFF;
  color: #fff;
}
</style>