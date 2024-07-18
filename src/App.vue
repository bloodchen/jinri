<template>
  <!-- 顶栏部分 -->
  <LayoutHeader />
  <!-- 分割线 -->
  <div class="mx-devide" />
  <!-- 中间内容 -->
  <div class="mx-container">
    <!-- 导航 -->
    <LayoutNav />
    <!-- 页面 -->
    <RouterView class="mx-mt-10" />
  </div>
  <!-- 底栏部分 -->
  <LayoutFooter />
</template>

<script setup>
import { RouterView } from 'vue-router';
import LayoutHeader from '@/views/layout/header/index.vue';
import LayoutNav from '@/views/layout/nav/index.vue';
import LayoutFooter from '@/views/layout/footer/index.vue';
</script>

<style>
.mx-header,
.mx-container,
.mx-footer {
  min-width: 1000px;
  max-width: 1200px;
  padding: 0 20px;
  margin: 10px auto;
}
.mx-devide {
  height: 1px;
  margin: 10px auto;
  background-color: #7bf;
}
</style>
