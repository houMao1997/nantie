<template>
  <div class="rights">
    <!-- 代办理事项 -->
    <div class="data-box">
      <ul class="clearfix">
        <li v-for="(item,key) in item" :key="key">
          <p>{{item.name}}</p>
          <p>{{item.num}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      isLoading: false,
      t_id: '',
      identity: '',
      selected: 1,
      item: "",
      id: "",
      identity: "",
      itemDate: [],
      chartDate: [],
      legendDate: [],
    };
  },
  created() {
    this.id = localStorage.getItem("id");
    this.identity = localStorage.getItem("identity");
    this.getItem();
  },
  methods: {

    getItem() {
      axios
        .post(`${BASE_URL}index/login/adminhome`)
        .then(res => {
          console.log(res.data.info);
          
          if (res.status === 200 && res.data.code === "1") {
            this.item = res.data.info;
          } else {
          }
        });
    },
  }
};
</script>

<style scoped lang="less">
.rights {
  .content-box {
    .charts {
      height: 460px;
      width: 45%;
      float: left;
      padding-top: 50px;
      #myChart {
        height: 400px;
        padding: 0 20px 0;
      }
    }
    .table-box {
      margin-left: 45%;
      padding: 20px;
    }
  }
}
.data-box ul {
  overflow: hidden;
}
.data-box ul li {
  float: left;
  margin: 20px;
  width: 280px;
  height: 180px;
  padding: 30px 50px;
  box-sizing: border-box;
  border-radius: 10px;
}
.data-box ul li p {
  height: 30px;
  line-height: 30px;
  color: #fff;
  text-align: left;
}
.data-box ul li p:nth-child(1) {
  margin-top: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #fff;
}
.data-box ul li p:nth-child(2) {
  font-size: 28px;
  height: 40px;
  line-height: 40px;
}
.data-box ul li:nth-child(3n + 1) {
  background-color: #ff877e;
}
.data-box ul li:nth-child(3n + 2) {
  background-color: #af7cf3;
}
.data-box ul li:nth-child(3n + 3) {
  background-color: #52afff;
}
.echars {
  position: relative;
}
.echars .router-box {
  position: absolute;
  top: 10px;
  right: 50%;
  z-index: 111;
  transform: translateX(370px);
}
.rlink {
  color: #333;
  height: 30px;
  width: 30px;
}
ul{
  list-style: none
}
</style>