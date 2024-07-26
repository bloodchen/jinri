<!-- 标签组件-子组件 -->
<template>
  <div
    v-show="props.name === currentTabName"
    class="mx-tab-pane"
  >
    <slot />
  </div>
</template>

<script setup>
import { inject } from 'vue';

const props = defineProps({
  name: { type: String, default: '' },
  label: { type: String, default: '' }
});

const currentTabName = inject('currentTabName');
</script>

<style>
.mx-tab-pane {
  padding: 10px 20px;
}
</style>
