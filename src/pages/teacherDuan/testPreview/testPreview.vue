<template>
  <div class="rights">
    
    <el-breadcrumb  style="margin-bottom:10px;">
      <el-breadcrumb-item :to="{ path: '/testPaperList' }" class="daohang">返回上一页</el-breadcrumb-item>
      <!-- <el-breadcrumb-item :to="{ path: '/paperListbox' }" class="daohang" v-if="identity == '2'">返回上一页</el-breadcrumb-item> -->
    </el-breadcrumb>
    <h2>{{name}}</h2>

    <!-- <h3>一、判断题</h3>
    <div class="pd-box" v-for="(item, key, index) in panduan">
      <p>{{item.wenti}}</p>
      <p>正确答案：{{item.daan == '1'? '对':'错'}}</p>
    </div>

    <h3>二、单选题</h3>
    <div class="dx-box" v-for="(item, key, index) in lilundan">
      <p>{{item.wenti}}</p>
      <div class="xuanxiang" v-for=" (u,i) in item.xuanxiang[0]">
        <p>{{u}}</p>
      </div>
      <p>正确答案：{{item.daan}}</p>
    </div>

    <h3>三、多选题</h3>
    <div class="duox-box" v-for="(item, key, index) in lilunduo">
      <p>{{item.wenti}}</p>
      <div class="xuanxiang" v-for=" (u,i) in item.xuanxiang[0]">
        <p>{{u}}</p>
      </div>
      <p>正确答案：{{item.daan}}</p>
    </div> -->


    <el-tabs type="border-card" style="min-height:600px;margin-bottom:20px">
      <el-tab-pane label="判断题" v-if="panduan && panduan.length > 0">
        <div class="pd-box" v-for="(item, key, index) in panduan">
          <p>{{item.wenti}}</p>
          <p>正确答案：{{item.daan == '1'? '对':'错'}}</p>
        </div>
      </el-tab-pane>

      <el-tab-pane label="单选题" v-if="lilundan && lilundan.length > 0">
        <div class="dx-box" v-for="(item, key, index) in lilundan">
          <p>{{item.wenti}}</p>
          <div class="xuanxiang" v-for=" (u,i) in item.xuanxiang[0]">
            <p>{{u}}</p>
          </div>
          <p>正确答案：{{item.daan}}</p>
        </div>
      </el-tab-pane>

      <el-tab-pane label="多选题" v-if="lilunduo && lilunduo.length > 0">
        <div class="duox-box" v-for="(item, key, index) in lilunduo">
          <p>{{item.wenti}}</p>
          <div class="xuanxiang" v-for=" (u,i) in item.xuanxiang[0]">
            <p>{{u}}</p>
          </div>
          <p>正确答案：{{item.daan}}</p>
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
      danxuan: "1",
      // 单选
      lilundan: '',
      // 多选
      lilunduo: '',
      // 判断
      panduan: '',
      name: '',
      yulanId: '',
      identity: ''
    };
  },
  created() {
    let yulanId = localStorage.getItem("yulanId");
    this.yulanId = yulanId
    
    this.getRouterData()
  },
  methods: {
    getRouterData(){
      // localStorage.setItem('identity', this.$route.params.id)
      // this.id = this.$route.params.id
      axios
        .post(`${BASE_URL}index/Addpaper/extractpaper?id=${this.yulanId}`)
        .then(res => {
          if (res.status === 200 && res.data.code === "1") {
              console.log("this.res.data::",res.data.info)
              // res.data.info
              this.lilundan = res.data.info.lilundan;
              this.lilunduo = res.data.info.lilunduo;
              this.panduan = res.data.info.panduan;
              this.name = res.data.info.name
              console.log(this.lilundan)
              console.log(this.lilunduo)
              console.log(this.panduan)
              console.log(this.name)
          } else {
            this.$message({
              message: res.data.info,
              type: "error",
              duration: 1000
            });
          }
        });
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
  box-sizing: border-box;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner {
  cursor: hand;
}
h2 {
  text-align: center;
  transform: translateY(-54px);
  font-size: 28px;
  height: 0;
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
</style>