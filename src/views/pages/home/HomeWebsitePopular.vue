<!-- 首页-网址导航-常用网址 -->
<template>
  <HomeWebsiteGroup
    :data="dataGroup"
    cols="6"
    @sort="sortSite"
  />
</template>

<script setup>
import { computed } from 'vue';
import { useStorage } from '@vueuse/core';

import HomeWebsiteGroup from './HomeWebsiteGroup.vue';
import defaultDataList from '@/data/home-websites-popular.js';

// 获取数据
const dataList = useStorage('home-website-popular', formatDataList(defaultDataList));

// 添加id
function formatDataList(list) {
  return list.map((item, index) => {
    return { ...item, id: index };
  });
}

// 获取分组
const dataGroup = computed(() => {
  let groupIndex = -1;
  const groupList = [];
  dataList.value.forEach((item, index) => {
    if (index === 0 || index === 24) {
      groupIndex += 1;
      groupList.push({ groupName: groupIndex, children: [] });
    }
    item.sortIndex = index;
    groupList[groupIndex].children.push(item);
  });
  return groupList;
});

// 排序
function sortSite({ dragItem, dragIndex, targetIndex }) {
  dataList.value.splice(dragIndex, 1);
  dataList.value.splice(targetIndex, 0, dragItem);
}

// 恢复默认
function resetSite() {
  dataList.value = formatDataList(defaultDataList);
}

defineExpose({ resetSite });
</script>
