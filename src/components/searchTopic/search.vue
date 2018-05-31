<template>
  <div id="search">
    <Search
      ref="search"
      @result-click="resultClick"
      v-model="value" :results="results"
      @on-change="getResult"
      placeholder="请输入题目信息"
      @on-cancel="onCancel">
    </Search>
    <loading :show="show" text=""></loading>
    <toast v-model="toastStatu" :text="toastText" width="4rem" type="text" :time="1200" position="bottom"></toast>
    <!--@on-change="getResult"-->
    <!--@on-submit="onSubmit"-->

  </div>
</template>

<script type="text/ecmascript-6">
  import {Search, Toast,Loading} from 'vux'

  export default {
    name: "search",
    data() {
      return {
        show:false,
        results: [],
        value: '',
        toastStatu: false,
        toastText: '',
      }
    },
    components: {
      Search, Toast,Loading
    },
    mounted() {
      this.$refs.search.setFocus();
    },
    methods: {
      getResult(val) {
        const _this = this;
        let data = {title: val};
        _this.show=true;
        if(val){
          _this.axios.get('/cn/wap-api/search-title', {params: data}).then(function (res) {
            if (res.data.length > 0) {
              _this.results = getResult(val, res.data);
            } else {
              _this.results = [];
              _this.toastText = '暂无当前数据';
              _this.toastStatu = true;
            }
            _this.$nextTick(function () {
              _this.show=false;
            })

          })
        }else {
          _this.show=false;
          return false;
        }

      },
      //点击结果列表
      resultClick(item) {
        this.$router.push({name:'questionDetails',query:{type:1,qid:item.id}})
      },
      // 提交
      onSubmit(val) {
        const _this = this;
        let data = {title: val};
        _this.$refs.search.setBlur();
        _this.axios.get('/cn/wap-api/search-title', {params: data}).then(function (res) {
          if (res.data.length > 0) {
            _this.results = getResult(val, res.data);
          } else {
            _this.results = [];
          }
          _this.$nextTick(function () {
            _this.show=false;
          })
          // _this.results = res.data.length>0 ? getResult(val,res.data) : [];
        })
      },
      //取消
      onCancel() {
        this.$router.push({path: '/searchTopic'});
        this.$refs.search.setFocus();
      }
    }

  }

  function getResult(val, item) {
    let rs = [];
    for (let i = 0; i < item.length; i++) {
      rs.push({
        // title: `${item[i].section + item[i].source.name + '-' + item[i].id}`,
        id:`${item[i].id}`,
        title: `${val}`,
        // desc: `The difficulty for nineteenth-century advocates of the claim th`,
        desc: `${item[i].stem}`,
        index: i
      })
    }
    return rs
  }
</script>

<style scoped>
  #search >>> .weui-toast.vux-toast-bottom {
    bottom: 120px; /*px*/
  }

  #search >>> .weui-toast_text .weui-toast__content {
    font-size: 14px; /*no*/
    padding: 12px 6px; /*px*/
  }

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
