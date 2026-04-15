// 360 curl
import { randomString } from '@/utils';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import CryptoJS from 'crypto-js';
import api from '@/api';

// 需要的url
const curlMap = {
  'curl-jd': { query: '京东', url: 'www.jd.com', curl: '' },
  'curl-1688': { query: '1688', url: 'www.1688.com', curl: '' }
};

// 先获取基础数据
let mxIp = '';
let mxMid = localStorage.getItem('mx-mid');
getBaseData();
async function getBaseData() {
  // 获取ip
  if (!mxIp) {
    const ipRes = await api.getIp();
    mxIp = ipRes.data.ip;
  }
  // 获取设备唯一标识
  if (!mxMid) {
    const fp = await FingerprintJS.load();
    const fpRes = await fp.get();
    mxMid = fpRes.visitorId;
    localStorage.setItem('mx-mid', mxMid);
  }
  // 再获取 curl
  for (const key in curlMap) {
    get360Curl(key, curlMap[key]);
  }
}

// 获取数据
async function get360Curl(key, item) {
  // 请求参数：顺序不能变
  const params = {
    channel_id: '490',
    ip: mxIp,
    ls: 'sm3027986',
    mid: mxMid,
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
  curlMap[key].curl = res.data.data[0]?.curl;
}

// 跳转链接追加反作弊参数
export const use360Curl = key1 => {
  const timestamp = {
    st: Date.now(),
    dd: 0,
    ud: 0
  };

  // 按下鼠标时间
  function onAdElMouseDown() {
    timestamp.dd = Date.now();
  }

  // 抬起鼠标
  function onAdElMouseUp(key2) {
    if (!timestamp.dd) return;
    // 时间
    timestamp.ud = Date.now();
    // 拼接参数并打开链接
    const queryString = new URLSearchParams(timestamp).toString();
    const url = curlMap[key1 || key2].curl;
    window.open(`${url}&${queryString}`, '_blank');
    // 清空
    timestamp.dd = 0;
    timestamp.ud = 0;
  }

  return { onAdElMouseDown, onAdElMouseUp };
};
