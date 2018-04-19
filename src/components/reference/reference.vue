<template>
  <div id="reference">
    <div class="iconWap">
      <ul class="pageTo bg_f">
        <li v-for="item in navs">
          <img v-bind:src="item.navimg" alt="">
          <p class="barName">{{item.navtext}}</p>
        </li>
      </ul>
    </div>
    <tab :line-width="2" active-color="#5a5ee4" :scroll-threshold="6" default-color="#333333" custom-bar-width="40px">
      <tab-item :selected="0==i" :key="i" v-for="(item,i) in tabItem">{{item}}</tab-item>
    </tab>
    <list></list>
  </div>
</template>

<script type="text/ecmascript-6">
  import list from '../infoList/infoList'
  import {Tab, TabItem, ViewBox} from 'vux'

  export default {
    name: "reference",
    data() {
      return {
        navs: [
          {navimg: '/static/images/reference/bk_1.png', navtext: 'GREvsGMAT'},
          {navimg: '/static/images/reference/bk_2.png', navtext: '考试地点'},
          {navimg: '/static/images/reference/bk_3.png', navtext: '分数说明'},
          {navimg: '/static/images/reference/bk_4.png', navtext: '常见问题'},
          {navimg: '/static/images/reference/bk_5.png', navtext: '报名流程'},
          {navimg: '/static/images/reference/bk_6.png', navtext: '考试费用'},
          {navimg: '/static/images/reference/bk_7.png', navtext: '考试流程'},
          {navimg: '/static/images/reference/bk_8.png', navtext: 'GRE入门'},
          {navimg: '/static/images/reference/bk_9.png', navtext: '考试介绍'},
        ],
        tabItem: ['热门', '词汇', '阅读', '填空', '数学', '写作']
      }
    },
    components: {
      list,
      Tab,
      TabItem,
      ViewBox
    }
  }
</script>

<style scoped>
  .iconWap {
    box-sizing: border-box;
    padding: 28px 20px;
    background: url("/static/images/reference/bkBg.png") no-repeat 0 0;
    background-size: cover;
  }

  .pageTo {
    display: flex;
    flex-flow: wrap row;
    padding: 24px 10px 0;
    text-align: center;
    align-items: flex-start;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px; /*no*/
  }

  .pageTo:after {
    content: "";
    flex: auto;
  }

  .pageTo li {
    width: 20%;
    margin-bottom: 24px;
  }

  .pageTo li img {
    width: 90px;
    height: 90px;
  }

  .barName {
    padding-top: 8px;
    font-size: 24px; /*px*/
    color: #ffffff;
  }

  .vux-tab .vux-tab-item {
    font-size: 28px; /*px*/
  }
</style>
