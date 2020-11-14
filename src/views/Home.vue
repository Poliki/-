<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-container>
      <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
        background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="/" @click="toHome">首页</el-menu-item>
        <el-submenu index="2">
          <template slot="title">用户中心</template>
          <el-menu-item index="/myBorrow" @click="myBorrow">我的借阅</el-menu-item>
          <el-menu-item index="2-2" @click="logout">注销</el-menu-item>
        </el-submenu>
        <el-submenu index="3" :disabled="admin">
          <template slot="title">管理中心</template>
          <el-menu-item index="3-1" @click="toBookManage">书籍管理</el-menu-item>
          <el-menu-item index="3-2" @click="toPermission">权限管理</el-menu-item>
        </el-submenu>
        <el-menu-item index="4">当前用户:{{username}}</el-menu-item>
      </el-menu>
      <el-header></el-header>
      <el-main>
          <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<style></style>
<script>
    export default {
    data() {
      return {
        username: "陈小虎"
      }
    }
}
</script>