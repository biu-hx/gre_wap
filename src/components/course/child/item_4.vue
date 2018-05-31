<template>
  <div class="tabContent_4" v-if="itemData.comment.data.length>0">
    <div v-for="(item,index) in itemData.comment.data" class="replyItem">
      <div class="userHead"><img :src="item.image?$store.state.http_gre+item.image:'/static/images/default.png'" alt=""></div>
      <div class="replyRight">
        <div class="replyTime">
          <span class="nickName">用户名 {{item.nickname}}</span>
          <span>{{parseInt(item.createTime)|moment('YYYY-MM-DD')}}</span>
        </div>
        <div class="replyText">{{item.content}}</div>
      </div>
    </div>
  </div>
  <div v-else class="hintBox">
    <div class="tm">暂无评论...</div>
  </div>
</template>

<script>
  export default {
    name: "item_4",
    data() {
      return {}
    },
    props: ["itemData"]
  }
</script>

<style scoped>
  .hintBox{
    padding: 100px 0;
  }
  .userHead {
    width: 70px; /*px*/
    height: 70px; /*px*/
    overflow: hidden;
    border-radius: 50%;
  }

  .userHead img {
    width: 100%;
    border-radius: 50%;
  }

  .tabContent_4 .replyItem:last-child {
    border-bottom: none;
  }

  .replyItem {
    display: flex;
    padding: 25px 0;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid #cfcfcf; /*no*/
  }

  .replyRight {
    flex: 1;
    box-sizing: border-box;
    padding-left: 15px; /*px*/
  }

  .replyTime {
    font-size: 28px; /*px*/
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    color: #888888;
    margin-bottom: 10px; /*px*/
  }

  .nickName {
    font-size: 28px; /*px*/
    color: #0b0b0b;
    padding-right: 30px; /*px*/
  }

  .replyText {
    color: #333333;
    font-size: 30px; /*px*/
    line-height: 50px; /*px*/
  }

</style>
