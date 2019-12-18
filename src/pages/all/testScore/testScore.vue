<template>
  <div class="rights">
    
    <el-breadcrumb style="margin-bottom:10px;cursor: pointer;">
      <el-breadcrumb-item :to="{ path: '/paperJilu' }" class="daohang" v-if="identity == '1' ||identity == '0'" style="cursor: pointer;">返回上一页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/paperListbox' }" class="daohang" v-if="identity == '2'" style="cursor: pointer;">返回上一页</el-breadcrumb-item>
    </el-breadcrumb>
<!-- 
    <h3>一、判断题</h3>
    <div class="pd-box" v-for="(item, key, index) in panduan[0]">
      <p style="font-size:12px;margin-left:5px">本题得分：{{item.defen}}</p>
      <p>{{item.wenti}}</p>
      <p class="fs14">正确答案：{{item.daan == '1'? '正确':'错误'}}</p>
      <p class="fs14" :class="[item.yn ==  '错误'?'red':'blue']">你的答案：{{resolve(item)}}</p>
    </div>
    <h3>二、单选题</h3>
    <div class="dx-box" v-for="(item, key, index) in danxuan[0]">
      <p style="font-size:12px;margin-left:5px">本题得分：{{item.defen}}</p>
      <p>{{item.wenti}}</p>
      <p class="fs14">正确答案：{{item.daan}}</p>
      <p class="fs14" :class="[item.yn ==  '错误'?'red':'blue']">你的答案：{{item.user_daan}}</p>
    </div>
    <h3>三、多选题</h3>
    <div class="duox-box" v-for="(item, key, index) in lilunduo[0]">
      <p style="font-size:12px;margin-left:5px">本题得分：{{item.defen}}</p>
      <p>{{item.wenti}}</p>
      <p class="fs14">正确答案：{{item.daan}}</p>
      <p class="fs14" :class="[item.yn ==  '错误'?'red':'blue']">你的答案：{{item.user_daan}}</p>
    </div> -->

    <el-tabs type="border-card" style="min-height:600px;margin-bottom:20px">
        <el-tab-pane label="判断题" v-if="panduan[0] && panduan[0].length > 0">
          <div class="pd-box" v-for="(item, key, index) in panduan[0]">
            <p style="font-size:12px;margin-left:5px">本题得分：{{item.defen}}</p>
            <p>{{item.wenti}}</p>
            <p class="fs14">正确答案：{{item.daan == '1'? '正确':'错误'}}</p>
            <p class="fs14" :class="[item.yn ==  '错误'?'red':'blue']">你的答案：{{resolve(item)}}</p>
          </div>
        </el-tab-pane>

        <el-tab-pane label="单选题" v-if="danxuan[0] && danxuan[0].length > 0">
          <div class="dx-box" v-for="(item, key, index) in danxuan[0]">
            <p style="font-size:12px;margin-left:5px">本题得分：{{item.defen}}</p>
            <p>{{item.wenti}}</p>
            <p class="fs14">正确答案：{{item.daan}}</p>
            <p class="fs14" :class="[item.yn ==  '错误'?'red':'blue']">你的答案：{{item.user_daan}}</p>
          </div>
        </el-tab-pane>

        <el-tab-pane label="多选题" v-if="lilunduo && lilunduo[0].length > 0">
          <div class="duox-box" v-for="(item, key, index) in lilunduo[0]">
            <p style="font-size:12px;margin-left:5px">本题得分：{{item.defen}}</p>
            <p>{{item.wenti}}</p>
            <p class="fs14">正确答案：{{item.daan}}</p>
            <p class="fs14" :class="[item.yn ==  '错误'?'red':'blue']">你的答案：{{item.user_daan}}</p>
          </div>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id: '',
      radio: "1",
      danxuan: "",
      // 单选
      // lilundan: '',
      // 多选
      lilunduo: '',
      // 判断
      panduan: '',
      name: '',
      kaoShiId: '',
      identity: ''
    };
  },
  created() {
    let kaoShiId = localStorage.getItem("kaoShiId");
    this.kaoShiId = kaoShiId
    let identity = localStorage.getItem("identity");
    this.identity = identity
    this.getRouterData()
  },
  methods: {
    getRouterData(){
      // this.id = this.$route.params.id
      axios
        .post(`${BASE_URL}index/login/paperxiangqing`,{
          id: this.kaoShiId
        })
        .then(res => {
          if (res.status === 200 && res.data.code === "1") {
              console.log("this.res.data::",res.data.info)
              // res.data.info
              this.danxuan = res.data.info.danxuan;
              this.lilunduo = res.data.info.duoxuan;
              this.panduan = res.data.info.panduan;
              this.name = res.data.info.name
          } else {
            this.$message({
              message: res.data.info,
              type: "error",
              duration: 1000
            });
          }
        });
    },
    resolve(i){
      console.log("iiiii::",i)
      if(i.user_daan == ''){
        return '您未填写答案'
      } else if (i.user_daan == '1'){
        return '正确'
      } else {
        return '错误'
      }
    }
  }
};
</script>

<style scoped>
/* .el-main {
  height: 100%;
} */
.rights {
  min-height: 100%;
  overflow: hidden;
  box-sizing: border-box;
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
  border: 1px solid #409EFF;
  padding: 10px 15px;
}
.el-breadcrumb__inner .is-link {
  cursor: pointer;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner {
  cursor: pointer;
}
.fs14 {
  font-size: 14px;
  padding: 0 15px;
}
.red {
  color: red;
}
.blue {
  color: #409EFF;
}
.manfen {
  float: right;
  margin: 20px;
  font-size: 16px;
  color: red;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner {
  cursor: hand;
}
h2 {
  text-align: center;
  /* margin-bottom: 15px; */
  transform: translateY(-54px);
  font-size: 28px;
  height: 0;
  /* position: absolute;
  top: 0;
  left: 50%; */
}
h3 {
  margin: 15px 0;
}
/* p {
  margin: 5px 0;
} */
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
  border: 1px solid #409EFF;
  padding: 10px 15px;
  width: 80px;
  float: left;
  text-align: center;
  cursor: pointer;
}
.big {
  padding: 10px 20px;
  font-size: 20px;
}
.el-radio, .el-radio__input {
  white-space:normal; 
}
</style>