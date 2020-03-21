import { createRouter, createWebHistory } from 'vue-router';

import Root from '../views/Root.vue';
import Cat from '../views/Cat.vue';

const routes = [
  {
    path: '/',
    component: Root,
    name: 'root',
  },
  {
    path: '/cat',
    component: Cat,
    name: 'cat',
  },
];

// eslint-disable-next-line import/prefer-default-export
export const router = createRouter({
  history: createWebHistory(),
  routes,
});
