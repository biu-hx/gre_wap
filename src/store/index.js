import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const state = {
  httpUrl: 'http://www.greonline.cn',
  httpUrl2: 'http://open.viplgw.cn',
};
export default new Vuex.Store({
  state,
})
