<!-- 按钮 -->
<template>
  <button :class="['mx-btn', `is-${type}`, `is-${size}`]">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  // primary, info
  type: { type: String, default: 'primary' },
  // custom, middle
  size: { type: String, default: 'middle' }
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
  }

  // size
  &.is-middle {
    height: 30px;
  }

  // margin
  & + .mx-btn {
    margin-left: 10px;
  }
}
</style>
