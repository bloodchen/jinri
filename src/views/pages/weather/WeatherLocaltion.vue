<!-- 二级页-天气-选择城市 -->
<template>
  <MxDialog
    title="切换城市"
    @close="onClose"
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
      <MxBtn @click="onConfirm">确认</MxBtn>
      <MxBtn
        type="info"
        @click="onClose"
      >
        取消
      </MxBtn>
    </template>
  </MxDialog>
</template>

<script setup>
import { ref } from 'vue';
import api from '@/api';

// 默认id
const props = defineProps({
  defaultId: { type: String, required: true }
});

// 省
const provinceId = ref('');
const provinceMap = ref({});
// 市
const cityId = ref('');
const cityMap = ref({});
// 区
const districtId = ref('');
const districtMap = ref({});

// 初始化
// 前5位是省
provinceId.value = props.defaultId.slice(0, 5);
// 第67位是市
const id2 = props.defaultId.slice(5, 7);
// 第89位是区县
const id3 = props.defaultId.slice(7, 9);
// 如果区县是00需要和市调整位置
if (id3 === '00') {
  cityId.value = id3;
  districtId.value = id2;
} else {
  cityId.value = id2;
  districtId.value = id3;
}

// 获取定位
getProvinceMap();
getCityMap('init');
getDistrictMap('init');

// 获取省
async function getProvinceMap() {
  const { data } = await api.getWeatherLocationById('provinces');
  provinceMap.value = data;
}

// 获取市
// 'init'（初始化时）'change'（修改时）
async function getCityMap(type) {
  const path = `cities?province-id=${provinceId.value}`;
  const { data } = await api.getWeatherLocationById(path);
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
  const { data } = await api.getWeatherLocationById(path);
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

const emits = defineEmits(['confirm', 'close']);

// 确定
// 使用省市区的ID拼接城市key，如果区县是00需要和市调整位置
function onConfirm() {
  let newId;
  if (cityId.value === '00') {
    newId = provinceId.value + districtId.value + cityId.value;
  } else {
    newId = provinceId.value + cityId.value + districtId.value;
  }
  emits('confirm', newId);
}

// 关闭
function onClose() {
  emits('close');
}
</script>
