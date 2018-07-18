<template>
  <div id="teacherDetails">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="20px">
      <x-header slot="header" class="header" :left-options="{backText: ''}">名师介绍</x-header>
      <div class="content">
        <div class="teacher_info vux-1px-b">
          <div class="teacher_img">
            <img :src="$store.state.http_gre+resData.image" alt="">
          </div>
          <div class="info_r">
            <h1 class="teacher_name">{{resData.name}}</h1>
            <ul class="teacher_tag">
              <li v-for="(item,index) in resData.label">{{item}}</li>
            </ul>
          </div>

        </div>
        <div class="teacher_desc_text" v-html="resData.detail"></div>
      </div>
    </view-box>
  </div>
</template>

<script>
  import {XHeader, ViewBox} from 'vux'

  export default {
    name: "teacherDetails",
    data() {
      return {
        resData: '',
      }

    },
    components: {
      XHeader, ViewBox
    },
    activated() {
      this.getData(this.$route.query.id);
    },
    methods: {
      getData(id) {
        const _this = this;
        _this.axios.get('/cn/wap-api/teacher-detail', {params: {teacherid: id}}).then((res) => {
          _this.resData=res.data;
        })
      }
    }

  }
</script>

<style scoped>
  #teacherDetails {
    height: 100%;
    /*background: #f3f3f3;*/
  }

  .header {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    background: #5a5ee4;
  }

  .content {
    padding: 30px 20px 0;
  }

  .teacher_info {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 30px;
  }

  .teacher_img {
    width: 35%;
  }

  .info_r {
    width: 60%;
  }

  .teacher_name {
    color: #1c9df2;
    font-weight: normal;
    font-size: 32px; /*px*/
    margin-bottom: 10px;
  }

  .teacher_desc_text {
    padding: 30px 0 0;
    font-size: 28px; /*px*/
    color: #474747;
  }

  .teacher_tag {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .teacher_tag li {
    color: #ffffff;
    padding: 4px 10px; /*px*/
    margin-right: 14px; /*px*/
    margin-bottom: 8px; /*px*/
    font-size: 24px; /*px*/
    border-radius: 6px; /*px*/
  }

  .teacher_tag li:nth-child(even) {
    background: #f29ec7;
  }

  .teacher_tag li:nth-child(odd) {
    background: #33cc99;
  }
</style>
