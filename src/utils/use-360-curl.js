// 360 curl
import { onMounted } from 'vue';
import { useStorage } from '@vueuse/core';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { randomString } from '@/utils';
import CryptoJS from 'crypto-js';
import api from '@/api';

// 获取数据
let curl = '';
const mxMid = useStorage('mx-mid', '');
get360Curl();
async function get360Curl() {
  // 获取ip
  const ipRes = await api.getIp();
  const ip = ipRes.data.ip;
  // 获取设备唯一标识
  if (!mxMid.value) {
    const fp = await FingerprintJS.load();
    const fpRes = await fp.get();
    mxMid.value = fpRes.visitorId;
  }
  // 请求参数
  const params = {
    channel_id: '490',
    ip,
    ls: 'sm3027986',
    mid: mxMid.value,
    place_id: '1880',
    qtime: Math.floor(Date.now() / 1000),
    query: '京东',
    sid: randomString(32),
    src: 'aoyou_mstation',
    ua: window.navigator.userAgent,
    url: 'www.jd.com'
    // signature: '',
    // ret_land_page: '',
    // redirect_land_page: '',
    // scheme: '',
  };
  // 签名：参数不要转码
  const secret = 'WGjls8RZqHkOfT7Y';
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  const signature = CryptoJS.HmacSHA256(queryString, secret).toString();
  // 发送请求
  const res = await api.get360Curl({ ...params, signature });
  curl = res.data.data[0]?.curl;
}

// 跳转链接追加反作弊参数
export const use360Crul = () => {
  const timestamp = { st: 0, dd: 0, ud: 0 };

  // 页面加载时间
  onMounted(() => {
    timestamp.st = Date.now();
  });

  // 按下鼠标时间
  function onAdElMouseDown() {
    timestamp.dd = Date.now();
  }

  // 抬起鼠标
  function onAdElMouseUp() {
    if (!timestamp.dd) return;
    // 时间
    timestamp.ud = Date.now();
    // 拼接参数并打开
    const queryString = new URLSearchParams(timestamp).toString();
    window.open(`${curl}&${queryString}`, '_blank');
    // 清空
    timestamp.dd = 0;
    timestamp.ud = 0;
  }

  return { onAdElMouseDown, onAdElMouseUp };
};
