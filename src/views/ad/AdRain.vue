<!-- 红包雨 -->
<template>
  <div
    v-if="isVisible"
    class="mx-ad-rain"
    @click="openLink"
  >
    <!-- 下落的红包 -->
    <img
      v-for="n in 30"
      :key="n"
      :src="getImgUrl()"
      :style="getImgStyle()"
      class="mx-ad-rain-img"
    >
    <!-- 关闭按钮 -->
    <MxIcon
      class="mx-ad-rain-icon is-close"
      title="关闭红包雨"
      @click.stop="closeAd"
    />
    <!-- 广告标识 -->
    <MxIcon class="mx-ad-rain-icon is-sign" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { adRain } from '@/data/ad.js';
import { getAdVisible, setAdNextOpenTime, getRandomInteger } from '@/utils';

const emits = defineEmits(['close']);

// 是否显示
const isVisible = ref(getAdVisible(adRain, 'rain'));
let closeTimer = null;

// 显示的时候执行的操作
if (isVisible.value) {
  // 10s后自动关闭
  closeTimer = setTimeout(closeAd, 10000);
}

// 打开链接
function openLink() {
  window.open(adRain.url, '_target');
}

// 关闭广告
function closeAd() {
  isVisible.value = false;
  clearTimeout(closeTimer);
  setAdNextOpenTime('rain');
  emits('close');
}

// 随机图片
const imgArr = ['coin', 'coupon', 'packet'];
function getImgUrl() {
  const n = getRandomInteger(0, 2);
  return `./images/ad/rain-${imgArr[n]}.png`;
}

// 动画效果
function getImgStyle() {
  const left = getRandomInteger(-60, document.documentElement.offsetWidth - 60);
  const top = getRandomInteger(-100, -10);
  const duration = getRandomInteger(2, 6);
  return {
    'left': `${left}px`,
    '--start-position': `${top}vh`,
    '--duration-time': `${duration}s`
  };
}
</script>

<style lang="scss">
.mx-ad-rain {
  position: fixed;
  inset: 0;
  z-index: 999;
  cursor: pointer;
  &-icon {
    position: absolute;
    right: 20px;
  }
  .is-close {
    top: 50px;
    font-size: 64px;
    background-image: url('/images/ad/rain-close.png');
  }
  .is-sign {
    bottom: 20px;
    width: 48px;
    height: 32px;
    background-image: url('/images/ad/rain-sign.png');
  }
  &-img {
    position: absolute;
    animation: move var(--duration-time) infinite linear;
  }

  @keyframes move {
    0% {
      top: var(--start-position);
      transform: rotate(0deg);
    }
    100% {
      top: 110vh;
      transform: rotate(360deg);
    }
  }
}
</style>
