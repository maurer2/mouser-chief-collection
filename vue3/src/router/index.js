import { createRouter, createWebHashHistory } from 'vue-router';

import Root from '../views/Root.vue';
import Header from '../views/Header.vue';
import Content from '../views/Content.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  {
    path: '/',
    component: Root,
    props: true,
  },
  {
    path: '/cat/:entryName',
    components: {
      header: Header,
      content: Content,
    },
    props: {
      header: true,
      content: true,
    },
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
