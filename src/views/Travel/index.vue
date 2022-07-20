<template>
  <div>
    <!-- 1. 搜索区域 -->
    <div class="wrapper">
      <img src="../../assets/img/banner.jpg" width="100%" height="500px" />
      <div class="search">
        <div class="inp">
          <input type="text" placeholder="搜目的地" v-model="inpVal" />
        </div>
        <div class="btn">搜索</div>
        <!-- 搜索框下的展示内容区域 -->
        <div class="show-data" v-show="isShow">
          <p>城市</p>
          <ul>
            <li v-for="item in list" :key="item.cn_name">
              {{ item.cn_name }} <span>{{ item.en_name }}</span>
              <span class="right" v-if="item.count > 0"
                >{{ item.count }}家酒店</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 2. 今日推荐 -->
    <div class="section">
      <div class="title">今日推荐</div>
      <ul class="content">
        <li v-for="item in tuijian" :key="item.href">
          <a :href="item.data.href" target="_blank">
            <div class="img">
              <!-- 如果 :class="{ animate: item.type !== 'video' }" -->
              <img
                width="273"
                height="185"
                :src="item.data.pic"
                alt="图片403，被禁止访问"
              />
            </div>
          </a>
          <div class="info">
            <a href="#">
              <div class="desc">
                {{ item.data.subject }}
              </div>
              <div class="bottom">
                <strong>{{ item.data.username }}</strong>
                <span v-if="item.options">{{ item.options }}预览过</span>
                <span v-else>{{ item.data.tag }}</span>
              </div>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      list: [],
      inpVal: "", // 搜索的数据
      tuijian: [], // 推荐数据的容器
    };
  },
  methods: {
    search() {
      console.log("sousuo");
    },
  },
  // 监听数据修改
  watch: {
    inpVal(keyword) {
      // console.log("newVal", newVal);
      // 调用搜索接口
      this.$api
        .getSearch({ keyword })
        .then((res) => {
          // console.log("搜搜请求的数据--", res.data);
          // 判断数据是否有查询到
          if (res.data.data.list.length == 0) {
            // 这里list就是数组数据
            this.isShow = false;
            this.list = [];
            return;
          }
          // 有数据 --- 渲染数据
          this.list = res.data.data.list;
          // 下面的悬浮框显示
          this.isShow = true;
        })
        .catch(() => {
          // console.log(err);
          this.isShow = false;
          return;
        });
    },
  },
  created() {
    // 获取今日推荐
    this.$api.getTuijian().then((res) => {
      const data = res.data.data;
      console.log(data);
      this.tuijian = data;
    });
  },
};
</script>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 500px;
}

.wrapper .search {
  position: absolute;
  top: 220px;
  left: 50%;
  margin-left: -250px;
  border-radius: 6px;
  width: 600px;
  height: 70px;
  padding-left: 20px;
  /* background-color: rgba(5, 105, 75, 0.7); */
  /* 添加线性渐变 */
  background-image: linear-gradient(
    90deg,
    rgba(40, 213, 164, 0.8),
    rgba(38, 208, 181, 0.8)
  );
  display: flex;
}

.wrapper .search .inp {
  width: 470px;
  background-color: #fff;
  height: 40px;
  margin-top: 15px;
  border-radius: 4px;
  padding-left: 10px;
}

.wrapper .search .inp input {
  width: 470px;
  height: 40px;
  border: none;
  outline: none;
  border-radius: 4px;
}

.wrapper .search .btn {
  width: 100px;
  height: 40px;
  background-image: linear-gradient(90deg, #ff168f, #ff5854);
  cursor: pointer;
  margin: 15px 20px 0 10px;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  line-height: 40px;
  /* 让按钮文本不被选中 */
  user-select: none;
}

.wrapper .search .btn:active {
  background-image: linear-gradient(90deg, #ff5854, #ff168f);
  box-shadow: 0 0 5px rgb(0 0 0 / 20%);
}

.wrapper .search .btn:hover {
  opacity: 0.9;
  box-shadow: 0 0 5px rgb(0 0 0 / 10%);
}

/* 搜索内容的展示 */
.search .show-data {
  position: absolute;
  top: 65px;
  left: 20;
  width: 440px;
  min-height: 60px;
  background-color: #fff;
  border-radius: 4px;
  overflow: auto;
  padding: 10px;
  scrollbar-width: none;
}

.search .show-data p {
  margin: 0 0 5px 5px;
}

.search .show-data li {
  color: #333;
  line-height: 35px;
  padding: 0 5px;
}

.search .show-data li:hover {
  background-color: #eee;
  cursor: pointer;
  border-radius: 5px;
}

.search .show-data span {
  color: #999;
  font-size: 14px;
}
.search .show-data span.right {
  float: right;
}

/* 今日推荐 */
.section {
  width: 1160px;
  margin: 0 auto;
}
.section .content li {
  float: left;
  width: 275px;
  height: 300px;
  border: 1px solid #eee;
  box-sizing: border-box;
  margin-bottom: 20px;
  margin-right: 20px;
}

.section .content li:nth-child(4n) {
  margin-right: 0px;
}

.section .title {
  position: relative;
  height: 74px;
  color: #636363;
  text-align: center;
  font: 36px/74px Hiragino Sans GB, Microsoft YaHei;
}

.section .content li:hover {
  box-shadow: 0 0 5px rgb(0 0 0 / 20%);
}

.section .content li .img {
  width: 275px;
  height: 185px;
  overflow: hidden;
}

.section .content li .img img.animate {
  /* 加过渡 */
  transition: all 1.5s;
}

.section .content li .img img.animate:hover {
  transform: scale(1.3);
}

.section .content li .info {
  padding: 0 10px;
}

.section .content li .info .desc {
  margin-top: 14px;
  height: 44px;
  font-size: 16px;
  overflow: hidden;
  color: #333;
}

.info .bottom {
  margin-top: 16px;
  height: 24px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #636363;
}

.info .bottom span {
  float: right;
}
</style>