<!-- 顶栏-右侧撕角 -->
<template>
  <MxLink
    v-if="isVisible"
    class="mx-ad-topbar-triangle"
    :title="adTopbarRightTriangle.title"
    :href="adTopbarRightTriangle.url"
    :style="{ 'background-image': `url(${adTopbarRightTriangle.img})`, 'background-position-x': `${trianglePositionX}px` }"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
  >
    <MxIcon
      class="mx-ad-topbar-triangle-close"
      :style="{ top: `${triangleClosePosition + 2}px`, right: `${triangleClosePosition}px` }"
      @click.prevent="onClose"
    />
  </MxLink>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStorage } from '@vueuse/core';
import { isBetween, isAfter, getTomorrowDate } from '@/utiles';
import { adTopbarRightTriangle } from '@/data/ad.js';

// 是否显示
const isVisible = ref(false);
const nextOpenDate = useStorage('next-open-date', {});
isVisible.value = isBetween(adTopbarRightTriangle.startTime, adTopbarRightTriangle.endTime) && isAfter(nextOpenDate.value.triangle);

// 窗口缩放时
function onResize() {
  const bodyWidth = document.body.offsetWidth;
  const headerWidth = document.getElementsByClassName('mx-layout-module')[0].offsetWidth;
  isVisible.value = bodyWidth - headerWidth > 200;
}
onMounted(() => {
  if (!isVisible.value) return;
  onResize();
  window.addEventListener('resize', onResize);
});

// 关闭
function onClose() {
  isVisible.value = false;
  nextOpenDate.value.triangle = getTomorrowDate();
}

// 鼠标移入
let triangleTimer;
const trianglePositionX = ref(0);
const triangleClosePosition = ref(50);
function onMouseenter() {
  clearInterval(triangleTimer);
  triangleTimer = setInterval(() => {
    if (trianglePositionX.value === -900) {
      clearInterval(triangleTimer);
    } else {
      trianglePositionX.value -= 100;
      triangleClosePosition.value += 3;
    }
  }, 40);
}

// 鼠标移出
function onMouseleave() {
  clearInterval(triangleTimer);
  triangleTimer = setInterval(() => {
    if (trianglePositionX.value === 0) {
      clearInterval(triangleTimer);
    } else {
      trianglePositionX.value += 100;
      triangleClosePosition.value -= 3;
    }
  }, 40);
}
</script>

<style lang="scss">
.mx-ad-topbar-triangle {
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  width: 100px;
  height: 100px;
  background-repeat: no-repeat;
  background-position-y: 0;
  background-size: auto 100px;
  &-close {
    position: absolute;
    font-size: 16px;
    background-image: url('./images/ad/topbar-triangle-close.png');
  }
}
</style>
