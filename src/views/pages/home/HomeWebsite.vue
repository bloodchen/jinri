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
          @click="addFav"
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
          <MxBtn @click="onConfirm">确定</MxBtn>
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
    <MxTabPane
      name="popular"
      label="常用网址"
    >
      <HomeWebsitePopular
        v-if="isPopInit"
        ref="popRef"
      />
    </MxTabPane>
    <MxTabPane
      name="fav"
      label="经常访问网站"
    >
      <HomeWebsiteFav
        v-if="isFavInit"
        ref="favRef"
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
import HomeWebsiteFav from './HomeWebsiteFav.vue';
import adDataList from '@/data/home-websites-ads';

// 当前tab
const currentTabName = useStorage('tab-hwebsite', 'popular');
const isPopInit = ref(false);
const isFavInit = ref(false);
function onTabChange(name) {
  if (name === 'popular') {
    isPopInit.value = true;
  } else {
    isFavInit.value = true;
  }
}

// 恢复默认
const dialogVisible = ref(false);
const popRef = ref(null);
const favRef = ref(null);
async function onConfirm() {
  dialogVisible.value = false;
  if (currentTabName.value === 'popular') {
    popRef.value.resetPop();
  } else {
    favRef.value.resetFav();
  }
}

// 添加网址
function addFav() {
  currentTabName.value = 'fav';
  favRef.value.openDialog('添加');
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
