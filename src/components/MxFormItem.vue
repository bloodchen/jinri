<!-- 表单项 -->
<template>
  <div class="mx-form-item">
    <!-- 文本 -->
    <label
      class="mx-form-label"
      :style="{ width: labelWidth }"
    >
      {{ label }}
    </label>
    <div class="mx-form-control">
      <!-- 输入框 -->
      <input
        v-if="field === 'input'"
        type="text"
        class="mx-form-input"
        :value="modelValue"
        @input="onInput"
        @change="onChange"
      >
      <!-- 下拉框 -->
      <select
        v-else-if="field === 'select'"
        class="mx-form-input"
        :value="modelValue"
        @change="onChange"
      >
        <slot />
      </select>
    </div>
  </div>
</template>

<script setup>
defineProps({
  // 文本
  label: { type: String, default: '' },
  // 文本宽度
  labelWidth: { type: String, default: '' },
  // 表单元素：input, select
  field: { type: String, default: 'input' },
  // 表单元素值
  modelValue: { type: [String, Number], default: '' }
});

// 更新内容
const emits = defineEmits(['update:modelValue', 'change', 'input']);
function onInput(e) {
  emits('update:modelValue', e.target.value);
  emits('input', e.target.value);
}
function onChange(e) {
  emits('update:modelValue', e.target.value);
  emits('change', e.target.value);
}
</script>

<style lang="scss">
.mx-form {
  &-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  &-label {
    min-width: 4em;
    font-size: 14px;
    text-align: right;
  }
  &-input {
    width: 230px;
    height: 32px;
    padding: 0 10px;
    margin-left: 10px;
    font-size: 14px;
    border: 1px solid #e8e8e8;
  }
}
</style>
