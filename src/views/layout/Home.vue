<template>
  <div class="home">
    <!-- 左侧菜单栏 -->
    <left-menu :key="key"></left-menu>
    <div :class="{ 'main-app': true, 'extend-app': $store.state.collapsed }">
      <!-- 右侧顶端部分 -->
      <right-header />
      <!-- 右侧子路由信息 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftMenu from './components/menu.vue';
import RightHeader from './components/header.vue';

export default {
  data() {
    return {
      key: new Date().getTime(),
    };
  },
  watch: {
    $route() {
      this.key = new Date().getTime();
    },
  },
  components: {
    LeftMenu,
    RightHeader,
  },
  methods: {},
};
</script>

<style lang="less">
  @import url("~@/assets/css/home.less");
</style>
