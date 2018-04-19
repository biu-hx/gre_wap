<template>
  <div id="recordMarking" style="height: 100%;">
    <x-header style="background: #5a5ee4;" :left-options="{backText: ''}">我的雷豆</x-header>
    <div class="userLed flex tm">
      <div class="ledItem">
        <p class="num">0</p>
        <p style="font-size: 16px;">可用雷豆</p>
      </div>
      <div class="ledItem tr">
        <div class="inm tm howUse">如何使用雷豆?如何获得雷豆?</div>
      </div>
    </div>
    <tab style="margin-bottom: 10px" :line-width="2" active-color="#5a5ee4" :scroll-threshold="5"
         default-color="#444444" custom-bar-width="64px">
      <tab-item :selected="0==i" :key="i" v-for="(item,i) in tabItem">{{item}}</tab-item>
    </tab>
    <div class="test">
      <table class="leidTab">
        <thead>
        <tr>
          <th width="33.3%" class="tl">来源/用途</th>
          <th width="33.3%">收入雷豆</th>
          <th width="33.3%" class="tr">日期</th>
        </tr>
        </thead>
        <tbody class="tm">
        <tr v-for="i in 7">
          <td class="tl">买视频课</td>
          <td>-20</td>
          <td class="tr">2017.8.16</td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import {XHeader, Tab, TabItem, Group} from 'vux'

  export default {
    name: "recordMarking",
    data() {
      return {
        tabItem: ['雷豆明细', '收入雷豆', '支出雷豆', '']
      }
    },
    components: {
      XHeader,
      TabItem,
      Tab
    }
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
    width: 260px;/*px*/
    font-size: 30px;/*px*/
    box-sizing: border-box;
    padding: 15px 20px;
    margin-right: 40px;
    border-radius: 6px; /*no*/
    background: rgba(25, 27, 92, 0.5);
  }

  .leidTab {
    width: 100%;
    table-layout: fixed;
    /*box-sizing: border-box;*/
  }

  .leidTab thead {
    /*padding: 10px 20px;*/
    background: #ebe9e9;
  }

  .leidTab thead th {
    color: #333333;
    padding: 20px;
    font-weight: normal;
    font-size: 30px; /*px*/
  }

  .leidTab tbody tr {
    border-bottom: 1px solid #ebe9e9;
  }

  .leidTab tbody td {
    color: #777777;
    padding: 20px;
    word-break: break-all;
    font-size: 30px /*px*/;
  }

</style>
