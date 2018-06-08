<template>
  <div id="userCenter" class="clearfix">
    <view-box ref="viewBox" body-padding-bottom="62px">
      <div>
        <div class="tm userWap relative">
          <div class="bgColor"></div>
          <div class="ani userInfo">
            <div class="userImg"><img :src="resData.user.image?$store.state.http_gre+resData.user.image:'/static/images/default.png'" alt=""></div>
            <p class="nickName">{{resData.user.nickname}}</p>
          </div>
        </div>
        <div class="userData">
          <div class="flexWrap bg_f">
            <div class="flexItem vux-1px-r">
              <p class="dataNum">{{resData.questionTotal}}</p>
              <p>做题总数</p>
            </div>
            <div class="flexItem vux-1px-r">
              <p class="dataNum">{{resData.correctRate}}%</p>
              <p>正确率</p>
            </div>
            <div class="flexItem">
              <p class="dataNum">{{resData.days}}</p>
              <p>复习天数</p>
            </div>
          </div>
        </div>
        <group gutter="10px">
          <cell v-for="(item, index) in cellList" @click.native="cellClick(item.url)" :key="item.index" :title="item.cellTit" is-link>
            <img width="20" style="display:block;margin-right:25px;" :src="item.imgUrl" slot="icon" alt="">
          </cell>
        </group>
        <group gutter="10px">
          <cell v-for="(item, index) in cellList2" @click.native="cellClick(item.url)" :key="item.index" :title="item.cellTit" is-link>
            <img width="20" style="display:block;margin-right:25px;" :src="item.imgUrl" slot="icon" alt="">
          </cell>
        </group>
      </div>

      <tabbar solt="bottom" class="bg_f" style="position: fixed">
        <tabbar-item v-if="$store.state.isLogin" @on-item-click="ext">
          <span class="userExit" slot="label">退出登录</span>
        </tabbar-item>
        <tabbar-item v-else link="/login">
          <span class="userExit" slot="label">登录</span>
        </tabbar-item>
      </tabbar>
    </view-box>
    <loading :show="show" text=""></loading>
    <toast v-model="toastStatu" :text="toastText" width="4rem" type="text" :time="1000" position="bottom"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Group, Cell, Toast, Tabbar, TabbarItem, ViewBox, Loading} from 'vux'

  export default {
    name: "userCenter",
    data() {
      return {
        cellList: [
          {imgUrl: '/static/images/userCenter/icon_1.png', cellTit: '收藏题目', url: '/recordMarking'},
          {imgUrl: '/static/images/userCenter/icon_2.png', cellTit: '做题记录', url: '/recordMarking2'},
          {imgUrl: '/static/images/userCenter/icon_3.png', cellTit: '错题记录', url: '/recordMarking3'},
        ],
        cellList2: [
          {imgUrl: '/static/images/userCenter/icon_4.png', cellTit: '我的课程', url: '/order'},
          {imgUrl: '/static/images/userCenter/icon_5.png', cellTit: '雷豆管理', url: '/myLeid'},
          {imgUrl: '/static/images/userCenter/icon_6.png', cellTit: '邀请好友', url: '/order3'},
          {imgUrl: '/static/images/userCenter/icon_7.png', cellTit: '个人资料', url: '/order4'},
        ],
        resData: {
          user: '',
          days: '0',
          questionTotal: '0',
          correctRate: '0',
        },
        show: false,
        toastStatu: false,
        toastText: '',
      }
    },
    components: {
      Group, Cell, Toast, Loading, ViewBox, Tabbar, TabbarItem
    },
    activated() {
      this.getData();
    },
    methods: {
      getData() {
        const _this = this;
        //已登录&未登录状态
        if (this.$store.state.isLogin) {
          _this.show = true;
          _this.axios.get('/cn/wap-api/personal', {params: {uid: this.$store.state.userInfo.uid}}).then(function (res) {
            _this.resData = res.data;
            _this.$nextTick(function () {
              _this.show = false;
            })
          })
        } else {
          console.log('未登录')
        }


      },
      cellClick(url) {
        if (this.$store.state.isLogin) {
          this.$router.push({path: url})
        } else {
          this.toastStatu = true;
          this.toastText = '当前未登录';
        }

      },
      // 退出登录
      ext() {
        localStorage.removeItem('isLogin');
        localStorage.removeItem('userInfo');
        this.$store.commit('isLogin', false);
        this.$store.commit('userInfo', false);
        this.resData = {
          user: '',
          days: '0',
          questionTotal: '0',
          correctRate: '0',
        };
      }

    }
  }
</script>

<style scoped>
  .bg_f {
    background: #fff;
  }

  .userInfo {
    top: 90px;
    left: 0;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
  }

  #userCenter {
    height: 100%;
    background: #f3f3f3;
  }

  #userCenter >>> .weui-toast.vux-toast-bottom {
    bottom: 140px; /*px*/
  }

  #userCenter >>> .weui-toast_text .weui-toast__content {
    font-size: 14px; /*no*/
    padding: 12px 6px; /*px*/
  }

  .userImg {
    width: 174px;
    height: 174px;
    border-radius: 50%;
    margin: auto;
    border: 8px solid #f3f3f3;
    margin-bottom: 10px;
    overflow: hidden;
  }

  .userImg img {
    width: 100%;
    height: 100%;
  }

  .nickName {
    color: #5a5ee4;
    font-size: 32px;
  }

  .userWap {
    height: 350px;
  }

  .bgColor {
    left: 0;
    top: 0;
    width: 100%;
    height: 185px;
    background: #5a5ee4;
    box-sizing: border-box;
  }

  .userData {
    padding: 0 20px;
  }

  .flexWrap {
    display: flex;
    flex-flow: row wrap;
    padding: 30px 0 25px;
    border-radius: 6px; /*no*/
    justify-content: center;
    align-items: flex-start;
  }

  .flexItem {
    flex: 1;
    text-align: center;
    font-size: 28px; /*px*/
    color: #888888;
  }

  .flexItem p.dataNum {
    font-size: 40px; /*px*/
    color: #333333;
    padding-bottom: 10px;
  }

  .userExit {
    color: #888888;
    font-size: 36px; /*px*/
  }

</style>
