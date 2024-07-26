<!-- 首页-新闻-主要新闻 -->
<template>
  <MxTabs
    v-model="currentTabName"
    class="mx-hmnews"
    @change="getDataList"
  >
    <MxTabPane
      v-for="item in tabItems"
      :key="item.name"
      :name="item.name"
      :label="item.label"
      class="mx-hmnews-content"
    >
      <template v-if="item.data">
        <div class="mx-hmnews-left">
          <!-- 左侧轮播图 -->
          <HomeNewsFocus
            class="mx-hmnews-focus"
            :data="item.data"
          />
          <!-- 左侧图片 -->
          <div class="mx-hmnews-img">
            <MxLink
              v-for="midImg in item.data.midImg"
              :key="midImg.title"
              class="mx-hmnews-img-link"
              :title="midImg.title"
              :href="midImg.url"
            >
              <img
                class="mx-hmnews-img-img"
                :src="midImg.img"
                :alt="midImg.title"
              >
              <div class="mx-hmnews-img-text">{{ midImg.title }}</div>
            </MxLink>
          </div>
        </div>
        <!-- 右侧文字列表 -->
        <div class="mx-hmnews-right">
          <MxLink
            v-for="(text, index) in item.data.text"
            :key="text[0].title"
            class="mx-hmnews-text-item"
            :title="text[0].title"
            :href="text[0].url"
          >
            <span
              v-if="index % 5 !== 0"
              class="mx-hmnews-text-dot"
            >•</span>
            <span>{{ text[0].title }}</span>
          </MxLink>
        </div>
      </template>
    </MxTabPane>
  </MxTabs>
</template>

<script setup>
import { ref } from 'vue';
import api from '@/api';
import HomeNewsFocus from './HomeNewsFocus.vue';

// 当前tab
const currentTabName = ref('chief');

// 标签
const tabItems = ref([
  { name: 'chief', label: '要闻', data: null },
  { name: 'ent', label: '娱乐', data: null },
  { name: 'finance', label: '财经', data: null },
  { name: 'social', label: '社会', data: null },
  { name: 'military', label: '军事', data: null }
]);

// 获取新闻
getDataList('chief');
async function getDataList(name) {
  const index = tabItems.value.findIndex(item => item.name === name);
  if (tabItems.value[index].data) return;
  const { data } = await api.getHomeMainNews(name);
  tabItems.value[index].data = data;
}
</script>

<style lang="scss">
.mx-hmnews {
  &-content {
    display: flex;
  }
  &-left {
    flex: none;
    width: 330px;
    overflow: hidden;
  }
  &-right {
    flex: auto;
    margin-left: 20px;
    overflow: hidden;
  }

  // 图片轮播
  &-focus {
    width: 100%;
    height: 220px;
  }

  // 图片
  &-img {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-top: 20px;
    &-link,
    &-img {
      width: 160px;
    }
    &-img {
      display: block;
      height: 90px;
      border: 1px solid #e4e4e4;
    }
    &-link:hover &-img {
      border-color: #07f;
    }
    &-text {
      overflow: hidden;
      font-size: 12px;
      line-height: 20px;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &-link:hover &-text {
      color: #08f;
    }
  }

  // 列表
  &-text {
    &-item {
      display: block;
      margin-top: 10px;
      overflow: hidden;
      line-height: 1.2;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:nth-child(5n + 1) {
        margin-top: 20px;
        margin-left: 8px;
        font-size: 16px;
        font-weight: bold;
        color: #08f;
      }
      &:first-child {
        margin-top: 0;
        margin-left: 8px;
        font-size: 16px;
        font-weight: bold;
        color: #d71818;
      }
    }
    &-dot {
      margin-right: 4px;
      color: #999 !important;
    }
  }
}
</style>
