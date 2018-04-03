<template>
  <swiper class="bg_f" :options="swiperOption" ref="mySwiper">
    <swiper-slide><img src="../../assets/images/index/banner.png" alt=""></swiper-slide>
    <swiper-slide><img src="../../assets/images/index/banner.png" alt=""></swiper-slide>
    <swiper-slide><img src="../../assets/images/index/banner.png" alt=""></swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
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
<style>
  .swiper-pagination .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    background: none;
    opacity: 1;
    outline: none;
    border: 2px solid #ffffff; /*no*/
  }

  .swiper-pagination .swiper-pagination-bullet-active {
    background: #ffffff;
  }
</style>
