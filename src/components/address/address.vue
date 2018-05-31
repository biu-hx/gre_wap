<template>
  <div id="addressWrap">
    <view-box ref="viewBox" body-padding-top="60px" body-padding-bottom="62px">
      <x-header solt="header" class="header" :left-options="{backText: ''}">编辑地址<a class="navRight" @click="onSure" slot="right">完成</a></x-header>
      <div class="content">
        <div class="row vux-1px-b">
          <div class="rowTit">收货人</div>
          <div class="rowInt"><input type="text" v-model="nameVal" placeholder="姓名"></div>
        </div>
        <div class="row vux-1px-b">
          <div class="rowTit">手机号</div>
          <div class="rowInt"><input type="text" v-model="phoneVal" placeholder="11位手机号码"></div>
        </div>
        <group class="rowAdd_1" gutter="0">
          <x-address :title="title" v-model="value" :list="addressData" @on-shadow-change="onShadowChange" placeholder="请选择地址"
                     :show.sync="showAddress"></x-address>
        </group>
        <!--<div class="row vux-1px-b" @click="showAddress" :show.sync="showAddress">-->
        <!--<div class="rowTit">地区</div>-->
        <!--<div class="rowInt"><input type="text" placeholder="请选择地区"></div>-->
        <!--</div>-->
        <div class="row vux-1px-b">
          <div class="rowTit">详细地址</div>
          <div class="rowInt"><input type="text" v-model="addressText" placeholder="请填写详细地址"></div>
        </div>
      </div>
    </view-box>
    <toast v-model="toastStatu" :text="toastText" width="4rem" type="text" :time="1200" position="bottom"></toast>
  </div>
</template>

<script>
  import {XHeader, ViewBox, Tabbar, TabbarItem, XAddress, Toast, Group, Cell, ChinaAddressV4Data, Value2nameFilter as value2name} from 'vux'

  export default {
    name: "addressWrap",
    data() {
      return {
        title: '地区',//
        value: [],//选中值
        addressData: ChinaAddressV4Data,
        showAddress: false,
        nameVal: '',
        phoneVal: '',
        addreesVal: '',
        addressText: '',
        toastStatu: false,
        toastText: '',
      }
    },
    components: {XHeader, ViewBox, Tabbar, TabbarItem, XAddress, Toast, Group, Cell},
    activated() {
      let id = this.$route.query.id;
      if (id) {
        this.getData(id);
      }else {
        this.value=[];
        this.nameVal='';
        this.phoneVal='';
        this.addressText='';
      }


    },
    methods: {
      // 保存地址接口
      // http://order.gmatonline.cn/pay/wap-api/save-consignee
      // name: name,
      // address: address,
      // phone: phone,
      // province: province, //省
      // city: city,//市
      // area: area,//县
      // alias: alias,//地址别名
      // id:'',
      // uid: uid
      getData(id) {
        const _this = this;
        let data = {
          uid: this.$store.state.userInfo.uid,
          id: id,
        };
        _this.axios.get('http://order.gmatonline.cn/pay/wap-api/get-consignee', {params: data}).then(function (res) {
          _this.nameVal=res.data[0].name;
          _this.phoneVal=res.data[0].phone;
          _this.addressText=res.data[0].address;
          _this.value=[res.data[0].province,res.data[0].city,res.data[0].area];
          // if(res.data.length>0){
          //   _this.address=res.data;
          // }

        });
      },
      onSure() {
        const _this = this;
        let data = {
          uid: this.$store.state.userInfo.uid,
          name: this.nameVal,
          phone: this.phoneVal,
          id: this.$route.query.id||'',
          province: this.value.length > 0 ? this.addreesVal[0] : '',
          city: this.value.length > 0 ? this.addreesVal[1] : '',
          area: this.value.length > 0 ? this.addreesVal[2] : '',
          address: this.addressText,
        };
        if (!data.name) {
          this.toastStatu = true;
          this.toastText = '请输入收货人姓名';
        }
        else if (!/^1[34578]\d{9}$/.test(data.phone)) {
          this.toastStatu = true;
          this.toastText = '手机格式有误';
        }
        else if (this.value.length < 1) {
          this.toastStatu = true;
          this.toastText = '请选择收货地址';
        }
        else if (!data.address) {
          this.toastStatu = true;
          this.toastText = '请填写详细地址';
        }
        else {
          this.axios.get('http://order.gmatonline.cn/pay/wap-api/save-consignee', {params: data}).then(function (res) {
            if (res.data.code === 1) {
              _this.toastStatu = true;
              _this.toastText = res.data.message;
              setTimeout(function () {
                _this.$router.go(-1);
              },1100)
            } else {
              _this.toastStatu = true;
              _this.toastText = res.data.message;
            }
          });

        }


      },
      doShowAddress() {
        this.showAddress = true;
        setTimeout(() => {
          this.showAddress = false
        }, 2000)
      },
      onShadowChange(ids, names) {
        // console.log(ids, names)
        this.addreesVal = names;
      },
      getName() {
        const value = this.value;
        console.log(value2name(value, ChinaAddressV4Data));
        return value2name(value, ChinaAddressV4Data);
      },


    }
  }
</script>

<style scoped>
  #addressWrap {
    height: 100%;
    background: #ffffff;
  }
  #addressWrap >>> .weui-toast.vux-toast-bottom {
    bottom: 140px; /*px*/
  }

  #addressWrap >>> .weui-toast_text .weui-toast__content {
    font-size: 14px; /*no*/
    padding: 12px 6px; /*px*/
  }
  .header {
    background: #5a5ee4;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
  }

  .navRight {
    font-size: 32px; /*px*/
    color: #ffffff !important;
  }

  #addressWrap >>> .vux-popup-header-right {
    color: #5a5ee4;
  }

  .rowAdd_1 {
    margin-bottom: 20px;
  }

  .rowAdd_1 >>> .weui-label {
    font-size: 32px; /*px*/
    margin-bottom: 14px;
  }

  .rowAdd_1 >>> .weui-cell {
    padding: 0;
    display: block;
  }

  .rowAdd_1 >>> .vux-cell-value {
    color: #333333;
  }

  .rowAdd_1 >>> .vux-popup-picker-select {
    text-align: left !important;
    padding-bottom: 8px;
    font-size: 28px; /*px*/
  }

  .rowAdd_1 >>> .weui-cell_access .weui-cell__ft:after {
    top: -70px; /*px*/
  }

  .rowAdd_1 >>> .weui-cells:before {
    border-top: none;
  }

  .rowAdd_1 >>> .vux-popup-picker-placeholder {
    font-size: 32px; /*px*/
  }

  .content {
    padding: 20px;
  }

  .row {
    margin-bottom: 30px;
  }

  .rowInt input {
    width: 100%;
    padding: 12px 0;
    outline: none;
    border: none;
    font-size: 28px; /*px*/
  }

  .rowInt input::placeholder {
    color: #888888;
    font-size: 28px; /*px*/
  }

  .rowTit {
    color: #333333;
    font-size: 32px; /*px*/
    margin-bottom: 20px;
  }

</style>
