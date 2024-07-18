<!-- 底栏 -->
<template>
  <div class="mx-footer">
    <!-- 版权信息 -->
    <div class="mx-footer-infos">
      <span>版权所有</span>
      <span class="mx-footer-infos-bold">©</span>
      <span>{{ currentYear }} 网际傲游（北京）科技有限公司.</span>
      <MxLink
        class="mx-footer-infos-link"
        href="https://beian.miit.gov.cn/#/Integrated/index"
      >
        京ICP备11048873号-1
      </MxLink>
      <MxLink
        class="mx-footer-infos-link"
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802020068"
      >
        <img
          src="@/assets/images/footer-record.png"
          alt="备案"
        >
        <span>京公网安备 11010802020068号</span>
      </MxLink>
    </div>
    <!-- 链接 -->
    <div class="mx-footer-links">
      <MxLink
        v-for="item in linkItems"
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
        v-for="item in codeItems"
        :key="item.label"
        class="mx-footer-codes-item"
      >
        <MxLink
          class="mx-footer-codes-link"
          :href="item.url"
        >
          <img
            :src="item.img"
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
import img from '@/assets/images/footer-code.png';
const currentYear = new Date().getFullYear();

// 链接
const linkItems = [
  { label: '傲游浏览器', url: 'https://www.maxthon.com/zh/' },
  { label: '傲游微博', url: 'https://weibo.com/maxthon/?c=spr_web_yilang_maxthon_weibo_t001' },
  { label: '傲游论坛', url: 'https://bbs.maxthon.cn/' },
  { label: '关于我们', url: 'https://www.maxthon.com/zh/docs/about-us/' },
  { label: '联系我们', url: 'https://www.maxthon.com/zh/docs/contact' },
  { label: '用户反馈', url: 'https://report.maxthon.com/mx/bug/post/' }
];

// 二维码
const codeItems = [
  { label: '傲游浏览器 IOS 版', url: 'https://appsto.re/cn/RX8pG.i', img },
  { label: '傲游浏览器 Android 版', url: 'http://www.maxthon.com/zh/', img }
];
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
