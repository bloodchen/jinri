<!-- 顶栏-右上角撕角广告 -->
<template>
  <MxLink
    v-if="isVisible"
    class="mx-triangle"
    :title="headerTriangle.title"
    :href="headerTriangle.url"
    :style="{ 'background-image': `url(${headerTriangle.img})`, 'background-position-x': `${trianglePositionX}px` }"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
  >
    <MxIcon
      class="mx-triangle-close"
      :style="{ top: `${triangleClosePosition + 2}px`, right: `${triangleClosePosition}px` }"
      @click.prevent="onClose"
    />
  </MxLink>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStorage } from '@vueuse/core';
import { headerTriangle } from '@/data/ads.js';
import { isBetween, isAfter, getTomorrowDate } from '@/utiles';

// 是否显示
const isVisible = ref(false);
const closeExpiresDate = useStorage('header-triangle-close-expires-date', '');
isVisible.value = isBetween(headerTriangle.startTime, headerTriangle.endTime) && isAfter(closeExpiresDate.value);

// 窗口缩放时
function onResize() {
  const bodyWidth = document.body.offsetWidth;
  const headerWidth = document.getElementsByClassName('mx-header')[0].offsetWidth;
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
  closeExpiresDate.value = getTomorrowDate();
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
.mx-triangle {
  position: fixed;
  top: 0;
  right: 0;
  display: block;
  width: 100px;
  height: 100px;
  background-repeat: no-repeat;
  background-position-y: 0;
  background-size: auto 100px;
  &-close {
    --icon-size: 16px;

    position: absolute;
    background-image: url('@/assets/icons/close-2.png');
  }
}
</style>
