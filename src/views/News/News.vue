<template>
  <div class="container">
    <h2>新闻界面</h2>
    <!-- 
      el-tabs：
        属性：
          - v-model="activeName"  绑定值，选中选项卡的 name

        事件 Events：
          - tab-click	tab 被选中时触发	被选中的标签 tab 实例

      el-tab-pane：
        属性：
          - label	选项卡标题	string
          - name	与选项卡绑定值 value 对应的标识符，表示选项卡别名
     -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="要闻" name="1">
        <ul class="list">
          <li v-for="item in yaowenList" :key="item.docid">
            <img :src="item.imgsrc" alt="" />
            <div class="info">
              <div class="title">{{ item.title }}</div>
            </div>
            <div class="news-bottom">
              <div clsss="news-source">来源：{{ item.source }}</div>
              <div class="news-time">时间：{{ item.ptime }}</div>
              <div class="news-comment">评论数{{ item.commentCount }}</div>
            </div>
          </li>
        </ul>

        <!-- 显示分页器 -->
        <MyPagination
          :pageSize="pageSize"
          :total="total"
          @getPage="getPage"
        ></MyPagination>
      </el-tab-pane>
      <el-tab-pane label="国内" name="2">配置管理</el-tab-pane>
      <el-tab-pane label="国际" name="3">角色管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  junshi,
  yaowen,
  guonei,
  guoji,
  caijing,
  keji,
  yule,
} from "../../api/type";
/* 引入分页器 */
import MyPagination from "../../components/MyPagination.vue";
export default {
  data() {
    return {
      activeName: "1",
      yaowenList: [],
      total: 10,
      pageSize: 1,
    };
  },
  components: { MyPagination },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },

    // 要闻的---点击分页获取数据
    getPage(num) {
      // 1. 要闻数据----------
      this.$api.getNews(yaowen, num).then((res) => {
        this.yaowenList = res;
        document.documentElement.scrollTop = 0;
      });
    },
  },
  created() {
    // 1. 要闻数据----------
    this.$api.getNews(yaowen, 1).then((res) => {
      // console.log(res);
      this.yaowenList = res;
    });

    // 2. 国内新闻----------
    this.$api.getNews(guonei, 1).then((res) => {
      // console.log(res);
      // 在这里可以继续写国内新闻的数据，接口已经获取到了
    });
  },
};
</script>

<style scoped>
.container {
  width: 1200px;
  margin: 20px auto;
  background-color: #f5f5f5;
  padding: 15px;
}

.el-tabs {
  width: 1100px;
  margin: 0 auto;
}

.container h2 {
  text-align: center;
}

ul.list .info {
  width: 1000px;
}

ul.list li .news-bottom {
  display: flex;
  flex-wrap: wrap;
  width: 2500px;
  height: 60px;
  margin: 0 30px;
  box-sizing: border-box;
}

ul.list li .news-bottom div {
  margin-right: 20px;
  font-size: 12px;
  color: #333;
}

.list li {
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  padding: 5px;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 5px;
}

.list img {
  width: 140px;
  height: 88px;
  margin-right: 10px;
  border-radius: 5px;
}
</style>