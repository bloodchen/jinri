<!-- 顶栏-右侧撕角 -->
<template>
  <MxLink
    v-if="isVisible"
    class="mx-ad-topbar-triangle"
    :href="adTopbarRightTriangle.url"
    :title="adTopbarRightTriangle.title"
    :style="{ 'background-image': `url(${adTopbarRightTriangle.img})`, 'background-position-x': `${trianglePositionX}px` }"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
  >
    <MxIcon
      class="mx-ad-topbar-triangle-close"
      :style="{ top: `${triangleClosePosition + 2}px`, right: `${triangleClosePosition}px` }"
      @click.prevent="closeAd"
    />
  </MxLink>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { adTopbarRightTriangle, isShow } from '@/data/ad.js';

// 是否显示
const isVisible = ref(isShow(adTopbarRightTriangle));

// 窗口缩放时
onMounted(() => {
  if (isVisible.value) {
    onResize();
    window.addEventListener('resize', onResize);
  }
});
function onResize() {
  const bodyWidth = document.body.offsetWidth;
  const topbarWidth = document.getElementsByClassName('mx-layout-module')[0].offsetWidth;
  isVisible.value = bodyWidth - topbarWidth > 200;
}

// 关闭广告
function closeAd() {
  isVisible.value = false;
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
    background-image: url('/images/ad/topbar-triangle-close.png');
  }
}
</style>
