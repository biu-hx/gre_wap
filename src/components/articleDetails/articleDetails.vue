<template>
  <div id="bkDownload">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="62px">
      <x-header class="header" slot="header" :left-options="{backText: ''}">
        <span>备考文章</span>
        <div slot="right">
          <!--<router-link to="/search">-->
          <img class="scIcon" src="/static/images/bk/share.png" alt="">
          <!--</router-link>-->
        </div>
      </x-header>
      <div class="content" ref="conatnet">
        <div class="cardTop">
          <h1 class="cardName">{{article.title}}</h1>
          <div class="cardInfo">
            <span>{{article.createTime}}</span>
            <span><img class="eyes" src="/static/images/bk/eyes.png" alt="">{{article.viewCount}}</span>
          </div>
        </div>
        <div class="articleText" v-html="article.description"></div>
        <!--详细内容列表-->
        <ul class="listData"><li v-for="item in hot" @click="update(item.id)">{{item.name}}</li>
        </ul>
        <!--评论-->
        <div v-show="reply.count>0">
          <div class="replyTit">全部评论({{reply.count}})</strong></div>
          <div class="replyWrap">
            <div v-for="item in reply.data" class="replyItem">
              <div class="userHead"><img :src="item.image?$store.state.httpUrl+item.image:'/static/images/default.png'" alt=""></div>
              <div class="replyRight">
                <div class="replyTime">
                  <div>
                    <span class="nickName">{{item.nickname}}</span>
                    <span>{{item.createTime | moment("YYYY-MM-DD")}}</span>
                  </div>
                  <div>
                    <i class="icon good"></i>
                    <span style="vertical-align: middle;">20</span>
                  </div>
                </div>
                <div class="replyText">{{item.content}}</div>
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
  import moment from 'moment/moment'
  import {XHeader,Tab, TabItem, Tabbar, TabbarItem, ViewBox, Badge} from 'vux'

  export default {
    name: "bkDownload",
    data() {
      return {
        article: '',
        hot: '',
        reply: '',
      }
    },
    components: {
      XHeader, Tab, TabItem, Tabbar, TabbarItem, ViewBox, Badge
    },
    activated() {
      this.getData(this.$route.query.id);
    },
    methods: {
      getData(id) {
        this.$nextTick(function () {
          const _this = this;
          this.axios.get("/cn/wap-api/article-detail?contentid=" + id)
            .then(function (response) {
              _this.article = response.data.data[0];
              _this.hot = response.data.hotarticle;
              _this.reply = response.data.userComment;
            })

        })
      },
      update(id) {
        this.getData(id);
        setTimeout(() => {
          this.$refs.viewBox.scrollTo(0)
        }, 200)
      }
    }
  }
</script>

<style scoped>
  #bkDownload {
    height: 100%;
  }

  .header {
    background: #5a5ee4;
    position: absolute;
    top: 0;
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

  .articleText {
    color: #444444;
    font-size: 28px; /*px*/
    padding: 30px 0; /*px*/
    line-height: 46px; /*px*/
    text-align: justify;
  }

  .listData li {
    font-size: 28px; /*px*/
    background: #f3f3f3;
    padding: 24px 0; /*px*/
    border-bottom: 1px solid #dcdcdc; /*no*/
  }

  .listData li a {
    display: block;
    color: #242424;
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

  .replyWrap .replyItem:last-child {
    border-bottom: none;
  }

  .replyItem {
    display: flex;
    padding: 20px 0;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid #cfcfcf; /*no*/
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

  .showHint .lock {
    width: 30px; /*px*/
    vertical-align: bottom;
    margin-right: 20px;
  }

  .showHint span {
    font-size: 28px; /*px*/
    vertical-align: bottom;
  }

  .showHint strong {
    color: #5a5ee4;
  }
</style>
