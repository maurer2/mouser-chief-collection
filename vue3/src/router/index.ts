import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import { useMouserChiefs } from '../loaders/mouser-chiefs';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import Root from '../views/Root.vue';
import Cat from '../views/Cat.vue';
import NotFound from '../views/NotFound.vue';
import ServerError from '../views/ServerError.vue';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    meta: { loaders: [useMouserChiefs] },
    children: [
      { path: '', name: 'home', component: Root },
      { path: 'cat/:entry', name: 'cat', component: Cat },
      { path: ':pathMatch(.*)*', name: 'not-found', component: NotFound },
    ],
  },
  // loaded when zod parsing fails
  {
    path: '/500',
    name: 'server-error',
    component: ServerError,
  },
] satisfies RouteRecordRaw[];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
