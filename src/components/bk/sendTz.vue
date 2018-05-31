<template>
  <div id="sendTz">
    <x-header style="background: #5a5ee4;" :left-options="{backText: ''}">发帖<a slot="right">发布</a></x-header>
    <div class="wrap">
      <p class="tit_1">选择标签</p>
      <div class="vux-1px-b tagWrap"><span class="active">备考资料</span><span>机经真题</span></div>
      <div class="formData">
        <div class="sendRow vux-1px-b"><input class="sendTit" type="text" placeholder="标题"></div>
        <div class="sendRow"><textarea class="sendText" placeholder="请输入内容"></textarea></div>
      </div>
      <div class="uploadWrap">
        <div class="itemSrc" v-for="(item, index) in list">
          <img class="previewer-demo-img" :src="$store.state.http_bbs+item.src" @click="show(index)" alt="">
          <span class="delet" @click="test"></span>
        </div>
        <!--<div class="itemSrc"><img src="http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg" alt=""></div>-->
        <!--<div class="itemSrc"><img src="http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg" alt=""></div>-->
        <!--<div class="itemSrc"><img src="http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg" alt=""></div>-->
        <!--<div class="itemSrc"><img src="http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg" alt=""></div>-->

        <div class="itemOut">
          <div class="uploadBtn relative">
            <!--<form ref="myForm" enctype="multipart/form-data">-->
              <input name="upload" id="add-img" type="file" accept="image/png,image/gif,image/jpeg" @change="update">
              <img class="adIcon" src="/static/images/bk/add.png" alt="">
            <!--</form>-->
          </div>
        </div>

      </div>
      <!--<img class="previewer-demo-img" v-for="(item, index) in list" :src="item.src" width="100" @click="show(index)">-->
      <div v-transfer-dom>
        <previewer :list="list" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
      </div>
    </div>
  </div>

</template>

<script>
  import {XHeader, Previewer, TransferDom, ViewBox, Toast} from 'vux'

  export default {
    name: "sendTz",
    data() {
      return {
        list: [],
      // {
      //   msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
      //     src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
      //   w: 800,
      //   h: 400
      // },
      // {
      //   msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
      //     src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
      //   w: 1200,
      //   h: 900
      // }, {
      //   msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
      //     src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwwcynw2j20p00b4js9.jpg'
      // }
        options: {
          getThumbBoundsFn(index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index];
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect();
            // w = width
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
          }
        }
      }
    },
    directives: {
      TransferDom
    },
    components: {
      XHeader, Previewer, TransferDom
    },
    methods: {
      logIndexChange(arg) {
        console.log(arg)
      },
      show(index) {
        console.log(index)
        this.$refs.previewer.show(index)
      },
      test() {
        console.log('准备删除')
      },
      update(e) {
        const _this=this;
        let file = e.target.files[0];
        let param = new FormData(); //创建form对象
        let config = {
          headers:{'Content-Type':'multipart/form-data'},
          transformRequest : [param => param]
        }; //添加请求头
        param.append('upload', file);//通过append向form对象添加数据
        _this.axios.post('http://bbs.viplgw.cn/cn/wap-api/app-image',param,config).then(res => {
          if(res.data.code===1){
            _this.list.push({src:res.data.image})
          }else {
            console.log('上传失败')
          }
        })

      }
    }
  }
</script>

<style scoped>
  .wrap {
    padding: 0 20px;
  }

  .tit_1 {
    color: #777777;
    padding: 30px 0;
    font-size: 32px; /*px*/
  }

  .tagWrap {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: flex-start;
    padding-bottom: 24px;
  }

  .tagWrap span {
    color: #777777;
    font-size: 28px; /*px*/
    padding: 4px 20px; /*px*/
    border-radius: 10px; /*px*/
    border: 1px solid #b1b1b1; /*no*/
    margin-right: 60px; /*px*/
  }

  .tagWrap span.active {
    background: #5a5ee4;
    color: #ffffff;
    border-color: #5a5ee4;
  }

  .formData {
    font-size: 32px; /*px*/
  }

  .sendRow {
    padding: 24px 0;
  }

  .sendTit::placeholder, .sendText::placeholder {
    font-size: 32px; /*px*/
    color: #777777;
  }

  .sendTit, .sendText {
    width: 100%;
    border: none;
    outline: none;
    resize: none;
  }

  .sendText {
    height: 400px;
  }

  .uploadWrap {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .uploadWrap:after {
    content: "";
    flex: auto;
  }

  .uploadBtn, .itemSrc {
    position: relative;
    width: 140px; /*px*/
    height: 130px; /*px*/
    text-align: center;
    background: #dcdcdc;
    margin: 0 30px 30px 0; /*px*/
  }

  #add-img {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
    opacity: 0;
    filter: alpha(opacity=0);
  }

  .adIcon {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 60px; /*px*/
    margin-top: -30px; /*px*/
    margin-left: -30px; /*px*/
  }

  .itemSrc img {
    width: auto;
    height: 100%;
  }

  .delet {
    position: absolute;
    top: -20px; /*px*/
    right: -20px; /*px*/
    width: 40px; /*px*/
    height: 40px /*px*/;
    z-index: 1;
    background: url("/static/images/bk/delet.png") no-repeat 0 0;
    background-size: contain;
  }
</style>
