<template>
  <div id="recordMarking" style="height: 100%;">
    <x-header style="background: #5a5ee4;" :left-options="{backText: ''}">我的雷豆</x-header>
    <div class="userLed flex tm">
      <div class="ledItem">
        <p class="num">{{resData.integral}}</p>
        <p style="font-size: 16px;">可用雷豆</p>
      </div>
      <div class="ledItem tr">
        <div class="inm tm howUse">如何使用雷豆?如何获得雷豆?</div>
      </div>
    </div>
    <tab style="margin-bottom: 10px" :line-width="2" active-color="#5a5ee4" :scroll-threshold="5"
         default-color="#444444" custom-bar-width="64px">
      <tab-item :selected="0==i" :key="i" v-for="(item,i) in tabItem" @on-item-click="handler('ld_'+(i+1))">{{item}}</tab-item>
    </tab>
    <div class="test">
      <ld_1 :is="currentTab" v-bind:ldData="resData" keep-live></ld_1>
      <!--<table class="leidTab">-->
      <!--<thead>-->
      <!--<tr>-->
      <!--<th width="33.3%" class="tl">来源/用途</th>-->
      <!--<th width="33.3%">雷豆明细</th>-->
      <!--<th width="33.3%" class="tr">日期</th>-->
      <!--</tr>-->
      <!--</thead>-->
      <!--<tbody class="tm">-->
      <!--<tr v-for="(item,index) in resData.details">-->
      <!--<td class="tl">{{item.behavior}}</td>-->
      <!--<td>-{{item.integral}}</td>-->
      <!--<td class="tr">{{item.createTime | moment('YYYY-MM-DD')}}</td>-->
      <!--</tr>-->
      <!--</tbody>-->
      <!--</table>-->
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import ld_1 from './child/ld_1'
  import ld_2 from './child/ld_2'
  import ld_3 from './child/ld_3'
  import {XHeader, Tab, TabItem, Group} from 'vux'

  export default {
    name: "recordMarking",
    data() {
      return {
        currentTab: 'ld_1',
        tabItem: ['雷豆明细', '收入雷豆', '支出雷豆', ''],
        resData: {
          details: [{
            behavior: 'test',
            type: 1,
            integral: 2,
            createTime: 1525935685,
          }],
          income: [{
            behavior: 'test2',
            type: 1,
            integral: 20,
            createTime: 1525935685,
          }],
          out: [{
            behavior: 'test3',
            type: 1,
            integral: 200,
            createTime: 1525935685,
          }],
          integral: '',//可用雷豆数;
        },
      }
    },
    components: {
      ld_1,
      ld_2,
      ld_3,
      XHeader,
      TabItem,
      Tab
    },
    activated() {
      this.getData();
    },
    methods: {
      getData() {
        this.$nextTick(function () {
          const _this = this;
          //已登录&未登录状态
          if (this.$store.state.isLogin) {
            _this.axios.post('/cn/wap-api/leidou  ', {uid: this.$store.state.userInfo.uid}).then(function (res) {
              _this.resData = res.data;
            })
          } else {
            console.log('未登录')
          }

        })
      },
      handler(index) {
        this.currentTab = index;
      }
    },
  }
</script>

<style scoped>
  .test {
    padding: 20px;
  }

  .userLed {
    height: 210px;
    background: #7679dd;
    color: #ffffff;
    font-size: 28px; /*px*/
    justify-content: center !important;
    align-items: center !important;
  }

  .flex {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
  }

  .ledItem {
    width: 50%;
  }

  .num {
    font-size: 64px; /*px*/
  }

  .howUse {
    width: 260px; /*px*/
    font-size: 30px; /*px*/
    box-sizing: border-box;
    padding: 15px 20px;
    margin-right: 40px;
    border-radius: 6px; /*no*/
    background: rgba(25, 27, 92, 0.5);
  }


</style>
