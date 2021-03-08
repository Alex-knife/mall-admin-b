const roleForRoute = {
  coustomer: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }, {
    name: 'ProductEdit',
  }],
  admin: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }, {
    name: 'Category',
  }, {
    name: 'ProductEdit',
  }],
};

// export default function getMenuRoutes(role) {
//   // 运行访问的路由，由state中获取的role    直接return出去就ok啦？
//   const resultRoute = roleForRoute[role].map((item) => item.name);
//   return resultRoute;
// }

export default function getMenuRoutes(role, routes) {
  // 运行访问的路由，由state中获取的role
  const allowRouteName = roleForRoute[role].map((item) => item.name);
  // 返回出来的路由   过滤出角色不需要的路由
  const resultRoute = routes.filter((ro) => {
    const route = ro;
    if (allowRouteName.indexOf(route.name) !== -1) {
      const { children } = route;
      route.children = children.filter((contain) => allowRouteName.indexOf(contain.name) !== -1);
      return true;
    }
    return false;
  });
  return resultRoute;
}
