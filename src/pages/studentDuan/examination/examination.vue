<template>
  <div class="rights">
    <el-breadcrumb>
      
      <div class="daohang" @click="goback">返回上一页</div>
      <span class="manfen">此试卷满分：100分</span>
    </el-breadcrumb>
    <h2>{{name}}</h2>
      <el-tabs type="border-card" style="min-height:600px;">
        <el-tab-pane label="判断题" v-if="items.panduan && items.panduan.length > 0">
          <div class="pd-box" v-for="(item, keye, index) in panduan">
            <p class="font16 martb10">{{item.wenti}}</p>
            <el-radio v-model="item.yn" label="1">对</el-radio>
            <el-radio v-model="item.yn" label="0">错</el-radio>
          </div>
        </el-tab-pane>

        <el-tab-pane label="单选题" v-if="items.lilundan && items.lilundan.length > 0">
          <div class="dx-box font16" v-for="(item, keye) in lilundan">
            <p class="font16 martb10">{{item.wenti}}</p>
            <div class="xuanxiang " v-for=" i in item.xuanxiang[0]">
              <el-radio v-model="item.yn" :label="i" class="font16 martb10">{{i}}</el-radio>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="多选题" v-if="items.lilunduo && items.lilunduo.length > 0">
          <div class="duox-box " v-for="(item, keye) in lilunduo">
            <p class="font16 martb10">{{item.wenti}}</p>
            <el-checkbox-group v-model="item.yn" v-for="(u,i) in item.xuanxiang[0]" :key="i">
              <el-checkbox :label='u' class="font16 martb10">{{u}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-tab-pane>
      </el-tabs>
    <el-button type="primary" @click="submitDaan" class="big" :loading="isLoading" style="margin-top:20px">交卷</el-button>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      isLoading: false,
      items: '',
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
      radio:'',
      t_id: '',
      use_user: '',
      kaoshiId: '',
      lianxianDaan: '',
      lianxian: '',
      lianxianGuanlian: [],
      liaxianLeft: [],
      rightList: [],

      time: '点击说话(60秒)',
      num: 60, // 点击说话时间
      recorder: null,
      interval: '',
      startTime: '', // 语音开始时间
      endTime: '', // 语音结束
      count: '',
      isLogin: false,
      wavUrl: '',
      videoSrc: '',
      yuyinList: [],
    };
  },
  created() {
    let t_id = localStorage.getItem("id");
    let use_user = localStorage.getItem("identity");
    this.t_id = t_id;
    this.use_user = use_user;
    let kaoshiId = localStorage.getItem("kaoshiId");
    this.kaoshiId = kaoshiId;
    this.getRouterData();
    // $(".el-main").css("background-color","transparent");
  },
  mounted(){
    // $(".el-main").css("background-color","transparent");
    
  },
  updated () {
  
  },

  methods: {
    getRouterData(){
      axios
        .post(`${BASE_URL}index/Addpaper/extractpaper?id=${this.kaoshiId}`)
        .then(res => {
          if (res.status === 200 && res.data.code === "1") {
            this.items = res.data.info;
            this.lilundan = res.data.info.lilundan;
            this.lilunduo = res.data.info.lilunduo;
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
    submitDaan(){
      this.isLoading = true;
      let panduan = JSON.stringify(this.panduan); 
      let lilunduo = JSON.stringify(this.lilunduo);
      let lilundan = JSON.stringify(this.lilundan);
      let t_id = this.kaoshiId;
      let u_id = this.t_id;
      let data=qs.stringify({
          panduan: panduan,
          lilunduo: lilunduo,
          lilundan: lilundan,
          t_id: t_id,
          u_id: u_id
      })
      axios({
          url: `${BASE_URL}index/Addpaper/pengyong`,
          method: 'post',
          headers: {
              'deviceCode': 'A95ZEF1-47B5-AC90BF3',
          },
          data: data
      })
      .then(res => {
        if (res.status === 200 && res.data.code === "1") {
            this.$message({
              message: res.data.info,
              type: "success",
              duration: 3000
            });
            this.isLoading = false;
            this.$router.go(-1);
        } else {
          this.$message({
            message: res.data.info,
            type: "error",
            duration: 3000
          });
        }
      });
    },
    goback(){
      this.$router.go(-1);
    },
    test(){
      console.log("123");
    },
    left(key){ return `L${key + 1}`;},
    right(key){ return `R${key + 1}`;},
    clearTimer () {
      if (this.interval) {
        this.num = 60
        clearInterval(this.interval)
      }
    },
    mouseStart (e) {
      // e.preventDefault()
      // this.form.time = "请开始口语表达";
      this.clearTimer()
      this.startTime = new Date().getTime()
      recording.get((rec) => {
        // 当首次按下时，要获取浏览器的麦克风权限，所以这时要做一个判断处理
        if (rec) {
          // 首次按下，只调用一次
          if (this.flag) {
            this.mouseEnd()
            this.flag = false
          } else {
            console.log(rec)
            this.recorder = rec
            this.interval = setInterval(() => {
              if (this.num <= 0) {
                this.recorder.stop()
                this.num = 60
                this.clearTimer()
              } else {
                this.num--
                this.time = '点击结束（' + this.num + '秒）'
                this.recorder.start()
              }
            }, 1000)
          }
        }
      })
    },
    mouseEnd (e) {
      // e.preventDefault()
      // this.form.time = "点击说话(60秒)";
      this.clearTimer()
      this.endTime = new Date().getTime()
      if (this.recorder) {
        this.recorder.stop()
        // 重置说话时间
        this.num = 60
        // this.time = '点击说话（' + this.num + '秒）'
        this.time = '点击说话(60秒)'
        // 获取语音二进制文件
        let bold = this.recorder.getBlob()
        console.log(bold)
        // 将获取的二进制对象转为二进制文件流
        let files = new File([bold], 'test.wav', {type: 'audio/wav', lastModified: Date.now()})
        let fd = new FormData()
        fd.append('file', files)
        console.log(fd)
        // fd.append('tenantId', 3) // 额外参数，可根据选择填写
        // 这里是通过上传语音文件的接口，获取接口返回的路径作为语音路径
        this.$http({
          header: ({'Content-Type': 'application/x-www-form-urlencodeed'}),
          method: 'POST',
          url: 'admin/paper/updatafile',
          data: fd,
          withCredentials: false,
        }).then((res) => {
          console.log(res)
          //  这里做登录拦截
          if (res.status === 200 && res.data.code === "1") {
            this.wavUrl = res.data.info;
            this.videoSrc = `${BASE_URL}${this.wavUrl}`;
            console.log("成功res:",res);
            // this.$message({ message: res.data.info, type: "success", duration: 4000 });
          } else {
            console.log("失败res",res);
            // document.write("上传未成功",res)
            // this.$message({ message: res.data.info, type: "error", duration: 4000 });
          }
        });
      }
    },
  },
  beforeDestroy() {
    // console.log("结束打印一下");
    // $(".el-main").css("background-color","#f8f8f8");
  },
  
};
</script>

<style scoped>
.el-main {
  height: 100%;
  font-size: 16px;
}
.rights {
  min-height: 100%;
  /* background-color: #fff; */
  box-sizing: border-box;
  padding: 10px;
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
  transform: translateY(-54px);
  font-size: 28px;
  height: 0;
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