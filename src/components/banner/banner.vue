<template>
  <swiper class="bg_f" :options="swiperOption" ref="mySwiper">
    <swiper-slide><img src="/static/images/index/banner.png" alt=""></swiper-slide>
    <swiper-slide><img src="/static/images/index/banner.png" alt=""></swiper-slide>
    <swiper-slide><img src="/static/images/index/banner.png" alt=""></swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
  <ul class="articleList bg_f">
    <li v-for="i in 10">
      <div class="artContiner">
        <div class="artLeft">
          <p class="ellipsis-2 artTit">{{i}}号外！号外！填空1200精项刷 词团强烈来袭</p>
          <p class="artTime">2018-01-15 15:06:36</p>
        </div>
        <div class="artRight">
          <img src="/static/images/index/artImg.png" alt="">
        </div>
      </div>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "banner",
    data() {
      return {
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
    }, components: {},
    methods: {}

  }
</script>
<style scoped>
  .swiper-pagination .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    background: none;
    opacity: 1;
    outline: none;
    border: 1px solid #ffffff; /*no*/
  }

  .swiper-pagination .swiper-pagination-bullet-active {
    background: #ffffff;
  }
</style>
