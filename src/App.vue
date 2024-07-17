<template>
  <!-- 顶栏部分 -->
  <LayoutHeader class="mx-auto-width" />
  <!-- 分割线 -->
  <div class="mx-devide" />
  <!-- 导航 -->
  <LayoutNav class="mx-auto-width" />
  <!-- 中间内容 -->
  <RouterView class="mx-auto-width" />
  <!-- 底栏部分 -->
  <LayoutFooter class="mx-auto-width" />
</template>

<script setup>
import { RouterView } from 'vue-router';
import LayoutHeader from '@/views/header/index.vue';
import LayoutNav from '@/views/nav/index.vue';
import LayoutFooter from '@/views/footer/index.vue';
</script>

<style>
.mx-auto-width {
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
