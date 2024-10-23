<!-- 首页-右侧橱窗 -->
<template>
  <MxIframe
    src="./iframes/jd.html"
    height="278"
    :border="false"
  />
  <!-- <MxLink
    :href="adHomeRight.url"
    class="mx-ad-home-right"
  >
    <img
      class="mx-ad-home-right-img"
      :src="adHomeRight.img"
      :alt="adHomeRight.name"
    >
  </MxLink> -->
</template>

<script setup>
// import { adHomeRight } from '@/data/ad.js';
</script>

<style lang="scss">
.mx-ad-home-right,
.mx-ad-home-right-img {
  display: block;
}
</style>
