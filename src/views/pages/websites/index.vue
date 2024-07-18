<!-- 二级页-网址 -->
<template>
  <div class="mx-websites">
    <!-- 品牌 -->
    <div class="mx-websites-brand">
      <MxLink
        v-for="item in brandData"
        :key="item.title"
        :href="item.url"
        class="mx-websites-brand-item"
      >
        <img
          :src="item.logoBase"
          class="mx-websites-brand-base"
        >
        <img
          :src="item.logoActive"
          class="mx-websites-brand-active"
        >
      </MxLink>
    </div>
    <!-- 网址 -->
    <div class="mx-websites-collection">
      <!-- 第1层 -->
      <div
        v-for="n1 in collectionData"
        :key="n1.title"
        class="mx-websites-n1-item"
        :style="{
          '--color-text': n1.colorText,
          '--color-bg': n1.colorBg
        }"
      >
        <div class="mx-websites-n1-left">
          <div class="mx-websites-n1-title">{{ n1.title }}</div>
          <img
            :src="n1.icon"
            :alt="n1.title"
          >
        </div>
        <div class="mx-websites-n1-children">
          <!-- 第2层 -->
          <div
            v-for="n2 in n1.children"
            :key="n2.title"
            class="mx-websites-n2-item"
          >
            <MxLink
              class="mx-websites-n2-title"
              :href="n2.url"
              :hover="false"
            >
              {{ n2.title }}
            </MxLink>
            <MxLink
              class="mx-websites-n2-more"
              :href="n2.url"
            >
              更多&gt;&gt;
            </MxLink>
            <div class="mx-websites-n2-children">
              <!-- 第3层 -->
              <MxLink
                v-for="n3 in n2.children"
                :key="n3.title"
                :title="n3.title"
                :href="n3.url"
                class="mx-websites-n3-item"
              >
                {{ n3.title }}
              </MxLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import brandData from '@/data/websites-brand.js';
import collectionData from '@/data/websites-collection.js';
</script>

<style lang="scss">
.mx-websites {
  background-color: #fff;
  border: 1px solid #e2e2e2;

  // 品牌
  &-brand {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 10px;
    justify-content: space-between;
    padding: 15px;
    &-base,
    &-item:hover &-active {
      display: block;
      width: 100%;
    }
    &-active,
    &-item:hover &-base {
      display: none;
    }
  }

  // 网址
  &-n1 {
    &-item {
      display: flex;
      padding: 15px 0 15px 15px;
      border-top: 1px solid #e2e2e2;
    }
    &-left {
      display: flex;
      flex: none;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      background-color: var(--color-bg);
    }
    &-title {
      width: 30px;
      font-size: 24px;
      color: #fff;
      text-shadow: rgb(0 0 0 / 40%) 0 1px 2px;
    }
    &-children {
      flex: auto;
      font-size: 14px;
      line-height: 34px;
    }
  }
  &-n2 {
    &-item {
      position: relative;
      display: flex;
      padding-left: 20px;
      &:hover {
        background-color: #f4f4f4;
      }
    }
    &-title {
      width: 30px;
      color: var(--color-text);
      text-align: center;
      border-bottom: 1px solid var(--color-bg);
    }
    &-more {
      position: absolute;
      right: 0;
      display: inline-block;
      width: 60px;
      color: #aaa;
    }
    &-children {
      display: grid;
      flex: auto;
      grid-template-columns: repeat(10, 1fr);
      padding-right: 80px;
      padding-left: 20px;
      border-bottom: 1px solid #f4f4f4;
    }
  }
  &-n3-item:hover {
    color: var(--color-text);
  }
  &-n2-item:last-child &-n2-title,
  &-n2-item:last-child &-n2-children {
    border-bottom: 0;
  }
}
</style>
