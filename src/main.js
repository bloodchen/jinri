// styles
import './assets/styles/main.scss';

// vue
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

// custom
import { setupComponents } from '@/components';

const app = createApp(App);

setupComponents(app);

app.use(createPinia());
app.use(router);

app.mount('#app');
