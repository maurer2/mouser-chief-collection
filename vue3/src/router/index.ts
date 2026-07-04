import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

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
    path: '/:pathMatch(.*)*',
    component: NotFound,
  },
] satisfies RouteRecordRaw[];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
