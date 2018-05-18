<template>
  <div id="login">
    <div class="signWrap">
      <div class="tit tm">雷哥网账号登录</div>
      <div>
        <div class="rowName">
          <div class="icon_1"><img src="/static/images/isLogin/user.png" alt=""></div>
          <input class="rowInt" type="text" placeholder="手机号／用户名／邮箱" v-model="userVal">
        </div>
        <div class="rowName">
          <div class="icon_2"><img src="/static/images/isLogin/lock_2.png" alt=""></div>
          <input class="rowInt" type="password" placeholder="密码" v-model="passwordVal">
        </div>
        <div class="tm submitWrap">
          <button class="sign_btn" @click="login(userVal,passwordVal)">登录</button>
        </div>
        <div class="flex other_handle">
          <router-link tag="span" :to="{name:'register'}">注册账号&gt;</router-link>
          <router-link tag="span" :to="{name:'foundPassword'}">忘记密码？</router-link>
        </div>
      </div>
      <loading :show="loadStatu" width="4rem" :text="loadText"></loading>
      <toast v-model="toastStatu" :text="toastText" width="4rem" type="text" :time="1000" position="bottom"></toast>
    </div>
  </div>
</template>

<script>
  import {XHeader, Toast, Loading} from 'vux'

  export default {
    name: "login",
    data() {
      return {
        uid: '',
        userVal: '',
        passwordVal: '',
        toastStatu: false,
        toastText: '',
        loadStatu: false,
        loadText: '',

      }
    },
    components: {XHeader, Toast, Loading},
    methods: {
      login(userName,userPass) {
        const _this = this;
        let data = {
          userName: userName,
          userPass: userPass
        };
        if (data.userName) {
          _this.axios.get('http://login.gmatonline.cn/cn/wap-api/check-login', {params: data}).then(function (res) {
            let str = res.data;
            let data2 = JSON.parse(str.substr(1, str.length - 2));
            if (data2.code === 1) {
              _this.loadStatu = true;
              _this.uid = data2.uid;
              let bbsData = {
                uid: data2.uid,
                phone: data2.phone,
                email: data2.email,
                username: data2.username,
              };
              let greData = {
                uid: data2.uid,
                phone: data2.phone,
                email: data2.email,
                username: data2.username,
                password: data2.password,
              };
              //登录GRE
              _this.axios.post('/cn/wap-api/login', greData).then(function (res) {
                if (res.data.code === 1) {
                  //登录BBS
                  _this.axios.get(_this.$store.state.http_bbs + '/cn/wap-api/unify-login', {params: bbsData}).then(function (res) {
                    if (res.data.code === 1) {
                      _this.$router.push({name: 'index'});
                      _this.loadStatu = false;
                      localStorage.setItem('isLogin','true');
                      localStorage.setItem('userInfo',JSON.stringify(data2));
                      _this.$store.commit('isLogin',true);
                      _this.$store.commit('userInfo',data2);
                    }
                  });
                }
              })
            } else {
              _this.toastText = data2.message;
              _this.toastStatu = true;
              return false;
            }
          })
        } else {
          _this.toastText = '账号密码有误';
          _this.toastStatu = true;
          return false;
        }


      }
    }
  }
</script>

<style scoped>
  #login {
    height: 100%;
    background: url("/static/images/isLogin/login_bg.png") no-repeat 0 0;
    background-size: cover;
  }

  #login >>> .weui-toast.vux-toast-bottom {
    bottom: 140px; /*px*/
  }

  #login >>> .weui-toast_text .weui-toast__content {
    font-size: 14px; /*no*/
    padding: 12px 6px; /*px*/
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
