module.exports = {
  devServer: {
    proxy: {
      // 网易新闻的接口
      '/foo': {
        target: 'http://3g.163.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/foo': ''
        }
      },

      // 穷游网搜索接口
      '/boo': {
        target: 'https://www.qyer.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/boo': ''
        }
      },
    }
  }
}