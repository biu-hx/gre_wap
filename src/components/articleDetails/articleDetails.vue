<template>
  <div id="bkDownload">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="60px">
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
        <ul class="listData">
          <li v-for="item in hot" @click="update(item.id)">{{item.name}}</li>
        </ul>
        <!--评论-->
        <div v-show="reply.data.length>0">
          <div class="replyTit">全部评论({{reply.data.length}})</strong></div>
          <div class="replyWrap">
            <div v-for="(item,index) in reply.data" v-if="(index+1)<=5" class="replyItem">
              <div class="userHead"><img :src="item.image?$store.state.http_gre+item.image:'/static/images/default.png'" alt=""></div>
              <div class="replyRight">
                <div class="replyTime">
                  <div>
                    <span class="nickName">{{item.nickname}}</span>
                    <span>{{item.createTime | moment("YYYY-MM-DD")}}</span>
                  </div>
                  <div @click="userFine(id,2,item.id,item.fine,index)">
                    <i class="icon good"></i>
                    <span style="vertical-align: middle;">{{item.fine}}</span>
                  </div>
                </div>
                <div class="replyText">{{item.content}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <toast v-model="toastStatu" :text="toastText" width="4rem" type="text" :time="1000" position="bottom"></toast>
      <div slot="bottom" class="bottom">
        <input class="replyInt" type="text" placeholder="评论..." v-model="repley_val">
        <div class="replyNum relative" @click="userReply(id)">
          <badge v-show="reply.data.length>0" class="badge_1 ani" :text="reply.data.length"></badge>
        </div>
        <div class="goodNum relative" @click="userFine(id,1)">
          <badge v-show="article.fine>0" class="badge_2 ani" :text="article.fine"></badge>
        </div>
        <div class="relative scBtn" :class="collectStatu === 0 ?'scNo':'scYes'" @click="collect(id)"></div>
      </div>
    </view-box>
    <loading :show="show2" text=""></loading>
  </div>
</template>

<script type="text/ecmascript-6">
  import {XHeader, Tab, TabItem, Tabbar, TabbarItem, ViewBox, Badge, Toast,Loading} from 'vux'

  export default {
    name: "bkDownload",
    data() {
      return {
        id: '',
        article: '',
        hot: '',
        reply: {data:[]},
        repley_val: '',
        toastStatu: false,
        toastText: '',
        collectStatu: '',
        show2:true,
      }
    },
    components: {
      XHeader, Tab, TabItem, Tabbar, TabbarItem, ViewBox, Badge, Toast,Loading
    },
    activated() {
      this.id = this.$route.query.id;
      this.getData(this.$route.query.id);
    },
    methods: {
      getData(id) {
        let uid = this.$store.state.userInfo.uid||'';
          const _this = this;
          _this.show2=true;
          this.axios.get("/cn/wap-api/article-detail?contentid=" + id + "&uid=" + uid)
            .then(function (response) {
              _this.id = id;
              _this.article = response.data.data[0];
              _this.hot = response.data.hotarticle;
              _this.reply = response.data.userComment;
              _this.collectStatu = response.data.collecte;
              _this.$nextTick(function () {
                _this.show2=false;
              })
            })

      },
      update(id) {
        this.getData(id);
        setTimeout(() => {
          this.$refs.viewBox.scrollTo(0)
        }, 200)
      },
      // 评论
      userReply(id) {
        const _this = this;
        let store = this.$store;
        let data = {
          userInfo: store.state.userInfo,
          content: _this.repley_val,
        };
        if (this.repley_val) {
          this.axios.post('/cn/wap-api/article-comment', {
            content: data.content,
            uid: data.userInfo.uid||'',
            contentId: id
          }).then(function (res) {
            _this.toastText = res.data.message;
            _this.toastStatu = true;
            _this.repley_val = '';
            // 评论成功 追加数据
            const addTime = new Date().getTime();
            _this.reply.data.unshift({
              nickname: data.userInfo.nickname,
              content: data.content,
              image: data.userInfo.image,
              fine: 0,
              id:res.data.id,
              createTime: parseInt(addTime / 1000),
            });
          })
        } else {
          _this.toastText = '请输入评论内容';
          _this.toastStatu = true;
          return false;
        }

      },
      // 用户点赞
      userFine(id, type, commentId, fine,index) {
        let data;
        const _this = this;
        if (type === 1) {
          data = {
            contentId: id,
            type: type,
          };
        } else {
          data = {
            fine: fine,
            contentId: id,
            type: type,
            commentId: commentId,
          };
        }
        this.axios.post('/cn/wap-api/add-fine', data).then(function (res) {
          if (res.data.code === 1) {
            // 文章点赞成功
            if (type === 1) {
              _this.article.fine = res.data.fine;
            }
            // 评论点赞成功
            if (type === 2) {
              _this.reply.data[index].fine=parseInt(_this.reply.data[index].fine)+1;
              _this.article.fine = res.data.allfine;
            }


          } else {
            _this.toastText = res.data.message;
            _this.toastStatu = true;
          }


        })
      },
      // 文章收藏
      collect(contentId) {
        const _this = this;
        let userInfo = this.$store.state.userInfo;
        let data = {
          collecte: this.collectStatu === 0 ? 1 : 2,
          contentId: contentId,
          uid: userInfo.uid||'',
        };
        this.axios.post('/cn/wap-api/content-collection', data).then(function (res) {
          if (res.data.code === 1) {
            if (data.collecte === 1) {
              _this.toastText = '收藏成功';
              _this.toastStatu = true;
              _this.collectStatu = 1;
            } else {
              _this.toastText = '取消成功';
              _this.toastStatu = true;
              _this.collectStatu = 0;
            }
          } else {
            _this.toastText = '收藏失败';
            _this.toastStatu = true;
          }
        })
      },

    }
  }
</script>

<style scoped>
  #bkDownload {
    height: 100%;
  }

  #bkDownload >>> .weui-toast.vux-toast-bottom {
    bottom: 140px; /*px*/
  }

  #bkDownload >>> .weui-toast_text .weui-toast__content {
    font-size: 14px; /*no*/
    padding: 12px 6px; /*px*/
  }
  #bkDownload >>> .vux-loading-no-text .weui-toast {
    top: 50%;
    margin-top: -49px; /*no*/
  }
  .header {
    background: #5a5ee4;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
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
    padding: 24px 10px; /*px*/
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
  }

  .scYes {
    background: url("/static/images/collect_suc.png") no-repeat 0 0;
    background-size: contain;
  }

  .scNo {
    background: url("/static/images/bk/icon_1.png") no-repeat 0 0;
    background-size: contain;
  }

  .badge_1 {
    left: 56px; /*px*/
    top: -18px; /*px*/
  }
  .badge_2 {
    left: 40px; /*px*/
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
