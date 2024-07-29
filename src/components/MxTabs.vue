<!-- 标签组件-父组件 -->
<template>
  <div
    class="mx-tabs"
    :class="`is-${theme}`"
  >
    <div class="mx-tabs-header">
      <div class="mx-tabs-titles">
        <span
          v-for="item in tabItems"
          :key="item.name"
          class="mx-tabs-title"
          :class="{
            'is-active': tabItems.length > 1 && item.name === props.modelValue,
            'is-text': tabItems.length === 1
          }"
          @mouseenter="onMouseenter(item.name)"
          @mouseleave="onMouseleave"
          @click="onClick(item.name)"
        >{{ item.label }}</span>
      </div>
      <!-- 顶栏额外内容 -->
      <slot name="header" />
    </div>
    <div class="mx-tabs-content">
      <slot />
    </div>
    <!-- 底栏额外内容 -->
    <slot name="footer" />
  </div>
</template>

<script setup>
import { useSlots, provide, computed } from 'vue';

// props
const props = defineProps({
  // 默认标签
  modelValue: { type: String, default: '' },
  // 是否自动轮播
  autoplay: { type: Boolean, default: true },
  // 主题
  theme: { type: String, default: 'gray' }
});

// 获取子集
const defaultSlots = useSlots().default();
const tabPanes = defaultSlots[0]?.props ? defaultSlots : defaultSlots[0]?.children;
const tabItems = tabPanes.map(({ props }) => props);

// 当前标签
const currentTabName = computed(() => props.modelValue);
provide('currentTabName', currentTabName);

// 自动切换标签
let autoTimer;
if (props.autoplay) {
  const currentTabIndex = tabItems.findIndex(item => item.name === props.modelValue);
  let nextTabIndex = currentTabIndex;
  autoTimer = setInterval(() => {
    if (tabItems.length <= 1) {
      clearInterval(autoTimer);
    }
    nextTabIndex = nextTabIndex === tabItems.length - 1 ? 0 : nextTabIndex + 1;
    updateTab(tabItems[nextTabIndex].name);
  }, 5000);
}

// 鼠标滑过切换标签
let hoveTimer;
function onMouseenter(name) {
  clearInterval(autoTimer);
  clearTimeout(hoveTimer);
  hoveTimer = setTimeout(() => onClick(name), 500);
}
function onMouseleave() {
  clearTimeout(hoveTimer);
}

// 鼠标点击切换标签
function onClick(name) {
  clearInterval(autoTimer);
  clearTimeout(hoveTimer);
  updateTab(name);
}

// 切换标签
const emits = defineEmits(['update:modelValue', 'change']);
function updateTab(name, isInit) {
  if (name === props.modelValue && !isInit) return;
  emits('update:modelValue', name);
  emits('change', name);
}

// 初始化时触发
updateTab(props.modelValue, true);
</script>

<style lang="scss">
.mx-tabs {
  // 灰色
  &.is-gray {
    --border-color: #e2e2e2;
    --header-bg-color: #fafafa;
    --header-border-color: #e2e2e2;
  }

  // 蓝色
  &.is-blue {
    --border-color: #7bf;
    --header-bg-color: #f7fbff;
    --header-border-color: #def;
  }

  background-color: #fff;
  border: 1px solid var(--border-color);
  border-top-color: #7bf;
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 27px;
    padding-right: 20px;
    font-size: 12px;
    line-height: 26px;
    color: #666;
    white-space: nowrap;
    background-color: var(--header-bg-color);
    border-bottom: 1px solid var(--header-border-color);
  }
  &-titles {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
  &-title {
    height: 27px;
    padding: 0 20px;
    cursor: pointer;
    border-right: 1px solid var(--header-border-color);
    border-bottom: 1px solid var(--header-border-color);
    &.is-active {
      color: #08f;
      background-color: #fff;
      border-bottom-color: #fff;
    }
    &.is-text {
      cursor: text;
      border-right-color: transparent;
    }
  }
}
</style>
