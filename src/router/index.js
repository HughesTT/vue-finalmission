import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/aboutus',
    name: 'aboutus',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/backstage',
    component: () => import('../views/backstage/LoginPage.vue'),
  },
  {
    path: '/user',
    component: () => import('../views/UserBoard.vue'),
    children: [
      {
        path: 'cart',
        component: () => import('../views/UserCart.vue'),
      },
      { // 對應單一產品的資訊頁面
        path: 'product/:productId',
        component: () => import('../views/UserProduct.vue'),
      },
    ],
  },
  {
    path: '/dashboard',
    name: '後台管理',
    component: () => import('../views/backstage/DashBoard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/backstage/ProductPage.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/backstage/OrderPage.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/backstage/CouponPage.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
