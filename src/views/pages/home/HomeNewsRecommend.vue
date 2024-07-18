<!-- 首页推荐新闻 -->
<template>
  <MxTabs
    class="mx-rnews"
    @change="getDataList"
  >
    <MxTabPane
      v-for="item in tabItems"
      :key="item.name"
      :name="item.name"
      :label="item.label"
      class="mx-rnews-content"
    >
      <template v-if="item.data">
        <!-- 轮播图 -->
        <HomeNewsFocus
          class="mx-rnews-focus"
          :data="item.data"
        />
        <!-- 列表 -->
        <div class="mx-rnews-list">
          <a
            v-for="text in item.data.list"
            :key="text.title"
            class="mx-rnews-list-item"
            :title="text.title"
            :href="text.url"
            target="_blank"
          >
            <span class="mx-rnews-list-dot">•</span>
            <span>{{ text.title }}</span></a>
        </div>
      </template>
    </MxTabPane>
  </MxTabs>
</template>

<script setup>
import { ref } from 'vue';
import api from '@/api';
import HomeNewsFocus from './HomeNewsFocus.vue';

// 标签
const tabItems = ref([
  { name: 'chief', label: '头条', data: null },
  { name: 'military', label: '军事', data: null },
  { name: 'social', label: '社会', data: null },
  { name: 'ent', label: '娱乐', data: null }
]);

// 获取新闻
getDataList('chief');
async function getDataList(name) {
  const index = tabItems.value.findIndex(item => item.name === name);
  if (tabItems.value[index].data) return;
  const { data } = await api.getHomeNewsRecommend(name);
  tabItems.value[index].data = data;
}
</script>

<style lang="scss">
.mx-rnews {
  &-content {
    padding-right: 8px;
    padding-left: 8px;
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
