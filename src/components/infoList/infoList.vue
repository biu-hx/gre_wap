<template>
      <ul slot="default" class="articleList bg_f">
        <li v-for="i in 10">
          <div class="artContiner">
            <div class="artLeft">
              <p class="ellipsis-2 artTit">{{i}}号外！号外！填空1200精项刷 词团强烈来袭</p>
              <p class="artTime">2018-01-15 15:06:36</p>
            </div>
            <div class="artRight">
              <img src="../../assets/images/index/artImg.png" alt="">
            </div>
          </div>
        </li>
      </ul>
</template>

<script type="text/ecmascript-6">
  // import { ViewBox } from 'vux'
  export default {
    name: "infoList",
    components: {
      // ViewBox
    }
  }

</script>

<style>
  .articleList {
    padding:0 20px;
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
