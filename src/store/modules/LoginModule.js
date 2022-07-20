export default {
  // 命名空间
  namespaced: true,
  state: {
    userinfo: {
      username: '',
      token: null,
    }
  },
  mutations: {
    // 设置token
    setUser(state, payload) {
      state.userinfo = payload;
    },
    // 清空用户信息
    clearUser(state,) {
      state.userinfo = {
        username: '',
        token: null,
      }
    }
  },
  actions: {

  }
}