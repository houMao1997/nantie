<template>
  <div class="right">
    <div class="search-box" style="margin-left:20px">
      <div class="title">选择教师</div>
      <el-select v-model="tracher" placeholder="请选择教师" @change="changeTeacher" clearable style="width:120px;"  >
      <!-- @clear="clearhandel" -->
        <el-option
          v-for="item in teacherList"
          :key="item.id"
          :label="item.nickname"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>
    <div class="search-box">
      <div class="title">选择班级</div>
        <el-select v-model="classes" placeholder="请选择班级" @change="changeClass" style="width:150px;">
          <el-option
            v-for="item in classList"
            :key="item.id"
            :label="item.name"
            :value="[item.id,item.name]"
          ></el-option>
        </el-select>
    </div>
    <div class="search-box">
      <div class="title">选择学生</div>
      <el-select v-model="type" placeholder="请选择学生" @change="changeStuent" style="width:120px;">
        <el-option
          v-for="item in stuList"
          :key="item.id"
          :label="item.nickname"
          :value="[item.id,item.nickname]"
        ></el-option>
      </el-select>
    </div>
    <div class="search-box">
      <div class="title">试卷名称选择</div>
      <el-select v-model="t_id" placeholder="试卷名称选择" clearable style="width:120px;" > 
      <el-option
        v-for="item in paperList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>
    </div>
    
    <div class="block">
      <el-button type="primary" style="margin: 10px;" @click="search">搜索</el-button>
    </div>
    <!-- <div class="button-box">
      <div style="margin-top: 20px;position: relative">
        <el-radio-group v-model="radio" size="small" @change="getList" class="check-box">
          <el-radio-button label="1">今天</el-radio-button>
          <el-radio-button label="2">昨天</el-radio-button>
          <el-radio-button label="3">本周</el-radio-button>
          <el-radio-button label="4">上周</el-radio-button>
          <el-radio-button label="5">本月</el-radio-button>
          <el-radio-button label="6">今年</el-radio-button>
          <el-radio-button label="7">全部</el-radio-button>
        </el-radio-group>
      </div>
    </div> -->
    <div class="echars">
      <div id="myChart"></div>
    </div>
  
  </div>
</template>

<script>
import qs from "qs";
import axios from "axios";
// import { fork } from 'cluster';
// 引入基本模板
let echarts = require('echarts/lib/echarts');
// 引入柱状图组件
require('echarts/lib/chart/bar');
require('echarts/lib/chart/line');
// 引入提示框和title组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
// 引入dataZoom组件
require('echarts/lib/component/dataZoom');
// 引入切换
require('echarts/lib/component/toolbox');
export default {
  data() {
    return {
      teacher_id: '',
      xArrer: [],
      yArrer: [],
      itemData: '',
      typeOne: "line",
      typeTwo: 'bar',
      identity: '',
      nickname: '',
      school_id: '',
      tableData: [],
      isLoading: false,
      teacherList: [],
      tracher: '',
      classList: [],
      classes: '',
      stuList: [],
      type: '',
      subordinate_id: '',
      pagesize: 15,
      currentPage: 1,
      teacheride: '',
      classide: '',
      uide: '',
      radio: '3',
      t_id: '',
      paperList: [],
      g_fen: [],
      d_fen: [],
      p_fen: [],
    };
  },
  created() {
    this.teacher_id = localStorage.getItem("id");
    this.nickname = localStorage.getItem("nickname");
    this.school_id = localStorage.getItem("school_id");
    this.identity = localStorage.getItem("identity");
    this.getList();
    this.getTeacher();
    
  },
  computed: {},
  methods: {
    drawLine() { // eachers 柱状图方法
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: [
          {
            type: 'category',
            data: this.xArrer,
            axisPointer: {
              type: 'line'
            },
            axisLabel: {        
              interval: 0,
              formatter:function(value)
              {
                var ret = "";//拼接加\n返回的类目项
                var maxLength = 7;//每项显示文字个数
                var valLength = value.length;//X轴类目项的文字个数
                var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                if (rowN > 1)//如果类目项的文字大于3,
                {
                  for (var i = 0; i < rowN; i++) {
                    var temp = "";//每次截取的字符串
                    var start = i * maxLength;//开始截取的位置
                    var end = start + maxLength;//结束截取的位置
                    //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                    temp = value.substring(start, end) + "\n";
                    ret += temp; //凭借最终的字符串
                  }
                  return ret;
                }
                else {
                  return value;
                }
              }
            },
            axisLine:{
              lineStyle:{
                // x坐标轴的轴线颜色
              }
            }
          }
        ],
        tooltip : {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true
            }
          }
        },
        dataZoom: [
          {   // 这个dataZoom组件，默认控制x轴。
            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            start: 0,      // 左边在 10% 的位置。
            end: 8,      // 右边在 60% 的位置。
            height: 16,  //组件高度
            // minvalueSpan: 20,
            // maxvalueSpan: 20,
          }
        ],
        yAxis: {},
        series: [
          { 
            name: '最高分',
            // barGap:'80%',/*多个并排柱子设置柱子之间的间距*/
            // barCategoryGap:'50%',/*多个并排柱子设置柱子之间的间距*/
            type: this.typeTwo, 
            data: this.g_fen,
            itemStyle:{
              normal:{
                  color:'#409EFF'
              }
            }
          },{ 
            name: '最低分',
            // barGap:'80%',/*多个并排柱子设置柱子之间的间距*/
            // barCategoryGap:'50%',/*多个并排柱子设置柱子之间的间距*/
            type: this.typeTwo, 
            data: this.d_fen,
            itemStyle:{
              normal:{
                  color:'#E6A23C'
              }
            }
          },{ 
            name: '平均分',
            // barGap:'80%',/*多个并排柱子设置柱子之间的间距*/
            // barCategoryGap:'50%',/*多个并排柱子设置柱子之间的间距*/
            type: this.typeTwo, 
            data: this.p_fen,
            itemStyle:{
              normal:{
                  color:'#67C23A'
              }
            }
          }
        ],
        grid: {
          bottom: '80px',
          x:100,
          x2:100,
        },
      });
    },
    getPaperList() {
      axios
        .post(`${BASE_URL}index/Login/searchinfo`, {
          paper: "paper"
        })
        .then(res => {
          console.log(res);
          
          if (res.status === 200 && res.data.code === "1") {
            this.paperList = res.data.info;
          }
        });
    },
      getList() {
        // this.tracher == ''? this.teacheride = '' : this.teacheride = this.tracher[0];
        this.classes == ''? this.classide = '' : this.classide = this.classes[0];
        this.type == ''? this.uide = '' : this.uide = this.type[0];
        // if (!this.value2 || this.value2 == ''){ this.start_time = '';this.end_time = '' } else { this.start_time = this.value2[0]/1000;this.end_time = this.value2[1]/1000 };
        axios
          .post(`${BASE_URL}index/login/paperlstallfenxi`, qs.stringify({
            teacher_id: this.tracher, 
            class_id: this.classide, 
            u_id:this.uide, 
            currentpage: 1,
          }))
          .then(res => {
            if (res.status === 200 && res.data.code === "1") {
            this.xArrer = [];
            this.yArrer = [];
            this.g_fen = [];
            this.d_fen = [];
            this.p_fen = [];
            this.tableData = res.data.info.info;
            console.log(this.tableData);
            for ( var i = 0 ; i < this.tableData.length ; i++) {
              this.xArrer.push(this.tableData[i].u_name);
              this.yArrer.push(this.tableData[i].g_fen);
              this.g_fen.push(this.tableData[i].g_fen);
              this.d_fen.push(this.tableData[i].d_fen);
              this.p_fen.push(this.tableData[i].p_fen);
            }
            this.drawLine();
          }
          });
      },
      // clearhandel(){
      //   this.t_id="";
      //   this.paperList=[]
      //   this.getList()
      // },
      changeStuent() {
        this.t_id = "";
        this.paperList = [];
        this.getPaperList();
      },
      search(){
        this.getList();
      },
      getTeacher() {
      axios.post(`${BASE_URL}index/Login/searchinfo`).then(res => {
        if (res.status === 200 && res.data.code === "1") {
          this.teacherList = res.data.info;
          console.log(this.teacherList);        
        }
      });
    },
    changeTeacher(){
      this.classes = "";
      this.classList = [];
      this.type = "";
      this.stuList = [];
      // if (this.tracher == "" || !this.tracher){
      //   this.value2 = '';
      //   return false;
      // }
      this.t_id = "";
      this.paperList = [];
      this.getClass();
      // console.log( this.tracher[0]);
      
    },
    getClass() {    
      axios
        .post(`${BASE_URL}index/Login/searchinfo`, {
          teacher_id: this.tracher
        })
        .then(res => {
          console.log(res);
          
          if (res.status === 200 && res.data.code === "1") {
            this.classList = res.data.info;
            console.log(this.classList);
            
          }
        });
    },
    changeClass(){
      this.type = "";
      this.stuList = [];
      this.t_id = "";
      this.paperList = [];
      this.getStu();
    },
    getStu() {    
      axios
        .post(`${BASE_URL}index/Login/searchinfo`, {
          class_id: this.classes[0]
        })
        .then(res => {
          console.log(res.data);
          if (res.status === 200 && res.data.code === "1") {
            this.stuList = res.data.info;
          }
        });
    },
    // getName(name){
    //   let arr = [];
    //   for ( var i = 0 ; i < this.itemData.length ; i++) {
    //     for(var j = 0; j < this.itemData[i].jutifenshu.length ; j++) {
    //       if (name == this.itemData[i].jutifenshu[j].name){
    //         arr.push(this.itemData[i].jutifenshu[j].fenshu)
    //       }
    //     }
    //   }
    //   return arr;
    // }
  }
};
</script>

<style lang="less" scoped>
// @import url("../../../assets/css/index.less");
.right {
  background-color: #fff;
  min-height: 100%;
  overflow: hidden;
  padding-top: 15px;
  box-sizing: border-box;
  .search-box {
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    float: left;
    .title {
      color: #409EFF;
      float: left;
      font-size: 14px;
      margin-right: 10px;
    }
  }
  .block {
    margin: 0 0 25px;
  }
  .button-box {
    text-align: center;
    // position: relative;
    .check-box {
      position: absolute;
      top: 0px;
      left: 102px;
      z-index: 999;
    }
  }
}
.echars #myChart {
  height: 75vh;
  width: 100%;
  margin: 10 auto;
  background-color: #fff;
}

</style>

