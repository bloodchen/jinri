<!-- 搜索栏-热搜 -->
<template>
  <div
    ref="elRef"
    class="mx-hotword"
  >
    <!-- 列表 -->
    <div
      class="mx-hotword-list"
      :class="{ 'is-expend': isExpend }"
    >
      <MxLink
        v-for="item in dataList"
        :key="item.eventId"
        :href="`${item.url}&tn=68018901_dg`"
        :title="item.word"
        class="mx-hotword-item"
      >
        <span class="mx-hotword-title">{{ item.word }}</span>
        <img
          v-if="item.hotTagImg"
          :src="item.hotTagImg"
          class="mx-hotword-img"
        >
      </MxLink>
    </div>
    <!-- 展开按钮 -->
    <MxIcon
      class="mx-hotword-toggle"
      @click="isExpend = !isExpend"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import api from '@/api';

// 获取数据
const dataList = ref([]);
api.getSearchHotwordFromBaidu().then(({ data }) => {
  dataList.value = data.success ? data.data.cards[0].content.slice(0, 18) : [];
});

// 关闭
const elRef = ref(null);
const isExpend = ref(false);
onClickOutside(elRef, event => {
  isExpend.value = false;
});
</script>

<style lang="scss">
.mx-hotword {
  position: relative;
  width: 600px;
  height: 48px;
  margin: 0 auto;
  &-list {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 99;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0 10px;
    height: 48px;
    padding: 4px 10px;
    overflow: hidden;
    border: 1px solid transparent;
    &.is-expend {
      height: auto;
      background-color: #fff;
      border-color: #e7e7e7;
    }
  }
  &-item {
    display: flex;
    align-items: center;
    height: 20px;
    overflow: hidden;
  }
  &-title {
    overflow: hidden;
    font-size: 12px;
    color: #666;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:hover {
      color: #07f;
    }
  }
  &-img {
    flex: none;
    height: 14px;
    margin-left: 4px;
  }
  &-toggle {
    --icon-base: 0 -296px;
    --icon-active: 0 -308px;

    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 99;
    font-size: 12px;
    background-image: url('@/assets/icons/header-common.png');
  }
}
</style>
