<!-- 按钮 -->
<template>
  <button :class="['mx-btn', `is-${type}`, `is-${size}`]">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  // primary, info, link
  type: { type: String, default: 'primary' },
  // custom, medium
  size: { type: String, default: 'medium' }
});
</script>

<style lang="scss">
.mx-btn {
  display: inline-block;
  padding: 0 30px;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  background-color: transparent;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5 !important;
  }

  // type
  &.is-primary {
    color: #fff;
    background-color: #7bf;
    &:hover {
      background-color: #08f;
    }
  }
  &.is-info {
    color: #666;
    background-color: transparent;
    border: 1px solid #eee;
    &:hover {
      color: #08f;
      border-color: #08f;
    }
  }
  &.is-link {
    padding: 0;
    color: #08f;
  }

  // size
  &.is-medium {
    height: 32px;
  }

  // margin
  & + .mx-btn {
    margin-left: 10px;
  }
}
</style>
