<template>
  <div id="information" style="height: 100%;box-sizing: border-box;">
    <view-box ref="viewBox" body-padding-top="150px">
      <banner class="infoBanner"></banner>
      <list></list>
    </view-box>
  </div>
</template>
<script type="text/ecmascript-6">
  import banner from '../banner/banner'
  import list from '../infoList/infoList'
  import { ViewBox } from 'vux'
  
  export default {
    name: 'information',
    components: {
      ViewBox,
      banner,
      list
    }
  }
</script>

<style scoped>
  .infoBanner{
    width: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 100;
    box-sizing: border-box;
  }

</style>
