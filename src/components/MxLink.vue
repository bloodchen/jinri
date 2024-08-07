<!-- 链接 -->
<template>
  <a
    class="mx-link"
    :target="target"
    :class="{ 'need-hover': hover }"
  >
    <slot />
  </a>
</template>

<script setup>
defineProps({
  target: { type: String, default: '_blank' },
  hover: { type: Boolean, default: true }
});
</script>

<style lang="scss">
.mx-link {
  color: #222;
  cursor: pointer;
  &.need-hover:hover {
    color: #07f;
  }
}
</style>
