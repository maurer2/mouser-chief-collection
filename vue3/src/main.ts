import { createApp } from 'vue';
import { DataLoaderPlugin } from 'vue-router/experimental';

import App from './app.vue';
import { router } from './router/index';

import './global.css';

const app = createApp(App);
app.use(DataLoaderPlugin, { router });
app.use(router);

await router.isReady();

app.mount('#root');
