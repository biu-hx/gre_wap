<template>
  <div id="search">
    <Search
      ref="search"
      @result-click="resultClick"
      v-model="value" :results="results"
      @on-change="getResult"
      @on-submit="onSubmit"
      placeholder="请输入题目信息"
      @on-cancel="onCancel">
    </Search>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Search} from 'vux'

  export default {
    name: "search",
    data() {
      return {
        results: [],
        value: ''
      }
    },
    components: {
      Search
    },
    mounted() {
      this.$refs.search.setFocus();
    },
    methods: {
      getResult(val) {
        console.log('on-change', val);
        this.results = val ? getResult(this.value) : []
      },
      resultClick(item) {
        window.alert('you click the result item: ' + JSON.stringify(item))
      },
      onSubmit() {
        this.$refs.search.setBlur();
        console.log('??')
      },
      onCancel() {
        this.$router.push({path: '/searchTopic'});
        this.$refs.search.setFocus();
      }
    }

  }

  function getResult(val) {
    let rs = [];
    for (let i = 0; i < 7; i++) {
      rs.push({
        title: `${val}`,
        desc: `The difficulty for nineteenth-century advocates of the claim th`,
        index: i
      })
    }
    return rs
  }
</script>

<style scoped>
  #search >>> .weui-search-bar {
    background: #5a5ee4;
  }

  #search >>> .weui-search-bar__form {
    border-radius: 4px; /*no*/
  }

  #search >>> .weui-search-bar__cancel-btn {
    color: #fff;
    font-size: 28px; /*px*/
  }

  #search >>> .weui-icon-search {
    color: #888888;
  }

  #search >>> .weui-search-bar__label span {
    line-height: 24px; /*no*/
  }

  #search >>> .weui-search-bar__box .weui-search-bar__input {
    width: 96%;
    padding: 4px 2%; /*no*/
  }

  #search >>> .weui-cells.vux-search_show .weui-cell:last-child {
    margin-bottom: 60px; /*no*/
  }

  #search >>> .resTit {
    color: #888888;
    margin-bottom: 16px;
    font-size: 32px; /*px*/
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    word-break: break-word;
  }

  #search >>> .resDesc {
    color: #1d1d1d;
    font-size: 30px; /*px*/
    line-height: 50px; /*px*/
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    word-break: break-all;
    -webkit-line-clamp: 2;
    overflow: hidden;

  }

  #search >>> .weui-cell {
    padding: 30px 20px;
  }

  #search >>> .weui-cell__bd {
    max-width: 100%;
  }

  #search >>> .weui-cell:before {
    border-color: #c0c0c0;
    left: 0;
  }
</style>
