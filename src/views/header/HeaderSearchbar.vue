<!-- 顶栏搜索 -->
<template>
  <div class="mx-search-bar">
    <!-- 搜索引擎 -->
    <div class="mx-search-engine">
      <!-- logo -->
      <a
        :title="currentEngine.engineTitle"
        :href="currentEngine.engineUrl"
        target="_blank"
      >
        <img
          class="mx-search-engine-logo"
          :src="currentEngine.engineLogo"
          :alt="currentEngine.engineTitle"
        >
      </a>
      <!-- 按钮 -->
      <span
        class="mx-search-engine-trigger"
        @click="engineListVisible = true"
      />
      <!-- 下拉列表 -->
      <div
        v-if="engineListVisible"
        ref="engineListRef"
        class="mx-search-dropdown-list"
      >
        <div
          v-for="item in currentGroup.engines"
          :key="item.engineName"
          class="mx-search-dropdown-item"
          @click="changeEngine(item)"
        >
          <img
            class="mx-search-engine-logo"
            :src="item.engineLogo"
            :alt="item.engineTitle"
          >
        </div>
      </div>
    </div>
    <!-- 搜索表单 -->
    <div class="mx-search-form">
      <span class="mx-search-group-title">{{ currentGroup.groupTitle }}</span>
      <!-- 按钮 -->
      <span
        class="mx-search-group-trigger"
        @click="groupListVisible = true"
      />
      <!-- 下拉列表 -->
      <div
        v-if="groupListVisible"
        ref="groupListRef"
        class="mx-search-dropdown-list"
      >
        <div
          v-for="item in searchEngines"
          :key="item.groupName"
          class="mx-search-dropdown-item"
          @click="changeGroup(item)"
        >
          {{ item.groupTitle }}
        </div>
      </div>
      <!-- 输入框 -->
      <input
        v-model.trim="searchKeyword"
        type="text"
        class="mx-search-input"
      >
      <!-- 提交按钮 -->
      <button
        class="mx-search-submit"
        @click="searchSubmit"
      >
        搜索
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCookies } from '@vueuse/integrations/useCookies';
import { onClickOutside } from '@vueuse/core';

import searchEngines from '@/data/header-search-engines';

// 获取配置 {groupName: 'website', engineName_website: 'baidu'}
const cookies = useCookies();
const searchConfig = cookies.get('search-config') || {};

// 更新配置
function updateSearchConfig() {
  searchConfig.groupName = currentGroup.value.groupName;
  searchConfig[`engineName_${currentGroup.value.groupName}`] = currentEngine.value.engineName;
  cookies.set('search-config', searchConfig);
}

// 获取当前分组
const currentGroup = ref({});
const groupName = searchConfig?.groupName;
currentGroup.value = searchEngines.find(item => item.groupName === groupName) || searchEngines[0];

// 获取当前搜索引擎
const currentEngine = ref({});
getCurrentEngine();
function getCurrentEngine() {
  const engineName = searchConfig[`engineName_${currentGroup.value.groupName}`];
  currentEngine.value = currentGroup.value.engines.find(item => item.engineName === engineName) || currentGroup.value.engines[0];
}

// 打开搜索引擎下拉框
const engineListVisible = ref(false);
const engineListRef = ref(null);
onClickOutside(engineListRef, event => {
  engineListVisible.value = false;
});

// 切换搜索引擎
function changeEngine(item) {
  engineListVisible.value = false;
  currentEngine.value = item;
  updateSearchConfig();
}

// 打开分组下拉框
const groupListVisible = ref(false);
const groupListRef = ref(null);
onClickOutside(groupListRef, event => {
  groupListVisible.value = false;
});

// 切换分组
function changeGroup(item) {
  groupListVisible.value = false;
  currentGroup.value = item;
  getCurrentEngine();
  updateSearchConfig();
}

// 搜索
const searchKeyword = ref('');
function searchSubmit() {
  // 空打开主页
  if (!searchKeyword.value) {
    window.open(currentEngine.value.engineUrl, '_self');
    return;
  }
  // 否则搜索
  const params = new URLSearchParams();
  for (const key in currentEngine.value.searchParams) {
    const val = currentEngine.value.searchParams[key];
    params.append(key, val);
  }
  const url = `${currentEngine.value.searchUrl}?${params.toString().replace('%7BKEY%7D', searchKeyword.value)}`;
  window.open(url, '_self');
}
</script>

<style lang="scss">
.mx-search {
  &-bar {
    display: flex;
    justify-content: center;
  }

  // 搜索引擎
  &-engine {
    position: relative;
    display: flex;
    align-items: center;
    &-logo {
      display: block;
      width: 120px;
      height: 40px;
    }
    &-trigger {
      width: 18px;
      height: 18px;
      margin-left: 5px;
      cursor: pointer;
      background-image: url('@/assets/icons/header-sprite.png');
      background-repeat: no-repeat;
      background-position: 0 -240px;
      &:hover {
        opacity: .6;
      }
    }
  }

  // 下拉列表
  &-dropdown {
    &-list {
      position: absolute;
      top: 40px;
      left: 0;
      z-index: 1;
      padding: 8px 0;
      background-color: #fff;
      border: 1px solid #e7e7e7;
    }
    &-item {
      padding: 4px 15px;
      font-size: 12px;
      cursor: pointer;
      &:hover {
        color: #07f;
        background-color: #f7f7f7;
      }
    }
  }

  // 搜索表单
  &-form {
    position: relative;
    display: flex;
    align-items: center;
    width: 600px;
    height: 40px;
    padding-left: 10px;
    margin-left: 10px;
    background-color: #fff;
    border: 2px solid #7bf;
    &:hover {
      border-color: #08f;
    }
  }

  // 分组
  &-group {
    &-title {
      font-size: 12px;
      color: #b2b2b2;
    }
    &-trigger {
      width: 12px;
      height: 12px;
      margin: 0 5px;
      cursor: pointer;
      background-image: url('@/assets/icons/header-sprite.png');
      background-repeat: no-repeat;
      background-position: 0 -320px;
      &:hover {
        background-position: 0 -332px;
      }
    }
  }

  // 输入框
  &-input {
    flex: auto;
    height: 100%;
    padding: 0 10px;
    &:hover,
    &:focus {
      background-color: #f7f7f7;
    }
  }

  // 提交按钮
  &-submit {
    width: 100px;
    height: 100%;
    font-size: 18px;
    color: #fff;
    background-color: #7bf;
  }
  &-form:hover &-submit {
    background-color: #08f;
  }
}
</style>
