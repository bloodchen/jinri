<!-- 顶栏-右侧轮播 -->
<template>
  <MxSwiper class="mx-ad-topbar-sliders">
    <MxSwiperSlide
      v-for="item in adTopbarSliders"
      :key="item.name"
    >
      <MxLink :href="item.url">
        <img
          :src="item.img"
          :alt="item.name"
        >
      </MxLink>
    </MxSwiperSlide>
  </MxSwiper>
</template>

<script setup>
import { adTopbarSliders } from '@/data/ad.js';
</script>

<style lang="scss">
.mx-ad-topbar-sliders {
  width: 140px;
  height: 48px;
  .swiper-button-prev,
  .swiper-button-next {
    --swiper-navigation-size: 12px;

    display: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
  &:hover {
    .swiper-button-prev,
    .swiper-button-next {
      display: flex;
    }
  }
}
</style>
