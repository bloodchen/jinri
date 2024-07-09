<!-- 首页工具 -->
<template>
  <div class="mx-tools">
    <a
      v-for="item in toolsList"
      :key="item.label"
      class="mx-tools-link"
      :title="item.label"
      :href="item.url"
      target="_blank"
    >
      <div
        class="mx-tools-icon"
        :style="`--icon-base: ${item.iconBase}; --icon-hover: ${item.iconHover}`"
      />
      <div class="mx-tools-title">{{ item.label }}</div>
    </a>
  </div>
</template>

<script setup>
const toolsList = [
  { label: '天气', iconBase: '3px 3px', iconHover: '-32px 3px', url: '/weather' },
  { label: '携程', iconBase: '3px -172px', iconHover: '-33px -172px', url: 'https://go.mxfast.com/ctrip/' },
  { label: '快递', iconBase: '3px -65px', iconHover: '-32px -65px', url: 'http://www.kuaidi.com/' },
  { label: '星座', iconBase: '4px -102px', iconHover: '-31px -102px', url: 'http://www.d1xz.net' },
  { label: '外汇', iconBase: '7px -32px', iconHover: '-28px -32px', url: 'http://www.boc.cn/sourcedb/whpj/' }
];
</script>

<style lang="scss">
.mx-tools {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  border: 1px solid #e2e2e2;
  border-right: none;
  &-link {
    padding: 4px 0;
    border-right: 1px solid #e2e2e2;
    &:hover {
      background-color: #08f;
    }
  }
  &-icon {
    width: 30px;
    height: 30px;
    margin: 0 auto;
    background-image: url('@/assets/icons/home-tools.png');
    background-repeat: no-repeat;
    background-position: var(--icon-base);
  }
  &-link:hover &-icon {
    background-position: var(--icon-hover);
  }
  &-title {
    margin-top: 2px;
    font-size: 12px;
    color: #666;
    text-align: center;
  }
  &-link:hover &-title {
    color: #fff;
  }
}
</style>
