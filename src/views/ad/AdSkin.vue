<!-- 皮肤 -->
<template>
  <div
    v-if="isVisible"
    class="mx-ad-skin"
    :style="{ 'background-image': `url(${adSkin.img})` }"
    @click="openLink"
  >
    <MxIcon
      class="mx-ad-skin-close"
      title="关闭皮肤"
      @click.stop="closeAd"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { adSkin } from '@/data/ad';
import { getAdVisible } from '@/utils';

// 是否显示
const isVisible = ref(getAdVisible(adSkin));

// 打开链接
function openLink() {
  window.open(adSkin.url, '_target');
}

// 关闭广告
function closeAd() {
  isVisible.value = false;
}
</script>

<style lang="scss">
.mx-ad-skin {
  position: absolute;
  inset: 0;
  z-index: -1;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center 194px;
  &-close {
    position: absolute;
    top: 194px;
    right: 0;
    font-size: 70px;
    background: url('/images/ad/skin-close.png');
    background-size: 70px;
  }
}
</style>
