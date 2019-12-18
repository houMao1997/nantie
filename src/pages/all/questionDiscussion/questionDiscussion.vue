<template>
  <div class="rights">
    
    <!-- 新增讨论 -->
    <div class="gonggaoBox" v-for="(item, key, id) in info">
       <span style="font-size:25px;font-weight:bold;">{{item.name}}</span>
        <p style="font-size:14px;">添加时间：{{item.addtime}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发布老师：{{item.nickname}}</p>
      
        <hr>
      <!-- <div class="ggtime">添加时间：{{item.addtime}}</div> -->
      <p style="font-size:16px;letter-spacing:2px;width:100%;line-height:20px;text-indent:2em">{{item.count}}</p>
        <p style="cursor:pointer;color:rgb(64, 158, 255);float:right"  @click="item.flag == 1? item.flag = 0: item.flag =1"><span v-if="item.flag ==1">收起评论</span><span v-if="item.flag ==0">展开评论</span></p>
      <hr>
      <!-- <el-divider content-position="right">添加时间：{{item.addtime}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发布老师：{{item.nickname}}</el-divider> -->
     
      <!-- 评论渲染 -->
      <div v-if="item.flag == 1">
        <div class="" style="border-bottom: 1px dashed #999;" v-for="(i, key, index) in item.comment[0]">
        <div class="pingl">
          <i style="font-size:25px;" class="el-icon-user-solid"></i>
          <span style="color: #409EFF">{{i.nickname}}</span>
          <p style="margin-left:30px">{{i.count}}（{{i.addtime}}）</p>
        </div>
       
      </div>
      <el-button type="button" @click="open(item.id)" style="float: right;margin-top: 10px">点击评论</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      use_user: "",
      t_id: "",
      info: '',
      d_id: '',
      isshow:false,
      sofs:"收起"
    };
  },
  created() {
    let t_id = localStorage.getItem("id");
    let use_user = localStorage.getItem("identity");
    this.t_id = t_id;
    this.use_user = use_user;
    this.getItem()
  },
  methods: {
     change:function(){
                this.isshow=!this.isshow,
                this.sofs = "查看"

                },
    // 提交新增的讨论
    open(id) {
      // console.log(id)
      this.d_id = id
      this.$prompt('', '请输入评论内容', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        // if(value == ''){
        //   this.$message({
        //     message: "评论内容不能为空",
        //     type: "warning"
        //   });
        //   return false;
        // }
        axios
          .post(
            `${BASE_URL}index/login/commentadd`,{
              d_id: this.d_id,
              count: value,
              u_id: this.t_id,
              identity: this.use_user
            })
          .then(res => {
            if (res.status === 200 & res.data.code === "1") {
              this.$message({
                type: 'success',
                message: res.data.info,
              });
              this.getItem()
            } else {
              this.$message({
                message: res.data.info,
                type: "error",
                duration: 1000
              });
            }
          });
      }).catch(() => {});
    },
    getItem(){
      axios
        .post(
          `${BASE_URL}index/login/discusslst`,{
            u_id: this.t_id,
            identity: this.use_user,
          })
        .then(res => {
          if (res.status === 200 & res.data.code === "1") {
            for (let index = 0; index < res.data.info.length; index++) {
              res.data.info[index].flag = 1;
            }
            this.info = res.data.info
            console.log(this.info)
          } else {
            this.$message({
              message: res.data.info,
              type: "error",
              duration: 1000
            });
          }
        });
    },

  }
};
</script>

<style scoped>
.gonggaoBox {
  padding: 20px 20px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  margin-bottom: 20px;
}
.gonggaoBox .ggtitle {
  font-size: 26px;
  font-weight: 700;
  /* background-color: #fff;
  margin-bottom: 10px; */
  /* text-align: center; */
}
.gonggaoBox .ggtime {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
  float: right;
}
.gonggaoBox p {
  /* text-indent: 2em; */
  margin: 10px 0;
}
.gonggaoBox .ggname {
  font-size: 14px;
  text-indent: 0.5em;
  border-bottom: 1px solid #666;
  padding-bottom: 10px;
}
.gonggaoBox .pingl {
  margin-top: 10px;
  font-size: 14px;
  color: #333;
}
.gonggaoBox .pinglTime {
  font-size: 12px;
  color: #666;
  padding: 5px 0;
  text-indent: 1em;
}
.rights {
  padding: 0;
  background-color: #F0F3F8;
  box-sizing: border-box;
  overflow: hidden;
}
</style>