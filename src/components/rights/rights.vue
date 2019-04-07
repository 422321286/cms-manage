<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb class="bread" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 列表 -->
    <el-table :data="rightsList" style="width: 100%">
      <el-table-column type="index" :index="indexMethod"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column label="等级">
        <template slot-scope="scope">
      <span v-if="scope.row.level == 0">一级</span>
      <span v-else-if="scope.row.level == 1">二级</span>
      <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

/* eslint-disable */
export default {
   data() {
      return {
        rightsList: [
          {
          authName: '王小虎',
          path:'goods',
          level:'三级'
        },
        ],
      }
    },
    methods: {
      //处理索引
      indexMethod(index) {
        return index ;
      },
      //请求加载数据， 权限列表
          async loadRightList(){
            let res = await this.$axios.get("rights/list")
            console.log(res.data);
          this.rightsList = res.data.data
          }
    },
    created(){
         this.loadRightList();
    }
}
</script>

<style lang="less" scoped>
.bread {
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  padding-left: 20px;
  background: #d4dae0;
}
</style>
