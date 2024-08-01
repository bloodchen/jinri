<!-- 顶栏 -->
<template>
  <div class="mx-header">
    <HeaderTopbar />
    <HeaderSearchbar class="mx-mt-30" />
    <HeaderHotword class="mx-mt-5" />
    <headerTriangle />
  </div>
</template>

<script setup>
import HeaderTopbar from './HeaderTopbar.vue';
import HeaderSearchbar from './HeaderSearchbar.vue';
import HeaderHotword from './HeaderHotword.vue';
import headerTriangle from './headerTriangle.vue';
</script>
