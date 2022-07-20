/**
 * 公共的请求方法
 */

import base from './base'
import axios from 'axios'
import { yaowen, guoji, guonei } from './type'
const api = {
  /**
   * 轮播接口：在Home组件里读取数据
   */
  getBanner() {
    return axios.get(base.host + base.bannerUrl);
  },

  /**
   * 登录接口 user pwd
   */
  getLogin(params) { // 这个params接收一个对象：params = {user: '', pwd:''}
    return axios.get(base.login, {
      params
    })
  },

  /**
   * 获取蓝莓酱 
   *  参数：blueBerryjam_id
   */
  getLanmei(params) { // params = {}
    return axios.get(base.host + base.lanmei, {
      params
    })
  },

  /**
   * yaowen的新闻 '+type+'/0-10.html
   * 说明最后的参数变量：/0-10.html
   *  - 第一个参数：表示获取数据的偏移量，下标开始的位置。[0, 10, 20, 30, ..., 100] 假定：最大取到100页
   *  - 第二个表示：获取当前数据的条数
   * 
   * BBM54PGAwangning
   */
  getNews(type, num) { // num = 1 2 3 4
    /* .then 后面返回的数据是jsonp格式的，需要做一下处理：
         1. 通过slice方法截取我们所要的数据
         2. 通过JSON.parse()方法，把jsonp的字符串转换为对象数据
         3. 我们在组件中使用的时候就可以直接调用了，如：
          // 获取国内新闻数据----------
          this.$api.getNews(guonei).then((res) => {
            console.log(res[guonei]);
          });
    */
    return axios.get(base.news + type + '/' + (num - 1) * 10 + '-10.html').then(res => {
      let data = JSON.parse(res.data.slice(9, -1));
      // type 返回的这个，就是data对象中的属性名，这个属性名的值是一个我们需要的数组，所以data[type]返回的是一个数组
      return data[type];
    })
  },

  /**
   * 穷游网 搜索接口
   * 
   */
  getSearch(params) {//{keyword:xx}
    return axios.get(base.search, {
      params
    })
  },

  /**
   * 今日推荐
   */
  getTuijian() {
    return axios.get(base.tuijian)
  }
}

export default api;