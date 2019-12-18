// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//test
//test
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './config/global.js'
import formatDate from './utils/utils'
import moment from 'moment' // 时间处理插件

import VueQuillEditor from "vue-quill-editor"; // 引入富文本编辑器
import "quill/dist/quill.core.css"; // 引入富文本编辑器
import "quill/dist/quill.snow.css"; // 引入富文本编辑器
import "quill/dist/quill.bubble.css"; // 引入富文本编辑器
Vue.use(VueQuillEditor);

Vue.prototype.formatDate = formatDate
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
Vue.filter('time', function(value, formatString) { //挂载全局 时间格式化 过滤器  value  是输入内容
    if (value == 0) {
        return '时间信息错误!'
    } else {
        formatString = formatString || 'YYYY年MM月DD日 HH:mm';
        return moment.unix(value).format(formatString); // 这是时间戳转时间
    }
})
Vue.filter('second', function(value) { //挂载全局 将秒数转换成时分秒
    var secondTime = parseInt(value); // 秒
    var minuteTime = 0; // 分
    var hourTime = 0; // 小时
    if (secondTime > 60) { //如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60);
        //如果分钟大于60，将分钟转换成小时
        if (minuteTime > 60) {
            //获取小时，获取分钟除以60，得到整数小时
            hourTime = parseInt(minuteTime / 60);
            //获取小时后取佘的分，获取分钟除以60取佘的分
            minuteTime = parseInt(minuteTime % 60);
        }
    }
    var result = "" + parseInt(secondTime) + "秒";
    if (minuteTime > 0) {
        result = "" + parseInt(minuteTime) + "分" + result;
    }
    if (hourTime > 0) {
        result = "" + parseInt(hourTime) + "小时" + result;
    }
    return result;
})