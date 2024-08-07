<!-- 首页-新闻轮播图 -->
<template>
  <MxSwiper class="mx-hfnews">
    <MxSwiperSlide
      v-for="focus in data.focus"
      :key="focus.title"
    >
      <MxLink
        class="mx-hfnews-link"
        :href="focus.url"
        :title="focus.title"
      >
        <img
          class="mx-hfnews-img"
          :src="focus.img"
          :alt="focus.title"
        >
        <div class="mx-hfnews-text">{{ focus.title }}</div>
      </MxLink>
    </MxSwiperSlide>
  </MxSwiper>
</template>

<script setup>
defineProps({
  data: { type: Object, default: null }
});
</script>

<style lang="scss">
.mx-hfnews {
  &-link {
    position: relative;
  }
  &-img {
    border: 1px solid #e4e4e4;
  }
  &-link:hover &-img {
    border-color: #07f;
  }
  &-text {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0 5px;
    overflow: hidden;
    font-size: 16px;
    line-height: 40px;
    color: #fff;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    background-color: rgb(0 0 0 / 60%);
  }
  &-link:hover &-text {
    color: #08f;
  }
  .swiper-button-prev,
  .swiper-button-next {
    --swiper-navigation-size: 16px;

    width: 30px;
    height: 60px;
  }
}
</style>
