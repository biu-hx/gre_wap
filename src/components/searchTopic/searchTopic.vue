<template>
  <div id="searchTopic">
    <x-header style="background: #5a5ee4;" :left-options="{backText: ''}">
      <span>GRE搜题</span>
      <div slot="right">
        <router-link to="/search"><img class="scIcon" src="/static/images/search/search.png" alt=""></router-link>
      </div>
    </x-header>
    <tab :line-width="2" active-color="#5a5ee4" :scroll-threshold="5" default-color="#444444" custom-bar-width="40px">
      <tab-item :selected="0==i" :key="i" v-for="(item,i) in tabItem">{{item}}</tab-item>
    </tab>
    <div class="tagWrap">
      <div class="tagItem">
        <h1 class="checkName">题目来源</h1>
        <ul class="tm tagList">
          <li class="on" v-for="(name,index) in source" @click="activeA(index)" :class="{'active':index ==selectedA }">
            {{name}}
          </li>
        </ul>
      </div>
      <div class="tagItem">
        <h1 class="checkName">题目难度</h1>
        <ul class="tm tagList">
          <li v-for="(name,index) in difficulty" @click="activeB(index)" :class="{'active':index ==selectedB }">
            {{name}}
          </li>
        </ul>
      </div>
      <div class="tagItem">
        <h1 class="checkName">做题情况</h1>
        <ul class="tm tagList">
          <li v-for="(name,index) in status" @click="activeC(index)" :class="{'active':index ==selectedC }">{{name}}
          </li>
        </ul>
      </div>
    </div>
    <ul class="topicList">
      <li v-for="i in 7">
        <h1 class="topicName ellipsis">陈琦36套-阅读 RC-e2hqsj</h1>
        <div class="topicText ellipsis-2">The difficulty for nineteenth-century advocates
          of the claim that forests helped regulate clim...
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  import {XHeader, Tab, TabItem} from 'vux'

  export default {
    name: "searchTopic",
    data() {
      return {
        selectedA: 0,
        selectedB: 0,
        selectedC: 0,
        tabItem: ['全部', '填空', '阅读', '数学'],
        source: ['全部', 'OG', 'Xdf红/绿皮', 'Magoosh', '陈琦36套', '陈虎平36套', ' 猴哥难题', 'Princeton ', 'Kaplan'],
        difficulty: ['全部', 'Easy', 'Medium', 'Hard'],
        status: ['全部', '做过', '正确', '错误']

      }
    },
    components: {
      XHeader, Tab, TabItem
    },
    methods: {
      activeA(index) {
        this.selectedA = index;
      },
      activeB(index) {
        this.selectedB = index;
      },
      activeC(index) {
        this.selectedC = index;
      }
    }
  }
</script>

<style scoped>
  .scIcon {
    height: 40px; /*px*/
  }

  .vux-tab .vux-tab-item {
    font-size: 32px; /*px*/
  }

  .tagWrap {
    padding: 20px;
    border-bottom: 1px solid #d2d2d2;/*no*/
  }

  .checkName {
    color: #333333;
    padding: 20px 0;
    font-size: 32px; /*px*/
  }

  .tagList li {
    color: #888888;
    /*width: 200px;!*px*!*/
    width: 30%;
    margin: 14px 0; /*px*/
    height: 50px; /*px*/
    line-height: 50px; /*px*/
    font-size: 28px; /*px*/
    border-radius: 6px; /*no*/
    border: 1px solid #aaaaaa; /*no*/
  }

  .tagList li.active {
    background: #5a5ee4;
    color: #ffffff;
    border-color: #5a5ee4;
  }

  .tagList {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
  }

  .tagList:after {
    content: '';
    width: 30%;
  }

  .topicList {
    /*padding: 20px;*/
  }

  .topicList li {
    padding: 30px 20px;
    border-bottom: 1px solid #d2d2d2; /*no*/
  }

  .topicName {
    font-weight: normal;
    color: #888888;
    margin-bottom: 14px;
    font-size: 34px; /*px*/
  }

  .topicText {
    color: #333333;
    line-height: 50px; /*px*/
    font-size: 32px; /*px*/
  }

</style>
