<template>
  <div class="right">
    <el-tabs type="border-card">

      <el-tab-pane label="新建试卷">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="试卷名称" >
            <el-input v-model="form.name" style="width:350px"></el-input>
          </el-form-item>
          <el-form-item label="试卷所属">
            <el-select v-model="form.affiliation" placeholder="试卷所属" style="width:350px">
              <el-option label="个人" value="1" v-on:click.native="changeAffiliatione"></el-option>
              <el-option label="系统" value="0" v-on:click.native="changeAffiliatitwo"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所选班级" :class="[this.form.affiliation == 1?'shower':'hiddenen']">
            <el-checkbox-group v-model="form.checkOne">
              <el-checkbox
                v-for="item in form.classList"
                :key="item.id"
                :label="item.id"
                :value="item.id"
              >{{item.class_name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="所选班级" :class="[this.form.affiliation == 0?'shower':'hiddenen']">
            <el-checkbox-group v-model="ischeck">
              <el-checkbox label="选中且禁用">所有人可见</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :loading="isLoading">立即创建</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="新增单选题">
        <el-form ref="danxuanForm" :model="danxuanForm" label-width="80px">
          <el-form-item label="选择试卷">
            <el-select v-model="value" placeholder="请选择" style="width:350px">
              <el-option v-for="item in danxuanList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题目">
            <el-input v-model="danxuanForm.name" style="width:350px"></el-input>
          </el-form-item>
          <el-form-item label="选项A">
            <el-input v-model="danxuanForm.one" style="width:350px"></el-input>
          </el-form-item>
          <el-form-item label="选项B">
            <el-input v-model="danxuanForm.two" style="width:350px"></el-input>
          </el-form-item>
          <el-form-item label="选项C">
            <el-input v-model="danxuanForm.there" style="width:350px"></el-input>
          </el-form-item>
          <el-form-item label="选项D">
            <el-input v-model="danxuanForm.four" style="width:350px"></el-input>
          </el-form-item>
          <el-form-item label="正确答案">
            <el-input v-model="danxuanForm.yes" style="width:350px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="danxuanonSubmit" >立即创建</el-button>
            <!-- :loading="isLoading" -->
            <!-- <el-button>取消</el-button> -->
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="新增多选题">
        <el-form ref="duoxuanform" :model="duoxuanform" label-width="80px">
          <el-form-item label="选择试卷">
            <el-select v-model="duoxuanform.value" placeholder="请选择" style="width:350px">
              <el-option v-for="item in danxuanList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题目">
            <el-input v-model="duoxuanform.name" style="width:350px"></el-input>
          </el-form-item>
          <el-form-item label="选项A">
            <el-input v-model="duoxuanform.one" style="width:350px"></el-input>
          </el-form-item>
          <el-form-item label="选项B">
            <el-input v-model="duoxuanform.two" style="width:350px" ></el-input>
          </el-form-item>
          <el-form-item label="选项C">
            <el-input v-model="duoxuanform.there" style="width:350px"></el-input>
          </el-form-item>
          <el-form-item label="选项D">
            <el-input v-model="duoxuanform.four" style="width:350px"></el-input>
          </el-form-item>
          <h2>正确答案要用英文状态下的&nbsp;,|&nbsp;分割；例：正确答案：1,|正确答案：2</h2>
          <el-form-item label="正确答案">
            <el-input v-model="duoxuanform.yes" style="width:350px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="duoxuanonSubmit" >立即创建</el-button>
            <!-- :loading="isLoading" -->
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="新增判断题">
        <el-form ref="panduanform" :model="panduanform" label-width="80px">
          <el-form-item label="选择试卷">
            <el-select v-model="panduanform.value" placeholder="请选择" style="width:350px">
              <el-option v-for="item in danxuanList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题目">
            <el-input v-model="panduanform.name" style="width:350px"></el-input>
          </el-form-item>
          <el-form-item label="答案">
            <el-radio v-model="panduanform.radio" label="1">正确</el-radio>
            <el-radio v-model="panduanform.radio" label="0">错误</el-radio>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="panduanonSubmit" :loading="isLoading">立即创建</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      
    </el-tabs>
  </div>
</template>

<script>
import qs from "qs";
import axios from "axios";
// import { async } from 'q';
export default {
  data() {
    return {
      // 新增课堂测试
      isLoading: false,
      t_id: "",
      form: {
        checked: true,
        name: "",
        t_id: "",
        use_user: "",
        classList: [],
        checkOne: [],
        affiliation: "",
        affiliation_value: ""
      },
      ischeck: true,
      // 新增单选题
      danxuanList: "",
      value: "",
      danxuanForm: {
        one: '',
        two: '',
        there: '',
        four: '',
        yes: '',
        name: "",
      },
      // 新增多选题。
      duoxuanform: {
        value: "",
        name: "",
        one: '',
        two: '',
        there: '',
        four: '',
        yes: '',
      },
      // 新增判断
      use_user: "",
      panduanform: {
        value: "",
        radio: "",
        name: "",
      },
      // 新增填空题
      tiankongform: {
        value: "",
        name: "",
        yes: '',
      },
      // 新增选词填空题。
      xuancuform: {
        value: "",
        name: "",
        one: '',
        two: '',
        there: '',
        four: '',
        yes: '',
      },
      // 单词匹配
      pipeiform: {
        value: "",
        name: "",
        beixuan: "",
        yes: '',
      },
      //  新增连线题：
      lianxian: [{
        left:'',
        right: '',
      },{
        left:'',
        right: '',
      },{
        left:'',
        right: '',
      },{
        left:'',
        right: '',
      }],
      lianxianValue: '', // 连线题的试卷id
      zuowenform: {
        value: "",
        count: "",
        daan: "",
      },
      yuyinpingce: { // 口语跟读
        content: '',
        value: '',
      },
    };
  },
  created() {
    this.identity = localStorage.getItem("identity");
    // this.getVideoLxing();
    this.t_id = localStorage.getItem("id");
    this.use_user = localStorage.getItem("identity");
    this.form.t_id = this.t_id;
    this.form.use_user = this.use_user;
    this.postIdentity();
    this.danxuanPostIdentity();
  },
  mounted() {},
  methods: {
    onSubmit() {
      this.isLoading = true;
      if (this.form.affiliation !== "" && this.form.name !== "") {
        if (this.form.affiliation == 0) {
          axios
            .get(
              `${BASE_URL}index/Addpaper/addtestpaperup?name=${
                this.form.name
              }&subordinate=${this.form.affiliation}&t_id=${
                this.form.t_id
              }&use_user=0`
            )
            .then(res => {
              if ((res.status === 200) & (res.data.code === "1")) {
                this.$message({ message: res.data.info, type: "success", duration: 1000});
                this.danxuanPostIdentity();
                this.isLoading = false;
              } else {
                this.$message({ message: res.data.info, type: "error", duration: 3000});
                this.isLoading = false;
              }
            });
        } else {
          axios
            .get(
              `${BASE_URL}index/Addpaper/addtestpaperup?name=${
                this.name
              }&subordinate=${this.form.affiliation}&t_id=${
                this.t_id
              }&use_user=${this.form.checkOne}`
            )
            .then(res => {
              if ((res.status === 200) & (res.data.code === "1")) {
                this.$message({
                  message: res.data.info,
                  type: "success",
                  duration: 1000
                });
                this.danxuanPostIdentity();
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
      } else {
        this.$message({
          message: "请将信息填写完整",
          type: "warning"
        });
        this.isLoading = false;
      }
    },
    postIdentity() { // 获取班级
      axios
        .get(
          `${BASE_URL}index/Addpaper/addtestpaper?id=${
            this.t_id
          }&identity=${this.use_user}`
        )
        .then(res => {
          if (res.status === 200 && res.data.code === "1") {
            this.form.classList = res.data.info;
            console.log("班级中的列表",this.form.classList);
          } else {
            this.$message({
              message: res.data.info,
              type: "error",
              duration: 1000
            });
          }
        });
    },
    changeAffiliatione() {
      this.form.affiliation_value = 1;
    },
    changeAffiliatitwo() {
      this.form.affiliation_value = 0;
    },
    // 创建课堂测试
    danxuanPostIdentity() {
      axios
        .get(
          `${BASE_URL}index/Addpaper/paperlst?id=${
            this.t_id
          }&identity=${this.use_user}`
        )
        .then(res => {
          if (res.status === 200 && res.data.code === "1") {
            console.log("this.res.data::", res.data.info);
            this.danxuanList = res.data.info;
          } else {
            this.$message({
              message: res.data.info,
              type: "error",
              duration: 1000
            });
          }
        });
    },
    danxuanonSubmit() {  // 新增单选题提交
      this.isLoading = true;
      // const check = [this.one, this.two, this.there, this.four];
      if(this.value == '') {
        this.$message({ message: "请选择试卷", type: "warning" });
        return false;
      };
      if(this.danxuanForm.name == '') {
        this.$message({ message: "请填写题目", type: "warning" });
        return false;
      };
      if(this.danxuanForm.yes == '') {
        this.$message({ message: "请填写正确答案", type: "warning"});
        return false;
      };
      axios
        .post(
          `${BASE_URL}index/Addpaper/theorydan`,qs.stringify({
            wenti: this.danxuanForm.name,
            count: [this.danxuanForm.one, this.danxuanForm.two, this.danxuanForm.there, this.danxuanForm.four],
            daan: this.danxuanForm.yes,
            t_id: this.value
          }))
        .then(res => {
          if (res.status === 200 & res.data.code === "1") {
            this.$message({
              message: res.data.info,
              type: "success",
              duration: 1000
            });
            // this.isLoading = false;
          } else {
            this.$message({
              message: res.data.info,
              type: "error",
              duration: 1000
            });
            // this.isLoading = false;
          }
        });
    },
    // 多选题新增。
    duoxuanonSubmit() {  // 多选题新增。
      this.isLoading = true;
      // const check = [this.one, this.two, this.there, this.four];
      if(this.duoxuanform.value == '') {
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
          `${BASE_URL}index/Addpaper/theoryduo`,qs.stringify({
            wenti: this.duoxuanform.name,
            count: [this.duoxuanform.one, this.duoxuanform.two, this.duoxuanform.there, this.duoxuanform.four],
            daan: this.duoxuanform.yes,
            t_id: this.duoxuanform.value
          }))
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
    // 判断题新增。
    panduanonSubmit() {
      this.isLoading = true;
      if (this.panduanform.name !== ''&& this.panduanform.radio !== ''&& this.panduanform.value !==''){
        axios
          .post(`${BASE_URL}index/Addpaper/addjudge`, qs.stringify({
            wenti: this.panduanform.name,
            daan: this.panduanform.radio,
            t_id: this.panduanform.value
          }))
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
    },
    async tiankongSubmit(){  // 新增填空题。
      const res = await this.$http.post( "index/Addpaper/addtiankong", qs.stringify({ 
        t_id: this.tiankongform.value, 
        wenti: this.tiankongform.name,
        daan: this.tiankongform.yes }) );
      if (res.status === 200 && res.data.code === "1") {
        this.$message({ message: res.data.info, type: "success", duration: 4000 });
      } else {
        this.$message({ message: res.data.info, type: "error", duration: 4000 });
      }
    },
    async xuanciSubmit(){  // 新增选词填空题
      const res = await this.$http.post( "index/Addpaper/addxuanci", qs.stringify({ 
        wenti: this.xuancuform.name,
        count: [this.xuancuform.one, this.xuancuform.two, this.xuancuform.there, this.xuancuform.four],
        daan: this.xuancuform.yes,
        t_id: this.xuancuform.value }) );
      if (res.status === 200 && res.data.code === "1") {
        this.$message({ message: res.data.info, type: "success", duration: 4000 });
      } else {
        this.$message({ message: res.data.info, type: "error", duration: 4000 });
      }
    },
    async pipeiSubmit(){ // 新增单词匹配
      const res = await this.$http.post( "index/Addpaper/addpipei", qs.stringify({ 
        wenti: this.pipeiform.name,
        count: this.pipeiform.beixuan,
        daan: this.pipeiform.yes,
        t_id: this.pipeiform.value }) );
      if (res.status === 200 && res.data.code === "1") {
        this.$message({ message: res.data.info, type: "success", duration: 4000 });
      } else {
        this.$message({ message: res.data.info, type: "error", duration: 4000 });
      }
    }
  }
};
</script>

<style  scoped>
@import '../../../assets/css/gloab.css';

.right {
  background-color: #fff;
  /* min-height: 100%; */
  overflow: hidden;
  box-sizing: border-box;
}
h2 {
  text-indent: 15px;
  margin-bottom: 10px;
  font-size: 20px;
  color: red;
}
.shower {
  display: block;
}
.hiddenen {
  display: none;
}
</style>
