<!-- 顶栏工具栏 -->
<template>
  <div class="mx-top-bar">
    <!-- logo -->
    <a href="/">
      <img
        class="mx-top-logo"
        src="@/assets/images/logo.png"
        alt="logo"
      >
    </a>
    <!-- 广告 -->
    <MxSwiper class="mx-top-ad">
      <MxSwiperSlide
        v-for="item in dataList"
        :key="item.name"
      >
        <a
          :href="item.url"
          target="_blank"
        >
          <img
            :src="item.img"
            :alt="item.name"
          >
        </a>
      </MxSwiperSlide>
    </MxSwiper>
  </div>
</template>

<script setup>
import dataList from '@/data/header-ads.js';
</script>

<style lang="scss">
.mx-top {
  &-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &-logo {
    display: block;
    width: 140px;
    height: 60px;
  }
  &-ad {
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
}
</style>
