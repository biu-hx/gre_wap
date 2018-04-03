<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
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
    }
  }
</script>

<style>
  #app {
    height: 100%;
    box-sizing: border-box;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
