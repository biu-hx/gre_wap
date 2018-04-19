<template>
  <div id="markingIndex">
    <x-header style="background: #5a5ee4;" :left-options="{backText: ''}">OG & 150真题</x-header>
    <div class="userData">
      <div class="flexWrap grid bg_f">
        <div class="flexItem vux-1px-r">
          <p class="dataNum">443</p>
          <p>完成人数</p>
        </div>
        <div class="flexItem vux-1px-r">
          <p class="dataNum">67%</p>
          <p>平均正确率</p>
        </div>
        <div class="flexItem">
          <p class="dataNum">37m33s</p>
          <p>平均耗时</p>
        </div>
      </div>
    </div>
    <ul class="list">
      <li>
        <div class="listLeft">
          <h1 class="topicName ellipsis">RC-e2hqsj</h1>
          <div class="flexWrap time">
            <span>平均正确率:75%</span>
            <span>平均耗时:10min</span>
          </div>
        </div>
        <div class="lstRight">
          <div class="currentNum">20/20</div>
          <router-link to="/testResult">
          <div class="handle over tm">查看结果</div>
          </router-link>
        </div>
      </li>
      <li>
        <div class="listLeft">
          <h1 class="topicName ellipsis">RC-e2hqsj</h1>
          <div class="flexWrap time">
            <span>平均正确率:75%</span>
            <span>平均耗时:10min</span>
          </div>
        </div>
        <div class="lstRight">
          <div class="currentNum">20/20</div>
        </div>
      </li>
      <li>
        <div class="listLeft">
          <h1 class="topicName ellipsis">RC-e2hqsj</h1>
          <div class="flexWrap time">
            <span>平均正确率:75%</span>
            <span>平均耗时:10min</span>
          </div>
        </div>
        <div class="lstRight">
          <div class="currentNum">20/20</div>
          <div class="handle continue tm">查看结果</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    XHeader,
    Group,
    Cell,
  } from 'vux'

  export default {
    name: "markingIndex",
    components: {
      XHeader,
      Cell,
      Group,
    }
  }
</script>

<style scoped>
  #markingIndex {
    height: 100%;
    background: #f3f3f3;
  }

  .userData {
  }

  .flexWrap {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: flex-start;
  }

  .flexWrap.grid {
    border-radius: 6px; /*no*/
    padding: 30px 0 25px;
  }

  .flexItem {
    flex: 1;
    text-align: center;
    font-size: 30px; /*px*/
    color: #888888;
    padding: 6px 0;
  }

  .flexItem p.dataNum {
    font-size: 38px; /*px*/
    color: #333333;
    padding-bottom: 10px;
  }

  .list {
    padding: 20px;
  }

  .list li {
    padding: 20px 20px 20px 28px;
    background: #ffffff;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 18px;
  }
  .list li:last-child{
    margin-bottom: 0;
  }

  .topicName,.currentNum{
    color: #333333;
    font-size: 34px; /*px*/
    font-weight: normal;
    margin-bottom: 20px;
  }

  .time {
    height: 40px;
    justify-content: space-between;
    color: #777777;
    font-size: 28px; /*px*/
  }
  .listLeft{
    width: 75%;
  }
  .lstRight{
    text-align: right;
    width: 23%;
  }
  .handle{
    height: 38px;
    line-height: 38px;
    display: inline-block;
    vertical-align: middle;
    padding: 0 10px;
    border-radius: 4px;/*no*/
    font-size: 24px;/*px*/
    border: 1px solid transparent;/*no*/
  }
  .handle.over{
    color: #0c7c0c;
    border: 1px solid #0c7c0c;/*no*/
  }
  .handle.continue{
    color: #f05353;
    border: 1px solid #f05353;/*no*/
  }

</style>
