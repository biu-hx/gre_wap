import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const localCooki = window.localStorage;
const sessionCooki = window.sessionStorage;

const store = new Vuex.Store({
  state: {
    isLogin: JSON.parse(localCooki.isLogin || 'false'),
    userInfo: JSON.parse(localCooki.userInfo || 'false'),
    http_gre: 'http://www.greonline.cn',
    http_open: 'http://open.viplgw.cn',
    // http_bbs: 'http://bbs.viplgw.cn',
    http_bbs: 'http://bbs.cc',
  },
  // 事件触发
  actions: {
    isLogin({commit}) {
      commit('isLogin');
    },
    userInfo({commit}) {
      commit('userInfo');
    }
  },
  // 突变
  mutations: {
    // 设置登录
    isLogin(state, val) {
      state.isLogin = val;
    },
    userInfo(state, val) {
      state.userInfo = val;
    }
  },
  // 更新状态
  getters: {
    getLoginState(state) {
      return state.isLogin;
    },
    getUserInfo(state) {
      if (state.isLogin) {
        localCooki.setItem('userInfo', JSON.stringify(state.userInfo));
      }
      return state.userInfo;
    }
  }

});

export default store;
