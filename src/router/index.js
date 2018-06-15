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
// 邀请好友
const invite = (resolve) => {
  import('../components/userCenter/invite').then((module) => {
    resolve(module)
  })
};
// 个人资料
const userInfo = (resolve) => {
  import('../components/userCenter/userInfo').then((module) => {
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
const blank_int = (resolve) => {
  import('../components/testDetails/child/blank_int').then((module) => {
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
//题目详情
const questionDetails = (resolve) => {
  import('../components/testDetails/questionDetails').then((module) => {
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
//发帖
const sendTz = (resolve) => {
  import('../components/bk/sendTz').then((module) => {
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
const courseIndex = (resolve) => {
  import('../components/course/courseIndex').then((module) => {
    resolve(module)
  })
};
const courseDetails = (resolve) => {
  import('../components/course/courseDetails').then((module) => {
    resolve(module)
  })
};
//子组件
const course_item_1 = (resolve) => {
  import('../components/course/child/item_1').then((module) => {
    resolve(module)
  })
};
const course_item_2 = (resolve) => {
  import('../components/course/child/item_2').then((module) => {
    resolve(module)
  })
};
const course_item_3 = (resolve) => {
  import('../components/course/child/item_3').then((module) => {
    resolve(module)
  })
};
const course_item_4 = (resolve) => {
  import('../components/course/child/item_4').then((module) => {
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
// 地址
const addressWrap = (resolve) => {
  import('../components/address/address').then((module) => {
    resolve(module)
  })
};
const adressEditor = (resolve) => {
  import('../components/address/address_editor').then((module) => {
    resolve(module)
  })
};

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: "/",
      name: 'index',
      component: index,
      meta: {
        title: 'GRE培训|GRE考试|GRE在线课程|GRE网课|GRE机经真题_雷哥GRE培训官网',
      }
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
      meta: {
        title: '如何备考GRE|GRE备考攻略|GRE考试内容|GRE填空|GRE阅读|GRE词汇|GRE培训_雷哥GRE培训官网',
        keywords: '如何备考GRE,GRE备考攻略,GRE考试内容,GRE填空,GRE阅读,GRE词汇,GRE数学,GRE写作,GRE培训,GRE是什么考试,GRE考试辅导,GRE在线课程,GRE网课,GRE机经真题,雷哥GRE培训中心,美国留学，雷哥培训',
        description: '雷哥GRE培训官网，提供GRE备考攻略，GRE备考知识，GRE备考经验，GRE填空阅读数学写作考试内容详解，GRE在线课程，GRE网课，GRE视频课程，GRE考试辅导等GRE备考服务，帮助学生快速提分，早日考出满意的GRE成绩。'
      }
    },
    {
      path: '/active',
      name: 'active',
      component: active,
      meta: {
        title: 'GRE名师公开课|GRE刷题团|GRE词汇团|GRE培训_雷哥GRE培训官网',
        keywords: 'GRE名师公开课,GRE刷题团,GRE培训,GRE是什么考试,GRE考试辅导,GRE在线课程,GRE网课,GRE机经真题,雷哥GRE培训中心,美国留学，雷哥培训',
        description: '雷哥GRE培训官网，提供GRE名师公开课，GRE刷题团，GRE词汇团，GRE培训课程，GRE在线课程，GRE网课，GRE视频课程，GRE考试辅导等GRE备考服务，帮助学生快速提分，早日考出满意的GRE成绩。',
      }
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
      meta:{
        title:'如何备考GRE|GRE备考攻略|GRE考试内容|GRE填空|GRE阅读|GRE词汇|GRE培训_雷哥GRE培训官网',
        keywords:'如何备考GRE,GRE备考攻略,GRE考试内容,GRE填空,GRE阅读,GRE词汇,GRE数学,GRE写作,GRE培训,GRE是什么考试,GRE考试辅导,GRE在线课程,GRE网课,GRE机经真题,雷哥GRE培训中心,美国留学，雷哥培训',
        description:'雷哥GRE培训官网，提供GRE备考攻略，GRE备考知识，GRE备考经验，GRE填空阅读数学写作考试内容详解，GRE在线课程，GRE网课，GRE视频课程，GRE考试辅导等GRE备考服务，帮助学生快速提分，早日考出满意的GRE成绩。'
      }
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      component: userCenter,
      meta: {
        title: '个人中心_雷哥GRE在线做题平台'
      }
    },
    //订单
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
      meta: {
        title: '个人中心_雷哥GRE在线做题平台'
      }
    },
    // 做题
    {
      path: '/recordMarking2',
      name: 'recordMarking2',
      component: recordMarking2,
      meta: {
        title: '个人中心_雷哥GRE在线做题平台'
      }
    },
    // 错题
    {
      path: '/recordMarking3',
      name: 'recordMarking3',
      component: recordMarking3,
      meta: {
        title: '个人中心_雷哥GRE在线做题平台'
      }
    },
    // 雷豆
    {
      path: '/myLeid',
      name: 'myLeid',
      component: myLeid,
      child: [
        {path: '/ld', name: 'ld_1', component: ld_1},
        {path: '/ld', name: 'ld_2', component: ld_2},
        {path: '/ld', name: 'ld_3', component: ld_3},
      ]
    },
    // 错题
    {
      path: '/invite',
      name: 'invite',
      component: invite,
    },
    // 个人资料
    {
      path: '/userInfo',
      name: 'userInfo',
      component: userInfo,
      meta: {
        title: '个人中心_雷哥GRE在线做题平台'
      }
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
      meta: {
        title: 'GRE在线做题_GRE真题练习_GRE免费做题_做题报告分析_雷哥GRE在线题库'
      }
    },
    {
      path: '/markingDetails',
      name: 'markingDetails',
      component: markingDetails,
      child: [
        {path: '/blank_1', name: 'blank_1', component: blank_1},
        {path: '/blank_2', name: 'blank_2', component: blank_2},
        {path: '/blank_3', name: 'blank_3', component: blank_3},
        {path: '/blank_int', name: 'blank_int', component: blank_int},
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
      child: [
        {path: '/blank_1', name: 'blank_1', component: blank_1},
        {path: '/blank_2', name: 'blank_2', component: blank_2},
        {path: '/blank_3', name: 'blank_3', component: blank_3},
        {path: '/blank_int', name: 'blank_int', component: blank_int},
      ]
    },
    {
      path: '/questionDetails',
      name: 'questionDetails',
      component: questionDetails,
      child: [
        {path: '/blank_1', name: 'blank_1', component: blank_1},
        {path: '/blank_2', name: 'blank_2', component: blank_2},
        {path: '/blank_3', name: 'blank_3', component: blank_3},
        {path: '/blank_int', name: 'blank_int', component: blank_int},
      ]
    },
    {
      path: '/searchTopic',
      name: 'searchTopic',
      component: searchTopic,
      meta: {
        title: 'GRE真题机经搜索_gre真题题库_GRE真题题目解析_雷哥GRE题库'
      }
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
      meta: {
        title: 'GRE社团-雷哥网社区，GMAT/GRE/托福/雅思/美国留学/英国留学/澳洲留学/留学文书/留学DIY申请/留学中介机构/慧申科技旗下教育品牌',
        keywords: '雷哥培训，GMAT网课，GMAT培训，托福网课，托福培训，雅思网课，雅思培训，零中介留学，美国留学，出国留学，留学申请，留学文书、海外实习',
        description:'content="雷哥网社区，GMAT/GRE/托福/雅思/美国留学/英国留学/澳洲留学/留学文书/留学DIY申请/留学中介机构/慧申科技旗下教育品牌，出国留学考试资料免费分享社区。' ,
      },
      child: [
        {path: '/list_1', component: list_1},
        {path: '/list_2', component: list_2},
        {path: '/list_3', component: list_3},
      ]

    },
    {
      path: '/sendTz',
      name: 'sendTz',
      component: sendTz,
    },
    {
      path: '/bkDownload',
      name: 'bkDownload',
      component: bkDownload,
    },
    {
      path: '/courseIndex',
      name: 'courseIndex',
      component: courseIndex,
      meta: {
        title: 'GRE培训课程|GRE在线课程|GRE网课|GRE培训_雷哥GRE培训官网',
        keywords:'GRE培训课程,GRE培训,GRE是什么考试,GRE考试辅导,GRE在线课程,GRE网课,GRE机经真题,雷哥GRE培训中心,美国留学，雷哥培训',
        description:'雷哥GRE培训官网，提供GRE培训课程，GRE在线课程，GRE网课，GRE视频课程，GRE考试辅导等GRE备考服务，帮助学生快速提分，早日考出满意的GRE成绩。',
      }
    },
    {
      path: '/courseDetails',
      name: 'courseDetails',
      component: courseDetails,
      child: [
        {path: '/course_item_1', component: course_item_1},
        {path: '/course_item_2', component: course_item_2},
        {path: '/course_item_3', component: course_item_3},
        {path: '/course_item_4', component: course_item_4},
      ]
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
    {
      path: '/addressWrap',
      name: 'addressWrap',
      component: addressWrap,
    },
    {
      path: '/adressEditor',
      name: 'adressEditor',
      component: adressEditor,
    },
  ]
})
