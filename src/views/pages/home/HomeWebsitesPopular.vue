<!-- 首页-常用网址 -->
<template>
  <HomeWebsitesGroup
    :data="dataList"
    cols="6"
    @sort="sortSite"
  />
</template>

<script setup>
import { useStorage } from '@vueuse/core';
import HomeWebsitesGroup from './HomeWebsitesGroup.vue';
import defaultDataList from '@/data/home-websites-popular.js';

// 初始化数据
const dataList = useStorage('home-website-popular', defaultDataList);

// 更新本地数据
const newList = [];
dataList.value.forEach(item => {
  const newItem = defaultDataList.find(n => n.id === item.id) || item;
  newList.push(newItem);
});
dataList.value = newList;

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
