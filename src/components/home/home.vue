<template>
  <el-container>
    <el-header>
      <!-- 三个部分 -->
      <el-row>
        <el-col :span="8">
          <img src="../../assets/images/logo.png" alt>
        </el-col>
        <el-col :span="8">
          <h1>电商后台管理系统</h1>
        </el-col>
        <el-col class="col" :span="8">
          恭喜35期学员平均月薪资 2万
          <a href="#" @click.prevent="layout">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!-- 导航栏 -->
        <el-menu
          :router="true"
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 第一个 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="users">用户列表</el-menu-item>
          </el-submenu>
          <!-- 第二个 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="roles">角色列表</el-menu-item>
            <el-menu-item index="rights">权限列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  methods: {
    layout() {
      this.$confirm("此操作将退出, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 1. 删除token
          localStorage.removeItem("token");
          // 2. 跳转到login
          this.$router.push("/login");
          // 3. 提示退出成功
          this.$message({
            type: "success",
            message: "退出成功!",
            duration: 800
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出操作",
            duration: 800
          });
        });
    }
  }
};
</script>
<style lang="less" scoped>
.el-container {
  height: 100%;
  min-width: 900px;
}

.el-header {
  background: #b3c1cd;
  padding: 0;
  height: 60px;
}
h1 {
  color: #fff;
  text-align: center;
  line-height: 60px;
  font-size: 28px;
}
.col {
  text-align: right;
  line-height: 60px;
  padding-right: 30px;
}

a {
  color: #daa520;
  text-decoration: none;
}
.el-aside {
  background: #545c64;
}

.el-main {
  background: #eaeef1;
}
</style>
