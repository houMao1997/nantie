<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div style="height: 60px;width: 180px;background-color: #172850;transform: translateX(-20px);float:left">
        <img src="../assets/image/logo.png" alt="" class="title-leftt-img">
      </div>
      蓝鸽语言学科平台
      <div>
        <a href="javascript:;" class="logout" @click="logout">退出登录
          <!-- <i class="el-icon-delete"></i> -->
        </a>
      </div>
    </el-header>
    <el-container>
      <!-- 教师端的侧边栏。 -->
      <el-aside width="180px" v-if="this.use_user == 0">
        <el-row class="tac">
          <el-menu
            :default-active="activerouter"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#172850"
            text-color="#fff"
            :router="true"
            active-text-color="#409EFF"
          >
          <!-- active-text-color="#ffd04b" -->
          
            <el-menu-item index="home">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="creatTeacherId">
              <i class="el-icon-document-checked"></i>
              <span slot="title">新增教师</span>
            </el-menu-item>
            <el-menu-item index="creatClass">
              <i class="el-icon-office-building"></i>
              <span slot="title">创建班级</span>
            </el-menu-item>
            <el-menu-item index="classList">
              <i class="el-icon-notebook-1"></i>
              <span slot="title">班级列表</span>
            </el-menu-item>
            <el-menu-item index="testPaperList">
              <i class="el-icon-document-copy"></i>
              <span slot="title">试卷列表</span>
            </el-menu-item>
            <el-menu-item index="newPaper">
              <i class="el-icon-reading"></i>
              <span slot="title">新建试卷</span>
            </el-menu-item>
            <el-menu-item index="paperJilu">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">考试记录</span>
            </el-menu-item>
            <el-menu-item index="addAnnouncement">
              <i class="el-icon-document"></i>
              <span slot="title">新建公告</span>
            </el-menu-item>
            <el-menu-item index="questionDiscussion">
              <i class="el-icon-question"></i>
              <span slot="title">问题讨论</span>
            </el-menu-item>
            <el-menu-item index="AddDiscussion">
              <i class="el-icon-tickets"></i>
              <span slot="title">新建讨论</span>
            </el-menu-item>
            <el-menu-item index="adminLookVideo">
              <i class="el-icon-video-play"></i>
              <span slot="title">视频学习</span>
            </el-menu-item>
            <el-menu-item index="file">
              <i class="el-icon-upload"></i>
              <span slot="title">上传视频</span>
            </el-menu-item>
            <el-menu-item index="learningState">
              <i class="el-icon-pie-chart"></i>
              <span slot="title">学习时间</span>
            </el-menu-item>
            <!-- <el-menu-item index="teacherChart">
              <i class="el-icon-data-line"></i>
              <span slot="title">图表分析</span>
            </el-menu-item> -->
            <el-menu-item index="studentChart">
              <i class="el-icon-data-line"></i>
              <span slot="title">图表分析</span>
            </el-menu-item>
<!--             
            <el-menu-item index="testPaper">
              <i class="el-icon-data-line"></i>
              <span slot="title">试卷分析</span>
            </el-menu-item> -->
          <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>试卷分析</template>
          <el-menu-item-group>
            <el-menu-item index="testPaper">单选题</el-menu-item>
            <el-menu-item index="testPaperduo">多选题</el-menu-item>
            <el-menu-item index="testPaperpan">判断题</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
            <!-- <el-submenu index="1">
              <template slot="title">
                <span>试题相关</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="newPaper">
                  <i class="el-icon-menu"></i>新建试卷
                </el-menu-item>
                <el-menu-item index="panduan">
                  <i class="el-icon-menu"></i>新建判断
                </el-menu-item>
                <el-menu-item index="danxuan">
                  <i class="el-icon-menu"></i>新建单选
                </el-menu-item>
                <el-menu-item index="duoxuan">
                  <i class="el-icon-menu"></i>新建多选
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu> -->
            <!-- <el-menu-item index="videoClassify">
              <i class="el-icon-video-camera"></i>
              <span slot="title">新增视频类型</span>
            </el-menu-item> -->
          </el-menu>
        </el-row>
      </el-aside>
      <!-- 学生端的侧边栏。 -->
      <el-aside width="180px" v-if="this.use_user == 1">
        <el-row class="tac">
           
          <el-menu
            :default-active="activerouter"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#172850"
            active-text-color="#409EFF"
            text-color="#fff"
            :router="true"
          >
          <!-- active-text-color="#ffd04b" -->
            <el-menu-item index="home">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="announcementShows">
              <i class="el-icon-document"></i>
              <span slot="title">公告展示</span>
            </el-menu-item>
            <el-menu-item index="testPaperList">
              <i class="el-icon-document-copy"></i>
              <span slot="title">试卷列表</span>
            </el-menu-item>
            <el-menu-item index="paperJilu">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">考试记录</span>
            </el-menu-item>
            <el-menu-item index="lookVideo">
              <i class="el-icon-video-play"></i>
              <span slot="title">视频学习</span>
            </el-menu-item>
            <el-menu-item index="learningState">
              <i class="el-icon-pie-chart"></i>
              <span slot="title">学习时间</span>
            </el-menu-item>
            <el-menu-item index="studentChart">
              <i class="el-icon-data-line"></i>
              <span slot="title">图表分析</span>
            </el-menu-item>
            <el-menu-item index="questionDiscussion">
              <i class="el-icon-question"></i>
              <span slot="title">问题讨论</span>
            </el-menu-item>
            <!-- <el-submenu index="testPaper">
              <template slot="title">
                <i class="el-icon-school"></i>
                <span>试卷分析</span>
              </template> -->
              <!-- <el-menu-item-group>
                <el-menu-item index="danxuan">
                  <i class="el-icon-document"></i>单选题
                </el-menu-item>
              </el-menu-item-group>
               <el-menu-item-group>
                <el-menu-item index="duoxuan">
                  <i class="el-icon-document"></i>多选题
                </el-menu-item>
              </el-menu-item-group>
               <el-menu-item-group>
                <el-menu-item index="panduan">
                  <i class="el-icon-document"></i>判断题
                </el-menu-item>
              </el-menu-item-group> -->
             <!-- </el-submenu> -->

          </el-menu>
        </el-row>
      </el-aside>
      <!-- 管理员的侧边栏 -->
      <el-aside width="180px" v-if="this.use_user == 2">
        <el-row class="tac">
          <el-menu
            :default-active="activerouter"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#172850"
            text-color="#fff"
            active-text-color="#409EFF"
            :router="true"
          >
          <!-- active-text-color="#ffd04b" -->
            <el-menu-item index="home">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="management">
              <i class="el-icon-folder-opened"></i>
              <span slot="title">账号管理</span>
            </el-menu-item>
             <el-menu-item index="classLists">
              <i class="el-icon-tickets"></i>
              <span slot="title">班级列表</span>
            </el-menu-item>
            <el-menu-item index="videoStatistics">
              <i class="el-icon-video-camera"></i>
              <span slot="title">视频统计</span>
            </el-menu-item>
            <el-menu-item index="paperListbox">
              <i class="el-icon-tickets"></i>
              <span slot="title">成绩统计</span>
            </el-menu-item>
            
            <el-menu-item index="adminLookVideo">
              <i class="el-icon-video-play"></i>
              <span slot="title">视频学习</span>
            </el-menu-item>
            <el-menu-item index="videoAnalyze">
              <i class="el-icon-camera"></i>
              <span slot="title">视频分析</span>
            </el-menu-item>
            <el-menu-item index="achievementStatistics">
              <i class="el-icon-date"></i>
              <span slot="title">成绩分析</span>
            </el-menu-item>
            <el-menu-item index="adminChart">
              <i class="el-icon-data-line" ></i>
              <span slot="title">图表分析</span>
            </el-menu-item>
          </el-menu>
        </el-row>
      </el-aside>
      <!-- 路由出口。 -->
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      t_id: "",
      use_user: "",
      activerouter: ''
    };
  },
  created() {
    this.activerouter = this.$route.path.replace("/","");
    let t_id = localStorage.getItem("id");
    let use_user = localStorage.getItem("identity");
    this.t_id = t_id;
    this.use_user = use_user;
    // this.goShouye();
  },
  computed: {
    activePath() {
      const { path } = this.$route;
      const pathArr = path.split("/");
      return pathArr.length === 3 ? "/" + pathArr[1] : path;
    }
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    async logout() {
      try {
        await this.$confirm("您是否确定退出?", "温馨提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });

        // 退出登录逻辑：
        this.$router.push("/content");
        localStorage.removeItem("id");
        localStorage.removeItem("identity");
      } catch (e) {
        this.$message({
          type: "info",
          message: "已取消退出"
        });
      }
    }
  }
};
</script>

<style>
.title-leftt-img{
  width:160px;
  position: absolute;
  left: 10px;
  top: 14px;
}
.el-header,
.el-footer {
  background-color: rgba(3,47,145,.6);
  color: #fff;
  text-align: center;
  line-height: 60px;
  font-size: 18px;
  /* border-radius: 10px 10px 0 0; */
}
.el-aside {
  background-color: #172850;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-main {
  /* height: 100%; */
  min-height: 100%;
  background-color: #F0F3F8;
}
.home-container {
  height: 100%;
}
.tac {
  width: 100%;
}
.el-aside {
  text-align: left;
}
.logout {
  color: #AEDD81;
  position: absolute;
  right: 30px;
  top: 0;
  text-decoration: none;
}
.show {
  display: block;
}
.hidden {
  display: none;
}
.el-menu-vertical-demo.el-menu {
  border-right: none;
}
/* .el-table .red {
  background-color: #CCFFCC;
}
.el-table .yellow {
  background-color: #FFFFCC;
}
.el-table .lime {
  background-color: #66CCCC;
} */
/* .check-left-table {
  background-color: #fff;
} */
.el-menu-item.is-active {
  background-color: #fff !important;
}
.rights {
  background-color: #fff;
  padding: 20px;
  overflow: hidden;
}
</style>
