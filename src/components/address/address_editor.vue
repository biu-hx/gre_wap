<template>
  <div id="adressEditor">
    <view-box ref="viewBox" body-padding-top="60px" body-padding-bottom="62px">
      <x-header solt="header" @click="reBack" class="header" :left-options="{backText: '',fontSize:'16px'}">选择地址<a class="navRight"
                                                                                                                                      @click="reBack"
                                                                                                                                      slot="right">完成</a>
      </x-header>
      <div class="content">
        <div class="tm hintText" v-if="itemList.length===0">快去添加一个地址吧</div>
        <div v-else>
          <div class="addressItem" v-for="(item,index) in itemList">
            <div class="infoWrap vux-1px-b">
              <div class="row">
                <span class="rowTit">收<strong>货</strong>人：</span>
                <span class="rowInfo">{{item.name}}</span>
              </div>
              <div class="row">
                <span class="rowTit">联系电话：</span>
                <span class="rowInfo">{{item.phone}}</span>
              </div>
              <div class="row">
                <span class="rowTit">收货地址：</span>
                <span class="rowInfo">{{item.province}}{{item.city}}{{item.area}}{{item.address}}</span>
              </div>
            </div>
            <div class="handleWrap">
              <span class="edBtn"><router-link tag="span" :to="{name:'addressWrap',query:{id:item.id}}">编辑</router-link></span>
              <span class="edBtn" @click="delet(item.id,index)">删除</span>
              <label :for="'address_'+index">
                <div class="relative inm radioWrap">
                  <input class="radioBox" type="radio" @change="radioChange(index)" :checked="checkVal===index" :id="'address_'+index" name="address">
                  <i class="spot"></i>
                </div>
                <span class="checkBtn">默认地址</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <!--底部-->
      <tabbar slot="bottom" class="vux-1px-t footer">
        <tabbar-item class="vux-1px-r">
          <div class="add_address relative" slot="label">
            <router-link tag="span" :to="{name:'addressWrap'}">
              <i class="addIcon"></i>
              <span>添加地址</span>
            </router-link>
          </div>
        </tabbar-item>
      </tabbar>
    </view-box>
    <loading :show="show2" text=""></loading>
    <confirm theme="ios" v-model="show" :title="title" @on-confirm="onConfirm"></confirm>
  </div>


</template>

<script>
  import {XHeader, ViewBox, Tabbar, TabbarItem, Confirm, Loading} from 'vux'

  export default {
    name: "adressEditor",
    data() {
      return {
        title: '是否要删除该地址?',
        show: false,
        show2: true,
        itemList: [],
        addresId: '',
        checkVal: 0,
      }
    },
    components: {XHeader, ViewBox, Tabbar, TabbarItem, Confirm, Loading},
    activated() {
      this.getData();
    },
    methods: {
      getData() {
        const _this = this;
        let data = {uid: _this.$store.state.userInfo.uid||''};
        _this.axios.get('http://order.gmatonline.cn/pay/wap-api/get-consignee', {params: data}).then(function (res) {
          _this.itemList = res.data;
          _this.show2 = false;
        })
      },
      delet(id, index) {
        this.show = true;
        this.addresId = id;
      },
      onConfirm() {
        const _this = this;
        _this.show2 = true;
        let data = {
          uid: _this.$store.state.userInfo.uid,
          id: _this.addresId,
        };
        _this.axios.get('http://order.gmatonline.cn/pay/wap-api/delete-consignee', {params: data}).then(function (res) {
          if (res.data.code === 1) {
            _this.getData();
          }
        })
      },
      radioChange(val) {
        this.checkVal = val;
      },
      reBack() {
        this.$router.push({name: 'confirmOrder', query: {id: this.$route.query.id, num: this.checkVal}})
      },
    }
  }
</script>

<style scoped>
  #adressEditor {
    height: 100%;
    background: #f3f3f3;
  }

  #adressEditor >>> .weui-dialog__bd {
    display: none;
  }

  #adressEditor >>> .weui-dialog__btn_primary {
    color: #5a5ee4;
  }

  #adressEditor >>> .vux-loading-no-text .weui-toast {
    top: 50%;
    margin-top: -49px; /*no*/
  }

  #adressEditor >>> .weui-dialog__btn {
    font-size: 30px; /*px*/
  }

  .navRight {
    font-size: 32px; /*px*/
    color: #ffffff !important;
  }

  .header {
    background: #5a5ee4;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
  }

  .hintText {
    font-size: 28px; /*px*/
  }

  .content {
    padding: 20px;
  }

  .content .addressItem:last-child {
    margin-bottom: 0;
  }

  .addressItem {
    border-radius: 10px; /*px*/
    padding: 0 28px;
    background: #ffffff;
    margin-bottom: 30px;
    box-shadow: 0 8px 12px 0 #d0d0d0; /*px*/
  }

  .infoWrap {
    padding: 20px 0;
  }

  .row {
    font-size: 32px; /*px*/
    color: #888888;
    padding: 14px 0;
  }

  .rowTit {
    display: inline-block;
    vertical-align: top;
  }

  .rowTit strong {
    font-weight: normal;
  }

  .handleWrap {
    padding: 30px 0;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
  }

  .rowInfo {
    color: #2e2e2e;
  }

  .spot {
    display: inline-block;
    width: 36px; /*px*/
    height: 36px; /*px*/
    background: url("/static/images/testDetails/checked_2.png") no-repeat; /*默认的样式图片*/
    background-size: contain;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
  }

  .radioWrap {
    width: 36px; /*px*/
    height: 36px; /*px*/
    margin-right: 6px; /*px*/
  }

  .radioBox {
    opacity: 0;
  }

  .radioBox:checked + .spot {
    background: url("/static/images/testDetails/checked.png") no-repeat; /*选中后的样式图片*/
    background-size: contain;
  }

  .checkBtn {
    color: #888888;
    vertical-align: middle;
    font-size: 30px; /*px*/
  }

  .edBtn {
    font-size: 28px; /*px*/
    color: #888888;
    width: 150px;
    height: 46px;
    line-height: 46px;
    text-align: center;
    border: 1px solid #bfbfbf; /*no*/
    border-radius: 4px; /*px*/
  }

  .edBtn:active {
    border-color: #5a5ee4;
    color: #ffffff;
    background: #5a5ee4;
  }

  .add_address {
    font-size: 32px; /*px*/
    color: #ffffff;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }

  .footer {
    background: #5a5ee4;
  }

  .addIcon {
    display: inline-block;
    vertical-align: middle;
    width: 40px; /*px*/
    height: 40px; /*px*/
    margin-right: 20px;
    background: url("/static/images/testDetails/add_icon.png") no-repeat;
    background-size: contain;
  }
</style>
