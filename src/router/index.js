import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import Layout from '../views/Layout.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    // name: 'Layout', 
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
          isLogin: false,
        }
      },
      {
        path: '/about', // 要想显示about页面，那么Layout组件一定要有一个出口
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About/About.vue'),
        meta: {
          isLogin: true,
        }
      },
      {
        path: '/news',
        name: 'News',
        component: () => import('../views/News/News.vue'),
        meta: {
          isLogin: true,
        }
      },
      {
        path: '/travel',
        name: 'Travel',
        component: () => import('../views/Travel/index.vue'),
        meta: {
          isLogin: true,
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  // 不存在的路径 -- 跳转到 notfound 页面
  {
    path: '/*',
    // redirect: '/'
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = new VueRouter({
  routes
})

// 路由拦截 --- 除了首页，其他页都加上路由拦截功能
// 放在了permission.js中了，然后在main.js中导入到permission.js文件

export default router
