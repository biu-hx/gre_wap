<template>
  <div id="courseDetails">
    <view-box ref="viewBox" body-padding-bottom="62px">
      <div class="content">
        <div class="head"><img :src="$store.state.http_gre+resData.data.image" alt=""></div>
        <div class="dataWrap bg_f">
          <div class="content_1">
            <h1 class="courseName">{{resData.data.title}}</h1>
            <div class="courseDe">{{resData.data.answer}}</div>
            <div class="dataBg">
              <div style="margin-right: 10px;"><i class="iconBg icon_1"></i><span>报名人数：{{resData.data.alternatives}}</span></div>
              <div v-if="typeof (resData.data.article)!='string'" class="ellipsis tr" style="flex: 1;">
                <i class="iconBg icon_2"></i><span>距离报名结束：{{countText}}</span>
              </div>
              <div v-else class="ellipsis tr" style="flex: 1;">
                <i class="iconBg icon_2"></i><span>距离报名结束：{{resData.data.article}}</span>
              </div>
            </div>
            <div class="startTime">
              <div><span class="blue">{{resData.data.duration}}</span><span style="padding-left: 10px">{{resData.data.commencement}}</span></div>
              <div class="price_1">￥{{resData.data.originalPrice}}</div>
            </div>
            <div class="timeWrap">
              <div class="infoRow">
                <div class="rowName">性<strong style="padding: 0 8px">价</strong>比</div>
                <div class="default_de">{{resData.data.performance}}</div>
              </div>
              <div v-if="resData.tag.length>0" class="infoRow" style="align-items: flex-start">
                <div class="rowName">课程标签</div>
                <div class="infoTag">
                  <span v-for="(item,index) in resData.tag[0].child">{{item.name}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <tab :line-width="2" active-color="#5a5ee4" :scroll-threshold="6" default-color="#444444">
          <tab-item :selected="0==i" :key="i" v-for="(item,i) in tabItem">{{item}}</tab-item>
        </tab>

        <div class="tab_content_wrap">
          <div class="tabContent_1">
            一、适用人群
            1、有一定英语基础，GRE小白，刚刚开始接触GRE
            2、初次备考，希望从零开始系统全面学习GRE核心
            考点，GRE考察内容，GRE正确逻辑思维；
            3、备考时间不足，希望在雷哥GRE名师指点下通过
            精准、高效复习一次拿下GRE高分；
            4．学习自觉性不高，希望通过雷哥GRE一对一学管
            老师监督、高效完成学习任务，快速出分。
          </div>
          <div style="display: none;" class="tabContent_2">
            <div class="contentList" v-for="i in 2">
              Sira，雷哥GRE专家讲师 主讲：填空、阅读知名院校
              英语专业毕业，曾获得实战GRE和TOEFL考试高分，
              英语基础扎实，多次获得全国创新英语大赛奖项。参
              加多次国际志愿者教学，西班牙项目交流活动。擅长
              以最精辟幽默的语言来展现真实生动的课堂，用严密
              的逻辑带领学生分析文章的篇章结构和论点，锻炼英
              语阅读能力。
            </div>
          </div>
          <div style="display: none;" class="tabContent_4">
            <div v-for="i in 6" class="replyItem">
              <div class="userHead"><img src="/static/images/default.png" alt=""></div>
              <div class="replyRight">
                <div class="replyTime">
                  <span class="nickName">用户名 {{i}}</span>
                  <span>2018.2.22</span>
                </div>
                <div class="replyText">申请美国研究生到底选择GRE还是GMAT呢？ 这是很多学员比较困惑的问题。</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom bg_f">
        <div class="bottomLeft bottomItem">
          <div class="priceWrap_2">
            <p class="priceName">促销价</p>
            <p class="price_2">￥{{resData.data.price}}</p>
          </div>
          <div class="consultBtn">
            <a href="mqqwpa://im/chat?chat_type=wpa&uin=1746295647&version=1&src_type=web&web_src=http://m.haishiit.com/">
              <i class="icon_3"></i>
              <span>咨询</span>
            </a>
          </div>
        </div>
        <button class="bottomRight bottomItem">
          <router-link to="/confirmOrder">立即购买</router-link>
        </button>
      </div>
    </view-box>

  </div>
</template>

<script>
  import {Tab, TabItem, ViewBox} from 'vux'

  export default {
    name: "courseDetails",
    data() {
      return {
        tabItem: ['课程介绍', '授课名师', '学习资料', '用户评价(9)'],
        id: '',
        resData: '',
        countVal: '',
        countText: '',
      }
    },
    components: {
      Tab, TabItem, ViewBox
    },
    activated() {
      this.id = this.$route.query.id;
      this.getData(this.$route.query.id);
      let time = setInterval(() => {
        this.countTime(this.countVal--);
      }, 1000);
    },
    methods: {
      getData(id) {
        this.$nextTick(function () {
          const _this = this;
          this.axios.get("/cn/wap-api/course-detail?contentid=" + id)
            .then(function (res) {
              _this.resData = res.data;
              _this.countVal = res.data.data.article;
            })

        })
      },
      countTime(time) {
        let mouth = parseInt(time / 60 / 60 / 24 / 30);
        let day = parseInt(time / 60 / 60 / 24 % 30);
        let hour = parseInt(time / 60 / 60 % 24);
        let minute = parseInt(time / 60 % 60);
        let seconds = parseInt(time % 60);
        if (mouth > 0) {
          return this.countText = mouth + "月" + day + "天" + hour + "小时" + minute + "分钟" + seconds + "秒";
        }
        if (day > 0) {
          return this.countText = day + "天" + hour + "小时" + minute + "分钟" + seconds + "秒";
        } else {
          return this.countText = hour + "小时" + minute + "分钟" + seconds + "秒";
        }
      }
    },


  }
</script>


<style scoped>
  #courseDetails {
    height: 100%;
    background: #eeeeee;
  }

  .dataWrap {
    padding: 0 24px;
    margin-bottom: 20px;
  }

  .courseName {
    font-size: 40px; /*px*/
    color: #333333;
    padding: 24px 0;
  }

  .courseDe {
    font-size: 28px; /*px*/
    color: #888888;
    padding-bottom: 18px;
  }

  .dataBg {
    color: #fff;
    font-size: 26px; /*px*/
    padding: 20px;
    background: url("/static/images/course/dataBg.png") no-repeat 0 0;
    background-size: cover;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
    box-sizing: border-box;
    margin-bottom: 18px;
  }

  .dataBg span {
    vertical-align: middle;
  }

  .iconBg {
    display: inline-block;
    vertical-align: middle;
    width: 30px; /*px*/
    height: 30px; /*px*/
    margin-right: 10px;
  }

  .icon_1 {
    background: url("/static/images/course/icon_1.png") no-repeat 0 0;
    background-size: contain;
  }

  .icon_2 {
    background: url("/static/images/course/icon_2.png") no-repeat 0 0;
    background-size: contain;
  }

  .timeWrap {
    padding: 18px 0 10px;
  }

  .startTime {
    color: #888888;
    padding: 20px 10px;
    font-size: 28px; /*px*/
    background: #f2f2f2;
    border: 1px dashed #949494; /*no*/
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;

  }

  .price_1 {
    font-size: 40px; /*px*/
    font-weight: bold;
    color: #ff0036;
  }

  .blue {
    color: #5a5ee4;
  }

  .infoRow {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding: 12px 0;
  }

  .rowName {
    width: 140px;
    color: #888888;
    font-size: 28px; /*px*/
  }

  .rowName strong {
    font-weight: normal;
  }

  .default_de {
    color: #444444;
    font-size: 28px; /*px*/
  }

  .infoTag {
    flex: 1;
  }

  .infoTag span {
    width: 155px;
    height: 40px;
    line-height: 40px;
    color: #ffffff;
    text-align: center;
    display: inline-block;
    font-size: 26px; /*px*/
    border-radius: 4px; /*no*/
    margin-right: 30px;
    margin-bottom: 16px;
    background: black;
  }

  .infoTag span:nth-child(1) {
    background: #e34d4d;
  }

  .infoTag span:nth-child(2) {
    background: #3eb3d5;
  }

  .vux-tab .vux-tab-item {
    font-size: 30px; /*px*/
  }

  .tabContent_1 {
    padding: 30px 0;
    font-size: 28px; /*px*/
    color: #444444;
  }

  .tab_content_wrap {
    background: #ffffff;
    padding: 0 24px;
  }

  .contentList {
    padding: 25px 0;
    border-bottom: 1px solid #b5b5b5; /*no*/
  }

  .tabContent_2 {
    color: #444444;
    font-size: 30px; /*px*/
    line-height: 48px; /*px*/
  }

  .tabContent_2 .contentList:last-child {
    border-bottom: none;
  }

  .userHead {
    width: 70px; /*px*/
    height: 70px; /*px*/
    overflow: hidden;
    border-radius: 50%;
  }

  .userHead img {
    width: 100%;
    border-radius: 50%;
  }

  .tabContent_4 .replyItem:last-child {
    border-bottom: none;
  }

  .replyItem {
    display: flex;
    padding: 25px 0;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid #cfcfcf; /*no*/
  }

  .replyRight {
    flex: 1;
    box-sizing: border-box;
    padding-left: 15px; /*px*/
  }

  .replyTime {
    font-size: 28px; /*px*/
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    color: #888888;
    margin-bottom: 10px; /*px*/
  }

  .nickName {
    font-size: 28px; /*px*/
    color: #0b0b0b;
    padding-right: 30px; /*px*/
  }

  .replyText {
    color: #333333;
    font-size: 30px; /*px*/
    line-height: 50px; /*px*/
  }

  .bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100px; /*px*/
    box-sizing: border-box;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
  }

  .bottomItem {
    height: 100%;
  }

  .bottomLeft {
    width: 60%;
    padding: 0 20px 0 40px;
    box-sizing: border-box;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
  }

  .bottomRight {
    width: 40%;
    text-align: center;
    background: #5a5ee4;
    color: #ffffff;
    font-size: 32px; /*px*/
    border: none;
    outline: none;
  }

  .bottomRight:active {
    background: #4144a2;
  }

  .bottomRight a {
    display: block;
    color: #ffffff;
  }

  .priceName {
    padding-left: 10px;
    color: #888888;
    font-size: 22px; /*px*/
    padding-top: 14px;
  }

  .price_2 {
    color: #f01f4b;
    font-weight: bold;
    font-size: 36px; /*px*/
  }

  .consultBtn span {
    font-size: 28px; /*px*/
    vertical-align: middle;
    color: #888888;
  }

  .icon_3 {
    display: inline-block;
    vertical-align: middle;
    width: 43px; /*px*/
    height: 46px; /*px*/
    margin-right: 4px;
    background: url("/static/images/course/consult.png") no-repeat 0 0;
    background-size: contain;
  }
</style>
