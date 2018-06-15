<template>
  <div id="invite">
    <x-header class="header" :left-options="{backText: ''}">邀请好友</x-header>
    <div class="relative" style="height: 80%">
      <div class="urlContent">
        <div class="urlWrap" v-clipboard:copy="link"
             v-clipboard:success="onCopy"
             v-clipboard:error="onError">
          <h1 class="urlTit">点击复制邀请好友注册: </h1>
          <div class="urlText" id="cpLink">{{link}}</div>
        </div>
      </div>
    </div>
    <toast v-model="toastStatu" :text="toastText" width="4rem" type="text" :time="1500" position="bottom"></toast>
  </div>
</template>

<script>
  import {XHeader,Toast} from 'vux';
  // let clipboard = new Clipboard('.urlWrap');
  export default {
    name: "invite",
    components: {XHeader,Toast},
    data(){
      return{
        link:window.location.href,
        toastStatu: false,
        toastText: '',
      }
    },
    methods: {
      //复制链接
      onCopy: function (e) {
        this.toastText = '复制成功';
        this.toastStatu = true;
      },
      onError: function (e) {
        this.toastText = '复制失败';
        this.toastStatu = true;
      }
    }
  }

</script>

<style scoped>
  #invite {
    height: 100%;
    background: url("/static/images/invite_bg.png")no-repeat 0 0;
    background-size: cover;
  }
  #invite >>> .weui-toast_text .weui-toast__content {
    font-size: 14px; /*no*/
    padding: 12px 6px; /*px*/
  }

  .header {
    z-index: 100;
    background: #5a5ee4;
  }

  .urlContent {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 10%;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
  }

  .urlWrap {
    display: inline-block;
    vertical-align: middle;
    background: #eeeeee;
    padding: 20px 20px;
    max-width: 85%;
    box-sizing: border-box;
    border-radius: 10px; /*px*/
    min-width: 75%;
  }

  .urlTit {
    color: #555555;
    font-size: 32px; /*px*/
    margin-bottom: 10px; /*px*/
  }

  .urlText {
    font-size: 28px; /*px*/
    color: #777777;

  }
</style>
