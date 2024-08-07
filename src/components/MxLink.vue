<!-- 链接 -->
<template>
  <a
    :href="href"
    :target="target"
    class="mx-link"
    :class="{ 'no-hover': !hover }"
  >
    <slot />
  </a>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  href: { type: String, default: null },
  hover: { type: Boolean, default: true }
});

// 是否是外部链接
const target = computed(() => {
  return typeof props.href === 'string' && props.href.startsWith('http') ? '_target' : '_self';
});
</script>

<style lang="scss">
.mx-link {
  color: #222;
  cursor: pointer;
  :hover {
    color: #07f;
  }
  &.no-hover:hover {
    color: inherit;
  }
}
</style>
