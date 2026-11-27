// 360 curl
import { randomString } from '@/utils';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import CryptoJS from 'crypto-js';
import api from '@/api';

// 获取IP
let mxIp = '';
async function getIp() {
  if (!mxIp) {
    const ipRes = await api.getIp();
    mxIp = ipRes.data.ip;
  }
  return mxIp;
}

// 获取设备唯一标识
let mxMid = localStorage.getItem('mx-mid');
async function getMid() {
  if (!mxMid) {
    const fp = await FingerprintJS.load();
    const fpRes = await fp.get();
    mxMid = fpRes.visitorId;
    localStorage.setItem('mx-mid', mxMid);
  }
  return mxMid;
}

// 目前支持的网址
const curlMap = {
  // 在推荐站点中使用，添加前缀用于识别
  'curl-jd': { query: '京东', url: 'www.jd.com' },
  'curl-1688': { query: '1688', url: 'www.1688.com' },
  'curl-workbuddy': { query: 'WorkBuddy', url: 'www.workbuddy.cn', ls: 'sm3035827' },
  // 在其它地方使用
  'trae': { query: 'trae', url: 'www.trae.cn' },
  'tb': { query: '淘宝', url: 'www.taobao.com', ls: 'sm3027987' },
  'tb2': { query: '淘宝', url: 'www.taobao.com', ls: 'sm3029836' },
  'jd2': { query: '京东', url: 'www.jd.com', ls: 'sm3029835' }
};

// 傲游配置
const mxConfig = {
  testSecret: 'wVZdC3d5MVqM1MYc',
  prodSecret: 'WGjls8RZqHkOfT7Y',
  channel_id: '490',
  place_id: '1880',
  src: 'aoyou_mstation',
  ls: 'sm3027986'
};

// 获取curl：每次点击都要新的请求
async function get360Curl(key) {
  // 请求参数：顺序不能变
  const item = curlMap[key];
  const params = {
    channel_id: mxConfig.channel_id,
    ip: await getIp(),
    ls: item.ls || mxConfig.ls,
    mid: await getMid(),
    place_id: mxConfig.place_id,
    qtime: Math.floor(Date.now() / 1000),
    query: item.query,
    sid: randomString(32),
    src: mxConfig.src,
    ua: window.navigator.userAgent,
    url: item.url
    // signature: '',
    // ret_land_page: '',
    // redirect_land_page: '',
    // scheme: '',
  };
  // 签名：参数不能转码
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  const signature = CryptoJS.HmacSHA256(queryString, mxConfig.prodSecret).toString();
  // 请求：参数必须转码（axios自动转码）
  const res = await api.get360Curl({ ...params, signature });
  return res.data.data[0]?.curl;
}

// 获取跳转链接：接口无广告或请求失败时回落到静态地址
async function getCurlOrFallback(key) {
  try {
    const curl = await get360Curl(key);
    if (curl) return curl;
  } catch (e) {
    console.warn(`[360curl] ${key} 请求失败`, e);
  }
  return `https://${curlMap[key].url}/`;
}

// 跳转链接追加反作弊参数
export const use360Curl = () => {
  // 时间戳
  const timestamp = {
    st: Date.now(),
    dd: 0,
    ud: 0
  };

  // 按下鼠标
  function onAdElMouseDown() {
    timestamp.dd = Date.now();
  }

  // 松开鼠标
  async function onAdElMouseUp(key, target = '_blank') {
    if (!curlMap[key]) return;
    timestamp.ud = Date.now();
    // 在用户操作内同步打开，避免等待接口后被浏览器拦截。
    const tab = window.open('about:blank', target);
    if (!tab) return;
    tab.opener = null;
    const queryString = new URLSearchParams(timestamp).toString();
    let timer;
    let curl;
    try {
      curl = await Promise.race([
        getCurlOrFallback(key),
        new Promise(resolve => {
          timer = setTimeout(() => resolve(`https://${curlMap[key].url}/`), 5000);
        })
      ]);
    } finally {
      clearTimeout(timer);
    }
    if (tab.closed) return;
    const url = new URL(curl);
    const hash = url.hash;
    const base = curl.split('#')[0];
    tab.location.href = `${base}${url.search ? '&' : '?'}${queryString}${hash}`;
  }

  return { onAdElMouseDown, onAdElMouseUp };
};
