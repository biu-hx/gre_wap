// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import rest from  './style/reset.css'
import App from './App';
import 'swiper/dist/css/swiper.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import router from './router';
import 'lib-flexible'
import { ViewBox,Tab,TabItem,Swiper, SwiperItem} from 'vux'

Vue.use(ViewBox);
Vue.use(Swiper);
Vue.use(SwiperItem);
Vue.use(Tab);
Vue.use(TabItem);

Vue.use(VueAwesomeSwiper);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  // render: h => h(App)
  template: '<App/>'
});


