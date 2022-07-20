<template>
  <!-- 公共导航 -->
  <div class="nav">
    <!-- <router-link to="/">首页</router-link>
    <router-link to="/">新闻</router-link>
    <router-link to="/about">我的</router-link> -->

    <!-- 
      拿element-UI库里面的导航：
        el-menu：
          - mode="horizontal"：导航菜单默认为垂直模式，通过mode属性可以使导航菜单变更为水平模式。
          - background-color="#545c64"      导航的背景颜色
          - text-color="#fff"               导航的字体颜色
          - active-text-color="#ffd04b"     导航选中的字体颜色
          - :default-active="activeIndex"   当前激活菜单的index。索引是谁，谁高亮
          - @select (是一个事件)	菜单激活回调	index: 选中菜单项的 index, indexPath: 选中菜单项的 index path
          - router	是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转

        el-submenu：下拉菜单

        el-menu-item：菜单的每一项内容
          - index 唯一标识
          - diabled 菜单被禁止，不可选的状态

     -->
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <!-- 导航跳转方法一： -->
      <!-- <el-menu-item index="1">
        <router-link to="/">首页</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/">新闻</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/about">我的</router-link>
      </el-menu-item> -->

      <!-- 导航跳转方法二：element-ui中提供的 -->
      <!-- 给el-menu 加上 router就行，那么以 index 作为 path 进行路由跳转 -->
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/news">新闻</el-menu-item>
      <el-menu-item index="/about">我的</el-menu-item>
      <el-menu-item index="/travel">旅游</el-menu-item>

      <!-- 右侧内容 -->
      <div class="nav-right">
        <el-button size="small" v-if="!userinfo.username" @click="goLogin"
          >登录</el-button
        >
        <template v-else>
          <span>欢迎：{{ userinfo.username }}</span>
          <i class="el-icon-switch-button" @click="loginout"></i>
        </template>
      </div>
    </el-menu>
  </div>
</template>

<script>
/* 
    问题： 例如我选择的是：http://localhost:8080/#/about，显示的内容是about页面的内容。
    但是我一点刷新：url: http://localhost:8080/#/about，显示的内容是首页的内容

    解决：
      方法一：本地存储，把点击的activeIndex值存储起来，刷新的时候，读本地的值, 配合自带的方法 @select="selectMenu" 使用，接收两个参数：index: 选中菜单项的 index, indexPath: 选中菜单项的 index path。配合生命周期使用
        代码：
        data() {
          return {
            activeIndex: "/",
          };
        },  
        methods: {
          selectMenu(index, indexPath) {
            // console.log(index, indexPath);
            localStorage.setItem("index", index);
          },
        },
        created() {
          let index = localStorage.getItem("index");
          // 如果存在就直接读，如果不存在说明用户第一次进，那就直接在首页的
          if (index) {
            this.activeIndex = index;
          }
        },

      方法二：又快又好的方法
        - 不在data中声明数据：activeIndex
        - 直接读取路由的路径 :default-active="$route.path"



      方法三：计算属性：https://blog.csdn.net/ygx_work/article/details/105849856
*/

import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      // activeIndex: "/",
    };
  },
  created() {
    /* let index = localStorage.getItem("index");
    // 如果存在就直接读，如果不存在说明用户第一次进，那就直接在首页的
    if (index) {
      this.activeIndex = index;
    } */
  },
  computed: {
    ...mapState("LoginModule", ["userinfo"]),
  },
  methods: {
    /* selectMenu(index, indexPath) {
      // console.log(index, indexPath);
      localStorage.setItem("index", index);
    }, */

    ...mapMutations("LoginModule", ["clearUser"]),
    // 退出登录
    loginout() {
      // 1. 清空vuex用户信息
      this.clearUser();
      // 2. 清空本地数据
      localStorage.removeItem("userinfo");
      // 3. 回到首页
      this.$router.push("/");
      // 这里也可以做判断
      /* if (this.$route.path !== "/") {
        this.$router.push("/login");
      } */
    },
    goLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.nav {
  background-color: #545c64;
}
.el-menu-demo {
  width: 1200px;
  margin: 0 auto;
}
.el-menu.el-menu--horizontal {
  border: none;
}
.nav-right {
  float: right;
  line-height: 60px;
  color: #fff;
}
.nav-right span {
  padding-right: 10px;
}
.el-icon-switch-button {
  cursor: pointer;
  font-size: 20px;
  vertical-align: middle;
}

.el-icon-switch-button:active {
  color: red;
}
</style>