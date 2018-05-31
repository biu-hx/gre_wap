<template>
  <div id="courseIndex">
    <div class="md_1 relative">
      <img src="/static/images/course/cIndex_1.png" alt="">
      <div class="tm md_1_text ani">
        <div class="tit_text_1 tm inm"><img src="/static/images/course/tit_text_1.png" alt=""></div>
        <div class="tit_text_2 inm">直播录播课程，周末班+晚班+全日制班不间断开课</div>
        <div class="tit_text_3">高效名师方法课+题库刷题+真题机经解析+考前冲刺答疑</div>
      </div>
    </div>
    <div class="md_2 tm relative">
      <div class="ani pos_1">
        <div class="tm tWrap_1"><i class="icon_1 inm"></i><span class="inm tit_1">近期开班</span></div>
        <div class="tm tit_1_name">{{beikao[0].name}}</div>
      </div>
      <img class="cIndex_2" src="/static/images/course/cIndex_2.png" alt="">
    </div>
    <div class="md_3 tm relative">
      <img src="/static/images/course/cIndex_3.png" alt="">
      <div class="pos_2 ani">
        <div class="classItem int vux-1px-r">
          <p class="class_1">{{beikao[1].answer}}</p>
          <p class="time_1 ellipsis">{{beikao[1].alternatives}}</p>
        </div>
        <div class="classItem int">
          <p class="class_1">{{beikao[0].answer}}</p>
          <p class="time_1 ellipsis">{{beikao[0].alternatives}}</p>
        </div>
      </div>
    </div>
    <div class="md_4 tm relative">
      <img style="width: 100%" src="/static/images/course/cIndex_4_bg.png" alt="">
      <div class="ani tm cIndex_4"><img src="/static/images/course/cIndex_4.png" alt=""></div>
    </div>
    <div class="star_tit tm">
      <div class="inm star_t1">GRE短期提分课程</div>
      <div class="item_1">
        <swiper :options="swiperOption" ref="mySwiper">
          <!-- slides -->
          <swiper-slide v-for="(item,index) in course" :key="index">
            <router-link tag="div" :to="{path:'/courseDetails',query: {id: item.id}}">
              <div class="courseWrap_1">
                <div class="courseName ellipsis">{{item.title}}</div>
                <div class="courseImg"><img :src="$store.state.http_gre+item.image" alt=""></div>
              </div>
            </router-link>

          </swiper-slide>
        </swiper>
      </div>
    </div>
    <div class="str_tit2 tm">
      <div class="inm star_t2">课程特点</div>
      <div class="cIndex_5"><img src="/static/images/course/cIndex_5.png" alt=""></div>
    </div>
    <div class="star_tit3 tm">
      <div class="inm star_t1">短期提分名师保障</div>
      <ul class="item_2">
        <li v-for="(item,index) in teacher" :key="index">
          <div class="teacher_img"><img :src="$store.state.http_gre+item.image" alt=""></div>
          <div class="teacher_info">
            <div class="tm">
              <div class="inm relative teacher_tit_wrap">
                <img class="ani teacher_tit" src="/static/images/course/teacher_tit.png" alt="">
                {{item.title}}
              </div>
            </div>
            <div class="rowTetx"><span class="blue">授课科目：</span>{{item.answer}}</div>
            <div class="rowTetx"><span class="blue">学员评价：</span>{{item.alternatives}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="star_tit4 tm">
      <div class="inm star_t1">短期提分学员案例</div>
      <div class="item_3_wrap">
        <ul class="item_3">
          <li v-for="(item,index) in caseArry" :key="index">
            <div class="tl itemLeft">
              <div class="caseTit ellipsis-2">{{item.title}}</div>
              <div class="caseInfo"><span>姓名：{{item.answer}}</span><span>出分时间：{{item.article}}</span></div>
            </div>
            <div class="caseImg relative">
              <div class="tm ani caseNum">分数：{{item.numbering}}</div>
              <img :src="$store.state.http_gre+item.image" alt="">
            </div>
          </li>
        </ul>
      </div>

    </div>
    <loading :show="show" text=""></loading>
  </div>
</template>

<script>
  import {Loading} from 'vux'

  export default {
    name: "courseIndex",
    components: {Loading},
    data() {
      return {
        show: true,
        beikao: [{name: '', answer: ''},{name: '', answer: ''}],
        course: [],
        teacher: {answer: '', alternatives: ''},
        caseArry: {answer: '', article: '', numbering: ''},
        swiperOption: {
          notNextTick: true,
          slidesPerView: 2,
          autoplay: {
            delay: 4000,
            disableOnInteraction: false,
          },
          loop: true,
          observer: true,
          observeParents: true,
          setWrappermtze: true,
          autoHeight: true,

        }
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        const _this = this;
        _this.axios.get('/cn/wap-api/course').then(function (res) {
          _this.beikao = res.data.beikao;
          _this.course = res.data.shortcourse;
          _this.teacher = res.data.shortteacher2;
          _this.caseArry = res.data.shortstudent;
          _this.$nextTick(function () {
            _this.show = false;
          })
        })
      }
    }
  }
</script>

<style scoped>
  #courseIndex {
    padding-bottom: 60px;
    background: url("/static/images/course/wrap_bg.png") no-repeat 0 0;
    background-size: cover;
  }
  #courseIndex >>> .vux-loading-no-text .weui-toast {
    top: 50%;
    margin-top: -49px; /*no*/
  }

  .md_1_text {
    top: 35px;
  }

  .tit_text_1 {
    width: 80%;
  }

  .tit_text_2 {
    color: #ffffff;
    padding: 10px; /*px*/
    font-size: 26px; /*px*/
    margin: 35px 0 25px;
    background: rgba(0, 160, 233, 0.4);
  }

  .tit_text_3 {
    color: #ffffff;
    font-size: 24px; /*px*/
  }

  .md_2 {
    margin-top: -8px; /*px*/
    z-index: 1;
    box-sizing: border-box;
    padding: 0 80px; /*px*/
  }

  .tWrap_1 {
    padding: 14px 0;
  }

  .pos_1 {
    left: 0;
    top: 6px; /*px*/
    width: 100%;
    box-sizing: border-box;
  }

  .cIndex_2 {
    /*width: 540px;!*px*!*/
  }

  .icon_1 {
    width: 30px; /*px*/
    height: 30px; /*px*/
    margin-right: 10px;
    background: url("/static/images/course/cIndex_icon.png") no-repeat 0 0;
    background-size: contain;
  }

  .tit_1 {
    font-size: 28px; /*px*/
    color: #ffffff;
  }

  .tit_1_name {
    z-index: 1;
    padding: 16px 0; /*px*/
    font-size: 32px; /*px*/
    color: #ffffff;
  }

  .md_3 {
    margin-top: -24px; /*px*/
    padding: 0 14px;
    margin-bottom: 40px;
  }

  .pos_2 {
    left: 0;
    top: 26%;
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
  }

  .classItem {
    color: #ffffff;
    text-align: center;
    padding: 10px 0; /*px*/
  }

  .class_1 {
    font-size: 30px; /*px*/
  }

  .time_1 {
    font-size: 24px; /*px*/
  }

  .pos_2 .classItem:nth-child(1) {
    width: 48%;
  }

  .pos_2 .classItem:nth-child(2) {
    width: 50%;
  }

  .cIndex_4 {
    top: 6%; /*px*/
    left: 0;
    width: 100%;
  }

  .star_tit {
    margin-top: -30px;
  }

  .star_t1 {
    margin: 40px 0;
    width: 380px;
    padding: 16px 0 14px;
    color: #ffffff;
    font-size: 32px; /*px*/
    background: url("/static/images/course/tit_bg.png") no-repeat center 0;
    background-size: contain;
  }

  .star_t2 {
    margin: 30px 0;
    width: 240px; /*px*/
    height: 64px; /*px*/
    line-height: 64px; /*px*/
    color: #ffffff;
    font-size: 32px; /*px*/
    background: url("/static/images/course/tit_bg2.png") no-repeat center 0;
    background-size: cover;
  }

  .item_1 {
    display: flex;
    box-sizing: border-box;
    /*padding: 0 40px;*/
    flex-flow: row wrap;
    justify-content: center;
    align-items: flex-start;
  }

  .item_1 .courseImg {
    box-sizing: border-box;
    padding: 0 2px;
    height: 180px;
  }

  .item_1 .courseImg img {
    width: 100%;
  }

  .item_1 .courseName {
    color: #ffffff;
    font-size: 26px;
    font-weight: bold;
    padding: 10px 0;
  }

  .courseWrap_1 {
    width: 315px;
    margin: auto;
    background: url("/static/images/course/tit_bg3.png") no-repeat 0 0;
    background-size: cover;
  }

  .item_1 li {
    width: 50%;
    margin-bottom: 25px;
  }

  .cIndex_5 {
    padding: 0 25px;
  }

  .item_2 {
    padding: 0 25px;
  }

  .item_2 li {
    display: flex;
    box-sizing: border-box;
    padding: 8px; /*px*/
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    background: url("/static/images/course/Item_bg.png") no-repeat 0 0;
    background-size: cover;
    margin-bottom: 18px;
  }

  .rowTetx {
    /*padding: 10px 0;!*px*!*/
    font-size: 24px; /*px*/
    color: #ffffff;
  }

  .blue {
    color: #00e1eb;
  }

  .teacher_img {
    width: 170px;
    height: 200px;
    margin: 4px 0 0 2px; /*px*/
  }

  .teacher_img img {
    width: 100%;
    height: 100%;
  }

  .teacher_info {
    flex: 1;
    text-align: left;
    box-sizing: border-box;
    padding: 0 10px; /*px*/
  }

  .teacher_tit_wrap {
    color: #ffffff;
    font-size: 28px; /*px*/
    font-weight: bold;
    width: 280px;
    padding: 40px 8px 14px 8px; /*px*/
    box-sizing: border-box;
  }

  .teacher_tit {
    left: 0;
    top: 0;
    width: 100%;
  }

  .item_3_wrap {
    padding: 0 25px;
  }

  .item_3 {
    padding: 0 10px;
    box-shadow: 0 0 12px 0 #18aed6; /*no*/
    /*background: #054081;*/
  }

  .item_3 li {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 20px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4); /*no*/
  }

  .item_3 li:last-child {
    border-bottom: none;
  }

  .caseTit {
    font-size: 28px; /*px*/
    color: #ffffff;
  }

  .caseInfo {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    color: #a5b1c7;
    font-size: 24px; /*px*/
  }

  .itemLeft {
    flex: 1;
    box-sizing: border-box;
    padding-right: 25px;
  }

  .caseTit {
    height: 76px; /*px*/
    margin-bottom: 6px;
  }

  .caseImg {
    width: 190px;
    height: 115px;
  }

  .caseImg img {
    width: 100%;
    height: 100%;
  }

  .caseNum {
    left: 0;
    top: 0;
    width: 100%;
    padding: 4px 0; /*px*/
    color: #ffffff;
    font-size: 24px; /*px*/
    background: rgba(0, 0, 0, 0.8);
  }

</style>
