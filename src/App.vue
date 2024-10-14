<template>
  <div class="mx-layout">
    <div class="mx-layout-module">
      <LayoutTopbar />
      <LayoutSearchbar class="mx-mt-30" />
      <LayoutSearchbarHotword class="mx-mt-5" />
    </div>
    <div class="mx-devide" />
    <div class="mx-layout-module">
      <LayoutNav />
      <RouterView class="mx-mt-10" />
      <LayoutFooter class="mx-mt-10" />
    </div>
    <!-- 广告 -->
    <AdTopbarTriangle />
    <AdSkin />
    <AdRain />
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
import AdSkin from '@/views/ad/AdSkin.vue';
import AdRain from '@/views/ad/AdRain.vue';
</script>

<style lang="scss">
.mx {
  &-layout {
    position: relative;
    z-index: 1;
    padding-bottom: 30px;
  }
  &-layout-module {
    min-width: 1000px;
    max-width: 1200px;
    padding: 0 20px;
    margin: 0 auto;
  }
  &-devide {
    height: 1px;
    margin: 10px auto;
    background-color: #7bf;
  }
}
</style>
