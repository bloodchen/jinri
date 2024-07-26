<!-- 首页-网址导航-常用网址 -->
<template>
  <HomeWebsiteGroup :data="dataGroup" />
</template>

<script setup>
import HomeWebsiteGroup from './HomeWebsiteGroup.vue';
import dataGroup from '@/data/home-websites-popular.js';
</script>
