<template>
  <div id="bkIndex">
    <div class="cardImg relative">
      <img src="/static/images/bk/bkIndex.png" alt="">
      <div class="ani cardNum">
        <span>今日新帖：{{today}}</span>
        <span style="padding-left: 15px">帖子总数：{{count}}</span>
      </div>
    </div>
    <tab :line-width="2" active-color="#5a5ee4" :scroll-threshold="4" default-color="#444444">
      <tab-item :selected="0==i" :key="i" v-for="(item,i) in tabItem" @on-item-click="handler('list_'+(i+1))">{{item}}</tab-item>
    </tab>
    <list_1 :is="currentTab" v-bind:listData="data" keep-alive></list_1>
    <!--<div class="postBtn"><router-link :to="{name:'sendTz'}"><img src="/static/images/bk/postBtn.png" alt=""></router-link></div>-->
    <loading :show="show" text=""></loading>
  </div>
</template>

<script type="text/ecmascript-6">
  import list_1 from './bkList/list_1'
  import list_2 from './bkList/list_2'
  import list_3 from './bkList/list_3'
  import {Tab, TabItem, Loading} from 'vux'

  export default {
    name: "bkIndex",
    data() {
      return {
        show: false,
        tabItem: ['全部', '备考资料', '机经真题'],
        count: '',
        today: '',
        data: '',
        currentTab: 'list_1'
      }
    },
    components: {
      Tab, TabItem, list_1, list_2, list_3, Loading
    },
    mounted() {
      const _this = this;
      _this.show = true;
      this.axios({
        url: this.$store.state.http_bbs + '/cn/wap-api/real-problem'
      }).then(function (res) {
        _this.today = res.data.today;
        _this.count = res.data.count;
        _this.data = res.data.data;
        _this.$nextTick(function () {
          _this.show = false;
        })
      });
    },
    methods: {
      handler(index) {
        this.currentTab = index;
      }
    }
  }
</script>

<style scoped>
  #bkIndex >>> .vux-loading-no-text .weui-toast {
    top: 50%;
    margin-top: -49px; /*no*/
  }

  .cardNum {
    right: 46px;
    bottom: 50px;
    color: #ffffff;
    font-size: 28px;
    padding: 8px 24px;
    border-radius: 4px; /*no*/
    border: 1px solid #ffffff; /*no*/
  }

  .postBtn {
    width: 90px; /*px*/
    position: fixed;
    right: 30px;
    bottom: 70px;
  }
</style>
