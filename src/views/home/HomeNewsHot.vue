<!-- 首页搜索热词 -->
<template>
  <MxTabs
    class="mx-hnews"
    suffix="搜索指数"
  >
    <MxTabPane
      name="hot"
      label="新闻搜索排行榜"
    >
      <a
        v-for="item in dataList"
        :key="item.eventId"
        class="mx-hnews-item"
        :title="item.word"
        :href="`${item.url}&tn=68018901_dg`"
        target="_blank"
      >
        <span
          class="mx-hnews-rank"
          :class="{ 'is-top3': item.index < 3 }"
        >{{ item.index + 1 }}</span>
        <span class="mx-hnews-word">{{ item.word }}</span>
        <span class="mx-hnews-score">{{ item.hotScore }}</span>
      </a>
    </MxTabPane>
  </MxTabs>
</template>

<script setup>
import { ref } from 'vue';
import api from '@/api';

const dataList = ref([]);

api.getHotword().then(({ data }) => {
  dataList.value = data.success ? data.data.cards[0].content.slice(0, 10) : [];
});
</script>

<style lang="scss">
.mx-hnews {
  &-item {
    display: flex;
    align-items: center;
    height: 20px;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &-rank {
    flex: none;
    width: 16px;
    overflow: hidden;
    font-size: 12px;
    line-height: 16px;
    color: white;
    text-align: center;
    background-color: #bbb;
    &.is-top3 {
      background-color: #7bf;
    }
  }
  &-word {
    flex: auto;
    margin: 0 6px;
    overflow: hidden;
    font-size: 12px;
    color: #444;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &-score {
    font-size: 12px;
    color: #666;
    text-align: right;
  }
}
</style>
