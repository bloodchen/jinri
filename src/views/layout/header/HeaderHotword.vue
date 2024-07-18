<!-- 顶栏-热搜 -->
<template>
  <div class="mx-hotword">
    <!-- 列表 -->
    <div
      class="mx-hotword-list"
      :class="{ 'is-expend': isExpend }"
    >
      <a
        v-for="item in dataList"
        :key="item.eventId"
        class="mx-hotword-item"
        :title="item.word"
        :href="`${item.url}&tn=68018901_dg`"
        target="_blank"
      >
        <span class="mx-hotword-title">{{ item.word }}</span>
        <img
          v-if="item.hotTagImg"
          :src="item.hotTagImg"
          class="mx-hotword-img"
        >
      </a>
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
import api from '@/api';

const dataList = ref([]);
const isExpend = ref(false);

api.getBaiduHotword().then(({ data }) => {
  dataList.value = data.success ? data.data.cards[0].content.slice(0, 18) : [];
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
    --icon-size: 12px;

    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 99;
    background-image: url('@/assets/sprites/header-common.png');
  }
}
</style>
