<!-- 外部渠道跳转使用 -->
<template>
  <div style="text-align: center">正在跳转...</div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { use360Curl } from '@/utils/use-360-curl.js';

const route = useRoute();
const { onAdElMouseDown, onAdElMouseUp } = use360Curl();

// 模拟点击事件：必须延时执行，否则会触发反作弊
setTimeout(onAdElMouseDown, 100);
setTimeout(() => onAdElMouseUp(route.query.type, '_self'), 200);
</script>
