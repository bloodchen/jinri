import { useStorage } from '@vueuse/core';

// 获取随机ID
export function getGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// 获取随机整数
export function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 是否显示广告
export function getAdVisible(data, key) {
  let isOpen = false;
  const now = Date.now();
  // 开始时间 <= 当前时间 <= 结束时间
  const ts1 = new Date(data.startTime).getTime();
  const ts2 = new Date(data.endTime).getTime();
  isOpen = ts1 <= now && now <= ts2;
  // 重新开启时间 <= 当前时间
  if (isOpen && key) {
    const nextOpenTs = useStorage('next-open-time', {});
    const ts3 = nextOpenTs.value[key];
    isOpen = !ts3 || ts3 <= now;
  }
  return isOpen;
}

// 关闭广告
export function setAdNextOpenTime(key) {
  const nextOpenTs = useStorage('next-open-time', {});
  const today = new Date();
  const tomarrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  nextOpenTs.value[key] = tomarrow.getTime();
}
