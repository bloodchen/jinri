<!-- 图标 -->
<template>
  <i
    aria-hidden="true"
    class="mx-icon"
  />
</template>

<style lang="scss">
.mx-icon {
  display: inline-block;
  width: var(--icon-size);
  height: var(--icon-size);
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: var(--icon-base);
  &:hover {
    background-position: var(--icon-active, var(--icon-base));
  }
}
</style>
