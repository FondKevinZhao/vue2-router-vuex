<template>
  <div class="home">
    <!-- 1. 轮播图 -->
    <Banner :banner="banner"></Banner>

    <!-- 2. 蓝莓酱 -- 因为这个有分页 -->
    <Lanmei :list="list"></Lanmei>

    <!-- 3. 分页 -->
    <MyPagination
      :total="total"
      :pageSize="pageSize"
      @getPage="getPage"
    ></MyPagination>

    <!-- 4. 返回顶部 -->
    <el-backtop></el-backtop>
  </div>
</template>

<script>
// @ is an alias to /src
import Banner from "./Banner.vue";
import Lanmei from "./Lanmei.vue";
import MyPagination from "../../components/MyPagination.vue";
export default {
  name: "Home",
  components: { Banner, Lanmei, MyPagination },
  data() {
    return {
      banner: [],
      list: [], // 蓝莓数据
      total: 100,
      pageSize: 10,
    };
  },
  created() {
    // 轮播图的数据
    this.$api.getBanner().then((res) => {
      // console.log(res.data);
      let banner = res.data.banner;
      // console.log(banner); // banner 是个数组
      // 把banner中的img属性的地址中域名：http://www.wwtliu.com/sxtstu 替换成我们的域名：http://iwenwiki.com/api
      for (let i = 0; i < banner.length; i++) {
        banner[i].img = banner[i].img.replace(
          "http://www.wwtliu.com/sxtstu",
          "http://iwenwiki.com/api"
        );
      }
      // console.log(banner);
      this.banner = banner;
    });

    // 获取蓝莓派的数据
    this.getHttp(1); // 这个参数1指的是页码的1，如果不传那么就会报错
  },
  methods: {
    // 获取从分页组件传过来的页码数 --- 我能够知道你点击的是第几页
    getPage(num) {
      // console.log(num);
      // 请求对应的页码的接口数据
      this.getHttp(num);
      // 分页改变后，窗口内容返回顶部
      document.documentElement.scrollTop = 570; // 这个数值是滚动条的距离，可以根据自己的要求来调整，如果是0则返回到顶部
    },

    // 请求蓝莓派数据的方法和分页的方法
    getHttp(page) {
      // 蓝莓酱的数据
      this.$api
        .getLanmei({
          blueBerryjam_id: page, // 只要用户改变了分页，这个page就会跟着改变
        })
        .then((res) => {
          // console.log("蓝莓", res.data);
          // 蓝莓数据数组 - 域名换一下
          let arr = res.data.blueBerryJam; // [{}, {},...]
          arr.forEach((ele) => {
            ele.img = ele.img.replace(
              "http://iwen.wiki/sxtstu",
              "http://iwenwiki.com/api"
            );
          });
          // 获取蓝牌的数据
          this.list = arr;
          // 获取分页的数据
          this.total = res.data.maxPage;
          this.pageSze = 1;
        });
    },
  },
};
</script>
