import { createRouter, createWebHashHistory } from 'vue-router';

import Root from '../views/Root.vue';
import NotFound from '../views/NotFound.vue';

import Header from '../views/Header.vue';
import Content from '../views/Content.vue';

const routes = [
  {
    path: '/',
    component: Root,
    components: {
      header: Header,
      content: Root,
    },
    props: true,
  },
  {
    path: '/cat/:entryName',
    components: {
      header: Header,
      content: Content,
    },
    props: true,
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound,
    props: true,
  },
];

// eslint-disable-next-line import/prefer-default-export
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
