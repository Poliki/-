import Vue from "vue"
import VueRouter from "vue-router"
import Register from "../components/Register.vue"
import Login from "../components/Login.vue"
import Home from "../views/Home.vue"
import Welcome from "../views/welcome.vue"
import myBorrow from "../views/myBorrow.vue"
import bookList from "../views/bookList.vue"
import bookManage from "../views/bookManage.vue"
import permissionManage from "../views/permissionManage.vue"
Vue.use(VueRouter)

/* 子路由都是作为Home的Children下注册 */
const router = new VueRouter({
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/register", component: Register },
    { path: "/login", component: Login },
    { path:"/home", component: Home,redirect: '/bookList',children:[
      { path: '/welcome', component: Welcome },
      { path: '/bookList', component: bookList },
      { path: '/myBorrow', component: myBorrow },
      { path: '/bookManage', component: bookManage },
      { path: '/permissionManage', component: permissionManage }
    ]
  }
    /* {
      path: "/",
      name: "Home",
      component: Home,
      redirect: "/booksList",
      children: [
        { path: '/booksList', component: booksList },
        { path: '/myBorrow', component: myBorrow }
      ]
    } */
  ]
})

/* 挂载路由导航守卫 */
/* router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next()  放行  next('/login')  强制跳转

  if (to.path === "/register") return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem("token")
  if (!tokenStr) return next("/login")
  next()
}) */
export default router
