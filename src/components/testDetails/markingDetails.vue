<template>
  <div id="markingDetails" style="height: 100%">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="51px">
      <x-header slot="header" class="header bg_f">
        <span class="headerTit"><strong class="curNum">{{resData.currentSite}}</strong>/{{resData.totalCount}}</span>
        <div slot="overwrite-left" @click="reBack"><img class="exitIcon" src="/static/images/testDetails/exit.png" alt=""></div>
        <div slot="right">
          <div @click="scQuestion($store.state.userInfo.uid,resData.question.id)" class="scIcon"
               :class="{'scIcon_1':childData.question.collect===0,'scIcon_2':childData.question.collect===1}"></div>
        </div>
      </x-header>

      <!--阅读-->
      <div v-if="childData.question.readArticle" class="readStemWrap">
        <!--v-html="childData.question.readArticle"-->
        <div v-if="typeId===7" class="readStem" :class="{'ellipsis-5':!showAll}">
          <span v-for="(item,index) in childData.question.readStems" :class="curSpan!=index?'':'active'"
                @click="selected($event,index)">{{item}}</span>
        </div>
        <div v-else class="readStem" :class="{'ellipsis-5':!showAll}" v-html="childData.question.readArticle"></div>
        <div class="showAllBtn" @click="showAll=!showAll">{{btnText}}</div>
      </div>
      <!--题干-->
      <div v-if="childData.question.details" class="topicData" v-html="childData.question.details"></div>
      <!--quantity-->
      <div class="quantWrap">
        <div></div>
        <div v-if="childData.question.quantityA&&childData.question.quantityA!='<p><br></p>'" style="padding-bottom: 15px">
          <div class="tm"><span class="quantTit">Quantity A</span></div>
          <div class="tm" v-html="childData.question.quantityA"></div>
        </div>
        <div v-if="childData.question.quantityB&&childData.question.quantityB!='<p><br></p>'">
          <div class="tm"><span class="quantTit">Quantity B</span></div>
          <div class="tm" v-html="childData.question.quantityB"></div>
        </div>
      </div>
      <!--选项题型组件-->
      <blank_1 :is="curTemp" v-if="flag" ref="child" v-bind:testData="childData,typeId" v-on:getChildAnswer="upAnswer"></blank_1>

      <!--底部-->
      <tabbar slot="bottom" class="vux-1px-t footer">
        <tabbar-item class="vux-1px-r" @on-item-click="toggle(show)">
          <span class="userExit" slot="label">查看解析</span>
        </tabbar-item>
        <tabbar-item @on-item-click="nextQuestion(resData.question.id)">
          <span class="userExit" slot="label">下一题</span>
        </tabbar-item>
      </tabbar>
      <toast v-model="toastStatu" :text="toastText" width="4rem" type="text" :time="hideTime" position="bottom"></toast>
    </view-box>
    <!--解析-->
    <div v-transfer-dom>
      <popup class="window" v-model="show" max-height="60%">
        <div class="answerJs">
          <h1 class="answer">正确答案：{{childData.question.answer}}</h1>
          <div class="answerInfo">
            <div style="margin-bottom: 10px;" v-for="(item,index) in childData.question.analysis" v-html="item.analysisContent"></div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import "../../style/mathquill-0.9.1/mathquill.css";
  import blank_1 from "./child/blank_1"
  import blank_2 from "./child/blank_2"
  import blank_3 from "./child/blank_3"
  import blank_int from "./child/blank_int"
  import {XHeader, Tabbar, TabbarItem, ViewBox, Group, Checklist, Popup, TransferDom, Toast, Popover} from 'vux'

  export default {
    directives: {
      TransferDom
    },
    name: "markingDetails",
    data() {
      return {
        hideTime: 1200,
        showAll: false,
        show: false,
        resData: {
          currentSite: '',
          totalCount: '',
        },
        childData: {
          question: {
            collect: '',
            optionA: '',
            optionB: '',
            optionC: '',
            optionsA: [],
            optionsB: [],
            optionsC: [],
            quantityA: '',
            quantityB: '',
            readStem: '',
          },
          pageType: 0,
          maxVal: null,
          trueAnswer: [],
          userAnswer: [],
        },
        flag: false,
        curSpan: '',
        typeId: '',//当前题型
        userAnswer: [],
        useTime: 0,//答题用时
        timeObj: '',//计时器
        curTemp: 'blank_1',//当前组件名
        toastStatu: false,
        toastText: '',
      }
    },
    components: {
      XHeader, Tabbar, TabbarItem, ViewBox, Group, Checklist, Popup, TransferDom, Toast, Popover,
      blank_1, blank_2, blank_3, blank_int
    },
    computed: {
      btnText() {
        if (this.showAll === false) {  //对文字进行处理（枚举）
          return "展开全部"
        } else {
          return "收起"
        }
      }
    },
    activated() {
      this.getData();
    },
    methods: {
      // 退出
      reBack() {
        // this.$router.push({name: 'markingIndex'})
        this.$router.go(-1);
      },
      // 初始化数据
      getData() {
        const _this = this;
        let data = {
          uid: _this.$store.state.userInfo.uid || '',
          libraryId: _this.$route.query.libraryId,
        };
        _this.axios.get('/cn/wap-api/go-make', {params: data}).then(function (res) {
          if (res.data.code === 1) {
            let resType = parseInt(res.data.question.typeId);
            _this.flag = true;
            _this.typeId = resType;
            _this.resData = res.data;
            _this.childData.question = res.data.question;//子组件数据
            _this.timeObj = setInterval(function () {
              _this.useTime++;
            }, 1000);
            //判断typeId单选还是多选赋值给checkList
            if (resType === 1 || resType === 5 || resType === 8) {
              _this.curTemp = 'blank_1';
              _this.childData.maxVal = 1;
              _this.childData.question.optionsA = resetArry(res.data.question.optionsA);
            } else if (resType === 2) {
              _this.curTemp = 'blank_2';
              _this.childData.maxVal = 1;
            } else if (resType === 3) {
              _this.curTemp = 'blank_3';
              _this.childData.maxVal = 1;
            } else if (resType === 4) {
              //多选提示
              _this.curTemp = 'blank_1';
              _this.childData.maxVal = 2;
              _this.childData.question.optionsA = resetArry(res.data.question.optionsA);
              _this.hideTime = 2000;
              _this.toastText = '当前6选2题型';
              _this.toastStatu = true;
            } else if (resType === 10) {
              _this.curTemp = 'blank_int';
            } else if (resType === 6 || resType === 9) {
              //多选提示
              _this.hideTime = 2000;
              _this.toastText = '当前多选题型';
              _this.toastStatu = true;
              _this.curTemp = 'blank_1';
              _this.childData.maxVal = 10;
              _this.childData.question.optionsA = resetArry(res.data.question.optionsA);
            } else {
              _this.childData.maxVal = 1;
            }
            _this.$nextTick(() => {
              //设置SEO
              document.title = res.data.question.stem + '_GRE在线做题_GRE真题练习_GRE免费做题_做题报告分析_雷哥GRE在线题库';
              document.querySelector('meta[name="keywords"]').setAttribute('content', 'GRE题库,GRE真题,GRE机经,GRE题目解析,GRE填空,GRE阅读,GRE逻辑,GRE数学,GRE做题数据分析,错题练习');
              document.querySelector('meta[name="description"]').setAttribute('content', '雷哥GRE在线练习题库提供GRE历年真题练习、题目解析、题目讨论，包含verbal语文和quant数学单项练习、考点练习、错题练习，做题练习报告与数据分析，让你高效备考');
            })

          }
          if (res.data.code === 0) {
            _this.$router.push({name: 'testResult', query: {libraryId: _this.$route.query.libraryId, testing: 1}})
          }
        })

      },
      // 题目收藏
      scQuestion(uid, qid) {
        if (uid) {
          const _this = this;
          let data = {uid: uid, questionId: qid};
          _this.axios.post('/cn/wap-api/user-question-collection', data).then(function (res) {
            if (res.data.code === 1) {
              _this.childData.question.collect = 1;
            }
            if (res.data.code === 2) {
              _this.childData.question.collect = 0;
            }
            _this.$nextTick(function () {
              _this.toastText = res.data.message;
              _this.toastStatu = true;
            })
          });

        } else {
          return false;
        }
      },
      //取子组件值
      upAnswer(data) {
        this.userAnswer = data;
      },
      // 句子点选
      selected(e, index) {
        let dom = e.target;
        this.curSpan = index;
        this.userAnswer = [dom.innerHTML];
      },
      //下一题
      nextQuestion(id) {
        const _this = this;
        let data = {
          uid: _this.$store.state.userInfo.uid || '',
          questionId: id,
          libraryId: _this.$route.query.libraryId,
          answer: _this.userAnswer.join(","),
          useTime: _this.useTime,
        };
        // 判断题型、是否选择答案
        if (_this.userAnswer.indexOf('')<0) {
          clearInterval(_this.timeObj);//清除计时器
          _this.axios.post('/cn/wap-api/make-topic', data).then(function (res) {
            if (res.data.code === 1) {
              location.reload();
            }
          });

        } else {
          _this.toastText = '请选择答案';
          _this.toastStatu = true;
          return false;
        }


      },
      //弹窗事件
      toggle(show) {
        this.show = show ? false : true;
      }
    }
  }

  // option 重组
  function resetArry(val) {
    let rs = [];
    for (let i = 0; i < val.length; i++) {
      rs.push({
        key: `${i}`,
        value: `${val[i]}`,
      })
    }
    return rs
  }
</script>

<style scoped>
  #markingDetails >>> .weui-toast.vux-toast-bottom {
    bottom: 120px; /*px*/
  }

  #markingDetails >>> .weui-toast_text .weui-toast__content {
    font-size: 14px; /*no*/
    padding: 12px 6px; /*px*/
  }

  #markingDetails >>> .weui-cells {
    font-size: 32px; /*px*/
  }

  #markingDetails >>> .weui-cell__bd {
    font-size: 32px; /*px*/
  }

  .header {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    border-bottom: 1px solid #a0a0a0; /*px*/
    background: #fff;
  }

  .footer .userExit {
    color: #333333;
    font-size: 32px; /*px*/
  }

  .footer {
    background: #f3f3f3;
    border-top: 1px solid #a0a0a0; /*px*/
  }

  .exitIcon {
    height: 40px; /*px*/
  }

  .scIcon {
    width: 40px; /*px*/
  }

  .headerTit {
    font-size: 32px; /*px*/
    color: #888888;
  }

  .curNum {
    font-weight: normal;
    color: #5a5ee4;
  }

  .readStemWrap {
    padding: 26px 20px 30px;
    border-bottom: 16px solid #cccccc;
  }

  .readStem {
    color: #333333;
    box-sizing: border-box;
    font-size: 32px; /*px*/
    line-height: 56px; /*px*/
  }

  .readStem span.active {
    background: #5a5ee4 !important;
    color: #ffffff !important;
  }

  .readStem >>> p, .readStem >>> span {
    color: #333333 !important;
    background: none !important;
    font-size: 32px !important; /*px*/
    line-height: 56px !important; /*px*/
  }

  .showAllBtn {
    padding-top: 18px;
    font-size: 32px; /*px*/
    color: #5a5ee4;
    text-align: center;
  }

  .topicData {
    color: #1b1a1a;
    font-size: 32px; /*px*/
    line-height: 56px; /*px*/
    padding: 26px 20px 30px;
  }

  .topicData >>> p, .topicData >>> span {
    color: #333333 !important;
    background: none !important;
    font-size: 32px !important; /*px*/
    line-height: 56px !important; /*px*/
  }

  .quantWrap {
    padding: 20px 20px;
    font-size: 32px; /*px*/
    color: #333333;
  }

  .quantTit {
    display: inline-block;
    vertical-align: top;
    padding-bottom: 4px;
    border-bottom: 1px solid #333333;
    margin-bottom: 12px;
  }

  .answerJs {
    padding: 0 20px;
    background: #ffffff;
  }

  .window {
    border-top-left-radius: 14px; /*px*/
    border-top-right-radius: 14px; /*px*/
  }

  .answer {
    padding-top: 32px;
    color: #333333;
    font-size: 36px; /*px*/
  }

  .answerInfo {
    padding: 30px 0;
    color: #333333;
    font-size: 30px; /*px*/
    word-break: break-word;
  }

  #markingDetails >>> .weui-cells_checkbox .weui-check:checked + .weui-icon-checked:before {
    color: #5a5ee4;
  }

  .scIcon {
    width: 40px; /*px*/
    height: 40px; /*px*/
  }

  .scIcon_1 {
    background: url("/static/images/testDetails/sc_icon.png") no-repeat 0 0;
    background-size: cover;
  }

  .scIcon_2 {
    background: url("/static/images/testDetails/sc_icon2.png") no-repeat 0 0;
    background-size: cover;
  }


</style>
