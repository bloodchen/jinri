<!-- 首页-网址导航 -->
<template>
  <MxTabs
    v-model="currentTabName"
    class="mx-hwebsite"
    :autoplay="false"
    theme="blue"
    @change="onTabChange"
  >
    <!-- 顶部 -->
    <template #header>
      <!-- 按钮 -->
      <div class="mx-hwebsite-btn-row">
        <span
          class="mx-hwebsite-btn-item"
          @click="dialogVisible = true"
        >恢复默认</span>
        <div
          class="mx-hwebsite-btn-item"
          @click="addSite"
        >
          <MxIcon class="mx-hwebsite-btn-icon is-add" />
          <span>添加网址</span>
        </div>
      </div>
      <!-- 恢复默认 -->
      <MxDialog
        v-model="dialogVisible"
        title="恢复默认"
      >
        <div>恢复默认将覆盖你当前的操作和显示，确认要执行此操作吗？</div>
        <template #footer>
          <MxBtn @click="resetSite">确定</MxBtn>
          <MxBtn
            type="info"
            @click="dialogVisible = false"
          >
            取消
          </MxBtn>
        </template>
      </MxDialog>
    </template>
    <!-- 内容 -->
    <MxTabPane :data="{ name: 'popular', label: '常用网址' }">
      <HomeWebsitePopular
        v-if="isPopularInit"
        ref="popularRef"
      />
    </MxTabPane>
    <MxTabPane :data="{ name: 'favorite', label: '经常访问网站' }">
      <HomeWebsiteFavorite
        v-if="isFavoriteInit"
        ref="favoriteRef"
      />
    </MxTabPane>
    <!-- 底部广告 -->
    <template #footer>
      <div class="mx-hwebsite-ad">
        <MxLink
          v-for="item in adDataList"
          :key="item.title"
          :href="item.url"
          class="mx-hwebsite-ad-item"
        >
          {{ item.title }}
        </MxLink>
      </div>
    </template>
  </MxTabs>
</template>

<script setup>
import { ref } from 'vue';
import { useStorage } from '@vueuse/core';

import HomeWebsitePopular from './HomeWebsitePopular.vue';
import HomeWebsiteFavorite from './HomeWebsiteFavorite.vue';

import adDataList from '@/data/home-websites-ads';

// 当前tab
const currentTabName = useStorage('tab-hwebsite', 'popular');
const isPopularInit = ref(false);
const isFavoriteInit = ref(false);
function onTabChange(name) {
  if (name === 'popular') {
    isPopularInit.value = true;
  } else {
    isFavoriteInit.value = true;
  }
}

// 恢复默认数据
const dialogVisible = ref(false);
const popularRef = ref(null);
const favoriteRef = ref(null);
function resetSite() {
  dialogVisible.value = false;
  if (currentTabName.value === 'popular') {
    popularRef.value.resetSite();
  } else {
    favoriteRef.value.resetSite();
  }
}

// 添加网址
function addSite() {
  currentTabName.value = 'favorite';
  favoriteRef.value.addSite();
}
</script>

<style lang="scss">
.mx-hwebsite {
  flex: auto;
  .mx-tab-pane {
    height: 291px;
    padding: 0 15px;
    overflow: auto;
  }

  // 按钮
  &-btn {
    &-row,
    &-item {
      display: flex;
      align-items: center;
    }
    &-icon {
      --icon-size: 26px;

      margin-right: -5px;
      background-image: url('@/assets/sprites/home-website.png');
    }
    &-item {
      margin-left: 10px;
      font-size: 12px;
      color: #888;
      cursor: pointer;
      &:hover {
        color: #08f;
      }
      .is-add {
        --icon-base: -10px -4px;
      }
      &:hover .is-add {
        --icon-base: -10px -28px;
      }
    }
  }

  // 广告
  &-ad {
    padding: 0 20px;
    font-size: 12px;
    line-height: 30px;
    border-top: 1px solid #def;
    &-item {
      margin-right: 20px;
      color: #08f;
    }
  }
}
</style>
