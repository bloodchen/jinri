import { useStorage } from '@vueuse/core';
import dayjs from 'dayjs';

// 是否显示
export function isShow(data) {
  const now = dayjs();
  // 是否处于活动日期内
  const isBegin = now.isAfter(data.beginTime);
  const isEnd = now.isAfter(data.endTime);
  const isActive = isBegin && !isEnd;
  // 活动已结束：不显示
  if (!isActive) {
    return false;
  }
  // 活动进行中：再看是否需要记录重新打开时间
  // 不需要记录：直接显示
  if (!data.reopenDaysAfterClose) {
    return true;
  }
  // 需要记录：再看是否已记录
  const reopenDateObj = useStorage('reopen-date', {});
  const reopenDateStr = reopenDateObj.value[data.key];
  // 未记录：直接显示
  if (!reopenDateStr) {
    return true;
  }
  // 已记录：是否到时间
  const isReopen = now.isAfter(reopenDateStr);
  return isReopen;
}

// 设置重新打开的日期
export function setReopenDate(data) {
  if (!data.reopenDaysAfterClose) return;
  const nextOpenTs = useStorage('reopen-date', {});
  nextOpenTs.value[data.key] = dayjs().add(data.reopenDaysAfterClose, 'day').format('YYYY-MM-DD');
}

// 皮肤
export const adSkin = {
  key: 'skin',
  title: '天猫',
  url: 'https://s.click.taobao.com/t3Xrvor',
  img: '/images/ad/skin-bg-618-tm.png?t=20250515',
  beginTime: '2025/05/15 10:00:00',
  endTime: '2025/06/20 23:59:00'
};

// 红包雨：1天1次
export const adRain = {
  key: 'rain',
  title: '天猫',
  reopenDaysAfterClose: 1,
  openCenterAfterClose: true,
  url: 'https://s.click.taobao.com/t3Xrvor',
  beginTime: '2025/05/15 10:00:00',
  endTime: '2025/06/20 23:59:00'
};

// 开屏中间：1天1次
export const adCenter = {
  key: 'center',
  title: '天猫',
  reopenDaysAfterClose: 1,
  url: 'https://s.click.taobao.com/t3Xrvor',
  img: '/images/ad/center-bg.png?t=20250515',
  beginTime: '2025/05/15 10:00:00',
  endTime: '2025/06/20 23:59:00'
};

// 顶栏-右上角吊坠
export const adTopbarPendant = {
  key: 'topbarCenter',
  title: '天猫',
  url: 'https://s.click.taobao.com/t3Xrvor',
  img: '/images/ad/topbar-center.gif?t=20250515',
  beginTime: '2025/05/15 10:00:00',
  endTime: '2025/06/20 23:59:00'
};

// 顶栏-右侧撕角
export const adTopbarRightTriangle = {
  key: 'triangle',
  title: '超级红包',
  url: '',
  img: '/images/ad/topbar-triangle.png?t=20240801',
  beginTime: '2024-08-01 19:20:00',
  endTime: '2024-08-01 19:20:00'
};

// 顶栏-右侧轮播
export const adTopbarSliders = [
  {
    name: 'jd',
    url: 'https://u.jd.com/MGnp85J',
    img: '/images/ad/topbar-sliders-jd.png?t=20241014'
  },
  {
    name: 'taobao',
    url: 'https://s.click.taobao.com/t3Xrvor',
    img: '/images/ad/topbar-sliders-tb.png?t=20250515'
  },
  {
    name: '58',
    url: 'https://go.mxfast.com/58/',
    img: '/images/ad/topbar-sliders-58.png?t=20241014'
  }
];

// 首页-右侧橱窗
export const adHomeRight = {
  name: 'tmall',
  url: 'https://s.click.taobao.com/t?union_lens=lensId%3APUB%401726708928%400bf8e76f_0de9_19207df50b1_e6c8%4001%40eyJmbG9vcklkIjozODg1Miiwiic3BtQiiI6Il9wb3J0YWxfdjJfcGFnZXNfYWN0aXZpdHlfb2ZmaWNpYWxfaW5kZXhfaHRtIn0ie%3BeventPageId%3A20150318020008733&e=m%3D2%26s%3DlH88F4cdsjIcQipKwQzePCperVdZeJviU%2F9%2F0taeK29yINtkUhsv0Mfvh6F10l7PjiRkxbhwQNwqdXuB2ywoyHsv77g9cteRVzhPkjk6%2B2QhkTmZhniFX%2FAy%2Fay3dFHhcfoqCASFBE0Sylq0DylJrqED5kW4yHt0jidl2Va2D8m4fWFYbf5VhIz6G0fvVpfqA2WfMOiylBFLUSMt2PJRg%2FB0z8qlrv%2Bj8DLfXVn5qACSXMV4ozPsJ9ZK2MhSOL36BIhITc5%2B2hRXPgMwgePtslhfTxPu3doaPRhyWlsWoBi9SaBlz4XU9iC8ZkOTzcBGGWuT0Akgen9gYh%2Bm7jOlA20lFJQq%2Fn2QfiF5i%2B8irZRGz3Q7pPtsUf71bQanqbOY0tvvdXDFxy0WP3znFjTMWf%2Bw49CWefhctWtNSdvIsZv9STq%2FDBhXPcYl7w3%2FA2kb',
  img: '/images/ad/home-right-tmall.jpg?t=20241014'
};

// 首页-网址导航-底部
export const adHomeWebsiteBottom = [
  {
    title: '携程酒店',
    url: 'https://go.mxfast.com/ctrip/'
  },
  {
    title: '特价机票',
    url: 'https://go.mxfast.com/ctrip/'
  },
  {
    title: '生鲜超市',
    url: 'https://s.click.taobao.com/t?e=m%3D2%26s%3D7NvimWKmgyUcQipKwQzePCperVdZeJviK7Vc7tFgwiFRAdhuF14FMcv%2F7HA24mdiRitN3%2FurF3zpob5g1Jxx6HcGSeUjL%2BKpFOkS9SZMneMpjF4NDHztfo7LAa3DUrM2zt5vEinufIW9AmARIwX9Ky8UTyjdhQwHJPwiig1bxLM7kJwmAcM4EpWl9ELVPsYNYpyF7ku%2BxKhN0J6DMxb6mZ3PLI70IiRV1BzquzWonCvGDmntuH4VtA%3D%3D',
    color: null
  },
  {
    title: '美食狂欢',
    url: 'https://s.click.taobao.com/t?e=m%3D2%26s%3DG%2FqqXlxTcagcQipKwQzePCperVdZeJviK7Vc7tFgwiFRAdhuF14FMU89N3DB0XzKlovu%2FCElQOvpob5g1Jxx6HcGSeUjL%2BKppwK8Ppz4zbeSriCiPvS5O47LAa3DUrM2zt5vEinufIVAFEHVckI7b5%2FNZpdQjSxu1vgFTVPz8OPAUxBJ7QMuvA2AEy2uNjNbW5uzda0ufWWyeCMHCcwBtvKO4THue%2BU6XSE718E8byhcf5Af17rpjg%3D%3D',
    color: null
  },
  {
    title: '时尚女装',
    url: 'https://s.click.taobao.com/t?e=m%3D2%26s%3DGA5o6N95GzscQipKwQzePCperVdZeJviK7Vc7tFgwiFRAdhuF14FMU6SWLrjS%2BCAMMgx22UI05bpob5g1Jxx6HcGSeUjL%2BKp0dYrKxVOLP9jC%2BvtFIr8%2FY7LAa3DUrM2zt5vEinufIVAFEHVckI7b8p35nW8TNQZT514CLy6K5PsUPwqwJSNRJ3PLI70IiRV1BzquzWonCvGDmntuH4VtA%3D%3D',
    color: null
  },
  {
    title: '运动户外',
    url: 'https://s.click.taobao.com/t?e=m%3D2%26s%3D%2FAiB1yR%2FMXQcQipKwQzePCperVdZeJviK7Vc7tFgwiFRAdhuF14FMbC6vtHTnIdY79%2FTFaMDK6Tpob5g1Jxx6HcGSeUjL%2BKpZfPxhza3%2BrxodWeyUSyT9I7LAa3DUrM2zt5vEinufIVAFEHVckI7b5%2FNZpdQjSxu1vgFTVPz8ONCDbOiFo9dg2qFT2L8zA8AJJ7mmMkYHL5inIXuS77EqJvnJoppoClcTlT4SLzYDiDN%2Fy37Hpx24SGFCzYOOqAQ',
    color: null
  },
  {
    title: '品质男装',
    url: 'https://s.click.taobao.com/t?e=m%3D2%26s%3D4dtEkr1whYYcQipKwQzePCperVdZeJviK7Vc7tFgwiFRAdhuF14FMZrRwT26x74R8sviUM61dt3pob5g1Jxx6HcGSeUjL%2BKpFVsW1u0t3XFfLFV23yS%2FcY7LAa3DUrM2zt5vEinufIVAFEHVckI7b%2B0LptVJ0%2BgRax1Jg6Rhl%2F1%2BPGXoAieI2r83SSGhKw4KanI%2BhgYmnMtG4ybd2yV57E64rLpkatXyI8uGSyeGq2MHzZI089hXeN7hdrGX5UWJusOrsVEs3vGoHAiKeX5n10pq3n%2FLrlcykXRjIjpUFhQP7gX9e0IASW8tN5gTkBazLnhQwt2ExY4rYepRjNU%2BxFx5VAJbISNOWQsPoD1uSyrMe1P4cGLwbu1faKNnipooaSPSJyQgfYQIHiTch6dCdeIKl4JSR4lzxgxdTc00KD8%3D'
  },
  {
    title: '58同城',
    url: 'https://go.mxfast.com/58'
  }
];
