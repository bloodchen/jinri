<template>
  <!-- 顶栏部分 -->
  <LayoutHeader class="mx-layout" />
  <!-- 分割线 -->
  <div class="mx-devide" />
  <!-- 中间内容 -->
  <RouterView class="mx-layout" />
  <!-- 底栏部分 -->
  <LayoutFooter class="mx-layout mx-mt-20 mx-mb-20" />
</template>

<script setup>
import { RouterView } from 'vue-router';
import LayoutHeader from '@/views/header/index.vue';
import LayoutFooter from '@/views/footer/index.vue';
</script>

<style>
.mx-layout {
  min-width: 1000px;
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto;
}
.mx-devide {
  height: 1px;
  margin: 10px 0;
  background-color: #7bf;
}
</style>
