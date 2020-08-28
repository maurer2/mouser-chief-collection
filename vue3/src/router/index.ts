import { createRouter, createWebHistory } from 'vue-router';

import Root from '../views/Root.vue';
import Cat from '../views/Cat.vue';
import NotFound from '../views/NotFound.vue';

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
    component: NotFound,
  },
];

// eslint-disable-next-line import/prefer-default-export
export const router = createRouter({
  history: createWebHistory(),
  routes,
});
