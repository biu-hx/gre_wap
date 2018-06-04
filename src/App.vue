<template>
  <div id="app">
    <keep-alive>
        <router-view keep-alive></router-view>
    </keep-alive>
    <!--<index></index>-->
  </div>
</template>

<script>
  // import index from './components/index'
  // import information from './components/information/information'

  export default {
    name: 'App',
    components: {
      // index,
      // information
    },
    mounted() {
      console.log("/***\n" +
        " *                    .::::.\n" +
        " *                  .::::::::.\n" +
        " *                 :::::::::::  FUCK YOU\n" +
        " *             ..:::::::::::'\n" +
        " *           '::::::::::::'\n" +
        " *             .::::::::::\n" +
        " *        '::::::::::::::..\n" +
        " *             ..::::::::::::.\n" +
        " *           ``::::::::::::::::\n" +
        " *            ::::``:::::::::'        .:::.\n" +
        " *           ::::'   ':::::'       .::::::::.\n" +
        " *         .::::'      ::::     .:::::::'::::.\n" +
        " *        .:::'       :::::  .:::::::::' ':::::.\n" +
        " *       .::'        :::::.:::::::::'      ':::::.\n" +
        " *      .::'         ::::::::::::::'         ``::::.\n" +
        " *  ...:::           ::::::::::::'              ``::.\n" +
        " * ```` ':.          ':::::::::'                  ::::..\n" +
        " *                    '.:::::'                    ':'````..\n" +
        " */");
      // console.log("/***\n" +
      //
      //   " *               ii.                                         ;9ABH,          \n" +
      //   " *              SA391,                                    .r9GG35&G          \n" +
      //   " *              &#ii13Gh;                               i3X31i;:,rB1         \n" +
      //   " *              iMs,:,i5895,                         .5G91:,:;:s1:8A         \n" +
      //   " *               33::::,,;5G5,                     ,58Si,,:::,sHX;iH1        \n" +
      //   " *                Sr.,:;rs13BBX35hh11511h5Shhh5S3GAXS:.,,::,,1AG3i,GG        \n" +
      //   " *                .G51S511sr;;iiiishS8G89Shsrrsh59S;.,,,,,..5A85Si,h8        \n" +
      //   " *               :SB9s:,............................,,,.,,,SASh53h,1G.       \n" +
      //   " *            .r18S;..,,,,,,,,,,,,,,,,,,,,,,,,,,,,,....,,.1H315199,rX,       \n" +
      //   " *          ;S89s,..,,,,,,,,,,,,,,,,,,,,,,,....,,.......,,,;r1ShS8,;Xi       \n" +
      //   " *        i55s:.........,,,,,,,,,,,,,,,,.,,,......,.....,,....r9&5.:X1       \n" +
      //   " *       59;.....,.     .,,,,,,,,,,,...        .............,..:1;.:&s       \n" +
      //   " *      s8,..;53S5S3s.   .,,,,,,,.,..      i15S5h1:.........,,,..,,:99       \n" +
      //   " *      93.:39s:rSGB@A;  ..,,,,.....    .SG3hhh9G&BGi..,,,,,,,,,,,,.,83      \n" +
      //   " *      G5.G8  9#@@@@@X. .,,,,,,.....  iA9,.S&B###@@Mr...,,,,,,,,..,.;Xh     \n" +
      //   " *      Gs.X8 S@@@@@@@B:..,,,,,,,,,,. rA1 ,A@@@@@@@@@H:........,,,,,,.iX:    \n" +
      //   " *     ;9. ,8A#@@@@@@#5,.,,,,,,,,,... 9A. 8@@@@@@@@@@M;    ....,,,,,,,,S8    \n" +
      //   " *     X3    iS8XAHH8s.,,,,,,,,,,...,..58hH@@@@@@@@@Hs       ...,,,,,,,:Gs   \n" +
      //   " *    r8,        ,,,...,,,,,,,,,,.....  ,h8XABMMHX3r.          .,,,,,,,.rX:  \n" +
      //   " *   :9, .    .:,..,:;;;::,.,,,,,..          .,,.               ..,,,,,,.59  \n" +
      //   " *  .Si      ,:.i8HBMMMMMB&5,....                    .            .,,,,,.sMr\n" +
      //   " *  SS       :: h@@@@@@@@@@#; .                     ...  .         ..,,,,iM5\n" +
      //   " *  91  .    ;:.,1&@@@@@@MXs.                            .          .,,:,:&S\n" +
      //   " *  hS ....  .:;,,,i3MMS1;..,..... .  .     ...                     ..,:,.99\n" +
      //   " *  ,8; ..... .,:,..,8Ms:;,,,...                                     .,::.83\n" +
      //   " *   s&: ....  .sS553B@@HX3s;,.    .,;13h.                            .:::&1\n" +
      //   " *    SXr  .  ...;s3G99XA&X88Shss11155hi.                             ,;:h&,\n" +
      //   " *     iH8:  . ..   ,;iiii;,::,,,,,.                                 .;irHA  \n" +
      //   " *      ,8X5;   .     .......                                       ,;iihS8Gi\n" +
      //   " *         1831,                                                 .,;irrrrrs&@\n" +
      //   " *           ;5A8r.                                            .:;iiiiirrss1H\n" +
      //   " *             :X@H3s.......                                .,:;iii;iiiiirsrh\n" +
      //   " *              r#h:;,...,,.. .,,:;;;;;:::,...              .:;;;;;;iiiirrss1\n" +
      //   " *             ,M8 ..,....,.....,,::::::,,...         .     .,;;;iiiiiirss11h\n" +
      //   " *             8B;.,,,,,,,.,.....          .           ..   .:;;;;iirrsss111h\n" +
      //   " *            i@5,:::,,,,,,,,.... .                   . .:::;;;;;irrrss111111\n" +
      //   " *            9Bi,:,,,,......                        ..r91;;;;;iirrsss1ss1111\n" +
      //   " */\n")
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/1px.less';

  #app {
    height: 100%;
    box-sizing: border-box;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  /*过度动画*/
  .vux-pop-out-enter-active,
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-in-leave-active {
    will-change: transform;
    transition: all 250ms;
    height: 100%;
    top: 0;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
  }

  .vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

</style>
