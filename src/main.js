// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import rest from './style/reset.css';
import App from './App';
import 'swiper/dist/css/swiper.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import router from './router';
import store from './store';
import qs from 'qs';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'lib-flexible';
import 'es6-promise/auto';
import Share from 'vue-social-share';
import 'vue-social-share/dist/client.css';
import VueClipboard from 'vue-clipboard2';



require('vue2-animate/dist/vue2-animate.min.css');

// 时间格式化
Vue.use(require('vue-moment'));
Vue.use(VueClipboard);
// swiper组件
Vue.use(VueAwesomeSwiper);
/*vux 组件*/
import {ViewBox, Tab, TabItem, Swiper, SwiperItem} from 'vux'

Vue.use(ViewBox);
Vue.use(Swiper);
Vue.use(SwiperItem);
Vue.use(Tab);
Vue.use(TabItem);
/*vux 组件 End*/
Vue.use(Share);
Vue.use(VueAxios, axios);


Vue.config.productionTip = false;
// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://www.greonline.cn';
// axios.defaults.baseURL = 'http://gre.cc';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.transformRequest = [function (data) {
  return qs.stringify(data)
}];
// 或者使用箭头函数
// axios.defaults.transformRequest = [data => qs.stringify(data)];
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    //设置SEO
    document.title = to.meta.title;
    document.querySelector('meta[name="keywords"]').setAttribute('content', to.meta.keywords);
    document.querySelector('meta[name="description"]').setAttribute('content', to.meta.description);
  }
  next();
});

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  // render: h => h(App)
  template: '<App/>'
});


