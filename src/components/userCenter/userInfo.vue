<template>
  <div id="userInfo">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="20px">
      <x-header class="header" :left-options="{backText: ''}">账号设置</x-header>
      <group title="个人信息">
        <cell title="头像">
          <div id="upload" class="relative" slot="title">
            <span>头像</span>
            <input type="file" accept="image/*;" @change='onUpload'>
          </div>
          <div class="userHeader">
            <img class="previewer-demo-img" @click="show(0)" :src="resData.image?$store.state.http_gre+resData.image:'/static/images/default.png'" alt="">
          </div>
        </cell>
        <cell title="昵称" is-link :value="resData.nickname?resData.nickname:resData.userName" @click.native="confirm_1"></cell>
        <cell title="电话" is-link :value="resData.phone?resData.phone:'未绑定'" @click.native="confirm_2"></cell>
        <cell title="邮箱" is-link :value="resData.email?resData.email:'未绑定'" @click.native="confirm_3"></cell>
        <cell title="密码" is-link value="******" @click.native="confirm_4"></cell>
      </group>
      <group title="关于我们">
        <cell title="官方网站" value="www.greonline.cn"></cell>
        <cell title="微信公众号" value="greonline"></cell>
      </group>
    </view-box>
    <previewer :list="list" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
    <x-dialog v-model="confirmVal_1" hide-on-blur>
      <div class="dialog_wrap bg_f">
        <h1 class="dialog_tit">起一个闪亮亮的昵称吧</h1>
        <div class="rowIntWrap">
          <div class="rowInt"><input class="int-line" v-model="nickName" type="text" placeholder="请填写昵称"></div>
        </div>
        <div class="handle_wrap">
          <span class="vux-1px-r" @click="confirmVal_1=false">取消</span>
          <span @click="reviseNickname">确定</span>
        </div>
      </div>
    </x-dialog>
    <x-dialog v-model="confirmVal_2" hide-on-blur>
      <div class="dialog_wrap bg_f">
        <h1 class="dialog_tit">修改手机号</h1>
        <div class="rowIntWrap">
          <div class="rowInt"><input class="int-line" v-model="phone" type="text" placeholder="请填写手机号"></div>
          <div class="rowInt">
            <input class="int-code" v-model="phoneCode" type="text" placeholder="请输入验证码">
            <button class="codeBtn" :class="disabled?'sendOver':'sendStart'" :disabled="disabled" @click="sendPhone">{{codeTxt}}</button>
          </div>
        </div>
        <div class="handle_wrap">
          <span class="vux-1px-r" @click="confirmVal_2=false">取消</span>
          <span @click="revisePhone">确定</span>
        </div>
      </div>
    </x-dialog>
    <x-dialog v-model="confirmVal_3" hide-on-blur>
      <div class="dialog_wrap bg_f">
        <h1 class="dialog_tit">修改邮箱</h1>
        <div class="rowIntWrap">
          <div class="rowInt"><input class="int-line" v-model="email" type="text" placeholder="请填写邮箱"></div>
          <div class="rowInt">
            <input class="int-code" type="text" v-model="emailCode" placeholder="请输入验证码">
            <button class="codeBtn" :class="disabled?'sendOver':'sendStart'" :disabled="disabled" @click="sendEmail">{{codeTxt}}</button>
          </div>
        </div>
        <div class="handle_wrap">
          <span class="vux-1px-r" @click="confirmVal_3=false">取消</span>
          <span @click="reviseEmail">确定</span>
        </div>
      </div>
    </x-dialog>
    <x-dialog v-model="confirmVal_4" hide-on-blur>
      <div class="dialog_wrap bg_f">
        <h1 class="dialog_tit">修改密码</h1>
        <div class="rowIntWrap">
          <div class="rowInt"><input class="int-line" v-model="oldPass" type="text" placeholder="请填旧原密码"></div>
          <div class="rowInt"><input class="int-line" v-model="newPass" type="text" placeholder="请填写新密码"></div>
          <div class="rowInt"><input class="int-line" v-model="confirmPass" type="text" placeholder="请确认新密码"></div>
        </div>
        <div class="handle_wrap">
          <span class="vux-1px-r" @click="confirmVal_4=false">取消</span>
          <span @click="revisePass">确定</span>
        </div>
      </div>
    </x-dialog>
    <loading :show="load" text=""></loading>
    <toast v-model="toastStatu" :text="toastText" width="6.5rem" type="text" :time="1500" position="bottom"></toast>
  </div>
</template>

<script>
  import {XHeader, Group, Cell, Toast, Tabbar, TabbarItem, ViewBox, Loading, Previewer, XDialog, Actionsheet, TransferDom} from 'vux'

  const phoneReg = /^1[34578]\d{9}$/;//手机号校验正则
  const passReg = /^[\da-zA-Z]{6,20}$/;//密码校验正则
  const emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;//邮箱验证;
  export default {
    name: "userInfo",
    directives: {
      TransferDom
    },
    components: {XHeader, Group, Cell, Toast, Loading, ViewBox, Tabbar, TabbarItem, Previewer, XDialog, Actionsheet, TransferDom},
    data() {
      return {
        load: false,
        resData: '',
        confirmVal_1: false,
        confirmVal_2: false,
        confirmVal_3: false,
        confirmVal_4: false,
        nickName: '',
        phone: '',
        phoneCode: '',
        email: '',
        emailCode: '',
        newPass: '',
        oldPass: '',
        confirmPass: '',
        disabled: false,//验证码按钮状态
        time: 0,//验证码倒计时
        codeTxt: "获取验证码",        //验证码按钮文字
        toastStatu: false,
        toastText: '',
        list: [],
        options: {
          getThumbBoundsFn(index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index];
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect();
            // w = width
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
          }
        }
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      logIndexChange(arg) {
        console.log(arg)
      },
      show(index) {
        this.$refs.previewer.show(index)
      },
      getData() {
        const _this = this;
        _this.load = true;
        let data = {uid: this.$store.state.userInfo.uid};
        this.axios.get('/cn/wap-api/personal-data', {params: data}).then((res) => {
          _this.resData = res.data.data;
          _this.list = [{
            msrc: res.data.data.image?_this.$store.state.http_gre+res.data.data.image:'/static/images/default.png',
            src: res.data.data.image?_this.$store.state.http_gre+res.data.data.image:'/static/images/default.png',
          }];
          _this.$nextTick(() => {
            _this.load = false;
          })
        })
      },
      confirm_1() {
        this.nickName = '';
        this.confirmVal_1 = true;
      },
      confirm_2() {
        this.time = 0;
        this.codeTxt = "获取验证码";
        this.disabled = false;
        this.phone = '';
        this.phoneCode = '';
        this.$nextTick(() => {
          this.confirmVal_2 = true;
        });
      },
      confirm_3() {
        this.time = 0;
        this.codeTxt = "获取验证码";
        this.disabled = false;
        this.email = '';
        this.emailCode = '';
        this.$nextTick(() => {
          this.confirmVal_3 = true;
        });
      },
      confirm_4() {
        this.oldPass = '';
        this.newPass = '';
        this.confirmPass = '';
        this.confirmVal_4 = true;
      },
      // 修改头像
      onUpload(e) {
        const _this = this;
        _this.load = true;
        let file = e.target.files[0];
        let param = new FormData(); //创建form对象
        let config = {
          headers: {'Content-Type': 'multipart/form-data'},
          transformRequest: [param => param]
        }; //添加请求头
        param.append('upload', file||'');//通过append向form对象添加数据
        param.append('uid', _this.$store.state.userInfo.uid);//通过append向form对象添加数据
        if(param.get('upload')){
          _this.axios.post('/cn/wap-api/app-image', param, config).then(res => {
            _this.load = false;
            if (res.data.code === 1) {
              _this.resData.image = res.data.image;
              _this.list = [{
                msrc: _this.$store.state.http_gre+res.data.image,
                src: _this.$store.state.http_gre+res.data.image,
              }];
              _this.$nextTick(() => {
                _this.toastText = res.data.message;
                _this.toastStatu = true;
              });

            } else {
              _this.toastText = '上传失败';
              _this.toastStatu = true;
            }
          })
        }else {
          _this.load = false;
        }


      },
      //修改昵称
      reviseNickname() {
        const _this = this;
        let data = {
          uid: _this.$store.state.userInfo.uid,
          nickname: _this.nickName,
        };
        if (data.nickname) {
          _this.axios.post('/cn/wap-api/change-user-name', data).then((res) => {
            if (res.data.code === 1) {
              _this.resData.nickname = data.nickname;
              _this.confirmVal_1 = false;
            }
            _this.$nextTick(() => {
              _this.toastText = res.data.message;
              _this.toastStatu = true;
            });

          })
        } else {
          _this.toastText = '请输入昵称';
          _this.toastStatu = true;
          return false;
        }

      },
      // 修改手机号
      revisePhone() {
        const _this = this;
        let data = {
          uid: _this.$store.state.userInfo.uid,
          phone: _this.phone,
          phoneCode: _this.phoneCode,
        };
        if (phoneReg.test(data.phone)) {
          if (data.phoneCode) {
            _this.axios.post('/cn/wap-api/change-user-phone', data).then((res) => {
              if (res.data.code === 1) {
                _this.resData.phone = data.phone;
                _this.confirmVal_2 = false;
              }
              _this.$nextTick(() => {
                _this.toastText = res.data.message;
                _this.toastStatu = true;
              });
            })
          } else {
            _this.toastText = '验证码有误';
            _this.toastStatu = true;
            return false;
          }
        } else {
          _this.toastText = '手机格式有误';
          _this.toastStatu = true;
          return false;
        }

      },
      //发送手机验证
      sendPhone() {
        const _this = this;
        let data = {
          phoneNum: _this.phone,
          type: 5,
        };
        if (phoneReg.test(data.phoneNum)) {
          _this.axios.post('/cn/api/phone-code', data)
            .then(function (res) {
              if (res.data.code === 1) {
                _this.time = 60;
                _this.disabled = true;
                _this.timer();
              } else {
                _this.toastText = res.data.message;
                _this.toastStatu = true;
              }
            })
        } else {
          _this.toastText = '手机格式有误';
          _this.toastStatu = true;
          return false;
        }
      },
      //修改邮箱
      reviseEmail() {
        const _this = this;
        let data = {
          uid: _this.$store.state.userInfo.uid,
          emailCode: _this.emailCode,
          email: _this.email,
        };
        if (emailReg.test(data.email)) {
          if (data.emailCode) {
            _this.axios.post('/cn/wap-api/change-user-email', data).then((res) => {
              if (res.data.code === 1) {
                _this.resData.email = data.email;
                _this.confirmVal_3 = false;
              }
              _this.$nextTick(() => {
                _this.toastText = res.data.message;
                _this.toastStatu = true;
              });
            })
          } else {
            _this.toastText = '验证码有误';
            _this.toastStatu = true;
            return false;
          }
        } else {
          _this.toastText = '邮箱格式有误';
          _this.toastStatu = true;
          return false;
        }

      },
      //发送邮箱验证
      sendEmail() {
        const _this = this;
        let data = {
          email: _this.email,
        };
        if (emailReg.test(data.email)) {
          _this.axios.post('/cn/api/send-mail', data)
            .then(function (res) {
              if (res.data.code === 1) {
                _this.time = 60;
                _this.disabled = true;
                _this.timer();
              } else {
                _this.toastText = res.data.message;
                _this.toastStatu = true;
              }
            })
        } else {
          _this.toastText = '邮箱格式有误';
          _this.toastStatu = true;
          return false;
        }

      },
      //修改密码
      revisePass() {
        const _this = this;
        let data = {
          uid: _this.$store.state.userInfo.uid,
          oldPassword: _this.oldPass,
          newPassword: _this.newPass,
        };
        if (!passReg.test(data.newPassword) || !passReg.test(data.oldPassword)) {
          _this.toastText = '密码由6-20位数字或字母组成';
          _this.toastStatu = true;
          return false;
        }
        if (_this.newPass === _this.oldPass) {
          //弹窗提示密码不相等
          _this.toastText = '新密码与旧密码不能相同';
          _this.toastStatu = true;
          return false;
        }
        if (_this.newPass != _this.confirmPass) {
          //弹窗提示密码不相等
          _this.toastText = '请确认密码是否相同';
          _this.toastStatu = true;
          return false;
        } else {
          data.newPassword = _this.newPass;
        }
        _this.axios.post('/cn/wap-api/change-user-pass', data).then((res) => {
          _this.toastText = res.data.message;
          _this.toastStatu = true;
          if (res.data.code === 1) {
            _this.confirmVal_4 = false;
          }

        })

      },
      // 倒计时
      timer() {
        if (this.time > 0) {
          this.time--;
          this.codeTxt = this.time + "s 重新发送";
          setTimeout(this.timer, 1000);
        } else {
          this.time = 0;
          this.codeTxt = "获取验证码";
          this.disabled = false;
        }
      },
    }
  }
</script>

<style scoped>
  #userInfo {
    height: 100%;
  }

  #userInfo >>> .vux-loading-no-text .weui-toast {
    top: 50%;
    margin-top: -49px; /*no*/
  }

  #userInfo >>> .weui-cells {
    font-size: 16px; /*no*/
    color: #333333;
  }

  #userInfo >>> .weui-cells__title {
    font-size: 16px; /*no*/
    color: #333333;
    margin: 0;
    padding: 25px; /*px*/
    background: #f3f3f3;
  }

  #userInfo >>> .weui-cell__ft {
    color: #777777;
  }

  #userInfo >>> .weui-dialog {
    max-width: none;
    background: none;
  }

  #userInfo >>> .weui-toast_text .weui-toast__content {
    font-size: 14px; /*no*/
    padding: 12px 6px; /*px*/
  }

  .header {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    background: #5a5ee4;
  }

  .userHeader {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    overflow: hidden;
  }

  .userHeader img {
    height: 100%;
    width: 100%;
  }

  .dialog_tit {
    color: #333333;
    font-size: 32px; /*px*/
    padding: 30px 0 10px; /*px*/
  }

  .rowIntWrap {
    padding: 0 30px;
  }

  .rowInt {
    padding: 15px 0; /*no*/
    text-align: left;
    border-bottom: 1px solid #cccccc; /*no*/
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
  }

  .rowInt input[type=text] {
    height: 68px; /*px*/
    border: none;
    outline: none;
    box-sizing: border-box;
    padding-left: 5px;
    font-size: 28px; /*px*/
  }

  .rowInt .int-line {
    width: 100%;
  }

  .rowInt .codeBtn {
    border: none;
    outline: none;
    font-size: 28px; /*px*/
    color: #ffffff;
    height: 68px; /*px*/
    line-height: 68px; /*px*/
    padding: 0 30px; /*px*/
    border-radius: 10px; /*px*/
  }

  .sendOver {
    background: #aba5b1;
  }

  .sendStart {
    background: #5a5ee4;
  }

  .rowInt .codeBtn:active {
    background: #4e52c6;
  }

  .handle_wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: row wrap;
  }

  .handle_wrap span {
    width: 50%;
    background: #5a5ee4;
    padding: 25px 0;
    color: #ffffff;
    font-size: 28px; /*px*/
  }

  .handle_wrap span:active {
    background: #474ab3;
  }

  #upload {
    box-sizing: border-box;
    padding-right: 10px; /*no*/
  }

  #upload input {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

</style>
