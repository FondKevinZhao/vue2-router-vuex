<template>
  <div>
    <!-- 公共导航 -->
    <MyMenu></MyMenu>

    <!-- 出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
// 引入导航组件
import MyMenu from "../components/MyMenu.vue";
export default {
  components: {
    MyMenu,
  },
};
</script>

<style>
</style>