<template>
  <div class="container">
    <h2 class="title">蓝莓酱</h2>
    <ul class="list">
      <li v-for="(item, index) in list" :key="item.index">
        <div class="item">
          <img :src="item.img" alt="" />
          <span>{{ item.title }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["list"],
};
</script>

<style scoped>
.container {
  width: 1200px;
  margin: 20px auto;
}
.title {
  text-align: center;
  padding: 10px;
}
.list {
  display: flex;
  flex-wrap: wrap;
}
.list li {
  position: relative;
  box-sizing: border-box;
  margin-bottom: 20px;
  width: 20%;
  height: 220px;
  padding: 10px;
}
.list li .item {
  background-color: #eee;
}
.list li .item span {
  position: absolute;
  right: 20px;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
  border-radius: 4px;
  padding: 4px;
}
.list li .item img {
  width: 100%;
}
</style>