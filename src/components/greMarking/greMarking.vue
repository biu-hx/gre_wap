<template>
  <div id="greMarking" style="height: 100%;">
    <x-header style="background: #5a5ee4;" :left-options="{backText: ''}">GRE做题</x-header>
    <tab :line-width="2" active-color="#5a5ee4" :scroll-threshold="4" default-color="#444444" custom-bar-width="70px">
      <tab-item :selected="0==i" :key="i" v-for="(item,i) in tabItem">{{item}}</tab-item>
    </tab>
    <div style="padding: 25px 40px">
      <button-tab :height="35">
        <button-tab-item selected>填空</button-tab-item>
        <button-tab-item>阅读</button-tab-item>
        <button-tab-item>数学</button-tab-item>
      </button-tab>
    </div>
    <div class="testListWrap">
      <group class="testList" gutter="0">
        <cell link="/markingIndex">
          <span slot="title" class="testName">OG & 150真题</span>
          <span class="testNum">0/200</span>
        </cell>
        <cell>
          <span slot="title" class="testName">Xdf红/绿皮</span>
          <span class="testNum">0/200</span>
        </cell>
        <cell>
          <span slot="title" class="testName">Magoosh</span>
          <span class="testNum">0/200</span>
        </cell>
        <cell>
          <span slot="title" class="testName">陈琦36套</span>
          <span slot="default" class="testNum">0/200</span>
        </cell>
        <cell>
          <span slot="title" class="testName">Princeton</span>
          <span class="testNum">0/200</span>
        </cell>
        <cell>
          <span slot="title" class="testName">Kaplan</span>
          <span class="testNum">0/200</span>
        </cell>
      </group>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import {
    XHeader,
    Radio,
    Tab,
    TabItem,
    Group,
    PopupRadio,
    TransferDom,
    Popup,
    Cell,
    ButtonTab,
    ButtonTabItem
  } from 'vux'

  export default {
    name: "greMarking",
    data() {
      return {
        tabItem: ['题目单项', '填空考点', '阅读考点', '数学考点'],
        show: false,
        option1: '全部题型',
        options1: ['全部题型', 'OG', 'Xdf红/绿皮', 'Magoosh', '陈琦36套', '陈虎平36套', ' 猴哥难题', 'Princeton', 'Kaplan'],
      }
    },
    components: {
      XHeader,
      Tab,
      Cell,
      Group,
      TabItem,
      ButtonTab,
      ButtonTabItem

    }
  }
</script>

<style scoped>
  #greMarking {
    background: #f3f3f3;
  }

  .vux-tab .vux-tab-item {
    font-size: 30px; /*px*/
  }

  .vux-button-group > a {
    color: #5a5ee4;
    font-size: 30px; /*px*/
  }

  .vux-button-group > a.vux-button-group-current {
    background: #5a5ee4;
  }

  .vux-button-tab-item:after {
    border-color: #5a5ee4 !important;
    border-width: 2px !important; /*no*/
  }

  .vux-button-group > a.vux-button-tab-item-first:after {
    border-top-left-radius: 16PX;
    border-bottom-left-radius: 16PX;
  }

  .vux-button-group > a.vux-button-tab-item-last:after {
    border-top-right-radius: 16PX;
    border-bottom-right-radius: 16PX;
  }

  .vux-button-group > a.vux-button-tab-item-first {
    border-top-left-radius: 10PX;
    border-bottom-left-radius: 10PX;
  }

  .vux-button-group > a.vux-button-tab-item-last {
    border-top-right-radius: 10PX;
    border-bottom-right-radius: 10PX;
    left: -1px;
  }

  .testListWrap {
    padding: 0 20px;
  }

  .testList {
    overflow: hidden;
    border-radius: 12px; /*px*/
    border: 1px solid #d9d9d9; /*no*/
  }

  .testName {
    font-size: 34px; /*px*/
    color: #5a5ee4;
  }

  .testNum {
    font-size: 30px; /*px*/
    color: #777777;
  }

  .weui-cell {
    padding: 18PX 15PX;
  }
  .weui-cell:before{
    border-color: #d9d9d9;
    border-top-width: 2px;/*no*/
  }
</style>
