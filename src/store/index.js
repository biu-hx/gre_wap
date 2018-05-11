import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLogin: false,
    userInfo: {
      uid: '9762',
      image: '',
      nickname: 'xxxxx',
    },
    http_gre: 'http://www.greonline.cn',
    http_open: 'http://open.viplgw.cn',
    // http_bbs: 'http://bbs.viplgw.cn',
    http_bbs: 'http://bbs.cc',
  },
  actions: {
    isLogin({commit}) {
      commit('isLogin');
    }
  },
  mutations: {
    // 设置登录
    isLogin(state) {
      state.isLogin = true;
    }
  },
  getters: {
    getLoginState(state) {
      return state.isLogin;
    }
  }

});

export default store;
