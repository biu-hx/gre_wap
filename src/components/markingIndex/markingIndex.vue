<template>
  <div id="markingIndex">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="10px">
      <x-header class="header" @on-click-back="reBack" :left-options="{backText: '',preventGoBack:true}">题库详情</x-header>
      <div class="userData">
        <div class="flexWrap grid bg_f">
          <div class="flexItem vux-1px-r">
            <p class="dataNum">{{resData.doOver}}</p>
            <p>完成人数</p>
          </div>
          <div class="flexItem vux-1px-r">
            <p class="dataNum">{{resData.correctRate}}%</p>
            <p>平均正确率</p>
          </div>
          <div class="flexItem">
            <p class="dataNum">{{resData.time}}</p>
            <p>平均耗时</p>
          </div>
        </div>
      </div>
      <ul class="list">
        <router-link tag="li" :to="{name:item.state===0?'markingDetails':'testResult',query: {libraryId : item.id}}"
                     v-for="(item,index) in resData.questions" :key="index">
          <div class="listLeft">
            <h1 class="topicName ellipsis">{{item.name}}</h1>
            <div class="flexWrap time">
              <span>平均正确率: {{item.correctRate}}%</span>
              <span>平均耗时:{{item.averageTime}}</span>
            </div>
          </div>
          <div class="lstRight">
            <div class="currentNum">{{item.doNum}}/{{item.totalNum}}</div>
            <div v-if="item.state===1" class="handle over tm">查看结果</div>
            <div v-else-if="item.state===0&&item.doNum>0" class="handle continue tm">继续做题</div>
            <div v-else class="handle start tm">开始做题</div>
          </div>
        </router-link>
      </ul>
    </view-box>
  </div>
</template>

<script type="text/ecmascript-6">
  import {XHeader, Group, Cell, ViewBox} from 'vux'

  export default {
    name: "markingIndex",
    data() {
      return {
        resData: {
          correctRate: '',
          doOver: '',
          questions: [],
          time: '',
        },
      }
    },
    components: {
      XHeader,
      Cell,
      Group,
      ViewBox
    },
    activated() {
      this.getData();
    },
    methods: {
      reBack(){
        this.$router.push({name:'greMarking'})
      },
      getData() {
        this.$nextTick(function () {
          const _this = this;
          let data = {
            uid: _this.$store.state.userInfo.uid,
            sourceId: _this.$route.query.sourceId,
            sectionId: _this.$route.query.sectionId,
            knowId: _this.$route.query.knowId,
          };
          _this.axios.get('/cn/wap-api/make-source', {params: data}).then(function (res) {
            _this.resData = res.data;
          })
        })

      }
    }
  }
</script>

<style scoped>
  #markingIndex {
    height: 100%;
    background: #f3f3f3;
  }

  .header {
    background: #5a5ee4;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
  }

  .userData {
  }

  .flexWrap {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: flex-start;
  }

  .flexWrap.grid {
    border-radius: 6px; /*no*/
    padding: 30px 0 25px;
  }

  .flexItem {
    flex: 1;
    text-align: center;
    font-size: 30px; /*px*/
    color: #888888;
    padding: 6px 0;
  }

  .flexItem p.dataNum {
    font-size: 38px; /*px*/
    color: #333333;
    padding-bottom: 10px;
  }

  .list {
    padding: 20px;
  }

  .list li {
    padding: 20px 20px 20px 28px;
    background: #ffffff;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 18px;
  }

  .list li:last-child {
    margin-bottom: 0;
  }

  .topicName, .currentNum {
    color: #333333;
    font-size: 32px; /*px*/
    font-weight: normal;
    margin-bottom: 20px;
  }

  .time {
    height: 40px;
    justify-content: space-between;
    color: #777777;
    font-size: 28px; /*px*/
  }

  .listLeft {
    width: 75%;
  }

  .lstRight {
    text-align: right;
    width: 23%;
  }

  .handle {
    height: 38px;
    line-height: 38px;
    display: inline-block;
    vertical-align: middle;
    padding: 0 10px;
    border-radius: 4px; /*no*/
    font-size: 24px; /*px*/
    border: 1px solid transparent; /*no*/
  }

  .handle.over {
    color: #0c7c0c;
    border: 1px solid #0c7c0c; /*no*/
  }

  .handle.continue {
    color: #f05353;
    border: 1px solid #f05353; /*no*/
  }

  .handle.start {
    color: #5a5ee4;
    border: 1px solid #5a5ee4; /*no*/
  }

</style>
