<!-- 标签组件-父组件 -->
<template>
  <div
    class="mx-tabs"
    :class="`is-${theme}`"
  >
    <div class="mx-tabs-header">
      <div
        v-if="tabItems.length > 1"
        class="mx-tabs-titles"
      >
        <span
          v-for="item in tabItems"
          :key="item.name"
          class="mx-tabs-title"
          :class="{ 'is-active': item.name === currentTab }"
          @click="onChange(item)"
        >{{ item.label }}</span>
      </div>
      <span
        v-else
        class="mx-tabs-title is-text"
      >{{ tabItems[0].label }}</span>
      <span
        v-if="props.suffix"
        class="mx-tabs-title is-text"
      >{{ props.suffix }}</span>
    </div>
    <div class="mx-tabs-content">
      <slot />
    </div>
    <!-- 底部内容 -->
    <slot name="footer" />
  </div>
</template>

<script setup>
import { useSlots, ref, provide } from 'vue';

// 获取子集
const defaultSlots = useSlots().default();
const slots = defaultSlots[0]?.props ? defaultSlots : defaultSlots[0]?.children;
const tabItems = slots.map(({ props }) => props);

const props = defineProps({
  // 默认标签
  modelValue: { type: String, default: '' },
  // 主题
  theme: { type: String, default: 'gray' },
  // 后缀
  suffix: { type: String, default: '' }
});

// 当前标签
const currentTab = ref(props.modelValue || tabItems[0]?.name);
provide('currentTab', currentTab);

// 切换标签
const emits = defineEmits(['update:modelValue', 'change']);
function onChange(item) {
  currentTab.value = item.name;
  emits('update:modelValue', item.name);
  emits('change', item.name);
}
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
    justify-content: space-between;
    height: 27px;
    background-color: var(--header-bg-color);
    border-bottom: 1px solid var(--header-border-color);
  }
  &-titles {
    display: flex;
  }
  &-title {
    height: 27px;
    padding: 0 20px;
    font-size: 12px;
    line-height: 26px;
    color: #666;
    white-space: nowrap;
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
