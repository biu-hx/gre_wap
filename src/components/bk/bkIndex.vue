<template>
  <div id="bkIndex">
    <div class="cardImg relative">
      <img src="/static/images/bk/bkIndex.png" alt="">
      <div class="ani cardNum">
        <span>今日新帖：0</span>
        <span style="padding-left: 15px">帖子总数：110</span>
      </div>
    </div>
    <tab :line-width="2" active-color="#5a5ee4" :scroll-threshold="4" default-color="#444444">
      <tab-item :selected="0==i" :key="i" v-for="(item,i) in tabItem">{{item}}</tab-item>
    </tab>
    <div class="itemWrap">
      <div v-for="(item,index) in 10" class="listItem">
        <router-link to="/bkDownload">
          <div class="itemRow">
            <span class="back_blue tag">备考资料</span>
            <span class="back_red tag">Hot</span>
            <h1 class="bkName ellipsis">
              最新2017年12月GRE数学机经来袭最新2017年12月GRE数学机经来袭最新2017年12月GRE数学机经来袭最新2017年12月GRE数学机经来袭</h1>
          </div>
          <div class="dataTime">
            <span>发布于 2017-12-19</span>
            <span>查看：174  |  回复：8</span>
          </div>
        </router-link>
      </div>
    </div>
    <div class="postBtn"><img src="/static/images/bk/postBtn.png" alt=""></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Tab, TabItem} from 'vux'

  export default {
    name: "bkIndex",
    data() {
      return {
        tabItem: ['全部', '备考资料', '机经真题'],
      }
    },
    components: {
      Tab, TabItem
    }
  }
</script>

<style scoped>
  .cardNum {
    right: 46px;
    bottom: 50px;
    color: #ffffff;
    font-size: 28px;
    padding: 8px 24px;
    border-radius: 4px; /*no*/
    border: 1px solid #ffffff; /*no*/
  }

  .itemWrap {
    padding: 0 25px;
  }

  .itemRow {
    display: flex;
    flex-flow: nowrap row;
    justify-content: flex-start;
    align-items: flex-end;
    margin-bottom: 24px;
  }

  .dataTime {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: row wrap;
  }

  .tag {
    font-size: 24px; /*px*/
    padding: 0 10px;
    color: #fff;
    margin-right: 5px; /*px*/
    height: 40px; /*px*/
    line-height: 40px; /*px*/
    border-radius: 4px; /*no*/
  }

  .back_red {
    background: #e56060;
  }

  .back_blue {
    background: #4b9ed8;
  }

  .back_blue2 {
    background: #686dd3;
  }

  .listItem {
    padding: 25px 0;
    border-bottom: 1px solid #cccccc; /*no*/
  }

  .bkName {
    flex: 1;
    color: #333333;
    box-sizing: border-box;
    padding-left: 7px;
    font-weight: normal;
    font-size: 28px; /*px*/
  }

  .dataTime {
    color: #888888;
    font-size: 24px; /*px*/
  }

  .postBtn {
    width: 90px; /*px*/
    position: fixed;
    right: 30px;
    bottom: 70px;
  }
</style>
