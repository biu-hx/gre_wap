import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
// 引入组件
// import index from '../components/index'
// import information from '../components/information/information'
const index = (resolve) => {
  import('../components/index').then((module) => {
    resolve(module)
  })
};
const information = (resolve) => {
  import('../components/information/information').then((module) => {
    resolve(module)
  })
};
const active = (resolve) => {
  import('../components/active/active').then((module) => {
    resolve(module)
  })
};

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: "/",
      component: index
    },
    {
      path: '/information',
      name: 'information',
      component: information,
    },
    {
      path: '/active',
      name: 'active',
      component: active,
    },
  ]
})
