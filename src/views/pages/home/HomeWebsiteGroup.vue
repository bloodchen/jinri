<!-- 首页-网址导航-网址分组 -->
<template>
  <div
    v-for="group in data"
    :key="group.groupName"
    :style="{ '--cols': cols }"
    class="mx-hwebsite-list"
  >
    <div
      v-for="item in group.children"
      :key="item.title"
      class="mx-hwebsite-item"
      :class="{
        'is-draggable': !!dragStatus,
        'is-draging': item.id === dragItem.id,
        'is-dragenter': item.id === targetItem.id
      }"
      draggable="true"
      @dragstart="handleDragStart(item)"
      @dragenter.prevent="handleDragEnter(item)"
      @dragover.prevent
      @dragleave="handleDragLeave(item, $event)"
      @dragend="handleDragEnd(item)"
    >
      <!-- 主要网址 -->
      <MxLink
        class="mx-hwebsite-link"
        :title="item.title"
        :style="{ 'color': item.color, 'font-weight': item.bold ? 'bold' : '' }"
        :href="!!dragStatus ? 'javascript:;' : item.url"
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
          :href="!!dragStatus ? 'javascript:;' : item.subUrl"
        >
          {{ item.subTitle }}
        </MxLink>
      </template>
      <!-- 附加图片 -->
      <MxLink
        v-if="item.bubbleUrl && item.bubbleImg"
        :href="!!dragStatus ? 'javascript:;' : item.bubbleUrl"
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
import { ref } from 'vue';

defineProps({
  data: { type: Array, default: null },
  editable: { type: Boolean, default: false },
  cols: { type: String, default: '' }
});

const emits = defineEmits(['remove', 'edit', 'sort']);

// 编辑
function onEdit(item) {
  emits('edit', item);
}

// 删除
function onRemove(item) {
  emits('remove', item);
}

// 拖拽
const dragStatus = ref('');
const dragItem = ref({});
const targetItem = ref({});
// dragenter  按下鼠标开始拖拽
function handleDragStart(item) {
  dragStatus.value = 'start';
  dragItem.value = item;
}
// dragenter  移入自身或其它元素
function handleDragEnter(item) {
  if (item.id !== dragItem.value.id) {
    dragStatus.value = 'enter';
    targetItem.value = item;
  }
}
// drag       移动鼠标持续拖拽
// dragover   在自身或其它元素中移动
// dragleave  移出自身或其它元素
function handleDragLeave(item, event) {
  if (item.id !== dragItem.value.id) {
    dragStatus.value = event.offsetX > 0 ? 'leaveright' : 'leaveleft';
    targetItem.value = item;
    const dragIndex = dragItem.value.sortIndex;
    const targetIndex = targetItem.value.sortIndex;
    // 向左/右退回到原位置时不操作
    const dragBackToLeft = dragStatus.value === 'leaveleft' && dragIndex === targetIndex - 1;
    const dragBackToRight = dragStatus.value === 'leaveright' && dragIndex === targetIndex + 1;
    if (dragBackToLeft || dragBackToRight) return;
    // 先在原位置删除，再在新位置添加
    emits('sort', { dragItem: dragItem.value, dragIndex, targetIndex });
  }
}
// dragend    松开鼠标停止拖拽
function handleDragEnd() {
  dragStatus.value = '';
  dragItem.value = {};
  targetItem.value = {};
}
</script>

<style lang="scss">
.mx-hwebsite {
  &-list {
    display: grid;
    grid-template-columns: repeat(var(--cols), 1fr);
    padding: 5px 0;
    border-bottom: 1px solid #e7e7e7;
    &:last-child {
      border: 0;
    }
  }
  &-item {
    padding: 0 5px;
    white-space: nowrap;
    cursor: move;
    border: 1px solid transparent;
    transition: all .2s;
    &:hover {
      background-color: #f1f1f1;
      border-color: #f1f1f1;
    }
    &.is-draggable:hover {
      background-color: #ddd;
      border-color: #7dc0f5;
    }
    &.is-draging {
      visibility: hidden;
      border-color: #7dc0f5 !important;
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

    flex: auto;
    align-items: center;
    justify-content: flex-end;
  }
  &-btns,
  &-item.is-draggable &-btns {
    display: none;
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
