<template>
  <div id="login">
    <div class="signWrap">
      <div class="tit tm">雷哥网账号登录</div>
      <div>
        <div class="rowName">
          <div class="icon_1"><img src="/static/images/isLogin/user.png" alt=""></div>
          <input class="rowInt" type="text" placeholder="手机号／用户名／邮箱">
        </div>
        <div class="rowName">
          <div class="icon_2"><img src="/static/images/isLogin/lock_2.png" alt=""></div>
          <input class="rowInt" type="password" placeholder="密码">
        </div>
        <div class="tm submitWrap">
          <button class="sign_btn">登录</button>
        </div>
        <div class="flex other_handle">
          <router-link tag="span" :to="{name:'register'}">注册账号&gt;</router-link>
          <router-link tag="span" :to="{name:'foundPassword'}">忘记密码？</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
  }
</script>

<style scoped>
  #login {
    height: 100%;
    background: url("/static/images/isLogin/login_bg.png") no-repeat 0 0;
    background-size: cover;
  }

  .signWrap {
    padding: 200px 60px 0;
  }

  .tit {
    color: #ffffff;
    font-size: 36px; /*px*/
    margin-bottom: 80px;
  }

  .flex {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;

  }

  .rowName {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    margin-bottom: 30px;
    border-bottom: 1px solid #c8d5d8;
  }

  .rowName .rowInt {
    /*outline: 1px solid red; !*no*!*/
    border: none;
    outline: none;
    color: #ffffff;
    background: transparent;
    width: 90%;
    height: 60px;
    text-align: center;
    font-size: 28px; /*px*/
  }

  .rowInt::-webkit-input-placeholder {
    color: #ffffff;
    font-size: 28px; /*px*/
  }

  .icon_1 {
    width: 36px; /*px*/
  }

  .icon_2 {
    width: 28px; /*px*/
  }

  .submitWrap {
    padding: 80px 0 60px;
  }

  .sign_btn {
    width: 88%;
    outline: none;
    border: none;
    color: #468ed1;
    height: 80px;
    border-radius: 40px;
    font-size: 32px; /*px*/
    background: #ffffff;
  }

  .sign_btn:active {
    background: #64e3d8;
    color: #ffffff;
  }

  .other_handle {
    color: #ffffff;
    justify-content: space-between;
    font-size: 24px; /*px*/
  }

</style>
