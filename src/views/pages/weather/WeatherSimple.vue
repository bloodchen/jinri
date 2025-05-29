<template>
  <!-- 城市 -->
  <div class="mx-topbar-tools-item">
    <div>
      <span>{{ cityData.cityName }}</span>
      <span
        class="mx-topbar-tools-toggle"
        @click="localtionVisible = true"
      >[切换]</span>
    </div>
    <MxLink
      class="mx-topbar-tools-icon"
      href="/weather"
    >
      一周天气
    </MxLink>
  </div>
  <!-- 天气 -->
  <MxLink
    v-if="weatherData"
    class="mx-topbar-tools-item mx-topbar-weather-row"
    href="/weather"
  >
    <img
      class="mx-topbar-weather-icon"
      :src="weatherData?.icon"
      :alt="weatherData?.text"
    />
    <div>
      <!-- <span
        class="mx-topbar-weather-aqi"
        :style="weatherAqiStyle"
      /> -->
      <div>{{ weatherData?.text }}</div>
      <div>{{ weatherData?.temp }}</div>
    </div>
  </MxLink>
  <!-- 切换城市 -->
  <WeatherLocaltion
    v-if="localtionVisible"
    @confirm="changeLocation"
    @close="localtionVisible = false"
  />
</template>

<script setup>
import { ref } from 'vue';
import { useStorage } from '@vueuse/core';
import api from '@/api';
import WeatherLocaltion from './WeatherLocaltionV2.vue';

// 获取城市
const cityData = useStorage('weather-city-info', { cityName: '当前城市' });
getWeatherData();

// 获取详情
const weatherData = ref(null);
async function getWeatherData() {
  const { lat, lon } = cityData.value;
  const params = lat && lon ? { lat, lon } : {};
  const res = await api.getWeatherDetail(params);
  if (!res || res.code) return;
  weatherData.value = {
    text: res.condition,
    icon: res.icon,
    temp: `${res.temp} °C`
  };
}

// 天气-获取空气质量
// const weatherAqiLevel = {
//   优: '0 0',
//   良: '0 -16px',
//   轻度污染: '0 -32px',
//   中度污染: '0 -48px',
//   重度污染: '0 -64px',
//   严重污染: '0 -80px'
// };
// const weatherAqiStyle = computed(() => {
//   const level = weatherData.value?.today?.airGrade;
//   if (!level) {
//     return '';
//   } else {
//     return { 'background-position': weatherAqiLevel[weatherData.value?.today?.airGrade] };
//   }
// });

// 切换定位
const localtionVisible = ref(false);
function changeLocation(data) {
  localtionVisible.value = false;
  cityData.value = {
    cityName: data.name,
    lat: data.lat,
    lon: data.lon
  };
  getWeatherData();
}
</script>

<style lang="scss">
.mx-topbar-weather {
  &-row {
    display: flex;
    gap: 5px;
    align-items: center;
    padding: 0 !important;
    padding-right: 10px !important;
  }
  &-icon {
    width: 50px;
    height: 50px;
  }
  &-aqi {
    width: 28px;
    height: 16px;
    background-image: url('@/assets/icons/weather-aqi.png');
  }
}
</style>
