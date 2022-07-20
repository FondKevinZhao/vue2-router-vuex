<template>
  <div>
    <h2 class="title">登录界面</h2>
    <!-- 
      el-form
        - model	                  表单数据对象	object
        - ref="ruleForm"          获取DOM元素
        - status-icon             status-icon	是否在输入框中显示校验结果反馈图标	boolean  大白话：就是可以input框里，靠右边的小叉号和小√号
        - :rules="rules"          表单验证的规则
        - label-width="100px"     文本宽度

      el-form-item：表单的每一项的内容
        - label="账号"             每一项的标题文本
        - prop="checkPass"         表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的。大白话：prop的值要跟data中你表单的值匹配上            

      注意：
        - 方法：element 中的方法是直接可以用的。如：Form Methods中的resetFields()
        - 事件：需要我们自己去写。如：Form Events 中的alidate
        - validate 比较特殊，即是方法，也是事件，具体使用查看Form表单

      特别注意：token存入vuex，一旦刷新，又需要重新登录。还是需要做一下数据持久化(把数据存入到本地localStorage);
     -->
    <div class="box">
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="60px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 1. 安装 jwt-decode 2. 导入
import jwt from "jwt-decode";

export default {
  data() {
    let validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 提交表单事件 --- 注意：点击提交，需要开启服务器
    submitForm(formName) {
      // this.$refs[formName]：获取当前的表单对象，就是el-form的DOM对象
      // validate：是element提供的方法
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log("校验成功", this.loginForm);
          // 请求登录接口 --- 拿到后台的token --》通过vuex存储 ---》把token给到路由拦截器(在路由中读取，vuex的数据组件可以读，js也可以读)
          this.$api
            .getLogin({
              user: this.loginForm.username,
              pwd: this.loginForm.password,
            })
            .then((res) => {
              // console.log(res.data); // 请求到的数据，有token，没有user
              // 存储数据给vuex实现组件共享数据资源
              // console.log(jwt(res.data.token)); // 使用引入的插件方法jwt()解析后台的token，能够成功拿到user

              let obj = {
                token: res.data.token,
                username: jwt(res.data.token).user,
              };
              // 把obj数据存入到vuex中
              this.$store.commit("LoginModule/setUser", obj);

              //  数据持久化
              localStorage.setItem("userinfo", JSON.stringify(obj));

              // 跳转到首页
              this.$router.push("/");
            });
        } else {
          console.log("校验失败");
          return false;
        }
      });
    },
    // 重置表单事件
    // resetFields：是element提供的方法
    resetForm(formName) {
      // element提供的重置
      this.$refs[formName].resetFields();

      // 自己也可以写重置 --- 我们的重置没有清除校验规则
      /* this.loginForm.username = "";
      this.loginForm.password = ""; */
    },
  },
};
</script>

<style scoped>
.title {
  text-align: center;
  margin-top: 70px;
}

.box {
  width: 300px;
  height: 200px;
  box-shadow: 0 0 5px 5px rgba(134, 134, 134, 0.1);
  margin: 20px auto;
  padding: 20px 20px 20px 0px;
}
</style>