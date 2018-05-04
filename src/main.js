// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import rest from  './style/reset.css'
import App from './App';
import 'swiper/dist/css/swiper.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import router from './router';
import store from './store';
import axios from 'axios';
import qs from 'qs'
import VueAxios from 'vue-axios'
// import Vuex from './store';
import 'lib-flexible'
import 'es6-promise/auto'
// swiper组件
Vue.use(VueAwesomeSwiper);
/*vux 组件*/
import { ViewBox,Tab,TabItem,Swiper, SwiperItem} from 'vux'
Vue.use(ViewBox);
Vue.use(Swiper);
Vue.use(SwiperItem);
Vue.use(Tab);
Vue.use(TabItem);
/*vux 组件 End*/
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;
// axios 配置
axios.defaults.timeout = 5000;
// axios.defaults.baseURL = 'http://www.greonline.cn';
axios.defaults.baseURL = 'http://gre.cc';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 或者使用箭头函数
// axios.defaults.transformRequest = [data => qs.stringify(data)];


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  // render: h => h(App)
  template: '<App/>'
});


