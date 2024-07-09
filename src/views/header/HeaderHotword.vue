<!-- 顶栏热搜 -->
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
    <span
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

api.getHotword().then(({ data }) => {
  dataList.value = data.success ? data.data.cards[0].content : [];
});
</script>

<style lang="scss">
.mx-hotword {
  position: relative;
  height: 48px;
  &-list {
    position: absolute;
    top: 0;
    right: 0;
    left: 31%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0 10px;
    height: 48px;
    padding: 4px 10px;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #fff;
    &.is-expend {
      height: auto;
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
    position: absolute;
    top: 10px;
    right: 10px;
    width: 12px;
    height: 12px;
    cursor: pointer;
    background-image: url('@/assets/icons/header-sprite.png');
    background-repeat: no-repeat;
    background-position: 0 -296px;
    &:hover {
      background-position: 0 -308px;
    }
  }
}
</style>
