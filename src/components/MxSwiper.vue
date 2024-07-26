<!-- 包装 swiper -->
<template>
  <Swiper
    :modules="[Autoplay, Navigation]"
    :autoplay="{ delay: 2500 }"
    navigation
    :loop="false"
  >
    <slot />
  </Swiper>
</template>

<script setup>
import { Swiper } from 'swiper/vue';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
</script>

<style lang="scss">
.swiper {
  margin-right: 0;
  margin-left: 0;
  &-wrapper,
  &-slide {
    height: 100%;
  }
  a,
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .swiper-button-prev,
  .swiper-button-next {
    --swiper-navigation-sides-offset: 0;
    --swiper-navigation-color: #fff;

    top: 50%;
    margin-top: 0;
    background-color: rgb(0 0 0 / 50%);
    transform: translateY(-50%);
    &:hover {
      background-color: #08f;
    }
  }
}
</style>
