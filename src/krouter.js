import Vue from 'vue';
import Home from './views/Home';
import About from './views/About';
import VueRouter from './kvue-router';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
  ],
});
