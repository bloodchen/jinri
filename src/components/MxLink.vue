<!-- 链接 -->
<template>
  <a
    class="mx-link"
    target="_blank"
    :class="{ 'need-hover': hover }"
  >
    <slot />
  </a>
</template>

<script setup>
defineProps({
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
