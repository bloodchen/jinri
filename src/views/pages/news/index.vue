<!-- 新闻二级页 -->
<template>
  <MxTabs
    v-model="currentTabName"
    :autoplay="false"
    trigger="none"
    class="mx-news"
    @change="onChange"
  >
    <MxTabPane
      v-for="item in newsMain"
      :key="item.name"
      :data="item"
    />
    <template v-if="newsData">
      <!-- 上半部分 -->
      <div class="mx-news-top">
        <!-- 专题 -->
        <div class="mx-news-hot">
          <div
            v-for="item in newsData.hot"
            :key="item.title"
            class="mx-news-hot-item"
          >
            <!-- 大标题 -->
            <MxLink
              v-for="(n1, i1) in item.headlines"
              :key="n1.title"
              :href="n1.url"
              :title="n1.title"
              class="mx-news-hot-head"
              :class="{ 'is-hot': i1 === 0 }"
            >
              {{ n1.title }}
            </MxLink>
            <!-- 小标题 -->
            <div class="mx-news-hot-list">
              <MxLink
                v-for="n1 in item.list"
                :key="n1[0].title"
                :href="n1[0].url"
                :title="n1[0].title"
                class="mx-news-hot-text"
              >
                {{ n1[0].title }}
              </MxLink>
            </div>
          </div>
        </div>
        <!-- 焦点图 -->
        <NewsFocus
          class="mx-news-focus"
          :data-list="newsData.focus"
        />
      </div>
      <!-- 下半部分 -->
      <div class="mx-news-main">
        <!-- 左侧 -->
        <div class="mx-news-left">
          <!-- 左侧上小图 -->
          <div class="mx-news-simg">
            <MxLink
              v-for="item in newsData.smallImg"
              :key="item.title"
              :href="item.url"
              :title="item.title"
              class="mx-news-simg-item"
            >
              <img
                class="mx-news-simg-img"
                :src="item.img"
                :alt="item.title"
              >
              <div class="mx-news-simg-text">{{ item.title }}</div>
            </MxLink>
          </div>
          <!-- 左侧中文字 -->
          <div class="mx-news-timg">
            <MxLink
              v-for="item in newsData.imgText"
              :key="item.title"
              :href="item.url"
              :title="item.title"
              class="mx-news-timg-item"
            >
              <span class="mx-news-timg-label">[组图]</span>
              <span>{{ item.title }}</span>
            </MxLink>
          </div>
          <!-- 左侧下中图 -->
          <div class="mx-news-simg">
            <MxLink
              v-for="item in newsData.midImg"
              :key="item.title"
              :href="item.url"
              :title="item.title"
              class="mx-news-simg-item"
            >
              <img
                class="mx-news-simg-img"
                :src="item.img"
                :alt="item.title"
              >
              <div class="mx-news-simg-text">{{ item.title }}</div>
            </MxLink>
          </div>
        </div>
        <!-- 中间文字 -->
        <div class="mx-news-center">
          <MxLink
            v-for="(item, index) in newsData.text"
            :key="index"
            :href="item[0].url"
            :title="item[0].title"
            class="mx-news-text"
          >
            <span
              v-if="index % 7 !== 0"
              class="mx-news-text-dot"
            >•</span>
            <span>{{ item[0].title }}</span>
          </MxLink>
        </div>
        <!-- 右侧大图 -->
        <div class="mx-news-right">
          <div class="mx-news-right-title">热点新闻</div>
          <MxLink
            v-for="item in newsData.bigImg"
            :key="item.title"
            :title="item.title"
            :href="item.url"
            class="mx-news-bimg-link"
          >
            <img
              :src="item.img"
              class="mx-news-bimg-img"
            >
            <div class="mx-news-bimg-text">{{ item.title }}</div>
          </MxLink>
        </div>
      </div>
    </template>
  </MxTabs>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { newsMain } from '@/data/home-news-nav.js';
import api from '@/api';
import NewsFocus from '@/views/pages/news/NewsFocus.vue';

// 当前tabs
const route = useRoute();
const currentTabName = ref(route.params.category);

// 获取数据
const newsData = ref(null);
async function onChange(name) {
  const { data } = await api.getNewsData(name);
  newsData.value = data;
}
</script>

<style lang="scss">
.mx-news {
  background-color: #fff;
  border: 1px solid #e2e2e2;

  // 上半部分
  &-top {
    display: flex;
    align-items: center;
    padding: 15px;
    background-image: url('@/assets/images/news-top.png');
    background-repeat: repeat-x;
    background-position: bottom left;
  }

  // 热门
  &-hot {
    flex: auto;
    overflow: hidden;
    &-item {
      margin-top: 15px;
      overflow: hidden;
      line-height: 1;
      &:first-child {
        margin-top: 0;
      }
    }
    &-head {
      display: block;
      overflow: hidden;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      &.is-hot {
        color: #c00;
      }
    }
    &-list {
      margin-top: 10px;
      overflow: hidden;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &-text {
      color: #07f;
      &::after {
        margin: 0 10px;
        color: #999;
        content: '|';
      }
      &:last-child::after {
        display: none;
      }
    }
  }

  // 焦点图
  &-focus {
    flex: none;
    width: 360px;
    height: 270px;
  }

  // 下半部分
  &-main {
    display: flex;
    padding: 15px;
  }

  // 左侧
  &-left {
    flex: none;
    width: 280px;
    padding-right: 15px;
    overflow: hidden;
    border-right: 1px dashed #ccc;
  }

  // 左侧上小图
  &-simg {
    display: grid;
    grid-template-columns: repeat(2, 120px);
    gap: 10px 15px;
    justify-content: center;
    &-img {
      display: block;
      width: 120px;
      height: 90px;
      border: 1px solid #e1e1df;
    }
    &-text {
      margin-top: 5px;
      overflow: hidden;
      font-size: 12px;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &-item:hover &-text {
      color: #07f;
    }
  }

  // 左侧中组图
  &-timg {
    padding: 10px 0;
    margin: 10px 0;
    overflow: hidden;
    border-top: 1px dashed #ccc;
    border-bottom: 1px dashed #ccc;
    &-item {
      display: block;
      overflow: hidden;
      line-height: 20px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &-label {
      margin-right: 5px;
      color: #07f;
    }
  }

  // 中间文字
  &-center {
    flex: auto;
    padding: 0 15px;
    overflow: hidden;
  }
  &-text {
    display: block;
    margin-top: 5px;
    overflow: hidden;
    line-height: 24px;
    text-overflow: ellipsis;
    white-space: nowrap;
    &-dot {
      margin-right: 4px;
      color: #999;
    }
    &:nth-child(7n + 1) {
      padding-left: 10px;
      margin-top: 15px;
      font-size: 16px;
      font-weight: bold;
      color: #07f;
    }
    &:first-child {
      margin-top: 0;
    }
  }

  // 右侧大图
  &-right {
    flex: none;
    padding: 10px 20px;
    background-color: #f7f7f7;
    &-title {
      font-weight: bold;
    }
  }
  &-bimg {
    &-link,
    &-img {
      display: block;
      width: 160px;
    }
    &-link {
      margin: 10px 0;
      overflow: hidden;
      &:last-child {
        margin-bottom: 0;
      }
    }
    &-img {
      height: 120px;
      border: 1px solid #e5dfe3;
    }
    &-text {
      margin-top: 5px;
      overflow: hidden;
      font-size: 12px;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &-link:hover &-text {
      color: #07f;
    }
  }
}
</style>
