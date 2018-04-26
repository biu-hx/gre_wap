<template>
  <div id="bkDownload">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="62px">
    <x-header class="header" slot="header" :left-options="{backText: ''}">
      <span>GRE备考资料下载</span>
      <div slot="right">
        <!--<router-link to="/search">-->
          <img class="scIcon" src="/static/images/bk/share.png" alt="">
        <!--</router-link>-->
      </div>
    </x-header>
    <div slot="default" class="content">
      <div class="cardTop">
        <h1 class="ellipsis cardName">GRE阅读 陈琦-阅读24套</h1>
        <div class="cardInfo">
          <span>2018-2-22 14:02</span>
          <span><img class="eyes" src="/static/images/bk/eyes.png" alt="">2780</span>
        </div>
      </div>
      <div class="cardName2">陈琦-阅读24套  </div>
      <!--下载版块-->
      <div class="hideContent">
        <!--已回复 显示-->
        <div style="display: none">
          <p class="tm cardHint">本帖隐藏的内容  </p>
          <div class="dataItem">
            <div class="itemLeft">
              <img class="winrIcon" src="/static/images/bk/winr.png" alt="">
              <span class="winrName">数学.docx </span>
              <span class="winrDownnum">(下载次数: 75)</span>
            </div>
            <button class="downBtn">下载</button>
          </div>
        </div>
        <!--未回复 显示-->
        <div class="showHint tm">
          <img class="lock" src="/static/images/bk/lock.png" alt="">
          <span>游客，如果您要查看本帖隐藏内容请<strong>回复</strong></span>
        </div>

      </div>
      <!--详细内容列表-->
      <ul class="listData">
        <li>【GRE阅读】GRE阅读白皮书全部文章和题目</li>
        <li>【GRE阅读】陈琦-阅读24套</li>
        <li>【GRE词汇】巴郎词表中文版</li>
        <li>【GRE数学】GRE数学资料</li>
      </ul>
      <!--评论-->
      <div>
        <div class="replyTit">全部评论（3）</div>
        <div class="replyWrap">
          <div v-for="i in 6" class="replyItem">
            <div class="userHead"><img src="/static/images/bk/userHead.png" alt=""></div>
            <div class="replyRight">
              <div class="replyTime">
                <div>
                  <span class="nickName">用户名 {{i}}</span>
                  <span>2018.2.22</span>
                </div>
                <div>
                  <i class="icon good"></i>
                  <span style="vertical-align: middle;">20</span>
                </div>
              </div>
              <div class="replyText">申请美国研究生到底选择GRE还是GMAT呢？ 这是很多学员比较困惑的问题。</div>
            </div>
          </div>
        </div>

      </div>

    </div>
    <div slot="bottom" class="bottom">
      <input class="replyInt" type="text" placeholder="评论...">
      <div class="replyNum relative">
        <badge class="badge_1 ani" text="123"></badge>
      </div>
      <div class="goodNum relative">
        <badge class="badge_1 ani" text="123"></badge>
      </div>
      <div class="scBtn relative"></div>
    </div>
    </view-box>
  </div>
</template>

<script type="text/ecmascript-6">
  import {XHeader, Tab, TabItem, Tabbar, TabbarItem, ViewBox, Badge} from 'vux'

  export default {
    name: "bkDownload",
    components: {
      XHeader, Tab, TabItem, Tabbar, TabbarItem, ViewBox, Badge
    },
  }
</script>

<style scoped>
  #bkDownload {
    height: 100%;
  }
  .header{
    background: #5a5ee4;
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
  }

  .scIcon {
    height: 40px; /*px*/
  }

  .content {
    padding: 0 20px;
  }

  .cardTop {
    padding: 30px 0; /*px*/
    border-bottom: 1px solid #d2d2d2; /*no*/
  }

  .cardName {
    color: #333333;
    margin-bottom: 25px; /*px*/
    font-size: 38px; /*px*/
  }

  .cardInfo {
    color: #888888;
    font-size: 28px; /*px*/
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-content: center;
  }

  .eyes {
    margin-right: 8px; /*px*/
    height: 24px; /*px*/
    vertical-align: baseline;
  }

  .cardName2 {
    color: #444444;
    font-size: 32px; /*px*/
    padding: 30px 0; /*px*/
  }

  .hideContent {
    color: #444444;
    font-size: 32px; /*px*/
    padding: 20px; /*px*/
    border: 1px dashed #d2d2d2; /*no*/
    border-radius: 6px; /*no*/
    margin-bottom: 50px;
  }

  .winrIcon {
    height: 40px; /*px*/
    margin-right: 4px;
    vertical-align: text-bottom;
  }

  .winrName {
    color: #5a5ee4;
    text-decoration: underline;
    vertical-align: middle;
  }

  .downBtn {
    color: #ffffff;
    width: 110px;
    height: 54px;
    border: none;
    outline: none;
    border-radius: 5px; /*no*/
    background: #5a5ee4;
    font-size: 32px; /*px*/
  }

  .dataItem {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0; /*px*/
  }

  .itemLeft {
    flex: 1;
    box-sizing: border-box;
    padding-right: 20px;
  }

  .cardHint {
    box-sizing: border-box;
    padding: 0 10px;
    margin-bottom: 20px; /*px*/
  }

  .listData li {
    font-size: 28px; /*px*/
    background: #f3f3f3;
    padding: 24px 0; /*px*/
    border-bottom: 1px solid #dcdcdc; /*no*/
  }

  .listData li:last-child {
    border: none;
  }

  .replyTit {
    padding: 30px 0;
    color: #333333;
    font-size: 30px; /*px*/
  }

  .userHead {
    width: 70px; /*px*/
    height: 70px; /*px*/
    overflow: hidden;
    border-radius: 50%;
  }

  .userHead img {
    width: 100%;
    border-radius: 50%;
  }

  .icon {
    width: 28px; /*px*/
    height: 30px; /*px*/
    display: inline-block;
    vertical-align: middle;
  }

  .icon.good {
    background: url("/static/images/bk/goodIcon.png") no-repeat 0 0;
    background-size: contain;
  }
  .replyWrap .replyItem:last-child{
    border-bottom: none;
  }
  .replyItem {
    display: flex;
    padding: 20px 0;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid #cfcfcf;/*no*/
  }

  .replyRight {
    flex: 1;
    box-sizing: border-box;
    padding-left: 15px; /*px*/
  }

  .replyTime {
    font-size: 28px; /*px*/
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    color: #888888;
    margin-bottom: 10px; /*px*/
  }

  .nickName {
    color: #333333;
    padding-right: 30px; /*px*/
  }

  .replyText {
    color: #444444;
    font-size: 30px; /*px*/
    line-height: 50px; /*px*/
  }

  .replyNum {
    width: 53px; /*px*/
    height: 49px; /*px*/
    background: url("/static/images/bk/icon_3.png") no-repeat 0 0;
    background-size: contain;
  }

  .goodNum {
    width: 51px; /*px*/
    height: 51px; /*px*/
    background: url("/static/images/bk/icon_2.png") no-repeat 0 0;
    background-size: contain;
  }

  .scBtn {
    width: 55px; /*px*/
    height: 51px; /*px*/
    background: url("/static/images/bk/icon_1.png") no-repeat 0 0;
    background-size: contain;
  }

  .badge_1 {
    right: -50px; /*px*/
    top: -18px; /*px*/
  }

  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    background: #e5e5e5;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-end;

  }

  .replyInt {
    height: 64px; /*px*/
    width: 53%;
    box-sizing: border-box;
    padding: 0 15px;
    border-radius: 8px; /*no*/
    border: none;
    outline: none;
  }

  .bottom > > > .vux-badge {
    background: #5a5ee4;
  }
  .showHint .lock{
      width: 30px;/*px*/
    vertical-align: bottom;
    margin-right: 20px;
  }
  .showHint span{
    font-size: 28px;/*px*/
    vertical-align: bottom;
  }
  .showHint strong{
    color: #5a5ee4;
  }
</style>
