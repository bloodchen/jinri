<!-- 红包雨 -->
<template>
  <div
    v-if="isVisible"
    class="mx-ad-rain"
    @click="onClick"
  >
    <div class="mx-ad-rain-inner">
      <MxIcon
        class="mx-ad-rain-close"
        title="关闭红包雨"
        @click.stop="onClose"
      />
      <MxIcon class="mx-ad-rain-sign" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { isBetween, isAfter, getTomorrowDate } from '@/utiles';
import { useStorage } from '@vueuse/core';
import { adRain } from '@/data/ad.js';

// 是否显示
const isVisible = ref(false);
const nextOpenDate = useStorage('next-open-date', {});
isVisible.value = isBetween(adRain.startTime, adRain.endTime) && isAfter(nextOpenDate.value.rain);

// 点击
function onClick() {
  window.open(adRain.url, '_target');
  onClose();
}

// 关闭
function onClose() {
  isVisible.value = false;
  nextOpenDate.value.rain = getTomorrowDate();
}
</script>

<style lang="scss">
.mx-ad-rain {
  position: fixed;
  inset: 0;
  z-index: 1;
  cursor: pointer;
  &-inner {
    position: relative;
    width: 1200px;
    height: 100%;
    margin: 0 auto;
  }
  img {
    position: absolute;
  }
  &-close {
    position: absolute;
    top: 50px;
    right: -74px;
    font-size: 64px;
    background-image: url('./images/ad/rain-close.png');
  }
  &-sign {
    position: absolute;
    right: -58px;
    bottom: 20px;
    width: 48px;
    height: 32px;
    background-image: url('./images/ad/rain-sign.png');
  }
}
</style>
