<!-- 首页 -->
<template>
  <div class="mx-home">
    <!-- 第一部分 -->
    <div class="mx-home-module">
      <!-- 网址导航 -->
      <HomeWebsites class="mx-home-left" />
      <div class="mx-home-right">
        <!-- 工具 -->
        <HomeTools />
        <!-- 广告 -->
        <AdHomeRight class="mx-mt-10" />
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
      <MxTabPane :data="{ name: 'game', label: '游戏专区' }">
        <MxIframe
          src="./iframes/game.html"
          style="border: 0"
          height="340px"
        />
      </MxTabPane>
    </MxTabs>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import HomeWebsites from './HomeWebsites.vue';
import HomeTools from './HomeTools.vue';
import HomeNewsMain from './HomeNewsMain.vue';
import HomeNewsHot from './HomeNewsHot.vue';
import HomeNewsRecommend from './HomeNewsRecommend.vue';
import AdHomeRight from '@/views/ad/AdHomeRight.vue';

// 当前tab
const currentTabName = ref('hot');
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
