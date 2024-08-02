// 路由
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/pages/home/index.vue')
    },
    {
      path: '/websites',
      name: 'websites',
      component: () => import('@/views/pages/websites/index.vue')
    },
    {
      path: '/weather',
      name: 'weather',
      component: () => import('@/views/pages/weather/index.vue')
    },
    {
      path: '/finance',
      name: 'finance',
      component: () => import('@/views/pages/finance/index.vue')
    },
    {
      path: '/shopping',
      name: 'shopping',
      component: () => import('@/views/pages/shopping/index.vue')
    },
    {
      path: '/tools',
      name: 'tools',
      component: () => import('@/views/pages/tools/index.vue')
    }
  ]
});

export default router;
