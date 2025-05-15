<!-- 二级页-天气-选择城市 -->
<template>
  <MxDialog
    title="切换城市"
    @close="onClose"
  >
    <div class="mx-weather-row">
      <input
        v-model="searchKeyword"
        type="text"
        class="mx-weather-input"
        placeholder="请输入城市拼音"
        @focus="isFocus = true"
        @blur="isFocus = false"
        @click.stop
        @keydown.enter="getSearchResult"
      />
      <MxBtn
        type="link"
        @click="getSearchResult"
      >
        搜索
      </MxBtn>
      <!-- 城市列表 -->
      <div
        v-show="isFocus || searchVisible"
        class="mx-weather-dropdown"
      >
        <div
          v-if="searchLoading"
          class="mx-weather-dropdown-item"
        >
          加载中...
        </div>
        <div
          v-else-if="!searchResult.length"
          class="mx-weather-dropdown-item"
        >
          暂无数据
        </div>
        <div
          v-for="item in searchResult"
          :key="item.geoid"
          :title="item.name"
          class="mx-weather-dropdown-item"
          @click.stop="onSelect(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <template #footer>
      <MxBtn @click="onConfirm">确认</MxBtn>
      <MxBtn
        type="info"
        @click="onClose"
      >
        取消
      </MxBtn>
    </template>
  </MxDialog>
</template>

<script setup>
import { ref } from 'vue';
import api from '@/api';

const emits = defineEmits(['confirm', 'close']);

// 搜索
const isFocus = ref(false);
const searchKeyword = ref(null);
const searchResult = ref([]);
const searchVisible = ref(false);
const searchLoading = ref(false);

// 获取搜索结果
async function getSearchResult() {
  searchResult.value = [];
  searchVisible.value = true;
  if (searchKeyword.value) {
    searchLoading.value = true;
    const { data } = await api.getWeatherCityByKeyword(searchKeyword.value);
    searchLoading.value = false;
    if (data.success === false) return;
    searchResult.value = data[1];
  }
}

// 选择一个结果
let selectedItem = null;
function onSelect(item) {
  selectedItem = item;
  searchKeyword.value = item.name;
  searchVisible.value = false;
}

// 确定
function onConfirm() {
  emits('confirm', selectedItem);
}

// 关闭
function onClose() {
  emits('close');
}
</script>

<style lang="scss">
.mx-weather {
  &-row {
    position: relative;
    display: flex;
    gap: 10px;
    align-items: center;
  }
  &-input {
    width: 300px;
    height: 32px;
    padding: 0 10px;
    font-size: 12px;
    color: #212121;
    outline: 0;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  // 城市列表
  &-dropdown {
    position: absolute;
    top: 38px;
    left: 0;
    z-index: 99;
    min-width: 300px;
    max-width: 460px;
    max-height: 200px;
    padding: 5px 0;
    overflow-y: auto;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 3px 6px rgb(0 0 0 / 16%);
    &-item {
      padding: 8px 10px;
      font-size: 12px;
      line-height: 20px;
      color: #333;
      white-space: nowrap;
      cursor: pointer;
      &:hover {
        background-color: #f7f7f7;
      }
    }
  }
}
</style>
