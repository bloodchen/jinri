<!-- 顶栏-中间 -->
<template>
  <div
    v-if="isVisible"
    class="mx-ad-topbar-center"
  >
    <MxLink
      class="mx-ad-topbar-center-link"
      :herf="adTopbarCenter.url"
      :title="adTopbarCenter.title"
    >
      <img
        class="mx-ad-topbar-center-img"
        :src="adTopbarCenter.img"
        :alt="adTopbarCenter.title"
      >
    </MxLink>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { isBetween } from '@/utiles';
import { adTopbarCenter } from '@/data/ad.js';

const isVisible = ref(false);
isVisible.value = isBetween(adTopbarCenter.startTime, adTopbarCenter.endTime);
</script>

<style lang="scss">
.mx-ad-topbar-center {
  position: relative;
  width: 85px;
  height: 60px;
  &-link {
    position: absolute;
    top: 0;
  }
  &-link,
  &-img {
    display: block;
    width: 85px;
  }
}
</style>
