<template>
  <div class="rights">
    <studentHome v-if="this.identity == 1"></studentHome>
    <teacherHome v-if="this.identity == 0"></teacherHome>
    <adminHome v-if="this.identity == 2"></adminHome>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import studentHome from "../home/studentHome";
import teacherHome from "../home/teacherHome";
import adminHome from "../home/adminHome";
export default {
  data() {
    return {
      isLoading: false,
      t_id: '',
      identity: '',
    };
  },
  created() {
    this.t_id = localStorage.getItem("id");
    this.identity = localStorage.getItem("identity");
  },
  mounted(){
    
  },
  updated () {
    
  },
  components: {
    studentHome: studentHome,
    teacherHome: teacherHome,
    adminHome: adminHome
  },
  methods: {
    
  
  },
  beforeDestroy() {

  },
  
};
</script>

<style scoped lang="less">
.rights {
  min-height: 100%;
  /* background-color: #fff; */
  box-sizing: border-box;
  padding: 10px;

}
// .theme {
//   color: @theme;
// }

</style>