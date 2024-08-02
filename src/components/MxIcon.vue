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
  width: 1em;
  height: 1em;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: var(--icon-base, 0 0);
  &:hover {
    background-position: var(--icon-active, var(--icon-base, 0 0));
  }
}
</style>
