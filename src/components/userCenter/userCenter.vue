<template>
  <div id="userCenter" class="clearfix">
    <div class="tm userWap relative">
      <div class="bgColor"></div>
      <div class="ani userInfo">
        <div class="userImg"><img src="/static/images/userCenter/userImg.png" alt=""></div>
        <p class="nickName">用户名</p>
      </div>
    </div>
    <div class="userData">
      <div class="flexWrap bg_f">
        <div class="flexItem vux-1px-r">
          <p class="dataNum">600</p>
          <p>做题总数</p>
        </div>
        <div class="flexItem vux-1px-r">
          <p class="dataNum">60%</p>
          <p>正确率</p>
        </div>
        <div class="flexItem">
          <p class="dataNum">60</p>
          <p>复习天数</p>
        </div>
      </div>
    </div>
    <group>
      <cell v-for="(item, index) in cellList" :key="item.index" :title="item.cellTit" :link="item.url">
        <img width="20" style="display:block;margin-right:25px;" :src="item.imgUrl" slot="icon" alt="">
      </cell>
    </group>
    <group>
      <cell v-for="(item, index) in cellList2" :key="item.index" :title="item.cellTit" :link="item.url">
        <img width="20" style="display:block;margin-right:25px;" :src="item.imgUrl" slot="icon" alt="">
      </cell>
    </group>
    <tabbar style="bottom: 2px;" class="bg_f">
      <tabbar-item>
        <span class="userExit" slot="label">退出登录</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Group, Cell, Tabbar, TabbarItem} from 'vux'

  export default {
    name: "userCenter",
    data() {
      return {
        cellList: [
          {imgUrl: '/static/images/userCenter/icon_1.png', cellTit: '收藏题目',url:'/recordMarking'},
          {imgUrl: '/static/images/userCenter/icon_2.png', cellTit: '做题记录',url:'/recordMarking'},
          {imgUrl: '/static/images/userCenter/icon_3.png', cellTit: '错题记录',url:'/recordMarking'},
        ],
        cellList2: [
          {imgUrl: '/static/images/userCenter/icon_4.png', cellTit: '我的课程',url:'/order'},
          {imgUrl: '/static/images/userCenter/icon_5.png', cellTit: '雷豆管理',url:'/myLeid'},
          {imgUrl: '/static/images/userCenter/icon_6.png', cellTit: '邀请好友',url:'/order'},
          {imgUrl: '/static/images/userCenter/icon_7.png', cellTit: '个人资料',url:'/order'},
        ]
      }
    },
    components: {
      Group,
      Cell,
      Tabbar,
      TabbarItem
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
    font-size: 28px;/*px*/
    color: #888888;
  }

  .flexItem p.dataNum {
    font-size: 40px;/*px*/
    color: #333333;
    padding-bottom: 10px;
  }

  .userExit {
    color: #888888;
    font-size: 36px;/*px*/
  }
</style>
