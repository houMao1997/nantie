<template>
  <div class="rights">
    <div class="gonggaoBox" >
      <div class="block">
    <el-timeline>
      <el-timeline-item  placement="top" v-for="(item, key, index) in notice" :key="key">
        <el-card>
          <el-divider ><span style="font-size:25px;font-weight:bold;">{{item.name}}</span></el-divider> 
          <p style="text-align:center;font-size:12px;margin-top:40px">{{item.addtime}}</p>
          <hr>
            <img :src="getImgUrl(item.url)" class="image" style="height:300px;width:50%;text-align:center;margin-top:20px;margin-left:25%" v-if="item.url !==''"/>
          <p style="font-size:16px;letter-spacing:3px;width:100%;line-height: 30px;text-indent:2em" v-html="item.count"></p>
          <!-- {{item.count}} -->
          <el-divider  content-position="right"><span style="font-size:18px;font-weight:bold;">发布老师：{{item.nickname}}</span></el-divider> 
        </el-card>
      </el-timeline-item>
    
  </el-timeline>
</div>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      t_id: '',
      use_user: '',
      notice: '',
      mrUrl: BASE_URL,
    };
  },
  created() {
    let t_id = localStorage.getItem("id");
    let use_user = localStorage.getItem("identity");
    this.t_id = t_id;
    this.use_user = use_user;
    this.getInfo()
  },
  methods: {
    getImgUrl(icon){
      return `${this.mrUrl}${icon}`;
    },
    getInfo(){
      axios
        .post(
          `${BASE_URL}index/login/noticelst`,{
            u_id: this.t_id,
          })
        .then(res => {
          if (res.status === 200 & res.data.code === "1") {
            this.notice = res.data.info
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
.gonggaoBox {
  /* padding: 20px 20px; */
  /* padding-top: 0; */
  /* margin: 20px 0; */
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
  /* padding: 20px; */

}
.gonggaoBox .ggtitle {
  font-size: 26px;
  font-weight: 700;
  /* text-align: center; */
}
.gonggaoBox .ggtime {
  font-size: 14px;
  color: #666;
  /* margin-bottom: 20px; */
  float: right;
}
.gonggaoBox p {
  text-indent: 2em;
  margin: 20px 0;
}
.gonggaoBox .image {
  /* height: 300px;
  width: 500px; */
  margin-bottom: 20px;
}
.gonggaoBox .ggname {
  font-size: 14px;
  text-indent: 0.5em;
}
</style>