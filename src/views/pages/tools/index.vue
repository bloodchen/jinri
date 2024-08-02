<!-- 二级页-工具 -->
<template>
  <div class="mx-tools">
    <div
      v-for="group in dataGroup"
      :key="group.groupTitle"
      class="mx-tools-group"
    >
      <div class="mx-tools-group-title">{{ group.groupTitle }}</div>
      <div class="mx-tools-site-list">
        <MxLink
          v-for="site in group.children"
          :key="site.title"
          :href="site.url"
          class="mx-tools-site-item"
        >
          {{ site.title }}
        </MxLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import dataGroup from '@/data/tools-websites';
</script>

<style lang="scss">
.mx-tools {
  font-size: 12px;
  line-height: 30px;
  background-color: #fff;
  border: 1px solid #e2e2e2;
  &-group-title {
    padding-left: 25px;
    font-weight: bold;
    color: #11406f;
    background-color: #e9f8fd;
    background-image: url('@/assets/icons/tools-arrow.png');
    background-repeat: no-repeat;
    background-position: 10px 12px;
  }
  &-site {
    &-list {
      display: flex;
      flex-wrap: wrap;
      padding: 6px 16px;
    }
    &-item {
      margin-right: 20px;
    }
  }
}
</style>
