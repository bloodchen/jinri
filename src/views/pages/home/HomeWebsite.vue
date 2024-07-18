<!-- 常用网址 -->
<template>
  <MxTabs
    class="mx-website"
    theme="blue"
  >
    <MxTabPane
      name="website"
      label="常用网址"
    >
      <div
        v-for="group in favDataGroup"
        :key="group.groupName"
        class="mx-website-fav-list"
      >
        <div
          v-for="item in group.children"
          :key="item.title"
          class="mx-website-fav-item"
        >
          <!-- 主要网址 -->
          <a
            class="mx-website-fav-link"
            :title="item.title"
            :style="{ 'color': item.color, 'font-weight': item.bold ? 'bold' : '' }"
            :href="item.url"
            target="_blank"
          >
            <img
              v-if="item.titleImg"
              class="mx-website-fav-img"
              :src="item.titleImg"
            >
            <template v-else>
              <img
                v-if="item.icon"
                class="mx-website-fav-icon"
                :src="item.icon"
              >
              <span>{{ item.title }}</span>
            </template>
          </a>
          <!-- 次要网址 -->
          <template v-if="item.subTitle && item.subUrl">
            <span>&nbsp;•&nbsp;</span>
            <a
              class="mx-website-fav-link"
              :title="item.subTitle"
              :style="{ 'color': item.subColor, 'font-weight': item.subBold ? 'bold' : '' }"
              :href="item.subUrl"
              target="_blank"
            >{{ item.subTitle }}</a>
          </template>
          <!-- 附加图片 -->
          <a
            v-if="item.bubbleUrl && item.bubbleImg"
            :href="item.bubbleUrl"
            target="_blank"
          >
            <img
              class="mx-website-fav-bubble"
              :src="item.bubbleImg"
            >
          </a>
        </div>
      </div>
    </MxTabPane>
    <!-- 底部广告 -->
    <template #footer>
      <div class="mx-website-ad">
        <a
          v-for="item in adDataList"
          :key="item.title"
          :href="item.url"
          target="_blank"
          class="mx-website-ad-item"
        >{{ item.title }}</a>
      </div>
    </template>
  </MxTabs>
</template>

<script setup>
import favDataGroup from '@/data/home-websites-fav';
import adDataList from '@/data/home-websites-ad';
</script>

<style lang="scss">
.mx-website {
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
