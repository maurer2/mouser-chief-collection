import { createRouter, createWebHashHistory } from 'vue-router';

import Root from '../views/Root.vue';
import Cat from '../views/Cat.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  {
    path: '/',
    component: Root,
    props: true,
  },
  {
    path: '/cat/:entryName',
    component: Cat,
    props: true,
  },
  {
    path: '/*',
    component: NotFound,
    props: true,
  },
];

// eslint-disable-next-line import/prefer-default-export
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
