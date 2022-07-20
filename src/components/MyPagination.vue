<template>
  <div class="pager">
    <!-- 
      分页属性：
        - background            可以为
        - layout="prev, pager, next"   后退、中间、前进页码
        - layout	组件布局，子组件名用逗号分隔	String total 显示共多少条 jumper跳转到多少页
        - total	                总条目数	number	
        - page-size	每页显示的条数，number 默认是一页10条

      分页事件：Events
        - current-change	currentPage 改变时会触发	当前页(默认)
        - prev-click	用户点击上一页按钮改变当前页后触发	当前页
        - next-click	用户点击下一页按钮改变当前页后触发	当前页

      注意：
        - 这是一个纯组件，不要在这里面发请求
     -->
    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      :total="total"
      :page-size="1"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 100,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  methods: {
    changePage(num) {
      // num 接收当前页码：点到哪一页，它就是显示几
      // console.log(num);
      // 传递给父组件 -- 页码
      this.$emit('getPage', num);
    },
  },
};
</script>

<style scoped>
.pager {
  text-align: center;
  margin-bottom: 20px;
}
</style>