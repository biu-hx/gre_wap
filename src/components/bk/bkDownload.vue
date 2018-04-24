<template>
    <div id="bkDownload">
      <x-header style="background: #5a5ee4;" :left-options="{backText: ''}">
        <span>GRE备考资料下载</span>
        <div slot="right">
          <router-link to="/search"><img class="scIcon" src="/static/images/bk/share.png" alt=""></router-link>
        </div>
      </x-header>
    </div>
</template>

<script type="text/ecmascript-6">
  import {XHeader, Tab, TabItem} from 'vux'
    export default {
        name: "bkDownload",
      components: {
        XHeader, Tab, TabItem
      },
    }
</script>

<style scoped>
  #bkDownload{
    height: 100%;
  }
  .scIcon{
    height: 40px;/*px*/
  }
</style>
