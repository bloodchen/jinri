<!-- iframe -->
<template>
  <iframe
    scrolling="no"
    class="mx-iframe"
    :class="{ 'is-border': border }"
  />
</template>

<script setup>
defineProps({
  border: { type: Boolean, default: true }
});
</script>

<style lang="scss">
.mx-iframe {
  display: block;
  width: 100%;
  background-color: #fff;
  &.is-border {
    border: 1px solid #e2e2e2;
  }
}
</style>
