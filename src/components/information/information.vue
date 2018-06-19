<template>
  <div id="information">
    <swiper class="bg_f swiperWrap" :options="swiperOption" ref="mySwiper">
      <swiper-slide class="slide" :key="index" v-for="(item,index) in bannerItem">
        <img :src="$store.state.http_gre+item.image" alt="">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="wrapper">
      <!--<div><span>下拉刷新</span></div>-->
      <div class="suggest" ref="wrapper">
        <ul class="articleList bg_f" v-model="dataList">
          <li v-for="(item,index) in dataList">
            <router-link :to="{path:'/articleDetails',query: {id: item.id}}">
              <div class="artContiner">
                <div class="artLeft">
                  <p class="ellipsis-2 artTit">{{item.title}}</p>
                  <p class="artTime">{{item.createTime}}</p>
                </div>
                <div class="artRight">
                  <img :src="$store.state.http_gre+item.image" alt="">
                </div>
              </div>
            </router-link>
          </li>
          <load-more v-if="hasMore" tip="加载中..."></load-more>
        </ul>
      </div>

    </div>
    <loading :show="show"></loading>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import {ViewBox, Loading, LoadMore} from 'vux'

  export default {
    name: 'information',
    data() {
      return {
        page: 1,
        totalPage:'',
        show: true,
        foodsScroll: '',
        bannerItem: '',
        dataList: '',
        hasMore: false,
        swiperOption: {
          notNextTick: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          loop: true,
          observer: true,
          observeParents: true,
          setWrappermtze: true,
          autoHeight: true,
          // height: 300,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        },
        options: {
          pullUpLoad: {
            threshold: -20 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
          },
          pullDownRefresh: false, //关闭下拉/
          click: true,
          probeType: 3,
          startY: 0,
          scrollbar: false
        }
      }
    },
    components: {
      ViewBox, Loading, LoadMore, BScroll
    },
    mounted() {
      this._initScroll();
      this.getData();
    },
    methods: {
      _initScroll() {
        this.foodsScroll = new BScroll(this.$refs.wrapper, this.options)
        // 上拉
        this.foodsScroll.on('pullingUp', () => {
          let page=this.page++;
          if ( page<= this.totalPage) { //判断是否继续上拉刷新
            // console.log(page)
            this.hasMore=true;
            this.setData(page) //获取数据方法
          }
        })
      },
      pullingDownUp() {
        this.foodsScroll.finishPullDown()
        this.foodsScroll.finishPullUp()
        this.foodsScroll.refresh() //重新计算元素高度
      },
      getData() {
        const _this = this;
        _this.show = true;
        this.axios.get('/cn/wap-api/consult').then(function (response) {
          _this.bannerItem = response.data.carousel;
          _this.dataList = response.data.data.data;
          _this.totalPage=response.data.data.total;
          _this.$nextTick(function () {
            _this.show = false;
          })
        })
      },
      setData(page) {
        const _this = this;
        let data = {page: page};
        _this.axios.get('/cn/wap-api/consult', {params: data}).then(function (res) {
          _this.dataList.push(...res.data.data.data);
          _this.$nextTick(() => {
            _this.hasMore=false;
            _this.pullingDownUp()
          })
        })
      }


    }
  }
</script>

<style scoped>
  #information >>> .swiper-pagination .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    background: none;
    opacity: 1;
    outline: none;
    border: 1px solid #ffffff; /*no*/
  }

  #information >>> .swiper-pagination .swiper-pagination-bullet-active {
    background: #ffffff;
  }

  #information >>> .vux-loading-no-text .weui-toast {
    top: 50%;
    margin-top: -49px; /*no*/
  }

  .swiperWrap {
    z-index: 100;
    height: 200px; /*px*/
  }

  .wrapper {
    position: fixed;
    width: 100%;
    top: 200px; /*px*/
    bottom: 0;
    overflow: hidden;

  }

  .suggest {
    height: 100%;
    overflow: hidden;
  }

  .articleList {
    padding: 0 20px;

  }

  .articleList li {
    padding: 20px 0;
    border-bottom: 1px solid #cccccc; /*no*/
  }

  .articleList li:last-child {
    border-bottom: none;
  }

  .artContiner {
    display: flex;
    flex-flow: row wrap;
    align-items: start;
    justify-content: space-between;
  }

  .artLeft {
    width: 69%;
  }

  .artRight {
    overflow: hidden;
    max-height: 140px;
    width: 30%;
  }

  .artTit {
    color: #333333;
    line-height: 40px;
    font-size: 30px;
    max-height: 80px;
    margin-bottom: 20px;
  }

  .artTime {
    font-size: 26px; /*px*/
    color: #888888;
  }
</style>
