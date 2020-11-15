<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-container>
      <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
        background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
        <el-menu-item index="/home">首页</el-menu-item>
        <el-submenu index="/myBorrow">
          <template slot="title">用户中心</template>
          <el-menu-item index="/myBorrow">我的借阅</el-menu-item>
          <el-menu-item @click="logout">注销</el-menu-item>
        </el-submenu>
        <el-submenu index="3" :disabled="admin">
          <template slot="title">管理中心</template>
          <el-menu-item index="/bookManage">书籍管理</el-menu-item>
          <el-menu-item index="/permissionManage">权限管理</el-menu-item>
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
        /* username登录后获取复制到data渲染到页面上 */
        username: "陈小虎",
        /* admin判断是否有权限 */
        admin: false,
        /* 导航组件 */
        activeIndex2: '100',
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
      },
      logout() {
        window.sessionStorage.setItem('token', null)
        this.$router.push('/login')
      }
    }
  }

</script>
