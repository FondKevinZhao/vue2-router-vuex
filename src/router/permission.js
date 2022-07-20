// 导入了路由文件夹router中的index文件，这个文件中有router
import router from './index'

// 导入store，获取到store中的token
import store from '../store/index'


// console.log(router);
// 路由拦截功能
// 路由拦截 --- 除了首页，其他页都加上路由拦截功能
router.beforeEach((to, from, next) => {
  // 1. 判断当前的路由是否需要登录
  if (to.meta.isLogin) {
    // 2. 判断用户的状态是否已登录   --- 从引入的store中获取token
    let token = store.state.LoginModule.userinfo.token;
    if (token) { // 如果存在，表示已登录，直接放行
      next()
    } else {
      next('/login'); // 如果没有登录过，跳转到login页面
    }
  } else { // 不需要登录
    next()
  }
})