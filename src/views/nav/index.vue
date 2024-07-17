<!-- 导航 -->
<template>
  <div class="mx-nav">
    <div class="mx-nav-list">
      <RouterLink
        v-for="(item, index) in navItems"
        :key="item.name"
        :to="item.path"
        class="mx-nav-item"
        :class="{ 'is-active': item.name === route.name }"
        @mouseenter="cursorIndex = index"
        @mouseleave="cursorIndex = currentIndex"
      >
        {{ item.label }}
      </RouterLink>
    </div>
    <div
      class="mx-nav-cursor"
      :style="cursorStyle"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

// 导航
const navItems = [
  { label: '首页', name: 'home', path: '/' },
  { label: '购物', name: 'shopping', path: '/shopping' }
];

// 当前选中项
const route = useRoute();
const currentIndex = computed(() => {
  return navItems.findIndex(item => item.name === route.name);
});

// 滑块
const cursorIndex = ref(null);
const cursorStyle = computed(() => {
  let index = 0;
  if (cursorIndex.value === null) {
    index = currentIndex.value === -1 ? 0 : currentIndex.value;
  } else {
    index = cursorIndex.value;
  }
  return { left: `${index * 76 + 20}px` };
});
</script>

<style lang="scss">
.mx-nav {
  position: relative;
  &-list {
    display: flex;
    background-color: #fff;
    border: 1px solid #e2e2e2;
  }
  &-item {
    position: relative;
    width: 76px;
    font-size: 14px;
    line-height: 34px;
    color: #666;
    text-align: center;
    &:hover {
      color: #212121;
    }
    &.is-active {
      font-weight: bold;
    }
  }
  &-cursor {
    position: absolute;
    bottom: -1px;
    left: 20px;
    width: 76px;
    height: 2px;
    background-color: #08f;
    transition: left .2s;
  }
}
</style>
