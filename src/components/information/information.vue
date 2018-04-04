<template>
  <div id="information">
      <banner class="infoBanner"></banner>
      <list></list>
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

</style>
