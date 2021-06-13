import { createApp, reactive } from 'vue';
import App from './app.vue';
import { router } from './router/index';
import type { LoadingType } from './types';

import './global.css';

const loading = reactive<LoadingType>({
  isLoading: true,
  isLoaded: false,
  startDate: new Date(),
});

window.setTimeout(() => {
  loading.isLoading = false;
  loading.isLoaded = true;
}, 2500);

const vueApp = createApp(App, { loading });

vueApp.use(router).mount('#root');
