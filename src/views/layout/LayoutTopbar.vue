<!-- 顶栏 -->
<template>
  <div class="mx-topbar">
    <!-- logo -->
    <MxLink
      href="/"
      class="mx-topbar-logo"
    >
      <img
        class="mx-topbar-logo-img"
        src="@/assets/images/topbar-logo.png"
        alt="logo"
      />
    </MxLink>
    <!-- 工具 -->
    <div class="mx-topbar-tools">
      <!-- 邮箱登录和设为首页 -->
      <div class="mx-topbar-tools-item">
        <div
          class="mx-topbar-tools-icon"
          @click="emailDialogVisible = true"
        >
          <MxIcon class="is-email" />
          <span>邮箱登录</span>
        </div>
        <div
          class="mx-topbar-tools-icon"
          @click="homeDialogVisible = true"
        >
          <MxIcon class="is-home" />
          <span>设为首页</span>
        </div>
      </div>
      <!-- 时间 -->
      <div class="mx-topbar-tools-item">
        <div>{{ solarDate }}</div>
        <div>
          <span>{{ lunarDate }}</span>
          <MxLink
            href="http://qq.ip138.com/day/"
            class="mx-topbar-tools-toggle"
          >
            [万年历]
          </MxLink>
        </div>
      </div>
      <!-- 天气 -->
      <WeatherSimple />
      <!-- 换肤和反馈 -->
      <div class="mx-topbar-tools-item">
        <div
          class="mx-topbar-tools-icon"
          @click="changeSkin"
        >
          <MxIcon class="is-skin" />
          <span>换肤</span>
        </div>
        <MxLink
          href="https://report.maxthon.com/mx/bug/post/"
          class="mx-topbar-tools-icon"
        >
          <MxIcon class="is-feedback" />
          <span>反馈</span>
        </MxLink>
      </div>
      <!-- 广告 -->
      <AdTopbarPendant />
    </div>
    <!-- 邮箱 -->
    <MxDialog
      v-if="emailDialogVisible"
      :style="{ '--width': '600px' }"
      title="邮箱登录"
      @close="emailDialogVisible = false"
    >
      <div class="mx-topbar-email">
        <MxLink
          v-for="item in emailList"
          :key="item.key"
          :href="item.url"
        >
          {{ item.label }}
        </MxLink>
      </div>
      <template #footer>
        <MxBtn
          type="info"
          @click="emailDialogVisible = false"
        >
          关闭
        </MxBtn>
      </template>
    </MxDialog>
    <!-- 设为首页 -->
    <MxDialog
      v-if="homeDialogVisible"
      title="下载桌面快捷方式"
      @close="homeDialogVisible = false"
    >
      <div>把傲游今日下载到桌面，访问更方便</div>
      <template #footer>
        <MxLink
          href="/desktop/傲游今日.url"
          download="傲游今日.url"
          class="mx-topbar-home-link"
          @click="homeDialogVisible = false"
        />
        <MxBtn
          type="info"
          class="mx-ml-10"
          @click="homeDialogVisible = false"
        >
          取消
        </MxBtn>
      </template>
    </MxDialog>
    <!-- 广告 -->
    <AdTopbarSliders />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import dayjs from 'dayjs';
import solarLunar from 'solarLunar';

import WeatherSimple from '@/views/pages/weather/WeatherSimple.vue';
import AdTopbarPendant from '@/views/ad/AdTopbarPendant.vue';
import AdTopbarSliders from '@/views/ad/AdTopbarSliders.vue';

import emailList from '@/data/layout-topbar-emails.js';

// 邮箱
const emailDialogVisible = ref(false);

// 设为首页
const homeDialogVisible = ref(false);

// 换肤
function changeSkin() {
  alert('敬请期待！');
}

// 公立日期
const dateNow = dayjs();
const dateYear = dateNow.year();
const dateMonth = dateNow.month() + 1;
const dateDate = dateNow.date();
// 公立日期转农历
const solar2lunarData = solarLunar.solar2lunar(dateYear, dateMonth, dateDate);
// 公立日期+星期
const solarDate = `${dateYear}年${dateMonth}月${dateDate}日 ${solar2lunarData.ncWeek}`;
// 农历日期
const lunarDate = `${solar2lunarData.monthCn}${solar2lunarData.dayCn}`;
</script>

<style lang="scss">
.mx-topbar {
  position: relative;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;

  // logo
  &-logo,
  &-logo-img {
    display: block;
    width: 140px;
    height: 60px;
  }

  // 工具
  &-tools {
    display: flex;
    gap: 10px;
    align-items: center;
    height: 60px;
    font-size: 12px;
    line-height: 20px;
    color: #666;
    &-item {
      padding: 5px 10px;
      white-space: nowrap;
      border-radius: 2px;
      &:hover {
        background-color: rgb(0 0 0 / 4%);
      }
    }
    &-icon {
      display: flex;
      align-items: center;
      cursor: pointer;
      .mx-icon {
        font-size: 18px;
        background-image: url('@/assets/icons/header-common.png');
      }
      .is-email {
        --icon-base: 0 0;
      }
      .is-home {
        --icon-base: 0 -18px;
      }
      .is-skin {
        --icon-base: 0 -36px;
      }
      .is-feedback {
        --icon-base: 0 -54px;
      }
    }
    &-icon:hover {
      color: #07f;
      .mx-icon {
        background-image: url('@/assets/icons/topbar-common.png');
      }
      .is-home {
        --icon-base: 0 -36px;
      }
      .is-skin {
        background-position: 0 -72px;
      }
      .is-feedback {
        background-position: 0 -108px;
      }
    }
    &-toggle {
      color: #b2b2b2;
      cursor: pointer;
      &:hover {
        color: #07f;
      }
    }
  }

  // 邮箱
  &-email {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px 20px;
  }

  // 首页
  &-home-link {
    display: inline-block;
    width: 146px;
    height: 25px;
    background-image: url('@/assets/icons/topbar-home.png');
    &:hover {
      background-position: 0 -26px;
    }
  }
}
</style>
