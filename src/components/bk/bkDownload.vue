<template>
  <div id="bkDownload">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="60px">
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
          <h1 class="ellipsis_3 cardName">{{info.title}}</h1>
          <div class="cardInfo">
            <span>{{parseInt(info.createTime) | moment('YYYY-MM-DD')}}</span>
            <span><img class="eyes" src="/static/images/bk/eyes.png" alt="">{{info.viewCount}}</span>
          </div>
        </div>
        <div class="cardName2" v-html="info.content"></div>
        <!--下载版块-->
        <div class="hideContent">
          <!--已回复 显示-->
          <div v-if="is_reply!=0">
            <p class="tm cardHint">本帖隐藏的内容 </p>
            <div class="dataItem">
              <div class="itemLeft">
                <img class="winrIcon" src="/static/images/bk/winr.png" alt="">
                <span class="winrName">{{info.datumTitle[0]}}</span>
                <span class="winrDownnum">(下载次数: 75)</span>
              </div>
              <button class="downBtn" @click="download">下载</button>
            </div>
          </div>
          <!--未回复 显示-->
          <div v-else class="showHint tm">
            <img class="lock" src="/static/images/bk/lock.png" alt="">
            <span>游客，如果您要查看本帖隐藏内容请<strong>回复</strong></span>
          </div>

        </div>
        <!--详细内容列表-->
        <ul class="listData">
          <li v-for="item in hot" @click="update(item.id)">{{item.title}}</li>
        </ul>
        <!--评论-->
        <div v-show="reply.length>0">
          <div class="replyTit">全部评论（{{reply.length}}）</div>
          <div class="replyWrap">
            <div v-for="(item,index) in reply" v-if="(index+1)<=5" class="replyItem">
              <div class="userHead"><img :src="item.image?$store.state.http_gre+item.image:'/static/images/default.png'" alt=""></div>
              <div class="replyRight">
                <div class="replyTime">
                  <div>
                    <span class="nickName">{{item.nickname}}</span>
                    <span>{{parseInt(item.createTime) | moment('YYYY-MM-DD')}}</span>
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
          <badge v-show="reply.length>0" class="badge_1 ani" :text="reply.length"></badge>
        </div>
        <div class="goodNum relative" @click="userFine(id,1)">
          <badge v-show="postFine>0" class="badge_2 ani" :text="postFine"></badge>
        </div>
        <div class="relative scBtn" :class="collectStatu === 0 ?'scNo':'scYes'" @click="collect(id)"></div>
      </div>
    </view-box>
  </div>
</template>

<script type="text/ecmascript-6">
  import {XHeader, Tab, TabItem, Tabbar, TabbarItem, ViewBox, Badge, Toast} from 'vux'

  export default {
    name: "bkDownload",
    components: {
      XHeader, Tab, TabItem, Tabbar, TabbarItem, ViewBox, Badge, Toast
    },
    data() {
      return {
        id: '',
        info: '',
        hot: '',
        reply: '',
        is_reply: '',
        postFine:'',
        repley_val: '',
        toastStatu: false,
        toastText: '',
        collectStatu: '',
      }
    },
    activated() {
      this.id = this.$route.query.id;
      this.getData(this.$route.query.id);
    },
    methods: {
      // 获取帖子数据
      getData(id) {
        let uid = this.$store.state.userInfo.uid||'';
        this.$nextTick(function () {
          const _this = this;
          this.axios.get(this.$store.state.http_bbs+"/cn/wap-api/problem-detail?id=" + id + "&uid=" + uid)
            .then(function (res) {
              _this.id = id;
              _this.info = res.data.data;
              _this.hot = res.data.hot;
              _this.reply = res.data.reply;
              _this.is_reply = res.data.is_reply;
              _this.postFine=res.data.postfine;
              _this.collectStatu = res.data.is_collecte;
            })
        })
      },
      update(id) {
        this.getData(id);
        setTimeout(() => {
          this.$refs.viewBox.scrollTo(0)
        }, 200)
      },
      // 下载
      download() {
        let downUrl = this.$store.state.http_bbs + this.info.datum[0];
        let ua = navigator.userAgent.toLowerCase();
        //android终端
        let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
        //ios终端
        let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //ios
          window.open(downUrl);
        } else if (/(Android)/i.test(navigator.userAgent)) {
          //android
          window.location = downUrl;
        }
        // 微信浏览器判断
        // if (isWeixinBrowser()) {
        //   this.$router.push({
        //     path: '/product'
        //   })
        // } else {}
        // function isWeixinBrowser() {
        //   return (/micromessenger/.test(ua)) ? true : false;
        // }
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
            this.axios.post(this.$store.state.http_bbs+'/cn/wap-api/post-reply', {
            content: data.content,
            type: '',
            uid: data.userInfo.uid,
            id: id
          }).then(function (res) {
            _this.toastText = res.data.message;
            _this.toastStatu = true;
            _this.repley_val = '';
            if (_this.is_reply != 1) {
              _this.is_reply = 1;
            }
            // 评论成功 追加数据
            const addTime = new Date().getTime();
            _this.reply.unshift({
              nickname: data.userInfo.nickname,
              content: data.content,
              image: data.userInfo.image,
              fine:res.data.fine,
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
            postId: id,
            type: type,
          };
        } else {
          data = {
            fine: fine,
            postId: id,
            type: type,
            replyId: commentId,
          };
        }
        this.axios.post(this.$store.state.http_bbs+'/cn/wap-api/add-fine', data).then(function (res) {
          if (res.data.code === 1) {
            // 文章点赞成功
            if (type === 1) {
              _this.postFine = res.data.fine;
            }
            // 评论点赞成功
            if (type === 2) {
              _this.reply[index].fine=parseInt(_this.reply[index].fine)+1;
              _this.postFine=res.data.allfine;
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
          postId : contentId,
          uid: userInfo.uid,
        };
        this.axios.post(this.$store.state.http_bbs+'/cn/wap-api/post-collecte', data).then(function (res) {
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
    font-size: 28px; /*px*/
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
    padding: 24px 10px; /*px*/
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
    width: 54%;
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
