/**
 * 搭建后台 - 写一个登录接口(目的：辅助讲token)
 *  - 搭建后台服务：npm i express -S
 *  - token: npm i jsonwebtoken -S
 * 
 * 前端获取token后，解析token字段
 *  - 安装：npm i jwt-decode -S
 *  - 生产token：npm i jsonwebtoken -S
 * 
 * 前端解析token：一般都是后台返回用户名，如果没有，那就让后台加一个字段，实在不行，前端也可以自己解析token
 *  - 安装：npm i jwt-decode -S
 *  - 导入：import jwt from 'jwt-decode'
 *  - 使用：jwt(token字段)
 * 
 * 后台返回token的作用：就是用户的身份标识
 * token(令牌)是一串唯一的字符串, 通常由服务端生成, 在注册完成时返回给客户端, 用来标识此用户, 客户端将此字符串存储在本地。
 * 
 * web token 原理 阮一峰：http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html
 */

// 创建一个服务
const express = require('express');
const app = express();
const cors = require('cors'); // 资源共享
app.use(cors());

// 生成token标识
const jwt = require('jsonwebtoken');
// 生成语法：const token = jwt.sign('数据', '秘钥(这个秘钥只有后台人员知道)', '过期时间(不设置就是永久有效)')
// 过期时间：{ expiresIn: 60 * 60} 也可以这样写{ expiresIn: '1d/1h'}
// 引入秘钥
const secret = require('./secret'); // 自己写的一个文件

// 登录接口
app.get('/login', (req, res) => { // 实际开发，不可能使用get做登录
  let user = req.query.user;
  let pwd = req.query.pwd;
  // --- 查询数据库验证账号密码是否重复 --- 这里省略了
  // 生成token --- 一般token是30多位，node生成的是90位，这个不用在意
  const token = jwt.sign({ user, id: 123 }, secret.secretKey, { expiresIn: 20 })
  res.send({
    info: 'success',
    status: 200,
    token,
    /* data: { // 实际开发，不可能把用户的密码返回过去
      // 实际开发时，后台返回的是用户登录的登录标识(token)，标识这个用户登录了
      user,
      pwd
    } */
  });
})



// 测试token是否过期
// 获取我的个人信息数据 - 验证token是否有效
/**
 * 查看个人信息 --- 有token权限
 * 请求方式：post请求 不要参数
 * token的时间是：登录的时候设置的：{expiresIn: 20 *}
 */
// 后端校验token是否过期 --- 后端的事情，我们了解即可


app.listen(8888, () => {
  console.log(8888);
})