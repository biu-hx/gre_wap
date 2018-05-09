import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLogin: false,
    userInfo: {
      uid: '9762',
      image: '',
      nickname:'xxxxx',
    },
    httpUrl: 'http://www.greonline.cn',
    httpUrl2: 'http://open.viplgw.cn',
    httpUrl3: 'http://bbs.viplgw.cn',
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
