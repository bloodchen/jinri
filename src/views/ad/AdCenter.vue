<!-- 开屏中间 -->
<template>
  <div
    v-if="isVisible"
    class="mx-ad-center"
    :class="{ 'is-active': isActive }"
  >
    <div
      class="mx-ad-center-inner"
      @click="openLink"
    >
      <img
        class="mx-ad-center-img"
        :src="adCenter.img"
      />
      <MxIcon
        class="mx-ad-center-close"
        @click.stop="closeAd"
      />
      <span class="mx-ad-center-countdown">{{ countdownS }}秒后关闭广告</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { adCenter, isShow, setReopenDate } from '@/data/ad.js';

// 是否显示
const isVisible = ref(isShow(adCenter));
const isActive = ref(false);
const countdownS = ref(10);
let countDownTimer = null;

// 显示的时候执行的操作
if (isVisible.value) {
  // 动画效果
  setTimeout(() => {
    isActive.value = true;
  }, 100);
  // 10s后自动关闭
  countDownTimer = setInterval(() => {
    countdownS.value = countdownS.value - 1;
    if (countdownS.value < 0) {
      closeAd();
    }
  }, 1000);
}

// 打开链接
function openLink() {
  window.open(adCenter.url, '_blank');
}

// 关闭广告
function closeAd() {
  isActive.value = false;
  clearInterval(countDownTimer);
  setTimeout(() => {
    isVisible.value = false;
    setReopenDate(adCenter);
  }, 100);
}
</script>

<style lang="scss">
.mx-ad-center {
  position: fixed;
  inset: 0;
  z-index: 999;
  cursor: pointer;
  opacity: 0;
  transform: scale(0);
  transition: all 0.5s;
  &.is-active {
    opacity: 1;
    transform: scale(1);
  }
  &-inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &-img {
    animation: shake 1s infinite linear;
  }
  &-close {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 30px;
    background-image: url('/images/ad/center-close.png');
  }
  &-countdown {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 4px 8px;
    font-size: 12px;
    color: #fff;
    background-image: url('/images/ad/center-countdown.png');
    background-size: 100% 100%;
  }

  @keyframes shake {
    0% {
      transform: rotate(0);
    }
    5% {
      transform: rotate(-10deg);
    }
    15% {
      transform: rotate(10deg);
    }
    25% {
      transform: rotate(-10deg);
    }
    35% {
      transform: rotate(10deg);
    }
    40% {
      transform: rotate(0);
    }
  }
}
</style>
