<!-- 首页-新闻轮播图 -->
<template>
  <MxSwiper class="mx-news-focus">
    <MxSwiperSlide
      v-for="item in dataList"
      :key="item.title"
    >
      <MxLink
        class="mx-news-focus-link"
        :href="item.url"
        :title="item.title"
      >
        <img
          class="mx-news-focus-img"
          :src="item.img"
          :alt="item.title"
        >
        <div class="mx-news-focus-text">{{ item.title }}</div>
      </MxLink>
    </MxSwiperSlide>
  </MxSwiper>
</template>

<script setup>
defineProps({
  dataList: { type: Array, default: null }
});
</script>

<style lang="scss">
.mx-news-focus {
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
