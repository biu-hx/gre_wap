<template>
  <div id="testResult" class="bg_f" style="height: 100%;">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
      <x-header slot="header" class="header">
        <span class="headerTit">做题结果</span>
        <x-icon class="backIcon" @click="reBack" slot="overwrite-left" type="ios-arrow-left" size="30"></x-icon>
      </x-header>
      <div class="content">
        <div class="tm result_1 relative">
          <div class="ani tm resultImg"><img src="/static/images/testResult/result.png" alt=""></div>
          <div class="topicNmaeWrap tm inm"><span class="tm inm topicNmae">{{resData.name}}</span></div>
        </div>
        <div class="tm result_2">正确率<strong>（{{resData.doCorrect}}/{{resData.totalCount}}）</strong></div>
        <div class="circleWrap tm">
          <x-circle :percent="resData.corretRate" :stroke-width="8" :trail-width="8" :stroke-color="['#fc9051', '#ff5d27']"
                    trail-color="#d2d2d2">
            <span class="cir_num">{{resData.corretRate}}%</span>
          </x-circle>
        </div>
        <div class="userData">
          <div class="flexWrap grid bg_f">
            <div class="flexItem vux-1px-r">
              <p class="dataNum">{{resData.totalTime}}</p>
              <p>总用时</p>
            </div>
            <div class="flexItem">
              <p class="dataNum">{{resData.averageTime}}</p>
              <p>平均用时</p>
            </div>
          </div>
        </div>
        <ul class="testDe">
          <li v-for="(item,index) in resData.questions">
            <router-link class="linkBtn" :class=" item.correct>0 ? 'right' : 'error' " to="/testDetails">
              {{index+1}}
            </router-link>
          </li>
        </ul>
      </div>
      <tabbar slot="bottom" class="vux-1px-t footer">
        <tabbar-item class="vux-1px-r" @on-item-click="reStart">
          <span class="userExit" slot="label">重新做题</span>
        </tabbar-item>
        <!--未完成显示-->
        <tabbar-item>
          <span class="userExit" slot="label">继续做题</span>
        </tabbar-item>
      </tabbar>
    </view-box>

  </div>
</template>

<script type="text/ecmascript-6">
  import {XHeader, Tabbar, TabbarItem, ViewBox, XCircle} from 'vux'

  export default {
    name: "testResult",
    data() {
      return {
        strokeColor: ['#fc9051', '#ff5d27'],
        resData: {
          averageTime: '',
          corretRate: '',
          doCorrect: '',
          name: '',
          questions: [],
          totalCount: '',
          totalTime: '',
        }
      }
    },
    components: {
      XHeader, Tabbar, TabbarItem, ViewBox, XCircle
    },
    activated() {
      this.getData();
    },
    methods: {
      // 退出
      reBack() {
        this.$router.push({name: 'markingIndex'})
      },
      // 初始化数据
      getData() {
        this.$nextTick(function () {
          const _this = this;
          let data = {
            uid: _this.$store.state.userInfo.uid,
            libraryId: _this.$route.query.libraryId,
          };
          _this.axios.get('/cn/wap-api/make-result', {params: data}).then(function (res) {
            _this.resData = res.data;
          })
        })
      },
      //重新做题
      reStart() {
        const _this = this;
        let data = {
          uid: _this.$store.state.userInfo.uid,
          libraryId: _this.$route.query.libraryId,
        };
        _this.axios.get('/cn/wap-api/do-again', {params: data}).then(function (res) {

        })
      }
    }
  }
</script>

<style scoped>
  .header {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    border-bottom: 1px solid #a0a0a0; /*px*/
    background: #fff;
  }

  .headerTit {
    font-size: 32px; /*px*/
    color: #333333;
  }

  .backIcon {
    fill: #333333;
    position: relative;
    top: -6px; /*no*/
    left: -3px; /*no*/
  }

  .footer {
    background: #ffffff;
    bottom: 1px; /*no*/
    border-top: 1px solid #a0a0a0; /*px*/
  }

  .userExit {
    font-size: 32px; /*px*/
    color: #333333;
    /*font-weight: bold;*/
  }

  .result_1 {
    z-index: 1;
    padding: 50px 20px;
  }

  .resultImg {
    left: 0;
    z-index: -1;
    bottom: 10px;
    width: 100%;
  }

  .resultImg img {
    height: 82px;
  }

  .topicNmaeWrap {
    padding: 4px; /*no*/
    border-radius: 12px; /*no*/
    background: #ffffff;
    box-shadow: 0 0 4px 0 #cdcdcd; /*no*/
  }

  .topicNmae {
    color: #ff5722;
    padding: 10px;
    min-width: 280px;
    border-radius: 10px; /*no*/
    box-sizing: border-box;
    border: 1px solid #ff5722; /*px*/
    font-size: 32px; /*px*/
  }

  .result_2 {
    color: #333333;
    font-weight: bold;
    font-size: 34px; /*px*/
    padding: 30px 0 24px;
  }

  .result_2 strong {
    color: #888888;
    font-size: 30px; /*px*/
  }

  .cir_num {
    color: #333333;
    font-size: 44px; /*px*/
  }

  .circleWrap {
    width: 180px;
    height: 180px;
    margin: 10px auto 30px;
  }

  .flexWrap {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: flex-start;
  }

  .flexWrap.grid {
    border-radius: 6px; /*no*/
    padding: 10px 0 25px;
  }

  .userData {
    border-bottom: 1px solid #a0a0a0; /*no*/
  }

  .flexItem {
    flex: 1;
    text-align: center;
    font-size: 30px; /*px*/
    color: #888888;
    padding: 6px 0;
  }

  .flexItem p.dataNum {
    font-size: 40px; /*px*/
    color: #333333;
    padding-bottom: 20px;
  }

  .vux-1px-r:after {
    border-right: 2px solid #c9c9c9; /*no*/
  }

  .testDe {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: 20px 30px;
    text-align: center;
  }

  .testDe li {
    width: 20%;
    /*flex: 0 0 20%;*/
  }

  .testDe:after {
    content: "";
    flex: auto;
  }

  .testDe li .linkBtn {
    width: 62px; /*px*/
    height: 62px; /*px*/
    font-size: 36px; /*px*/
    color: #f42e2e;
    margin: 16px auto; /*px*/
    line-height: 62px; /*px*/
    border-radius: 6px; /*no*/
    display: block;
  }

  .testDe li .linkBtn.error {
    color: #f42e2e;
    border: 1px solid #f42e2e; /*no*/
  }

  .testDe li .linkBtn.right {
    color: #1a8109;
    border: 1px solid #1a8109; /*no*/

  }

</style>
