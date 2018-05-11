<template>
  <div id="register">
    <x-header style="background: #99bd36;" :left-options="{backText: ''}">GRE做题</x-header>
    <div class="model_wrap">
      <div class="rowName">
        <input class="rowInt" type="text" placeholder="手机号码/邮箱" v-model="phoneVal">
      </div>
      <div class="rowName flex">
        <input style="width: 60%;" class="rowInt" type="text" placeholder="请输入验证码" v-model="codeYz">
        <button class="sendBtn" @click="getCode">验证码</button>
      </div>
      <div class="rowName">
        <input class="rowInt" type="password" placeholder="请输入密码(支持数字和大小写)" v-model="passwordVal">
      </div>
      <div class="rowName">
        <input class="rowInt" type="password" placeholder="请确认密码" v-model="rePasswordVal">
      </div>
      <div class="tm formBtn">
        <button id="regBtn" @click="register">注册</button>
      </div>
      <div class="tm bottomHint">已注册雷哥网在线账号？
        <router-link tag="span" :to="{name:'login'}">登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader} from 'vux'
  // type:typeNum,//1表示手机注册 2表示邮箱注册
  //   phoneCode:phoneCode,
  //   code:code_yz,
  //   pass:password,
  //   userName:username,
  //   source:3//1是gmat 2是托福 3是留学
  // reg 1(3|4|5|7|8)\d{9}
  const phoneReg = /^1[34578]\d{9}$/;//手机号校验正则
  const emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;//邮箱验证;
  export default {
    name: "register",
    data() {
      return {
        type: 1,
        phoneVal: '',//手机号&邮箱
        codeYz: '',//验证码
        passwordVal: '',//密码
        rePasswordVal: '',//确认密码
        passwordStatu:true,//两次输入是否相等
        code: "",    //手机验证码
        count: 60,    //验证码倒计时
        codeTxt: "获取验证码",        //验证码按钮文字
        loginBtnActive: false,    //登录按钮是否可用
        codeBtnActive: false,    //获取验证码按钮是否可用
      }
    },
    components: {XHeader},
    watch:{
      phoneVal:{
        handler:function(curVal,oldVal){
          if (phoneReg.test(curVal)) {
            this.type = 1;
            console.log("手机");
          }else {
            //弹窗提示格式有误
            console.log('格式有误');
          }
          if (emailReg.test(curVal)) {
            this.type = 2;
            console.log("邮箱");
          }else {
            //弹窗提示格式有误
            console.log('格式有误');
          }

        },
        deep:true
      },

    },
    methods: {
      register() {
        this.$nextTick(function () {
          const _this = this;
          let data = {
            registerStr: _this.phoneVal,
            code: _this.codeYz,
            pass: '',
            type: _this.type,
            source: 22,
            phoneCode: '',
          };
          if(_this.passwordVal!=_this.rePasswordVal){
            //弹窗提示密码不相等
            return false;
          }else {
            data.pass=_this.passwordVal;
          }
          console.log(data)
          // this.axios.post('http://login.gmatonline.cn/cn/wap-api/register',data)
          //   .then(function (res) {
          //
          //   })

        })
      },
      // 获取验证码
      getCode(){
        console.log('ready code')
      }


    }
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
