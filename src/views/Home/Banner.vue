<template>
  <div>
    <el-carousel trigger="click" height="500px">
      <el-carousel-item v-for="item in banner" :key="item.title">
        <img :src="item.img" height="500px" width="100%" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: {
    banner: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
};
</script>

<style>
</style>