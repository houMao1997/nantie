<template>
  <div class="rights" v-loading="isLoading" element-loading-text="拼命加载中">
    <!-- 选择账号类型 -->
    <el-row>
      <el-col :span="2">
        <div class="col-totle">选择类型</div>
      </el-col>
      <el-col :span="4">
        <el-select v-model="type" placeholder="学生" @change="getUserList">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    <el-col :span="4">
      <el-input v-model="input3" placeholder="请输入姓名" class="ipt"></el-input>
      </el-col>
    <el-col :span="2">
      <el-button type="primary" @click="search" class="btn" >搜索</el-button>
      
      </el-col>
      
      <!-- 导出Excel表格 -->
      <el-button  @click="exportExcel" type="primary" class="button" style="float:right;margin: 10px 20px;">导出Excel表格</el-button>
    </el-row>
    
    <!-- 账号列表 -->
    <el-table
      :data="list"
      style="width: 100%;margin-top:15px;border-top: 1px solid rgb(235,238,245);"
      v-if="list[0]"
      :cell-class-name="cell"
      border
    >
      <el-table-column prop="id" label="Id" width="70"></el-table-column>
      <el-table-column prop="nickname" :label="type == '1'? '学生姓名':'教师姓名'" width="200" align="center"></el-table-column>
      <el-table-column prop="account" label="账号" width="200" align="center"></el-table-column>
      <el-table-column prop="addtime" label="添加时间" align="center">
        <template slot-scope="scope">{{ scope.row.addtime | time}}</template>
      </el-table-column>
      <el-table-column prop="filetypename" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页插件。 -->
    <div  style="float:right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="pagesize"
        layout="total, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 导出成绩列表 -->
    <el-table
      :data="flatten(xlsxlist.slice((currentPage -1) * pagesize, currentPage * pagesize))"
      v-show="false"
      :cell-class-name="cell"
      class="table"
    >
      
      <el-table-column prop="banji" label="班级" width="200" align="center"></el-table-column>
      <el-table-column prop="nickname" label="学生姓名" width="200" align="center"></el-table-column>
      <el-table-column prop="jiaoshixingming" label="教师姓名" width="200" align="center"></el-table-column>
      <el-table-column prop="cishu" label="练习次数" width="70"></el-table-column>
      <el-table-column prop="zuigaofeng" label="最高分" width="70"></el-table-column>
      <el-table-column prop="zuidifeng" label="最低分" width="70"></el-table-column>
      <el-table-column prop="pingjunfen" label="平均分" width="70"></el-table-column>
      <!-- <el-table-column prop="addtime" label="添加时间" align="center">
        <template slot-scope="scope">{{ scope.row.addtime | time}}</template>
      </el-table-column> -->
      <!-- <el-table-column prop="filetypename" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">重置密码</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <!-- 双层嵌套 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>您确定重置此账号的密码吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="close">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      // 用户名
      input3:'',
      isLoading: true,
      dialogVisible: false,
      list: [],
      pagesize: 17,
      currentPage: 1,
      type: "",
      name: '',
      options: [
        {
          value: "1",
          label: "学生"
        },
        {
          value: "2",
          label: "老师"
        }
      ],
      xlsxlist: [],
      total:0,

    };
  },
  created() {
    this.getList();
    this.getExit();
  },

  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList()
    },
    getList() {
      this.isLoading = true;
      if (this.type == "") {
        this.type = "1";
      }
      axios
        .post(`${BASE_URL}index/login/userlst`,qs.stringify( {
          type: this.type,
          currentpage:this.currentPage,
          name:this.input3
        }))
        .then(res => {
          if (res.status === 200 && res.data.code === "1") {
            this.list = res.data.info.data;
            this.total=res.data.info.pageinfo.sum
            this.pagesize=parseInt(res.data.info.pageinfo.page)
            this.isLoading = false;
          } else {
          }
        });
      
    },
    flatten(arr) {
      var res = [];
      arr.map(item => {
        if (Array.isArray(item)) {
          res = res.concat(flatten(item));
        } else {
          res.push(item);
        }
      });
      return res;
    },
    getUserList() {
      this.getList();
    },
    handleEdit(index, row) {
      this.dialogVisible = true
      this.name = row.id
    },
    close(){
      this.dialogVisible = false
      if (this.type == "") {
        this.type = "1";
      }
      axios
        .post(`${BASE_URL}index/login/resetpwd`, {
          type: this.type,
          id: this.name
        })
        .then(res => {
          if (res.status === 200 && res.data.code === "1") {
            this.list = res.data.info;
            this.$message({
              message: res.data.info,
              type: "success",
              duration: 3000
            });
          } else {
            this.$message({
              message: res.data.info,
              type: "error",
              duration: 3000
            });
          }
        });
    },
    cell({row, column, rowIndex, columnIndex}) {
      if( columnIndex == 1 || columnIndex == 4 || columnIndex == 7 || columnIndex == 10){
        return 'red'
      }
      if( columnIndex == 2 || columnIndex == 5 || columnIndex == 8 || columnIndex == 11){
        return 'yellow'
      }
      if( columnIndex == 3 || columnIndex == 6 || columnIndex == 9 || columnIndex == 12){
        return 'lime'
      }
    },
    getExit(){
      // this.isLoading = true;
      axios
        .post(`${BASE_URL}index/Addpaper/recordteacher`, {})
        .then(res => {
          if (res.status === 200 && res.data.code === "1") {
            this.xlsxlist = res.data.info;
            // this.isLoading = false;
          } else {
          }
        });
    },
    exportExcel() {
      // 设置当前日期
      console.log('456464984')
      let getCurrentPage = this.currentPage;
      this.pagesize = 99999;
      this.currentPage = 1;
      this.$nextTick(function () {
        let time = new Date();
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let day = time.getDate();
        let name = year + "" + month + "" + day;
        var fix = document.querySelector('.el-table__fixed');
        var wb;
        if (fix) {
          wb = XLSX.utils.table_to_book(document.querySelector(".table").removeChild(fix));
          document.querySelector(".table").appendChild(fix);
        } else {
          wb = XLSX.utils.table_to_book(document.querySelector(".table"));
        }
        // var wb = XLSX.utils.table_to_book(document.querySelector(".table"));
        /* get binary string as output */
        var wbout = XLSX.write(wb, {
          bookType: "xlsx",
          bookSST: true,
          type: "array"
        });
        try {
          //  name+'.xlsx'表示导出的excel表格名字
          FileSaver.saveAs(
            new Blob([wbout], { type: "application/octet-stream" }),
            name + ".xlsx"
          );
        } catch (e) {
          if (typeof console !== "undefined") console.log(e, wbout);
        }
        this.pagesize = 15;
        this.currentPage = getCurrentPage;
        return wbout;
      })
    },
    search(){
      
      this.getList()
    }
  }
};
</script>

<style scoped>
.el-dialog__body {
  height: 0;
}
.el-row {
  margin-bottom: 10px;
}
.col-totle {
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  padding: 0 10px 0 0;
}
.rights {
  /* min-height: 100%; */
  box-sizing: border-box;
  overflow: hidden;
}
.el-icon-document-copy{
  width: 18px;
  height: 18px;
}

</style>