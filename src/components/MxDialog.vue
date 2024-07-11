<!-- 弹窗 -->
<template>
  <div
    v-show="modelValue"
    class="mx-dialog"
    @click.self="closeDialog"
  >
    <div class="mx-dialog-content">
      <!-- 顶栏 -->
      <div class="mx-dialog-header">
        <span class="mx-dialog-title">{{ title }}</span>
        <MxIcon
          class="mx-dialog-close"
          @click="closeDialog"
        />
      </div>
      <!-- 内容 -->
      <div class="mx-dialog-body">
        <slot />
      </div>
      <!-- 底栏 -->
      <div class="mx-dialog-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup>
import MxIcon from './MxIcon.vue';

defineProps({
  modelValue: { type: Boolean, required: true },
  title: { type: String, default: '' }
});

const emits = defineEmits(['update:modelValue']);

function closeDialog() {
  emits('update:modelValue', false);
}
</script>

<style lang="scss">
.mx-dialog {
  position: fixed;
  inset: 0;
  z-index: 999;
  background-color: rgb(0 0 0 / 40%);
  backdrop-filter: blur(2px);
  &-content {
    width: 500px;
    margin: 15vh auto 50px;
    background-color: #fff;
    border-radius: 4px;
  }
  &-header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 20px 10px;
    font-size: 16px;
    line-height: 24px;
    color: #212121;
  }
  &-close {
    --icon-base: 0 0;
    --icon-active: 0 -16px;
    --icon-size: 16px;

    position: absolute;
    top: 10px;
    right: 10px;
    background-image: url('@/assets/icons/close.png');
    background-size: 16px auto;
  }
  &-body {
    padding: 35px 20px;
  }
  &-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 10px 20px;
  }
}
</style>
