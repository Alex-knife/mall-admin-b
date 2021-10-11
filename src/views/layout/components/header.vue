<template>
  <div class="main-header">
    <a-button
      type="primary"
      style="margin-bottom: 16px"
      @click="toggleCollapsed"
    >
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <div class="breadCrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>
          {{ currentRoute[0] ? currentRoute[0].meta.title : '' }}
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <router-link :to="{name: currentRoute[1].name}">
            {{ currentRoute[1] ? currentRoute[1].meta.title : '' }}
          </router-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <ul class="user-info">
      <li>
        {{$store.state.user.username}}
        <a-icon type="down" />
      </li>
      <li @click="logout">Log Out</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentRoute: [
        {
          name: 'Home',
          meta: {
            title: '首页',
          },
        }, {
          name: 'Index',
          meta: {
            title: '统计',
          },
        },
      ],
    };
  },
  watch: {
    $route() {
      this.currentRoute = this.$router.currentRoute.matched;
    },
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('changeCollapsed');
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push({
        name: 'Login',
      });
    },
  },
};
</script>

<style lang="less">
.user-info{
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  li:nth-child(2){
    background: #eee
  }
}
</style>
