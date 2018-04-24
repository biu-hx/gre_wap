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
const bkDownload = (resolve) => {
  import('../components/bk/bkDownload').then((module) => {
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
    },
    {
      path: '/bkDownload',
      name: 'bkDownload',
      component: bkDownload,
    },
  ]
})
