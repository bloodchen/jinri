// styles
import './assets/styles/main.scss';

// vue
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { setupComponents } from '@/components';

import App from './App.vue';
import router from './router';

const app = createApp(App);

setupComponents(app);

app.use(createPinia());
app.use(router);

app.mount('#app');
