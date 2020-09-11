import { createRouter, createWebHistory } from 'vue-router';

import Root from '../views/root.vue';
import Cat from '../views/cat.vue';
import NotFound from '../views/not-found.vue';

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
