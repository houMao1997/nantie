<template>
  <div class="bigbox">
    <!-- 标题. -->
    <div class="header">
      <div class="content-title">
        <div class="title-tit">南京铁道职业技术学院</div>
        <div class="title-dl" @click="toLogin">前往登录</div>
      </div>
    </div>
    <!-- banner -->
    <div class="banner">
      <div class="imgbox">
        <img class="" src="http://ntt.chinadingao.com/uploads/20190606/c00fa390f76ca77de1f2f8bf6f549ca.jpg"></img>
      </div>
      <div class="banner-ri">
        <div class="tit">轨道交通行业英语</div>
        <div class="ri-content">
          <div class="ri-cont-tit" style="width: 550px;">南京铁道职业技术学院是经江苏省人民政府批准成立、教育部备案的一所省属公办专科层次的全日制普通高校，是江苏省省级示范性高职院校、江苏省高水平高职院校建设单位、国家优质高等职业院校。学校前身是创建于1941年的南京特别市立第一职业中学，1955年起更名为南京铁路运输学校，长期隶属铁道部管理。2002年学校升格为高等职业技术学院，更名为南京铁道职业技术学院，2004年成建制由铁道部划转江苏省地方管理。</div>
          <div class="ri-cont-tit" style="font-size: 14px;">
            <!-- <span>开课时间： 开课时间未定</span> -->
            <span></span>
          </div>
          <!-- <div class="ri-cont-tit" style="font-size: 14px;">学时安排： 待定</div> -->
        </div>
        <div class="ri-c">已有{{paperNum}}人参加</div>
      </div>
    </div>
    <!-- 主体内容 -->
    <div class="zhuti">
      <div class="zt-left">
        <div class="zt-le-tit">
          <div class="zt-le-tit-txt">《轨道交通行业英语》紧密结合轨道交通实际工作，涉及铁路发展、城市轨道交通、机车车辆、高速铁路、青藏铁路、磁悬浮铁路、铁路客货运服务等方面内容，在听、说、读、写、译各方面开展有针对性的教学活动，适用于轨道交通类职业院校学生培养和提高轨道交通职场英语应用能力。</div>
          <div class="zt-le-tit-foot" style="font-size: 16px;text-align: right;margin-top: 15px;">—— 课程团队</div>
        </div>
        <div class="zt-left-cont" style="margin-top: 30px;">课程概述</div>
        <div class="zt-left-txt" style="text-indent: 2em;margin-bottom: 60px;">轨道交通行业英语以大学英语基础知识为依托，以《轨道交通行业英语》 教材为教学内容的主要载体，教学内容与学生未来的轨道交通实际工作场景和交流紧密结合，包括世界铁路发展、城市轨道交通、机车车辆、高速铁路、青藏铁路、磁悬浮铁路、铁路客货运服务等，在听、说、读、写、译各方面开展有针对性的教学活动，全面提高学生在轨道交通职场中的英语应用能力，同时让学生通过在线课程自主阅读有关轨道交通英语的丰富的文献等内容，强化高职高专英语教学的实用性和职业特征。</div>
        <div class="zt-left-cont" >授课目标</div>
        <div class="zt-left-txt" style="text-indent: 2em;margin-bottom: 60px;">掌握铁路客运英语和职场交流用语，能用英语解答在轨道交通运营中的自动检票机、自动售票机、补票、列车晚点、行车安全注意事项、乘客乘车导向等问题。掌握轨道交通行业主要术语、标识，读懂有关轨道交通行业英语安全的文本，能读懂和翻译轨道交通行业相关英文产品说明书、技术规格和设备维修手册等。</div>
        <div class="zt-left-cont">成绩要求</div>
        <div class="zt-left-txt" style="text-indent: 2em;margin-bottom: 60px;">完成本课程线上线下教学环节，总分达到60分获得合格证书。</div>
        <div class="zt-left-cont">预备知识</div>
        <div class="zt-left-txt" style="text-indent: 2em;margin-bottom: 60px;">掌握的英语词汇量应达到约4000个单词，能基本读懂一般性题材的英文文章，阅读速度达到每分钟60词；在快速阅读篇幅较长、难度略低的材料时，阅读速度达到每分钟80词；能就阅读材料进行略读和寻读；能借助词典阅读本专业的英语教材和题材熟悉的英文报刊文章，掌握中心大意，理解主要事实和有关细节；能读懂工作、生活中常见的应用文体的材料；能在阅读中使用有效的阅读方法。</div>
      </div>
      <div class="zt-right">
        <div class="zt-right-imgbox">
          <img src="http://ntt.chinadingao.com/uploads/20190606/bd0813dcbea42269e32541d499af05a.png" alt="">
        </div>
        <div class="zt-ri-tit">
          5位授课老师
        </div>
        <div class="zt-ri-techer">
          <img src="http://ntt.chinadingao.com/uploads/20190606/d2f536028ec373fa87e8485fca05a90.jpg" alt="">
          <div class="people">
            <div class="name">吴宝明</div>
            <div class="name-zhushi">国际教育学院院长，外语教学部主任，副教授</div>
          </div>
          
        </div>
        <div class="zt-ri-techer">
          <img src="http://ntt.chinadingao.com/uploads/20190606/e66e25686b78bd3e9a083fbd9b5a458.png" alt="">
          <div class="people">
            <div class="name">袁园</div>
            <div class="name-zhushi">副教授</div>
          </div>
        </div>
        <div class="zt-ri-techer">
          <img src="http://ntt.chinadingao.com/uploads/20190606/e846cc2e382edbefcba30f6a63753b2.jpg" alt="">
          <div class="people">
            <div class="name">郭祯</div>
            <div class="name-zhushi">讲师</div>
          </div>
        </div>
        <div class="zt-ri-techer">
          <img src="http://ntt.chinadingao.com/uploads/20190606/93c9b0d1fd0ef6e529263a8d873cb17.jpg" alt="">
          <div class="people">
            <div class="name">杨张婕</div>
            <div class="name-zhushi">讲师</div>
          </div>
        </div>
        <div class="zt-ri-techer">
          <img src="http://ntt.chinadingao.com/uploads/20190606/95a745b060c0bbfdd706cf562eeed29.jpg" alt="">
          <div class="people">
            <div class="name">吴春红</div>
            <div class="name-zhushi">副教授</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      paperNum: '',
    };
  },
  created() {
    this.getList()
  },
  computed: {
    
  },
  methods: {
    toLogin(){
      this.$router.push('/login')
    },
    getList() {
      this.isLoading = true;
      if (this.type == "") {
        this.type = "1";
      }
      axios
        .post(`${BASE_URL}index/login/userlst`,qs.stringify( {
          type: "1",
          currentpage:1,
          name:"",
        }))
        .then(res => {
          if (res.status === 200 && res.data.code === "1") {
            // this.list = res.data.info.data;
            this.paperNum = res.data.info.pageinfo.sum
            // this.pagesize=parseInt(res.data.info.pageinfo.page)
            // this.isLoading = false;
          } else {
          }
        });
      
    },
  }
};
</script>

<style scoped>
.bigbox {
  width: 1200px;
  margin: 0 auto;
  padding-top: 50px;
  /* background-color: rgb(245, 245, 245); */
  
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #2e323e;
}
.content-title {
  height: 50px;
  width: 1200px;
  -webkit-border-radius: 0px;
  -moz-border-radius: 0px;
  border-radius: 0px;
  clear: none;
  display: block;
  min-width: 0px;
  color: black;
  font-size: 16px;
  margin: 0px auto;
  padding: 0px;
  line-height: 50px;
  color: #ffffff;
}
.content-title .title-tit {
  float: left;
  font-size: 28px;
  /* color: #ffffff; */
  margin-left: 41px;
}
.content-title .title-dl {
  float: right;
  cursor: pointer;
}
.content-title .title-tit:hover {
  color: rgb(85,185,41)
}
.content-title .title-dl:hover {
  color: rgb(85,185,41)
}

.banner {
  height: 288px;
  margin-top: 30px;
}
.banner .imgbox {
  width: 510px;
  height: 100%;
  /* background-color: lime; */
  float: left;
  margin-left: 41px;
}
.banner .imgbox image {
  height: 100%;
  width: 100%;
  display: inline-block;
}
.banner .banner-ri {
  float: left;
  margin-left: 30px;
  
}
.banner .banner-ri .tit {
  font-size: 24px;
  color: #333333;
  margin-right: 6px;
  height: 46px;
  line-height: 46px;
}
.banner .banner-ri .ri-content {
  padding: 5px 10px 15px 20px;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  background-color: rgb(245, 245, 245);
  box-sizing: border-box;
}
.banner .banner-ri .ri-content .ri-cont-tit {
  font-size: 14px;
  color: #333333;
  padding: 10px 0 10px 0;
  box-sizing: border-box;
}
.banner .banner-ri .ri-c {
  font-size: 14px;
  color: #333333;
  padding: 10px 0 10px 0;
}
.zhuti {
  
  background-color: rgb(245, 245, 245);
}
.zhuti .zt-left {
  color: rgb(51, 51, 51);
  display: block;
  font-size: 12px;
  font-stretch: 100%;
  font-weight: 400;
  line-height: 18px;
  outline-color: rgb(51, 51, 51);
  outline-style: none;
  padding-bottom: 1px;
  padding-left: 41px;
  padding-right: 41px;
  padding-top: 30px;
  width: 808px;
  background-color: #fff;
  float: left;
}
.zhuti .zt-left .zt-left-cont {
  color: rgb(51, 51, 51);
  display: block;
  font-family: "Microsoft YaHei", 微软雅黑, Helvetica, sans-serif;
  font-size: 18px;
  font-stretch: 100%;
  font-style: normal;
  font-variant-caps: normal;
  font-variant-east-asian: normal;
  font-variant-ligatures: normal;
  font-variant-numeric: normal;
  font-weight: 700;
  height: 28.6406px;
  line-height: 27px;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
  outline-color: rgb(51, 51, 51);
  outline-style: none;
  outline-width: 0px;
  padding-bottom: 10px;
}
.zhuti .zt-left .zt-left-txt {
  color: rgb(102, 102, 102);
  font-family: 宋体;
  font-size: 21px;
  line-height: 22px;
  text-indent: 2em !important;
}
.zhuti .zt-left .zt-le-tit {
  background-color: rgb(245, 248, 244);
  color: rgb(51, 51, 51);
  display: block;
  font-size: 14px;
  font-stretch: 100%;
  font-style: normal;
  font-variant-caps: normal;
  font-variant-east-asian: normal;
  font-variant-ligatures: normal;
  font-variant-numeric: normal;
  font-weight: 400;
  height: 97px;
  line-height: 18px;
  margin-bottom: 48px;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
  outline-color: rgb(51, 51, 51);
  outline-style: none;
  outline-width: 0px;
  padding-bottom: 20px;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 30px;
}
.zhuti .zt-right {
  padding-top: 30px;
  color: rgb(51, 51, 51);
  display: block;
  font-size: 12px;
  font-stretch: 100%;
  font-weight: 400;
  height: 495px;
  line-height: 18px;
  outline-color: rgb(51, 51, 51);
  outline-style: none;
  text-align: center;
  width: 295px;
  float: right;
}
.zhuti .zt-right .zt-right-imgbox {
  border-bottom-color: rgb(230, 230, 230);
  border-bottom-style: solid;
  border-bottom-width: 1px;
  color: rgb(0, 0, 238);
  cursor: pointer;
  display: inline-block;
  height: 82px;
  line-height: 18px;
  padding-bottom: 20px;
  text-decoration-color: rgb(0, 0, 238);
  text-decoration-line: none;
  text-decoration-style: solid;
  width: 236px;
}
.zhuti .zt-right .zt-ri-tit {
  border-left-color: rgb(86, 185, 41);
  border-left-style: solid;
  border-left-width: 4px;
  color: rgb(51, 51, 51);
  font-size: 18px;
  height: 18px;
  line-height: 18px;
  margin-bottom: 30px;
  margin-left: 27px;
  margin-right: 27px;
  margin-top: 30px;
  outline-color: rgb(51, 51, 51);
  outline-style: none;
  padding-left: 10px;
  text-align: left;
  width: 227px;
}
.zt-ri-techer {
  background-attachment: scroll;
  cursor: pointer;
  font-size: 12px;
  font-weight: 400;
  height: 64.5938px;
  line-height: 18px;
  margin-bottom: 30px;
  text-align: left;
  text-decoration-color: rgb(0, 0, 238);
  width: 241px;
  padding: 0 27px;
}
.zt-ri-techer img {
  width: 57px;
  height: 57px;
  border-radius: 50%;
  cursor: pointer;
  display: block;
  float: left;
  height: 55px;
  line-height: 18px;
  text-align: left;
}
.zt-ri-techer .people {
  cursor: pointer;
  display: block;
  float: left;
  height: 54.5938px;
  line-height: 18px;
  margin-left: 12px;
  text-align: left;
  width: 167px;
  padding-top: 5px;
}
.zt-ri-techer .people:hover {
  color: rgb(85,185,41)
}
</style>
