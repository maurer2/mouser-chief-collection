import { createApp } from 'vue';
import { createRouter } from 'vue-router';
import App from './App.vue';
// import { router } from './router';

import './global.css';

const routes = [
  {
    path: '/',
    name: 'root',
  },
  {
    path: '/cat',
    name: 'cat',
  },
];

/*
const router = createRouter({
  routes,
});
*/


const vueApp = createApp(App);

vueApp
  //.use(router)
  .mount('#root');
