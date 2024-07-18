<!-- 首页-网址导航 -->
<template>
  <MxTabs
    class="mx-hwebsite"
    theme="blue"
  >
    <!-- 常用网址 -->
    <MxTabPane
      name="website"
      label="常用网址"
    >
      <div
        v-for="group in favDataGroup"
        :key="group.groupName"
        class="mx-hwebsite-fav-list"
      >
        <div
          v-for="item in group.children"
          :key="item.title"
          class="mx-hwebsite-fav-item"
        >
          <!-- 主要网址 -->
          <MxLink
            class="mx-hwebsite-fav-link"
            :title="item.title"
            :style="{ 'color': item.color, 'font-weight': item.bold ? 'bold' : '' }"
            :href="item.url"
          >
            <img
              v-if="item.titleImg"
              class="mx-hwebsite-fav-img"
              :src="item.titleImg"
            >
            <template v-else>
              <img
                v-if="item.icon"
                class="mx-hwebsite-fav-icon"
                :src="item.icon"
              >
              <span>{{ item.title }}</span>
            </template>
          </MxLink>
          <!-- 次要网址 -->
          <template v-if="item.subTitle && item.subUrl">
            <span>&nbsp;•&nbsp;</span>
            <MxLink
              class="mx-hwebsite-fav-link"
              :title="item.subTitle"
              :style="{ 'color': item.subColor, 'font-weight': item.subBold ? 'bold' : '' }"
              :href="item.subUrl"
            >
              {{ item.subTitle }}
            </MxLink>
          </template>
          <!-- 附加图片 -->
          <MxLink
            v-if="item.bubbleUrl && item.bubbleImg"
            :href="item.bubbleUrl"
          >
            <img
              class="mx-hwebsite-fav-bubble"
              :src="item.bubbleImg"
            >
          </MxLink>
        </div>
      </div>
    </MxTabPane>
    <!-- 底部广告 -->
    <template #footer>
      <div class="mx-hwebsite-ad">
        <MxLink
          v-for="item in adDataList"
          :key="item.title"
          :href="item.url"
          class="mx-hwebsite-ad-item"
        >
          {{ item.title }}
        </MxLink>
      </div>
    </template>
  </MxTabs>
</template>

<script setup>
import favDataGroup from '@/data/home-websites-favs';
import adDataList from '@/data/home-websites-ads';
</script>

<style lang="scss">
.mx-hwebsite {
  .mx-tab-pane {
    padding: 0 20px;
  }

  // 最常访问
  &-fav {
    &-list {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      padding: 5px 0;
      &:first-child {
        border-bottom: 1px solid #e7e7e7;
      }
    }
    &-item,
    &-link {
      display: flex;
      flex: none;
      align-items: center;
      height: 30px;
      overflow: hidden;
    }
    &-link {
      font-size: 14px;
      color: #444;
      white-space: nowrap;
    }
    &-img {
      height: 30px;
    }
    &-icon {
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }
    &-bubble {
      display: block;
      margin-left: 5px;
    }
  }

  // 广告
  &-ad {
    padding: 0 20px;
    font-size: 12px;
    line-height: 30px;
    border-top: 1px solid #def;
    &-item {
      margin-right: 20px;
      color: #08f;
    }
  }
}
</style>
