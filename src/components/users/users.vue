<template>
  <div>
    <el-table :data="usersList" style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :current-page="pagenum"
      :page-size="2"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  data() {
    return {
      usersList: [
        {
          username: "2016-05-02",
          email: "王小虎",
          mobile: "上海市普陀区金沙江路 1518 弄"
        },
        {
          username: "2016-05-02",
          email: "王小虎",
          mobile: "上海市普陀区金沙江路 1518 弄"
        },
        {
          username: "2016-05-02",
          email: "王小虎",
          mobile: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      total: "",
      pagenum: ""
    };
  },
  created() {
    this.loadUsersList();
  },
  methods: {
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagenum = val
       this.loadUsersList();
      },
    loadUsersList() {
      axios
        .get("http://localhost:8888/api/private/v1/users", {
          // 参数
          params: {
            query: "",
            pagenum: this.pagenum || 1,
            pagesize: 2
          },
          // 设置请求头携带数据
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(res => {
          console.log(res);
          this.usersList = res.data.data.users;
          // 给总个数赋值
          this.total = res.data.data.total;
          // 当前页
          this.pagenum = res.data.data.pagenum;
        });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
