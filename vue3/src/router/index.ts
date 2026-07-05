import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import { useMouserChiefs } from '../loaders/mouser-chiefs';
import Root from '../views/Root.vue';
import Cat from '../views/Cat.vue';
import NotFound from '../views/not-found.vue';

const routes = [
  {
    path: '/',
    component: Root,
    meta: { loaders: [useMouserChiefs] },
  },
  {
    path: '/cat/:entry',
    component: Cat,
    meta: { loaders: [useMouserChiefs] },
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
    meta: { loaders: [useMouserChiefs] },
  },
] satisfies RouteRecordRaw[];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
