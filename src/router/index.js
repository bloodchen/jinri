// 路由
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/index.vue')
    },
    {
      path: '/shopping',
      name: 'shopping',
      component: () => import('@/views/shopping/index.vue')
    }
  ]
});

export default router;
