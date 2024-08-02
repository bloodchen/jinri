<!-- 皮肤 -->
<template>
  <div
    v-if="isVisible"
    class="mx-ad-skin"
    :style="{ 'background-image': `url(${adSkin.img})` }"
    @click="onClick"
  >
    <MxIcon
      class="mx-ad-skin-close"
      title="关闭皮肤"
      @click.stop="onClose"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { isBetween } from '@/utiles';
import { adSkin } from '@/data/ad';

// 是否显示
const isVisible = ref(false);
isVisible.value = isBetween(adSkin.startTime, adSkin.endTime);

// 点击
function onClick() {
  window.open(adSkin.url, '_target');
  onClose();
}

// 关闭
function onClose() {
  isVisible.value = false;
}
</script>

<style lang="scss">
.mx-ad-skin {
  position: absolute;
  inset: 0;
  z-index: -1;
  background-repeat: no-repeat;
  background-position: center 194px;
  &-close {
    position: absolute;
    top: 194px;
    right: 0;
    font-size: 70px;
    background: url('./images/ad/skin-close.png');
    background-size: 70px;
  }
}
</style>
