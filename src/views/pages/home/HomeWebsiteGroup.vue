<!-- 首页-网址导航-网址分组 -->
<template>
  <div
    v-for="group in data"
    :key="group.groupName"
    class="mx-hwebsite-list"
  >
    <div
      v-for="item in group.children"
      :key="item.title"
      class="mx-hwebsite-item"
      :class="{ 'is-editable': editable }"
    >
      <!-- 主要网址 -->
      <MxLink
        class="mx-hwebsite-link"
        :title="item.title"
        :style="{ 'color': item.color, 'font-weight': item.bold ? 'bold' : '' }"
        :href="item.url"
      >
        <img
          v-if="item.titleImg"
          class="mx-hwebsite-img"
          :src="item.titleImg"
        >
        <template v-else>
          <img
            v-if="item.icon || item.iconSet"
            class="mx-hwebsite-icon"
            :src="item.icon || item.iconSet"
          >
          <span class="mx-hwebsite-text">{{ item.title }}</span>
        </template>
      </MxLink>
      <!-- 次要网址 -->
      <template v-if="item.subTitle && item.subUrl">
        <span>&nbsp;•&nbsp;</span>
        <MxLink
          class="mx-hwebsite-link"
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
          class="mx-hwebsite-bubble"
          :src="item.bubbleImg"
        >
      </MxLink>
      <!-- 操作栏 -->
      <div
        v-if="editable"
        class="mx-hwebsite-btns"
      >
        <MxIcon
          class="mx-hwebsite-edit"
          @click="onEdit(item)"
        />
        <MxIcon
          class="mx-hwebsite-remove"
          @click="onRemove(item)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: { type: Array, default: null },
  editable: { type: Boolean, default: false }
});

const emits = defineEmits(['remove', 'edit']);

function onEdit(item) {
  emits('edit', item);
}
function onRemove(item) {
  emits('remove', item);
}
</script>

<style lang="scss">
.mx-hwebsite {
  &-list {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    padding: 5px 0;
    border-bottom: 1px solid #e7e7e7;
    &:last-child {
      border: 0;
    }
  }
  &-item {
    padding: 0 5px;
    white-space: nowrap;
    &.is-editable:hover {
      background-color: #f7f7f7;
    }
  }
  &-item,
  &-link {
    display: flex;
    align-items: center;
    height: 30px;
    overflow: hidden;
  }
  &-link {
    font-size: 14px;
    color: #444;
  }
  &-img {
    flex: none;
    height: 30px;
  }
  &-icon {
    flex: none;
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
  &-bubble {
    display: block;
    margin-left: 5px;
  }
  &-text {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &-btns {
    --icon-size: 12px;

    display: none;
    flex: auto;
    align-items: center;
    justify-content: flex-end;
  }
  &-item:hover &-btns {
    display: flex;
  }
  &-edit,
  &-remove {
    flex: none;
    margin-left: 5px;
    background-image: url('@/assets/sprites/home-website.png');
  }
  &-edit {
    --icon-base: -10px -200px;
    --icon-active: -10px -222px;
  }
  &-remove {
    --icon-base: -10px -243px;
    --icon-active: -10px -263px;
  }
}
</style>
