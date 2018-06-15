<template>
  <div id="information">
    <swiper class="bg_f" :options="swiperOption" ref="mySwiper">
      <swiper-slide :key="index" v-for="(item,index) in bannerItem">
        <img :src="$store.state.http_gre+item.image" alt="">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
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
    </ul>
    <loading :show="show"></loading>
  </div>
</template>
<script type="text/ecmascript-6">
  import ScrollFlipPage from 'scroll-flip-page'
  import {ViewBox, Loading} from 'vux'

  export default {
    name: 'information',
    data() {
      return {
        show: true,
        bannerItem: '',
        dataList: '',
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
        }
      }
    },
    components: {
      ViewBox, Loading, ScrollFlipPage
    },
    mounted() {
      const _this = this;
      _this.show = true;
      this.axios.get('/cn/wap-api/consult')
        .then(function (response) {
          _this.bannerItem = response.data.carousel;
          _this.dataList = response.data.data.data;
          _this.$nextTick(function () {
            _this.show = false;
          })
        })
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
