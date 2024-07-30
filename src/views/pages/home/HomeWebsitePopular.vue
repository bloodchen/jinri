<!-- 首页-网址导航-常用网址 -->
<template>
  <HomeWebsiteGroup
    :data="dataList"
    cols="6"
    @sort="sortSite"
  />
</template>

<script setup>
import { useStorage } from '@vueuse/core';

import HomeWebsiteGroup from './HomeWebsiteGroup.vue';

import defaultDataList from '@/data/home-websites-popular.js';

// 获取列表
const dataList = useStorage('home-website-popular', defaultDataList);

// 排序
function sortSite({ dragItem, dragIndex, targetIndex }) {
  dataList.value.splice(dragIndex, 1);
  dataList.value.splice(targetIndex, 0, dragItem);
}

// 恢复默认
function resetSite() {
  dataList.value = defaultDataList;
}

defineExpose({ resetSite });
</script>
