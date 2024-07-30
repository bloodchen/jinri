<!-- 标签组件-子组件 -->
<template>
  <div
    v-show="props.data?.name === currentTabName"
    class="mx-tab-pane"
  >
    <slot />
  </div>
</template>

<script setup>
import { inject } from 'vue';

const props = defineProps({
  // name, label, url
  data: { type: Object, default: null }
});

const currentTabName = inject('currentTabName');
</script>

<style>
.mx-tab-pane {
  padding: 10px 20px;
}
</style>
