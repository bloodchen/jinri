<!-- 底栏 -->
<template>
  <div class="mx-footer">
    <!-- 版权信息 -->
    <div class="mx-footer-infos">
      <span>版权所有</span>
      <span class="mx-footer-infos-bold">©</span>
      <span>{{ currentYear }} 北京傲游天下科技有限公司.</span>
      <MxLink
        href="https://beian.miit.gov.cn/#/Integrated/index"
        class="mx-footer-infos-link"
      >
        京ICP备08011055号-2
      </MxLink>
      <MxLink
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802036007"
        class="mx-footer-infos-link"
      >
        <img
          src="@/assets/images/footer-record.png"
          alt="备案"
        >
        <span>京公网安备 11010802036007号</span>
      </MxLink>
    </div>
    <!-- 链接 -->
    <div class="mx-footer-links">
      <MxLink
        v-for="item in footerLinks"
        :key="item.label"
        :href="item.url"
        class="mx-footer-links-item"
      >
        {{ item.label }}
      </MxLink>
    </div>
    <!-- 下载 -->
    <div class="mx-footer-codes">
      <div
        v-for="item in footerDownloads"
        :key="item.label"
        class="mx-footer-codes-item"
      >
        <MxLink
          :href="item.url"
          class="mx-footer-codes-link"
        >
          <img
            src="@/assets/images/footer-code.png"
            :alt="item.label"
            class="mx-footer-codes-img"
          >
        </MxLink>
        <div class="mx-mt-5">{{ item.label }}</div>
      </div>
    </div>
    <div class="mx-mt-20">使用手机二维码扫描器扫描该图形即可下载</div>
  </div>
</template>

<script setup>
import { footerLinks, footerDownloads } from '@/data/layout-footer.js';

// 今年
const currentYear = new Date().getFullYear();
</script>

<style lang="scss">
.mx-footer {
  font-size: 12px;
  color: #888;
  text-align: center;
  a {
    color: #666;
  }

  // 版权信息
  &-infos {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 30px;
    &-bold {
      font-weight: bold;
    }
    &-link {
      display: flex;
      align-items: center;
      margin-left: 10px;
    }
  }

  // 链接
  &-links-item {
    margin: 0 10px;
    line-height: 30px;
  }

  // 下载
  &-codes {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    &-item {
      margin: 0 15px;
    }
    &-link,
    &-img {
      display: block;
      width: 90px;
      height: 90px;
      margin: 0 auto;
    }
  }
}
</style>
