import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const constantRoutes = [
  { path: '/', component: () => import('@/views/Home') },
  { path: '/about', component: () => import('@/views/about') },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

export default router;
