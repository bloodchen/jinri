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
      >
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
      <!-- 城市 -->
      <div
        v-if="weatherData.city"
        class="mx-topbar-tools-item"
      >
        <div>
          <span>{{ weatherData.city }}</span>
          <span
            class="mx-topbar-tools-toggle"
            @click="weatherLocaltionVisible = true"
          >[切换]</span>
        </div>
        <MxLink href="/weather">一周天气</MxLink>
      </div>
      <!-- 天气 -->
      <MxLink
        v-if="weatherData.today"
        href="/weather"
        :hover="false"
        class="mx-topbar-tools-item mx-topbar-weather-row"
      >
        <img
          class="mx-topbar-weather-icon"
          :src="weatherData.iconLocal"
          :alt="weatherData.today?.iconTitle"
        >
        <div class="mx-ml-5">
          <div class="mx-topbar-weather-row">
            <span>{{ weatherData.today?.iconTitle }}</span>
            <span
              class="mx-topbar-weather-aqi"
              :style="weatherAqiStyle"
            />
          </div>
          <div>{{ weatherData.today?.ltemp }}~{{ weatherData.today?.htemp }}</div>
        </div>
      </MxLink>
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
      <AdTopbarCenter />
    </div>
    <!-- 切换城市 -->
    <WeatherLocaltion
      v-if="weatherLocaltionVisible"
      :default-id="weatherCityId"
      @confirm="changeWeatherLocation"
      @close="weatherLocaltionVisible = false"
    />
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
import { ref, computed } from 'vue';
import { useStorage } from '@vueuse/core';
import solarLunar from 'solarLunar';

import WeatherLocaltion from '@/views/pages/weather/WeatherLocaltion.vue';
import AdTopbarCenter from '@/views/ad/AdTopbarCenter.vue';
import AdTopbarSliders from '@/views/ad/AdTopbarSliders.vue';

import emailList from '@/data/layout-topbar-emails.js';
import api from '@/api';

// 邮箱
const emailDialogVisible = ref(false);

// 设为首页
const homeDialogVisible = ref(false);

// 换肤
function changeSkin() {
  alert('敬请期待！');
}

// 日期
const dateObj = new Date();
const dateYear = dateObj.getFullYear();
const dateMonth = dateObj.getMonth() + 1;
const dateDate = dateObj.getDate();
// 农历日期
const solar2lunarData = solarLunar.solar2lunar(dateYear, dateMonth, dateDate);
const lunarDate = `${solar2lunarData.monthCn}${solar2lunarData.dayCn}`;
// 公立日期
const solarDate = `${dateYear}年${dateMonth}月${dateDate}日 ${solar2lunarData.ncWeek}`;

// 天气-获取城市
const weatherCityId = useStorage('weather-city-id', '');
const weatherData = ref({});
(async function() {
  if (!weatherCityId.value) {
    const res = await api.getWeatherCityByIp();
    weatherCityId.value = res._weather_cityid;
  }
  getWeatherData();
})();

// 天气-获取详情
async function getWeatherData() {
  const res = await api.getWeatherDetailByCityId(weatherCityId.value);
  if (res) {
    weatherData.value = res;
    const iconName = weatherData.value.today.icon.slice(-6);
    weatherData.value.iconLocal = `./images/weather/${iconName}`;
  }
}

// 天气-获取空气质量
const weatherAqiLevel = {
  优: '0 0',
  良: '0 -16px',
  轻度污染: '0 -32px',
  中度污染: '0 -48px',
  重度污染: '0 -64px',
  严重污染: '0 -80px'
};
const weatherAqiStyle = computed(() => {
  const level = weatherData.value?.today?.airGrade;
  if (!level) {
    return '';
  } else {
    return { 'background-position': weatherAqiLevel[weatherData.value?.today?.airGrade] };
  }
});

// 天气-定位弹窗
const weatherLocaltionVisible = ref(false);

// 天气-切换定位
function changeWeatherLocation(id) {
  weatherLocaltionVisible.value = false;
  if (id !== weatherCityId.value) {
    weatherCityId.value = id;
    getWeatherData();
  }
}
</script>

<style lang="scss">
.mx-topbar {
  position: relative;
  display: flex;
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
    align-items: center;
    height: 60px;
    font-size: 12px;
    line-height: 20px;
    color: #666;
    &-item {
      padding: 5px 10px;
      margin: 0 5px;
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

  // 天气
  &-weather {
    &-row {
      display: flex;
      align-items: center;
    }
    &-icon {
      width: 30px;
      height: 30px;
    }
    &-aqi {
      width: 28px;
      height: 16px;
      margin-left: 5px;
      background-image: url('@/assets/icons/weather-aqi.png');
    }
  }
}
</style>
