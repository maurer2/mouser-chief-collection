import { createRouter, createWebHistory } from 'vue-router';

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
  history: createWebHistory(),
  routes,
});

console.log(router);

export default router;
