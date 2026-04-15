<!-- 首页-右侧橱窗 -->
<template>
  <!-- <MxIframe
    src="./iframes/jd.html"
    height="278"
    :border="false"
  /> -->
  <div
    class="mx-ad-home-right"
    @mousedown="onAdElMouseDown"
    @mouseup="onAdElMouseUp"
  >
    <img
      class="mx-ad-home-right-img"
      :src="adHomeRight.img"
      :alt="adHomeRight.name"
    />
  </div>
</template>

<script setup>
import { adHomeRight } from '@/data/ad.js';
import { use360Curl } from '@/utils/use-360-curl.js';
const { onAdElMouseDown, onAdElMouseUp } = use360Curl('curl-jd');
</script>

<style lang="scss">
.mx-ad-home-right,
.mx-ad-home-right-img {
  display: block;
  cursor: pointer;
}
</style>
