import Vue from 'vue'

import Login from '@/pages/login' // 登陆页
import Index from '@/pages/index' // 首页
import Content from '@/pages/content' // 内容展示
// 教师端路由
import VideoClassify from '@/pages/teacherDuan/videoClassify/videoClassify' // 视频页面
import NewPaper from '@/pages/teacherDuan/newPaper/newPaper' // 创建试卷
import Panduan from '@/pages/teacherDuan/panduan/panduan' // 判断题
import Duoxuan from '@/pages/teacherDuan/duoxuan/duoxuan' // 多选题
import Danxuan from '@/pages/teacherDuan/danxuan/danxuan' // 单选题
import File from '@/pages/teacherDuan/file/file' // 文件上传
import TestPaperList from '@/pages/teacherDuan/testPaperList/testPaperList' // 试卷列表

import TestPaper from '@/pages/teacherDuan/testPaper/testPaper' //单选列表
import TestPaperduo from '@/pages/teacherDuan/testPaper/testPaperduo' //多选列表
import TestPaperpan from '@/pages/teacherDuan/testPaper/testPaperpan' //判断列表


import TestPreview from '@/pages/teacherDuan/testPreview/testPreview' // 试卷预览
import CreatTeacherId from '@/pages/teacherDuan/creatTeacherId/creatTeacherId' // 创建教师账号
import CreatClass from '@/pages/teacherDuan/creatClass/creatClass' // 创建班级

import classList from '@/pages/teacherDuan/classList/classList' // 班级列表
import classes from '@/pages/teacherDuan/classList/classes' // 查看班级列表
import AddAnnouncement from '@/pages/teacherDuan/addAnnouncement/addAnnouncement' // 新建公告
import AddDiscussion from '@/pages/teacherDuan/addDiscussion/addDiscussion' // 新建讨论
// 学生端路由
import LookVideo from '@/pages/studentDuan/lookVideo/lookVideo' // 学生观看视频
import Examination from '@/pages/studentDuan/examination/examination' // 学生考试
import AnnouncementShows from '@/pages/studentDuan/announcementShows/announcementShows' // 公告展示
// 学生端老师端都有的路由
import LearningState from '@/pages/all/learningState/learningState' // 学习时间
import PaperJilu from '@/pages/all/paperJilu/paperJilu' // 考试记录
import TestScore from '@/pages/all/testScore/testScore' // 考试具体信息
import QuestionDiscussion from '@/pages/all/questionDiscussion/questionDiscussion' // 问题讨论
import home from '@/pages/all/home/home' // 首页页面
import studentChart from '@/pages/all/home/studentChart' // 学生图表
import teacherChart from '@/pages/all/home/teacherChart' // 教师图表
import adminChart from '@/pages/all/home/adminChart' // 管理员图表
import adminLookVideo from '@/pages/all/home/adminLookVideo' // 观看视频
// 管理员的页面
import VideoStatistics from '@/pages/admin/videoStatistics/videoStatistics' // 学习时间总列表
import PaperListbox from '@/pages/admin/paperListbox/paperListbox' // 考试记录总列表
import Management from '@/pages/admin/management/management' // 账号管理
import classLists from '@/pages/admin/classLists/classLists' //班级列表
import classess from '@/pages/admin/classLists/classess' // 查看班级列表
import VideoAnalyze from '@/pages/admin/videoAnalyze/videoAnalyze' // 视频分析
import AchievementStatistics from '@/pages/admin/achievementStatistics/achievementStatistics' // 成绩分析


import VueRouter from 'vue-router'
Vue.use(VueRouter)
const router = new VueRouter({
    routes: [{
            path: '/',
            redirect: '/content'
        },
        { path: '/content', component: Content, name: 'content' },
        { path: '/login', component: Login, name: 'login' },
        {
            path: '/index',
            component: Index,
            name: 'index',
            redirect: { name: "home" },
            children: [{
                    path: '/home',
                    component: home,
                    name: 'home'
                },
                // 教师端路由
                {
                    path: '/videoClassify',
                    component: VideoClassify,
                    name: 'videoClassify'
                },
                {
                    path: '/newPaper',
                    component: NewPaper,
                    name: 'newPaper'
                },
                {
                    path: '/panduan',
                    component: Panduan,
                    name: 'panduan'
                },
                {
                    path: '/duoxuan',
                    component: Duoxuan,
                    name: 'duoxuan'
                },
                {
                    path: '/danxuan',
                    component: Danxuan,
                    name: 'danxuan'
                },
                {
                    path: '/file',
                    component: File,
                    name: 'file'
                },

                {
                    path: '/testPaperList',
                    component: TestPaperList,
                    name: 'testPaperList'
                },
                //多选
                {
                    path: '/testPaperduo',
                    component: TestPaperduo,
                    name: 'testPaperduo'
                },
                //判断
                {
                    path: '/testPaperpan',
                    component: TestPaperpan,
                    name: 'testPaperpan'
                },
                //单选
                {
                    path: '/testPaper',
                    component: TestPaper,
                    name: 'testPaper'
                },

                {
                    path: '/testPreview',
                    component: TestPreview,
                    name: 'testPreview'
                },
                {
                    path: '/creatTeacherId',
                    component: CreatTeacherId,
                    name: 'creatTeacherId'
                },
                {
                    path: '/creatClass',
                    component: CreatClass,
                    name: 'creatClass'
                },
                {
                    path: '/classList',
                    component: classList,
                    name: 'classList'
                },
                {
                    path: '/classes',
                    component: classes,
                    name: 'classes'
                },
                {
                    path: '/addAnnouncement',
                    component: AddAnnouncement,
                    name: 'addAnnouncement'
                },
                {
                    path: '/addDiscussion',
                    component: AddDiscussion,
                    name: 'addDiscussion'
                },

                // 学生端路由
                {
                    path: '/lookVideo',
                    component: LookVideo,
                    name: 'lookVideo'
                },
                {
                    path: '/examination',
                    component: Examination,
                    name: 'examination'
                },
                {
                    path: '/announcementShows',
                    component: AnnouncementShows,
                    name: 'announcementShows'
                },
                // 学生端教师端通用路由
                {
                    path: '/learningState',
                    component: LearningState,
                    name: 'learningState'
                },
                {
                    path: '/paperJilu',
                    component: PaperJilu,
                    name: 'paperJilu'
                },
                {
                    path: '/testScore',
                    component: TestScore,
                    name: 'testScore'
                },
                {
                    path: '/questionDiscussion',
                    component: QuestionDiscussion,
                    name: 'questionDiscussion'
                },
                {
                    path: '/adminLookVideo',
                    component: adminLookVideo,
                    name: 'adminLookVideo'
                },
                // 管理员的路由
                {
                    path: '/videoStatistics',
                    component: VideoStatistics,
                    name: 'videoStatistics'
                }, {
                    path: '/paperListbox',
                    component: PaperListbox,
                    name: 'paperListbox'
                }, {
                    path: '/management',
                    component: Management,
                    name: 'management'
                },
                {
                    path: '/classess',
                    component: classess,
                    name: 'classess'
                },
                {
                    path: '/classLists',
                    component: classLists,
                    name: 'classLists'
                },
                {
                    path: '/videoAnalyze',
                    component: VideoAnalyze,
                    name: 'videoAnalyze'
                }, {
                    path: '/achievementStatistics',
                    component: AchievementStatistics,
                    name: 'achievementStatistics'
                }, {
                    path: '/studentChart',
                    component: studentChart,
                    name: 'studentChart'
                },






                {
                    path: '/teacherChart',
                    component: teacherChart,
                    name: 'teacherChart'
                }, {
                    path: '/adminChart',
                    component: adminChart,
                    name: 'adminChart'
                }
            ]
        }
    ]
})
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next()
        return
    }
    if (to.path === '/content') {
        next()
        return
    }
    const identity = localStorage.getItem('identity')
    if (identity) {
        // 登录
        next()
    } else {
        // 没有登录
        next('/login')
    }
})
export default router