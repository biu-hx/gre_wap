import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
// 引入组件
// import index from '../components/index'
// import information from '../components/information/information'
const login = (resolve) => {
  import('../components/isLogin/login').then((module) => {
    resolve(module)
  })
};
const register = (resolve) => {
  import('../components/isLogin/register').then((module) => {
    resolve(module)
  })
};
const foundPassword = (resolve) => {
  import('../components/isLogin/foundPassword').then((module) => {
    resolve(module)
  })
};
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
// 活动
const active = (resolve) => {
  import('../components/active/active').then((module) => {
    resolve(module)
  })
};
const activeDetails = (resolve) => {
  import('../components/active/activeDetails').then((module) => {
    resolve(module)
  })
};
// 活动子组件 测试
const item_1 = (resolve) => {
  import('../components/active/child/item_1').then((module) => {
    resolve(module)
  })
};
const item_2 = (resolve) => {
  import('../components/active/child/item_1').then((module) => {
    resolve(module)
  })
};
const reference = (resolve) => {
  import('../components/reference/reference').then((module) => {
    resolve(module)
  })
};
// 个人中心
const userCenter = (resolve) => {
  import('../components/userCenter/userCenter').then((module) => {
    resolve(module)
  })
};
//订单
const order = (resolve) => {
  import('../components/order/order').then((module) => {
    resolve(module)
  })
};
// 订单详情
const orderDetails = (resolve) => {
  import('../components/order/orderDetails').then((module) => {
    resolve(module)
  })
};
// 收藏
const recordMarking = (resolve) => {
  import('../components/recordMarking/recordMarking').then((module) => {
    resolve(module)
  })
};
// 做题
const recordMarking2 = (resolve) => {
  import('../components/recordMarking/recordMarking2').then((module) => {
    resolve(module)
  })
};
// 错题
const recordMarking3 = (resolve) => {
  import('../components/recordMarking/recordMarking3').then((module) => {
    resolve(module)
  })
};
// 雷豆
const myLeid = (resolve) => {
  import('../components/myLeid/myLeid').then((module) => {
    resolve(module)
  })
};
const ld_1 = (resolve) => {
  import('../components/myLeid/child/ld_1').then((module) => {
    resolve(module)
  })
};
const ld_2 = (resolve) => {
  import('../components/myLeid/child/ld_2').then((module) => {
    resolve(module)
  })
};
const ld_3 = (resolve) => {
  import('../components/myLeid/child/ld_3').then((module) => {
    resolve(module)
  })
};
// GRE做题
const greMarking = (resolve) => {
  import('../components/greMarking/greMarking').then((module) => {
    resolve(module)
  })
};
//题库首页
const markingIndex = (resolve) => {
  import('../components/markingIndex/markingIndex').then((module) => {
    resolve(module)
  })
};
//做题页面
const markingDetails = (resolve) => {
  import('../components/testDetails/markingDetails').then((module) => {
    resolve(module)
  })
};
// 题型组件
const blank_1 = (resolve) => {
  import('../components/testDetails/child/blank_1').then((module) => {
    resolve(module)
  })
};
const blank_2 = (resolve) => {
  import('../components/testDetails/child/blank_2').then((module) => {
    resolve(module)
  })
};
const blank_3 = (resolve) => {
  import('../components/testDetails/child/blank_3').then((module) => {
    resolve(module)
  })
};
//结果详情
const testResult = (resolve) => {
  import('../components/testResult/testResult').then((module) => {
    resolve(module)
  })
};
//结果页题目详情
const testDetails = (resolve) => {
  import('../components/testDetails/testDetails').then((module) => {
    resolve(module)
  })
};
//搜索
const searchTopic = (resolve) => {
  import('../components/searchTopic/searchTopic').then((module) => {
    resolve(module)
  })
};
const search = (resolve) => {
  import('../components/searchTopic/search').then((module) => {
    resolve(module)
  })
};
//备考
const bkIndex = (resolve) => {
  import('../components/bk/bkIndex').then((module) => {
    resolve(module)
  })
};
// 机经真题子组件 测试
const list_1 = (resolve) => {
  import('../components/bk/bkList/list_1').then((module) => {
    resolve(module)
  })
};
const list_2 = (resolve) => {
  import('../components/bk/bkList/list_2').then((module) => {
    resolve(module)
  })
};
const list_3 = (resolve) => {
  import('../components/bk/bkList/list_3').then((module) => {
    resolve(module)
  })
};
const bkDownload = (resolve) => {
  import('../components/bk/bkDownload').then((module) => {
    resolve(module)
  })
};
// 课程
const courseDetails = (resolve) => {
  import('../components/course/courseDetails').then((module) => {
    resolve(module)
  })
};
const payAway = (resolve) => {
  import('../components/payAway/payAway').then((module) => {
    resolve(module)
  })
};
const confirmOrder = (resolve) => {
  import('../components/order/confirmOrder').then((module) => {
    resolve(module)
  })
};
const articleDetails = (resolve) => {
  import('../components/articleDetails/articleDetails').then((module) => {
    resolve(module)
  })
};

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: "/",
      name:'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/register',
      name: 'register',
      component: register,
    },
    {
      path: '/foundPassword',
      name: 'foundPassword',
      component: foundPassword,
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
    {
      path: '/activeDetails',
      name: 'activeDetails',
      component: activeDetails,
      child: [
        {path: '/item_1', component: item_1},
        {path: '/item_2', component: item_2},
      ]
    },
    {
      path: '/reference',
      name: 'reference',
      component: reference,
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      component: userCenter,
    },
    {
      path: '/order',
      name: 'order',
      component: order,
    },
    {
      path: '/orderDetails',
      name: 'orderDetails',
      component: orderDetails,
    },
    // 收藏
    {
      path: '/recordMarking',
      name: 'recordMarking',
      component: recordMarking,
    },
    // 做题
    {
      path: '/recordMarking2',
      name: 'recordMarking2',
      component: recordMarking2,
    },
    // 错题
    {
      path: '/recordMarking3',
      name: 'recordMarking3',
      component: recordMarking3,
    },
    {
      path: '/myLeid',
      name: 'myLeid',
      component: myLeid,
      child:[
        {path: '/ld',name:'ld_1' ,component: ld_1},
        {path: '/ld',name:'ld_2' ,component: ld_2},
        {path: '/ld',name:'ld_3' ,component: ld_3},
      ]
    },
    {
      path: '/greMarking',
      name: 'greMarking',
      component: greMarking,
    },
    {
      path: '/markingIndex',
      name: 'markingIndex',
      component: markingIndex,
    },
    {
      path: '/markingDetails',
      name: 'markingDetails',
      component: markingDetails,
      child:[
        {path: '/blank_1',name:'blank_1' ,component: blank_1},
        {path: '/blank_2',name:'blank_2' ,component: blank_2},
        {path: '/blank_3',name:'blank_3' ,component: blank_3},
      ]
    },
    {
      path: '/testResult',
      name: 'testResult',
      component: testResult,
    },
    {
      path: '/testDetails',
      name: 'testDetails',
      component: testDetails,
    },
    {
      path: '/searchTopic',
      name: 'searchTopic',
      component: searchTopic,
    },
    {
      path: '/search',
      name: 'search',
      component: search,
    },
    {
      path: '/bkIndex',
      name: 'bkIndex',
      component: bkIndex,
      child: [
        {path: '/list_1', component: list_1},
        {path: '/list_2', component: list_2},
        {path: '/list_3', component: list_3},
      ]

    },
    {
      path: '/bkDownload',
      name: 'bkDownload',
      component: bkDownload,
    },
    {
      path: '/courseDetails',
      name: 'courseDetails',
      component: courseDetails,
    },
    {
      path: '/payAway',
      name: 'payAway',
      component: payAway,
    },
    {
      path: '/confirmOrder',
      name: 'confirmOrder',
      component: confirmOrder,
    },
    {
      path: '/articleDetails',
      name: 'articleDetails',
      component: articleDetails,
    },
  ]
})
