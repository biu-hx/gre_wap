<template>
  <div class="itemWrap">
    <div v-for="(item,index) in listData.beikao.data" class="listItem">
      <router-link :to="{path:'/bkDownload',query: {id: item.id}}">
        <div class="itemRow">
          <span class="back_blue tag">{{item.catName}}</span>
          <span class="back_red tag" v-show="item.hot==1">Hot</span>
          <h1 class="bkName ellipsis">{{item.title}}</h1>
        </div>
        <div class="dataTime">
          <span>发布于 {{parseInt(item.createTime) | moment("YYYY-MM-DD")}}</span>
          <span>查看：{{item.viewCount}}  |  回复：{{item.replyCount}}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "list_2",
    data() {
      return {}
    },
    props:["listData"]
  }
</script>

<style scoped>
  .itemWrap {
    padding: 0 25px;
  }
  .itemWrap .listItem:last-child{
    border-bottom: none;
  }

  .itemRow {
    display: flex;
    flex-flow: nowrap row;
    justify-content: flex-start;
    align-items: flex-end;
    margin-bottom: 24px;
  }

  .dataTime {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: row wrap;
  }

  .tag {
    font-size: 24px; /*px*/
    padding: 0 10px;
    color: #fff;
    margin-right: 5px; /*px*/
    height: 40px; /*px*/
    line-height: 40px; /*px*/
    border-radius: 4px; /*no*/
  }

  .back_red {
    background: #e56060;
  }

  .back_blue {
    background: #4b9ed8;
  }

  .back_blue2 {
    background: #686dd3;
  }

  .listItem {
    padding: 25px 0;
    border-bottom: 1px solid #cccccc; /*no*/
  }

  .bkName {
    flex: 1;
    color: #333333;
    box-sizing: border-box;
    padding-left: 7px;
    font-weight: normal;
    font-size: 28px; /*px*/
  }

  .dataTime {
    color: #888888;
    font-size: 24px; /*px*/
  }

</style>
