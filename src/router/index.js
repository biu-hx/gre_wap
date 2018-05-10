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
const userCenter = (resolve) => {
  import('../components/userCenter/userCenter').then((module) => {
    resolve(module)
  })
};
const order = (resolve) => {
  import('../components/order/order').then((module) => {
    resolve(module)
  })
};
const orderDetails = (resolve) => {
  import('../components/order/orderDetails').then((module) => {
    resolve(module)
  })
};
const recordMarking = (resolve) => {
  import('../components/recordMarking/recordMarking').then((module) => {
    resolve(module)
  })
};
const myLeid = (resolve) => {
  import('../components/myLeid/myLeid').then((module) => {
    resolve(module)
  })
};
const greMarking = (resolve) => {
  import('../components/greMarking/greMarking').then((module) => {
    resolve(module)
  })
};
const markingIndex = (resolve) => {
  import('../components/markingIndex/markingIndex').then((module) => {
    resolve(module)
  })
};
const testResult = (resolve) => {
  import('../components/testResult/testResult').then((module) => {
    resolve(module)
  })
};
const testDetails = (resolve) => {
  import('../components/testDetails/testDetails').then((module) => {
    resolve(module)
  })
};
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
    {
      path: '/recordMarking',
      name: 'recordMarking',
      component: recordMarking,
    },
    {
      path: '/myLeid',
      name: 'myLeid',
      component: myLeid,
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
