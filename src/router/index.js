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
    path: '/productlist',
    component: () => import('../views/ProductList.vue'),
    children: [
      { // 對應單一產品的資訊頁面
        path: 'allproducts',
        component: () => import('../views/ProductView.vue'),
      },
      { // 對應單一產品的資訊頁面
        path: 'product/:productId',
        component: () => import('../views/ProductMore.vue'),
      },
    ],
  },
  {
    path: '/user',
    component: () => import('../views/UserBoard.vue'),
    children: [
      {
        path: 'favorite',
        component: () => import('../views/UserFavorite.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/UserCart.vue'),
      },
      {
        path: 'payment',
        component: () => import('../views/PayMent.vue'),
      },
      {
        path: 'userorder/:orderId',
        component: () => import('../views/UserOrder.vue'),
      },
    ],
  },
  {
    path: '/service',
    name: '客服維修',
    component: () => import('../views/UserService.vue'),
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
  {
    path: '/:pathMatch(.*)*',
    name: '404page',
    component: () => import('../views/404Page.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
