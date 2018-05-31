<template>
  <table class="leidTab">
    <thead>
    <tr>
      <th width="33.3%" class="tl">来源/用途</th>
      <th width="33.3%">雷豆收入</th>
      <th width="33.3%" class="tr">日期</th>
    </tr>
    </thead>
    <tbody class="tm">
    <tr v-for="(item,index) in ldData.income">
      <td class="tl">{{item.behavior}}</td>
      <td>+{{item.integral}}</td>
      <td class="tr">{{parseInt(item.createTime) | moment('YYYY-MM-DD')}}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: "ld_2",
    data() {
      return {

      }
    },
    props:['ldData']
  }
</script>

<style scoped>
  .leidTab {
    width: 100%;
    table-layout: fixed;
    /*box-sizing: border-box;*/
  }

  .leidTab thead {
    /*padding: 10px 20px;*/
    background: #ebe9e9;
  }

  .leidTab thead th {
    color: #333333;
    padding: 20px;
    font-weight: normal;
    font-size: 30px; /*px*/
  }

  .leidTab tbody tr {
    border-bottom: 1px solid #ebe9e9;
  }

  .leidTab tbody td {
    color: #777777;
    padding: 20px;
    word-break: break-all;
    font-size: 30px /*px*/;
  }
</style>
