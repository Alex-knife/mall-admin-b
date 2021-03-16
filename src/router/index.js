import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import getMenuRoutes from '@/utils/permission';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';

Vue.use(VueRouter);

const asyncRoutes = [{
  path: '/product',
  name: 'Product',
  meta: {
    title: '商品',
    hidden: false,
    icon: 'shopping-cart',
  },
  component: Home,
  children: [
    {
      path: 'list',
      name: 'ProductList',
      meta: {
        title: '商品列表',
        hidden: false,
        icon: 'unordered-list',
      },
      component: () => import('@/views/pages/productList.vue'),
    },
    {
      path: 'add',
      name: 'ProductAdd',
      meta: {
        title: '添加商品',
        hidden: false,
        icon: 'plus-circle',
      },
      component: () => import('@/views/pages/productAdd.vue'),
    },
    {
      path: 'category',
      name: 'Category',
      meta: {
        title: '商品类目',
        hidden: false,
        icon: 'container',
      },
      component: () => import('@/views/pages/category.vue'),
    },
    {
      path: 'edit/:id',
      name: 'ProductEdit',
      meta: {
        title: '商品编辑',
        hidden: true,
        icon: 'container',
      },
      component: () => import('@/views/pages/productAdd.vue'),
    },
  ],
},
];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
      hidden: false,
      icon: 'mail',
    },
    children: [{
      path: 'index',
      name: 'Index',
      meta: {
        title: '统计',
        hidden: false,
        icon: 'schedule',
      },
      component: () => import('@/views/pages/index.vue'),
    }],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      hidden: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

let isAddRouters = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user.username && store.state.user.appkey
      && store.state.user.role && store.state.user.email) {
      // 传入路由 & 对于含有需要过滤的那一堆路由
      // 返回对于不同role中获得的路由
      // const menuRoutes = getMenuRoute(store.state.user.role);
      // coustomer or admin
      // console.log(store.state.role);
      if (!isAddRouters) {
        const menuRoutes = getMenuRoutes(store.state.user.role, asyncRoutes);
        // 除了menuRoutes还有首页的routes，得拼接
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes)).then(() => {
          router.addRoutes(menuRoutes);
          next();
        });
        isAddRouters = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
