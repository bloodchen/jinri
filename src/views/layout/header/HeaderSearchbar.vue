<!-- 顶栏-搜索栏 -->
<template>
  <div class="mx-searchbar">
    <!-- 搜索引擎 -->
    <div class="mx-searchbar-engine">
      <!-- logo -->
      <a
        :title="currentEngine.engineTitle"
        :href="currentEngine.engineUrl"
        target="_blank"
      >
        <img
          class="mx-searchbar-engine-logo"
          :src="currentEngine.engineLogo"
          :alt="currentEngine.engineTitle"
        >
      </a>
      <!-- 下拉列表 -->
      <MxIcon
        class="mx-searchbar-trigger"
        @click="engineListVisible = true"
      />
      <div
        v-if="engineListVisible"
        ref="engineListRef"
        class="mx-searchbar-dropdown-list"
      >
        <div
          v-for="item in currentEngineGroup.engines"
          :key="item.engineName"
          class="mx-searchbar-dropdown-item"
          @click="changeEngine(item)"
        >
          <img
            class="mx-searchbar-engine-logo"
            :src="item.engineLogo"
            :alt="item.engineTitle"
          >
        </div>
      </div>
    </div>
    <!-- 搜索表单 -->
    <div
      class="mx-searchbar-form"
      :class="{ 'is-focus': inputIsFoucs }"
    >
      <!-- 分组标题 -->
      <span class="mx-searchbar-engine-label">{{ currentEngineGroup.groupTitle }}</span>
      <!-- 下拉列表 -->
      <MxIcon
        class="mx-searchbar-trigger"
        @click="engineGroupVisible = true"
      />
      <div
        v-if="engineGroupVisible"
        ref="engineGroupRef"
        class="mx-searchbar-dropdown-list"
      >
        <div
          v-for="item in engineGroupList"
          :key="item.groupName"
          class="mx-searchbar-dropdown-item"
          @click="changeEngineGroup(item)"
        >
          {{ item.groupTitle }}
        </div>
      </div>
      <div
        ref="suggestRef"
        class="mx-searchbar-input"
      >
        <!-- 输入框 -->
        <input
          v-model.trim="keyword"
          type="text"
          class="mx-searchbar-input-inner"
          @focus="inputIsFoucs = true"
          @input="getServerSuggectList"
        >
        <!-- 搜索建议 -->
        <div
          v-show="inputIsFoucs"
          class="mx-searchbar-suggest"
        >
          <div
            v-if="historyListRef.length"
            class="mx-searchbar-suggest-list"
          >
            <div
              v-for="text in historyListRef"
              :key="text"
              class="mx-searchbar-suggest-item is-history"
              @click="onClickSuggest(text)"
            >
              {{ text }}
            </div>
          </div>
          <div
            v-if="suggestListRef.length"
            class="mx-searchbar-suggest-list"
          >
            <div
              v-for="text in suggestListRef"
              :key="text"
              class="mx-searchbar-suggest-item"
              @click="onClickSuggest(text)"
            >
              {{ text }}
            </div>
          </div>
          <div class="mx-searchbar-suggest-tools">
            <label
              for="searchHistoryCheckbox"
              class="mx-searchbar-suggest-btn"
            >
              <input
                id="searchHistoryCheckbox"
                v-model="historyVisible"
                type="checkbox"
                @change="changeHistoryVisible"
              >
              <span class="mx-ml-5">显示历史记录</span>
            </label>
            <span
              class="mx-searchbar-suggest-btn"
              @click="clearHistory"
            >清空历史</span>
          </div>
        </div>
      </div>
      <!-- 提交按钮 -->
      <MxBtn
        class="mx-searchbar-submit"
        size="custom"
        @click="searchSubmit"
      >
        搜索
      </MxBtn>
    </div>
    <!-- 后缀 -->
    <div class="mx-searchbar-engine" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCookies } from '@vueuse/integrations/useCookies';
import { onClickOutside } from '@vueuse/core';

import api from '@/api';
import engineGroupList from '@/data/header-searchbar-engines';

const cookies = useCookies();

// 搜索引擎配置 {groupName: 'website', engineName_website: 'baidu'}
const engineConfig = cookies.get('search-engine-config') || {};
function updateEngineConfig() {
  engineConfig.groupName = currentEngineGroup.value.groupName;
  engineConfig[`engineName_${currentEngineGroup.value.groupName}`] = currentEngine.value.engineName;
  cookies.set('search-engine-config', engineConfig);
}

// 当前搜索引擎分组
const currentEngineGroup = ref({});
currentEngineGroup.value = engineGroupList.find(item => item.groupName === engineConfig?.groupName) || engineGroupList[0];

// 当前搜索引擎
const currentEngine = ref({});
getCurrentEngine();
function getCurrentEngine() {
  const engineName = engineConfig[`engineName_${currentEngineGroup.value.groupName}`];
  currentEngine.value = currentEngineGroup.value.engines.find(item => item.engineName === engineName) || currentEngineGroup.value.engines[0];
}

// 搜索引擎下拉框
const engineListVisible = ref(false);
const engineListRef = ref(null);
onClickOutside(engineListRef, event => {
  engineListVisible.value = false;
});

// 切换搜索引擎
function changeEngine(item) {
  engineListVisible.value = false;
  currentEngine.value = item;
  updateEngineConfig();
}

// 搜索引擎分组下拉框
const engineGroupVisible = ref(false);
const engineGroupRef = ref(null);
onClickOutside(engineGroupRef, event => {
  engineGroupVisible.value = false;
});

// 切换搜索引擎分组
function changeEngineGroup(item) {
  engineGroupVisible.value = false;
  currentEngineGroup.value = item;
  getCurrentEngine();
  updateEngineConfig();
}

// 搜索
const keyword = ref('');
function searchSubmit() {
  // 空打开主页
  if (!keyword.value) {
    window.open(currentEngine.value.engineUrl, '_target');
    return;
  }
  // 否则搜索
  const params = new URLSearchParams();
  for (const key in currentEngine.value.searchParams) {
    const val = currentEngine.value.searchParams[key];
    params.append(key, val);
  }
  const url = `${currentEngine.value.searchUrl}?${params.toString().replace('%7BKEY%7D', keyword.value)}`;
  window.open(url, '_target');
  addHistory(keyword.value);
}

// 输入框
const inputIsFoucs = ref(false);
const suggestRef = ref(null);
onClickOutside(suggestRef, event => {
  inputIsFoucs.value = false;
});

// 搜索历史
const historyVisible = ref(cookies.get('search-show-history'));
const historyList = ref(cookies.get('search-history-list') || []);
const historyListRef = computed(() => {
  if (!keyword.value) {
    return historyVisible.value ? historyList.value.slice(0, 10) : [];
  }
  const reg = new RegExp(keyword.value);
  return historyVisible.value ? historyList.value.filter(item => reg.test(item)).slice(0, 3) : [];
});

// 是否显示搜索历史
function changeHistoryVisible() {
  cookies.set('search-show-history', historyVisible.value);
}

// 添加搜索历史
function addHistory(key) {
  // 删除旧的
  const index = historyList.value.findIndex(item => item === key);
  if (index > -1) {
    historyList.value.splice(index, 1);
  }
  // 保留前100位
  if (historyList.value.length > 99) {
    historyList.value = historyList.value.slice(0, 99);
  }
  // 添加新的
  historyList.value.unshift(key);
  cookies.set('search-history-list', historyList.value);
}

// 清空搜索历史
function clearHistory() {
  historyList.value = [];
  cookies.set('search-history-list', []);
}

// 搜索建议
const suggestList = ref([]);
const suggestListRef = computed(() => {
  const length = 10 - historyListRef.value.length;
  return suggestList.value.slice(0, length);
});

// 获取搜索建议
async function getServerSuggectList() {
  if (!keyword.value) {
    suggestList.value = [];
  }
  if (currentEngine.value.engineTitle === '汽车之家') {
    api.getAutohomeSuggest(keyword.value, res => {
      suggestList.value = res.split(',');
    });
  } else {
    const res = await api.getBaiduSuggest(keyword.value);
    suggestList.value = res.s;
  }
}

// 点击搜索建议
function onClickSuggest(item) {
  keyword.value = item;
  inputIsFoucs.value = false;
  searchSubmit();
}
</script>

<style lang="scss">
.mx-searchbar {
  display: flex;
  align-items: center;
  justify-content: center;

  // 搜索引擎
  &-engine {
    position: relative;
    display: flex;
    align-items: center;
    width: 160px;
    padding-left: 16px;
    &-logo {
      display: block;
      width: 120px;
      height: 40px;
    }
    &-label {
      font-size: 12px;
      color: #b2b2b2;
    }
  }

  // 下拉列表
  &-trigger {
    --icon-base: 0 -320px;
    --icon-active: 0 -332px;
    --icon-size: 12px;

    margin: 0 5px;
    background-image: url('@/assets/sprites/header-common.png');
  }
  &-dropdown {
    &-list {
      position: absolute;
      top: 40px;
      left: 0;
      z-index: 100;
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
    background-color: #fff;
    border: 2px solid #7bf;
  }
  &-form:hover,
  &-form.is-focus {
    border-color: #08f;
    .mx-searchbar-input {
      background-color: #f7f7f7;
    }
    .mx-searchbar-submit {
      background-color: #08f;
    }
  }

  // 输入框
  &-input {
    position: relative;
    flex: auto;
    height: 100%;
    &-inner {
      width: 100%;
      height: 100%;
      padding: 0 10px;
    }
  }

  // 提交按钮
  &-submit {
    height: 100%;
    font-size: 16px;
  }

  // 搜索建议
  &-suggest {
    position: absolute;
    top: 36px;
    right: -2px;
    left: -60px;
    z-index: 9999;
    font-size: 12px;
    line-height: 30px;
    background-color: #fff;
    border: 2px solid #08f;
    border-top: 0;
    &-list {
      padding: 5px 0;
      border-top: 1px solid #eee;
    }
    &-item {
      display: block;
      padding: 0 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      &.is-history {
        color: #7bf;
      }
      &:hover {
        color: #7bf;
        background-color: #f7f7f7;
      }
    }
    &-tools {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 5px 20px;
      border-top: 1px solid #f7f7f7;
    }
    &-btn {
      display: flex;
      align-items: center;
      margin-left: 10px;
      cursor: pointer;
      &:hover {
        color: #7bf;
      }
    }
  }
}
</style>
