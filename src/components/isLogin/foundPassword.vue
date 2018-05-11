<template>
  <div id="register">
    <x-header style="background: #99bd36;" :left-options="{backText: ''}">GRE做题</x-header>
    <div class="model_wrap">
      <div class="rowName">
        <input class="rowInt" type="text" placeholder="手机号码/邮箱">
      </div>
      <div class="rowName flex">
        <input style="width: 60%;" class="rowInt" type="text" placeholder="请输入验证码">
        <button class="sendBtn">验证码</button>
      </div>
      <div class="rowName">
        <input class="rowInt" type="password" placeholder="请输入密码(支持数字和大小写)">
      </div>
      <div class="rowName">
        <input class="rowInt" type="password" placeholder="请确认密码">
      </div>
      <div class="tm formBtn">
        <button id="regBtn">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader} from 'vux'

  export default {
    name: "foundPassword",
    components: {XHeader}
  }

</script>

<style scoped>
  #register {
    height: 100%;
  }

  .flex {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
  }

  .model_wrap {
    padding: 80px 50px 0;
  }

  .rowName {
    padding-bottom: 26px;
  }

  .rowInt {
    width: 100%;
    box-sizing: border-box;
    background: #f1f1f1;
    padding: 0 16px 0 34px;
    height: 90px;
    font-size: 28px /*px*/;
    outline: none;
    border: none;
    border-radius: 4px; /*no*/
  }

  .sendBtn {
    outline: none;
    border: none;
    background: #f1c100;
    color: #ffffff;
    font-size: 28px; /*px*/
    height: 90px;
    width: 37%;
    border-radius: 4px; /*no*/
  }

  #regBtn {
    background: #769f04;
    color: #ffffff;
    font-size: 32px; /*px*/
    height: 80px;
    width: 90%;
    border-radius: 50px;
    border: none;
    outline: none;
  }

  .formBtn {
    padding: 50px 0 50px;
  }

  .bottomHint {
    color: #808080;
  }

  .bottomHint span {
    color: #658704;
  }
</style>
