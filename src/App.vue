<template>
  <div class="mx-layout">
    <LayoutTopbar />
    <LayoutSearchbar class="mx-mt-30" />
    <LayoutSearchbarHotword class="mx-mt-5" />
    <AdTopbarTriangle />
  </div>
  <div class="mx-devide" />
  <div class="mx-layout">
    <LayoutNav />
    <RouterView class="mx-mt-10" />
    <LayoutFooter />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';

import LayoutTopbar from '@/views/layout/LayoutTopbar.vue';
import LayoutSearchbar from '@/views/layout/LayoutSearchbar.vue';
import LayoutSearchbarHotword from '@/views/layout/LayoutSearchbarHotword.vue';
import LayoutNav from '@/views/layout/layoutNav.vue';
import LayoutFooter from '@/views/layout/layoutFooter.vue';
import AdTopbarTriangle from '@/views/ad/AdTopbarTriangle.vue';
</script>

<style>
.mx-layout {
  position: relative;
  min-width: 1000px;
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto;
}
.mx-devide {
  height: 1px;
  margin: 10px auto;
  background-color: #7bf;
}
</style>
