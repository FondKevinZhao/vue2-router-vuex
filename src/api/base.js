/* 
  接口配置
*/

// 一个个的导出
/* export const host = 'http://localhost:8888';
export const host1 = 'http://localhost:8888';
export const host2 = 'http://localhost:8888';
export const host3 = 'http://localhost:8888'; */


// 默认导出
const base = {
  host: 'http://iwenwiki.com', // 基础地址/域名
  bannerUrl: '/api/blueberrypai/getIndexBanner.php', // 轮播接口  // 这个接口不会产生跨域，可以直接用
  login: 'http://localhost:8888/login', // 登录接口 --- node中配了cors了，所以不会跨域
  lanmei: '/api/blueberrypai/getBlueBerryJamInfo.php', // 蓝莓酱的接口
  // 这个type是要拼接在后面的/touch/reconstruct/article/list/'+type+'/0-10.html
  // 具体这个type是什么内容，我们已经建立了一个type.js文件
  // 0-10.html：0表示页数，10表示一页显示的条数
  news: "/foo/touch/reconstruct/article/list/", // '+type+'/0-10.html

  // 穷游接口
  // 搜索接口  --- 补一个词 keyword: keyword=%E4%BA%91
  search: '/boo/qcross/home/ajax?action=hotelsearch&type=1',
  // 今日推荐
  tuijian: '/boo/qcross/home/index.php?action=recommend&timer=1638347951752&ajaxID=59b0b70acebeb65c1882399e',
}
export default base;