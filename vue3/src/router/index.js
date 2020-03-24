import { createRouter, createWebHistory } from 'vue-router';

import Root from '../views/Root.vue';
import Cat from '../views/Cat.vue';

const routes = [
  {
    path: '/',
    component: Root,
  },
  {
    path: '/cat/:entry',
    component: Cat,
  },
  {
    path: '/*',
    component: Root,
  },
];

// eslint-disable-next-line import/prefer-default-export
export const router = createRouter({
  history: createWebHistory(),
  routes,
});
