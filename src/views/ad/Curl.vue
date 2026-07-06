<!-- 外部渠道跳转使用 -->
<template>
  <div style="text-align: center">正在跳转...</div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { use360Curl } from '@/utils/use-360-curl.js';

const route = useRoute();
const { onAdElMouseDown, onAdElMouseUp } = use360Curl();
onAdElMouseDown();
onAdElMouseUp(route.query.type, '_self');
</script>
