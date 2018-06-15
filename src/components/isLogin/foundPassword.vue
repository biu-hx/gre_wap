<template>
  <div id="foundPassWord">
    <x-header style="background: #99bd36;" :left-options="{backText: ''}">找回密码</x-header>
    <div class="model_wrap">
      <div class="rowName">
        <input class="rowInt" type="text" placeholder="手机号码/邮箱" @blur="regex(phoneVal)" v-model="phoneVal">
      </div>
      <div class="rowName flex">
        <input style="width: 60%;" class="rowInt" type="text" placeholder="请输入验证码" v-model="codeYz">
        <button class="sendBtn" :class="disabled?'sendOver':'sendStart'" :disabled="disabled" @click="getCode(2)">{{codeTxt}}</button>
      </div>
      <div class="rowName">
        <input class="rowInt" type="password" placeholder="请输入密码(支持数字和大小写)" v-model="passwordVal">
      </div>
      <div class="rowName">
        <input class="rowInt" type="password" placeholder="请确认密码" v-model="rePasswordVal">
      </div>
      <div class="tm formBtn">
        <button id="regBtn" @click="foundPass">确定</button>
      </div>
      <div class="tm bottomHint">已注册雷哥网在线账号？
        <router-link tag="span" :to="{name:'login'}">登录</router-link>
      </div>
    </div>
    <loading :show="loadStatu" :text="loadText"></loading>
    <toast v-model="toastStatu" :text="toastText" width="4.5rem" type="text" :time="1000" position="bottom"></toast>
  </div>
</template>

<script>
  import {XHeader, Toast, Loading} from 'vux'

  const phoneReg = /^1[34578]\d{9}$/;//手机号校验正则
  const passReg = /^[\da-zA-Z]{6,20}$/;//密码校验正则
  const emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;//邮箱验证;
  export default {
    name: "foundPassWord",
    data() {
      return {
        type: '',//1表示手机注册 2表示邮箱注册
        phoneVal: '',//手机号&邮箱
        codeYz: '',//验证码
        passwordVal: '',//密码
        rePasswordVal: '',//确认密码
        resCode: '',//返回的code
        code: "",    //手机验证码
        disabled: false,
        time: 0,
        codeTxt: "验证码",        //验证码按钮文字
        loginBtnActive: false,    //登录按钮是否可用
        codeBtnActive: false,    //获取验证码按钮是否可用
        toastStatu: false,
        toastText: '',
        loadStatu: false,
        loadText: '',
      }
    },
    components: {XHeader, Toast, Loading},
    watch: {
      phoneVal: {
        handler: function (curVal, oldVal) {
          if (phoneReg.test(curVal)) {
            this.type = 1;
          }
          if (emailReg.test(curVal)) {
            this.type = 2;
          }
        },
        deep: true
      },

    },
    activated(){
      this.phoneVal='';
      this.codeYz='';
      this.passwordVal='';
      this.rePasswordVal='';
      this.disabled=false;
      this.time=0;
      this.codeTxt= "验证码";
    },
    methods: {
      // 验证用户名格式
      regex(curVal) {
        if (!phoneReg.test(curVal) && !emailReg.test(curVal)) {
          //弹窗提示格式有误
          this.type = '';
          this.toastText = '手机号/邮箱格式有误';
          this.toastStatu = true;
        }
      },
      // 获取验证码
      getCode(handleType) {
        const _this = this;
        if (_this.type === 1) {
          let data = {
            phoneNum: _this.phoneVal,
            type: handleType,
          };
          _this.axios.post('http://login.gmatonline.cn/cn/wap-api/phone-code', data)
            .then(function (res) {
              _this.toastText = res.data.message;
              _this.toastStatu = true;
              if (res.data.code === 1) {
                _this.time = 60;
                _this.disabled = true;
                _this.timer();
                _this.resCode = res.data.phonecode;
              }
            })
        }
        if (this.type === 2) {
          let data = {
            email: _this.phoneVal,
            type: handleType,
          };
          _this.axios.post('http://login.gmatonline.cn/cn/wap-api/send-mail', data)
            .then(function (res) {
              _this.toastText = res.data.message;
              _this.toastStatu = true;
              if (res.data.code === 1) {
                _this.time = 60;
                _this.disabled = true;
                _this.timer();
                _this.resCode = res.data.emailCode;
              }
            })
        }
      },
      // 倒计时
      timer() {
        if (this.time > 0) {
          this.time--;
          this.codeTxt = this.time + "s 重新发送";
          setTimeout(this.timer, 1000);
        } else {
          this.time = 0;
          this.codeTxt = "验证码";
          this.disabled = false;
        }
      },
      foundPass() {
        const _this = this;
        this.$nextTick(function () {
          let data = {
            registerStr: _this.phoneVal,
            type: _this.type,
            code: _this.codeYz,
            pass: '',
            phoneCode: _this.resCode,
          };
          if (!phoneReg.test(_this.phoneVal) && !emailReg.test(_this.phoneVal)) {
            _this.toastText = '手机号/邮箱格式有误';
            _this.toastStatu = true;
            return false;
          }
          if (!_this.codeYz) {
            _this.toastText = '请输入验证码';
            _this.toastStatu = true;
            return false;
          }
          if (!passReg.test(_this.passwordVal)) {
            _this.toastText = '密码由6-20位数字或字母组成';
            _this.toastStatu = true;
            return false;
          }
          if (_this.passwordVal != _this.rePasswordVal) {
            //弹窗提示密码不相等
            _this.toastText = '请确认密码是否相同';
            _this.toastStatu = true;
            return false;
          } else {
            data.pass = _this.passwordVal;
          }
          this.axios.post('http://login.gmatonline.cn/cn/wap-api/find-pass', data)
            .then(function (res) {
              _this.toastText = res.data.message;
              _this.toastStatu = true;
              setTimeout(() => {
                _this.$router.push({name:'login'})
              }, 2000)
            })

        })
      },

    }
  }
</script>

<style scoped>
  #foundPassWord {
    height: 100%;
  }

  #foundPassWord >>> .weui-toast.vux-toast-bottom {
    bottom: 180px; /*px*/
  }

  #foundPassWord >>> .weui-toast_text .weui-toast__content {
    font-size: 14px; /*no*/
    padding: 12px; /*px*/
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
    font-size: 28px; /*px*/
    outline: none;
    border: none;
    border-radius: 4px; /*no*/
  }

  .sendBtn {
    outline: none;
    border: none;

    color: #ffffff;
    font-size: 28px; /*px*/
    height: 90px;
    width: 37%;
    border-radius: 4px; /*no*/
  }

  .sendStart {
    background: #f1c100;
  }

  .sendOver {
    background: #aba5b1;
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
