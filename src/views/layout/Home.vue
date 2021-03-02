<template>
  <div class="home">
    <!-- 左侧菜单栏 -->
    <left-menu />
    <div :class="{ 'main-app': true, 'menu-unfold': $store.state.collapsed }">
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
    };
  },
  components: {
    LeftMenu,
    RightHeader,
  },
  methods: {},
};
</script>
