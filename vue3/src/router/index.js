import { createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'root',
  },
  {
    path: '/cat',
    name: 'cat',
  },
];

const router = createRouter({
  routes,
});

export default router;
