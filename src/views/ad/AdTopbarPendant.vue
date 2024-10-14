<!-- 顶栏-中间 -->
<template>
  <div
    v-if="isVisible"
    class="mx-ad-topbar-center"
  >
    <MxLink
      class="mx-ad-topbar-center-link"
      :href="adTopbarPendant.url"
      :title="adTopbarPendant.title"
    >
      <img
        class="mx-ad-topbar-center-img"
        :src="adTopbarPendant.img"
        :alt="adTopbarPendant.title"
      >
    </MxLink>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { adTopbarPendant, isShow } from '@/data/ad.js';

const isVisible = ref(isShow(adTopbarPendant));
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
