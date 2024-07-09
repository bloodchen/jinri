<!-- 首页 -->
<template>
  <div class="mx-home">
    <!-- 第一部分 -->
    <div class="mx-home-module">
      <!-- 网址导航 -->
      <HomeWebsite class="mx-home-left" />
      <div class="mx-home-right">
        <!-- 工具 -->
        <HomeTools />
        <!-- 广告 -->
        <div
          ref="adWrap"
          class="mx-home-ad mx-mt-10"
        />
      </div>
    </div>
    <!-- 第二部分 -->
    <div class="mx-home-module mx-mt-10">
      <!-- 新闻 -->
      <HomeNewsMain class="mx-home-left" />
      <div class="mx-home-right">
        <!-- 搜索热词 -->
        <HomeNewsHot />
        <!-- 新闻推荐 -->
        <HomeNewsRecommend class="mx-mt-10" />
      </div>
    </div>
    <!-- 第三部分 -->
    <MxTabs class="mx-mt-10">
      <MxTabPane
        id="homeGame"
        name="game"
        label="游戏专区"
      />
    </MxTabs>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import HomeWebsite from './HomeWebsite.vue';
import HomeTools from './HomeTools.vue';
import HomeNewsMain from './HomeNewsMain.vue';
import HomeNewsHot from './HomeNewsHot.vue';
import HomeNewsRecommend from './HomeNewsRecommend.vue';

const adWrap = ref(null);
onMounted(() => {
  // 京东广告
  const $el = document.getElementById('jdAd');
  adWrap.value.appendChild($el);
  $el.style.display = 'block';

  // 游戏专区
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://res.dashet.com/da/da.js?cid=450B6ED0&skey=120fa11b';
  document.getElementById('homeGame').append(script);
});
</script>

<style lang="scss">
.mx-home {
  &-module {
    display: flex;
    overflow: hidden;
  }
  &-left {
    flex: auto;
    overflow: hidden;
  }
  &-right {
    flex: none;
    width: 300px;
    margin-left: 10px;
  }
}
</style>
