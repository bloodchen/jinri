<!-- 顶栏-工具栏 -->
<template>
  <div class="mx-topbar">
    <!-- logo -->
    <MxLink
      href="/"
      class="mx-topbar-logo"
    >
      <img
        class="mx-topbar-logo-img"
        src="@/assets/images/header-topbar-logo.png"
        alt="logo"
      >
    </MxLink>
    <!-- 工具 -->
    <div class="mx-topbar-tools">
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
      <div class="mx-topbar-tools-item">
        <div>{{ solarDate }}</div>
        <div>
          <span>{{ lunarDate }}</span>
          <MxLink
            class="mx-topbar-tools-toggle"
            href="http://qq.ip138.com/day/"
          >
            [万年历]
          </MxLink>
        </div>
      </div>
      <div
        v-if="weatherData.city"
        class="mx-topbar-tools-item"
      >
        <div>
          <span>{{ weatherData.city }}</span>
          <span
            class="mx-topbar-tools-toggle"
            @click="openAreaDialog"
          >[切换]</span>
        </div>
        <MxLink href="/weater">一周天气</MxLink>
      </div>
      <MxLink
        v-if="weatherData.today"
        class="mx-topbar-tools-item mx-topbar-weather-row"
        href="/weater"
        :hover="false"
      >
        <img
          class="mx-topbar-weather-icon"
          :src="weatherData.iconLocal"
          :alt="weatherData.today.iconTitle"
        >
        <div class="mx-ml-5">
          <div class="mx-topbar-weather-row">
            <span>{{ weatherData.today.iconTitle }}</span>
            <span
              class="mx-topbar-weather-aqi"
              :style="weatherAqiStyle"
            />
          </div>
          <div>{{ weatherData.today.ltemp }}~{{ weatherData.today.htemp }}</div>
        </div>
      </MxLink>
      <div class="mx-topbar-tools-item">
        <div
          class="mx-topbar-tools-icon"
          @click="changeSkin"
        >
          <MxIcon class="is-skin" />
          <span>换肤</span>
        </div>
        <MxLink
          class="mx-topbar-tools-icon"
          href="https://report.maxthon.com/mx/bug/post/"
        >
          <MxIcon class="is-feedback" />
          <span>反馈</span>
        </MxLink>
      </div>
    </div>
    <!-- 邮箱 -->
    <MxDialog
      v-model="emailDialogVisible"
      :style="{ '--width': '600px' }"
      title="邮箱登录"
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
      v-model="homeDialogVisible"
      title="下载桌面快捷方式"
    >
      <div>把傲游今日下载到桌面，访问更方便</div>
      <template #footer>
        <MxLink
          class="mx-topbar-home-link"
          href="/desktop/傲游今日.url"
          download="傲游今日.url"
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
    <!-- 切换城市 -->
    <MxDialog
      v-model="areaDialogVisible"
      title="切换城市"
    >
      <MxFormItem
        v-model="provinceId"
        label="省："
        field="select"
        @change="getCityMap('change')"
      >
        <option
          v-for="(item, key) in provinceMap"
          :key="key"
          :value="key"
        >
          {{ item.province }}
        </option>
      </MxFormItem>
      <MxFormItem
        v-model="cityId"
        label="市："
        field="select"
        @change="getDistrictMap('change')"
      >
        <option
          v-for="(item, key) in cityMap"
          :key="key"
          :value="key"
        >
          {{ item.city }}
        </option>
      </MxFormItem>
      <MxFormItem
        v-model="districtId"
        label="区："
        field="select"
      >
        <option
          v-for="(item, key) in districtMap"
          :key="key"
          :value="key"
        >
          {{ item.district }}
        </option>
      </MxFormItem>
      <template #footer>
        <MxBtn @click="changeCity">确认</MxBtn>
        <MxBtn
          type="info"
          @click="areaDialogVisible = false"
        >
          取消
        </MxBtn>
      </template>
    </MxDialog>
    <!-- 广告 -->
    <MxSwiper class="mx-topbar-ad">
      <MxSwiperSlide
        v-for="item in adList"
        :key="item.name"
      >
        <MxLink :href="item.url">
          <img
            :src="item.img"
            :alt="item.name"
          >
        </MxLink>
      </MxSwiperSlide>
    </MxSwiper>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStorage } from '@vueuse/core';
import solarLunar from 'solarLunar';

import api from '@/api';
import adList from '@/data/header-topbar-ads.js';
import emailList from '@/data/header-topbar-emails.js';

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

// 天气
// 获取城市
const weatherCityId = useStorage('weather-city-id', '');
const weatherData = ref({});
getCityData();
async function getCityData() {
  if (!weatherCityId.value) {
    const res = await api.getWeatherCityByIp();
    weatherCityId.value = res._weather_cityid;
  }
  getWeatherData();
}
// 获取天气
async function getWeatherData() {
  weatherData.value = await api.getWeatherDetailByCityId(weatherCityId.value);
  const iconName = weatherData.value.today.icon.slice(-6);
  weatherData.value.iconLocal = `./images/weather/${iconName}`;
  getAqiStyle();
}

// 获取空气质量
const weatherAqiStyle = ref({});
function getAqiStyle() {
  const aqiObj = {
    优: '0 0',
    良: '0 -16px',
    轻度污染: '0 -32px',
    中度污染: '0 -48px',
    重度污染: '0 -64px',
    严重污染: '0 -80px'
  };
  weatherAqiStyle.value = { 'background-position': aqiObj[weatherData.value.today.airGrade] };
}

// 切换城市
const areaDialogVisible = ref(false);
// 省
const provinceId = ref('');
const provinceMap = ref({});
// 市
const cityId = ref('');
const cityMap = ref({});
// 区
const districtId = ref('');
const districtMap = ref({});

// 打开弹窗
function openAreaDialog() {
  areaDialogVisible.value = true;
  // 前5位是省
  provinceId.value = weatherCityId.value.slice(0, 5);
  // 第67位是市
  const id2 = weatherCityId.value.slice(5, 7);
  // 第89位是区县
  const id3 = weatherCityId.value.slice(7, 9);
  // 如果区县是00需要和市调整位置
  if (id3 === '00') {
    cityId.value = id3;
    districtId.value = id2;
  } else {
    cityId.value = id2;
    districtId.value = id3;
  }
  // 获取区域
  getProvinceMap();
  getCityMap('init');
  getDistrictMap('init');
}

// 获取省
async function getProvinceMap() {
  const { data } = await api.getWeatherAreaById('provinces');
  provinceMap.value = data;
}
// 获取市
// 'init'（初始化时）'change'（修改时）
async function getCityMap(type) {
  const path = `cities?province-id=${provinceId.value}`;
  const { data } = await api.getWeatherAreaById(path);
  cityMap.value = data;
  if (type === 'init') return;
  // 如果是修改省份后重新获取城市，需要获取默认选中的城市，然后再获取区县
  cityId.value = getDefaultValue(cityMap.value);
  getDistrictMap(type);
}
// 获取区县
// 'init'（初始化时）'change'（修改时）
async function getDistrictMap(type) {
  const path = `districts?province-id=${provinceId.value}&city-id=${cityId.value}`;
  const { data } = await api.getWeatherAreaById(path);
  districtMap.value = data;
  if (type === 'init') return;
  // 如果是修改城市后重新获取区县，需要获取默认选中的区县
  districtId.value = getDefaultValue(districtMap.value);
}
// 获取默认选中的项
function getDefaultValue(data) {
  const keys = Object.keys(data).sort();
  const selectedKey = keys.find(key => data[key].selected);
  return selectedKey;
}
// 切换城市
function changeCity() {
  // 使用省市区的ID拼接城市key，如果区县是00需要和市调整位置
  if (cityId.value === '00') {
    weatherCityId.value = provinceId.value + districtId.value + cityId.value;
  } else {
    weatherCityId.value = provinceId.value + cityId.value + districtId.value;
  }
  // 重新查询天气
  areaDialogVisible.value = false;
  getWeatherData();
}
</script>

<style lang="scss">
.mx-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;

  // logo
  &-logo {
    display: block;
    &-img {
      display: block;
      width: 140px;
      height: 60px;
    }
  }

  // 工具
  &-tools {
    display: flex;
    align-items: center;
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
        --icon-size: 18px;

        background-image: url('@/assets/sprites/header-common.png');
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
        background-image: url('@/assets/sprites/header-topbar-common.png');
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
    background-image: url('@/assets/sprites/header-topbar-home.png');
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
      background-image: url('@/assets/sprites/weather-aqi.png');
    }
  }

  // 广告
  &-ad {
    width: 140px;
    height: 48px;
    .swiper-button-prev,
    .swiper-button-next {
      --swiper-navigation-size: 12px;

      display: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
    &:hover {
      .swiper-button-prev,
      .swiper-button-next {
        display: flex;
      }
    }
  }
}
</style>
