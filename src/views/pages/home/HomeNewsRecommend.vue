<!-- 首页-推荐新闻 -->
<template>
  <MxTabs
    v-model="currentTabName"
    class="mx-hrnews"
    @change="getDataList"
  >
    <MxTabPane
      v-for="item in tabItems"
      :key="item.name"
      :data="item"
    >
      <template v-if="item.data">
        <!-- 轮播图 -->
        <HomeNewsFocus
          class="mx-hrnews-focus"
          :data="item.data"
        />
        <!-- 列表 -->
        <div class="mx-hrnews-list">
          <MxLink
            v-for="text in item.data.list"
            :key="text.title"
            :href="text.url"
            :title="text.title"
            class="mx-hrnews-list-item"
          >
            <span class="mx-hrnews-list-dot">•</span>
            <span>{{ text.title }}</span>
          </MxLink>
        </div>
      </template>
    </MxTabPane>
  </MxTabs>
</template>

<script setup>
import { ref } from 'vue';
import { newsRecommend } from '@/data/home-news-nav.js';
import api from '@/api';
import HomeNewsFocus from './HomeNewsFocus.vue';

// 当前tab
const currentTabName = ref('chief');

// 标签
const tabItems = ref(newsRecommend);

// 获取新闻
async function getDataList(name) {
  const index = tabItems.value.findIndex(item => item.name === name);
  if (tabItems.value[index].data) return;
  const { data } = await api.getHomeRecommendNews(name);
  tabItems.value[index].data = data;
}
</script>

<style lang="scss">
.mx-hrnews {
  .mx-tab-pane {
    padding: 10px 8px;
  }

  // 图片轮播
  &-focus {
    width: 100%;
    height: 120px;
  }

  // 列表
  &-list {
    margin-top: 10px;
    &-item {
      display: block;
      overflow: hidden;
      font-size: 12px;
      line-height: 24px;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:nth-child(5n):not(:last-child) {
        padding-bottom: 6px;
        margin-bottom: 6px;
        border-bottom: 1px solid #f7f7f7;
      }
    }
    &-dot {
      margin-right: 4px;
      color: #999;
    }
  }
}
</style>
