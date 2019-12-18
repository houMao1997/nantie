<template>
  <div class="rights">
    教师柱状图
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
      isLoading: false,
      identity: '',
      t_id: '',
      use_user: '',
    };
  },
  created() {
    this.t_id = localStorage.getItem("id");
    this.identity = localStorage.getItem("identity");
  },
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
          // { 
          //   name: '总分',
          //   // barGap:'80%',/*多个并排柱子设置柱子之间的间距*/
          //   // barCategoryGap:'50%',/*多个并排柱子设置柱子之间的间距*/
          //   type: this.typeTwo, 
          //   data: this.yArrer,
          //   itemStyle:{
          //     normal:{
          //         color:'#409EFF'
          //     }
          //   }
          // },
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
  }
};
</script>

<style scoped lang="less">
.rights {
  min-height: 100%;
  box-sizing: border-box;
  padding: 10px;
}

</style>