import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';

const app = createApp(App);

// Create a QueryClient instance
const queryClient = new QueryClient();

// Install the VueQuery plugin and pass the QueryClient
app.use(VueQueryPlugin, { queryClient });

app.mount('#app');
