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

// 获取curl
const curlMap = {
  'curl-jd': { query: '京东', url: 'www.jd.com', curl: '', ls: 'sm3027986' },
  'curl-1688': { query: '1688', url: 'www.1688.com', curl: '', ls: 'sm3027986' },
  'jd2': { query: '京东', url: 'www.jd.com', curl: '', ls: 'sm3029835' },
  'tb2': { query: '淘宝', url: 'www.taobao.com', curl: '', ls: 'sm3029836' }
};
async function get360Curl(key) {
  const item = curlMap[key];
  if (item.curl) {
    return item.curl;
  }
  // 请求参数：顺序不能变
  const params = {
    channel_id: '490',
    ip: await getIp(),
    ls: item.ls,
    mid: await getMid(),
    place_id: '1880',
    qtime: Math.floor(Date.now() / 1000),
    query: item.query,
    sid: randomString(32),
    src: 'aoyou_mstation',
    ua: window.navigator.userAgent,
    url: item.url
    // signature: '',
    // ret_land_page: '',
    // redirect_land_page: '',
    // scheme: '',
  };
  // 签名：参数不能转码
  const secret = 'WGjls8RZqHkOfT7Y';
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  const signature = CryptoJS.HmacSHA256(queryString, secret).toString();
  // 请求：参数必须转码（axios自动转码）
  const res = await api.get360Curl({ ...params, signature });
  const curl = res.data.data[0]?.curl;
  curlMap[key].curl = curl;
  return curl;
}

// 跳转链接追加反作弊参数
export const use360Curl = () => {
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
    if (!timestamp.dd) return;
    // 时间
    timestamp.ud = Date.now();
    // 拼接参数并打开链接
    const queryString = new URLSearchParams(timestamp).toString();
    const curl = await get360Curl(key);
    window.open(`${curl}&${queryString}`, target);
    // 清空
    timestamp.dd = 0;
    timestamp.ud = 0;
  }

  return { onAdElMouseDown, onAdElMouseUp };
};
