import { createRouter, createWebHistory } from 'vue-router';

import Root from '../views/Root.vue';
import Cat from '../views/Cat.vue';
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

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
