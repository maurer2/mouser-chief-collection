import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router/index';

import './global.css';

const vueApp = createApp(App);

vueApp
  .use(router)
  .mount('#root');
