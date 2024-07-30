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
        <MxIframe
          src="./ad.html"
          height="279"
          class="mx-mt-10"
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
    <MxTabs
      v-model="currentTabName"
      class="mx-mt-10"
    >
      <MxTabPane
        id="homeGame"
        :data="{ name: 'game', label: '游戏专区' }"
      />
    </MxTabs>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import HomeWebsite from './HomeWebsite.vue';
import HomeTools from './HomeTools.vue';
import HomeNewsMain from './HomeNewsMain.vue';
import HomeNewsHot from './HomeNewsHot.vue';
import HomeNewsRecommend from './HomeNewsRecommend.vue';

// 当前tab
const currentTabName = ref('hot');

// 游戏专区
onMounted(() => {
  const gameScript = document.createElement('script');
  gameScript.async = true;
  gameScript.src = 'https://res.dashet.com/da/da.js?cid=450B6ED0&skey=120fa11b';
  document.getElementById('homeGame').append(gameScript);
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
