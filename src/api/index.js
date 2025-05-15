// 接口
// https://www.axios-http.cn/docs/api_intro
import axios from 'axios';
import fetchJsonp from 'fetch-jsonp';

// jsonp请求
function jsonp(url, config) {
  return new Promise((resolve, reject) => {
    fetchJsonp(url, config)
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(ex => reject(ex));
  });
}

// autohome callback
window.Sou = { Autocomplate: { bindAutocomplate() {} } };

// api
export default {
  // // 天气-获取城市
  // getWeatherCityByIp() {
  //   return jsonp('https://api-i.maxthon.cn/tianqi/api/js_v5.php');
  // },
  // // 天气-获取详情
  // getWeatherDetailByCityId(id) {
  //   return jsonp(`https://api-i.maxthon.cn/tianqi/api/weather.php?id=${id}`);
  // },
  // // 天气-获取位置
  // // 省 provinces
  // // 市 cities?province-id=
  // // 区 districts?province-id=&city-id=
  // getWeatherLocationById(path) {
  //   return axios.post(`https://icn-api.maxthon.com/geo/${path}`);
  // },
  // 获取当前天气信息
  getWeatherDetail({ lat, lon }) {
    return axios.post('https://api.maxthon.com/service/weather', { lat, lon });
  },
  // 根据关键字搜索城市
  getWeatherCityByKeyword(keyword) {
    return axios.post('https://api.maxthon.com/service/weather', { cmd: 'getCity', keyword });
  },
  // 搜索-百度热搜
  getSearchHotwordFromBaidu() {
    return axios.get('https://nowcn-api.maxthon.cn/now/v1/hotword');
  },
  // 搜索-百度搜索建议
  getSearchSuggestFromBaidu(wd) {
    return jsonp(`https://unionsug.baidu.com/su?json=1&from=imaxthoncn&wd=${wd}`, { jsonpCallback: 'cb' });
  },
  // 搜索-汽车之家搜索建议
  getSearchSuggestFromAutohome(wd, cb) {
    window.Sou.Autocomplate.bindAutocomplate = cb;
    jsonp(`https://sou.autohome.com.cn/Controls/AutoComplateQuery.ashx?q=${wd}`);
  },
  // 首页-网址导航
  websitesRequest(url, params = {}) {
    const data = new URLSearchParams();
    for (const key in params) {
      data.append(key, params[key]);
    }
    return axios.post(url, data, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  },
  // 首页-常用网址-排序（已停用，改为本地存储）
  // params = { orders: '1,2,3,4,5' }
  setHomePopularSitesOrders(params) {
    return this.websitesRequest('https://icn-api.maxthon.com/api/websites/setOrders', params);
  },
  // 首页-常用网址-重置排序（已停用，改为本地存储）
  resetHomePopularSitesOrders() {
    return this.websitesRequest('https://icn-api.maxthon.com/api/websites/removeOrders');
  },
  // 首页-最常访问网址（已停用，改为本地存储） get, add, edit, remove, swap, reset, reset-at-start-up
  async getHomeFavoriteSites(path, params) {
    if (path !== 'get') return;
    try {
      const { data } = await this.websitesRequest(`https://icn-api.maxthon.com/api/fav/${path}`, params);
      if (data.error_code) {
        return null;
      } else {
        return data;
      }
    } catch (e) {
      return null;
    }
  },
  // 首页-获取主要新闻
  // index/news/category      数据源 news.163.com 2015/8/14 停止更新
  // index/news/v1/category   数据源 toutiao.china.com 目前使用
  // index/news/v2/category   数据源 new.qq.com 2021/03/17停止更新
  getHomeMainNews(category) {
    return axios.get(`https://icn-news.maxthon.com/index/news/v1/${category}.json`);
  },
  // 首页-获取推荐新闻
  // index/news/recommends/category   数据源 toutiao.china.com 目前使用
  getHomeRecommendNews(category) {
    return axios.get(`https://icn-news.maxthon.com/index/news/recommends/${category}.json`);
  },
  // 新闻二级页-获取数据
  // news/category    数据源 toutiao.china.com 目前使用
  // news/v2/category 数据源 new.qq.com 2021/03/17停止更新
  getNewsData(category) {
    return axios.get(`https://icn-news.maxthon.com/news/${category}.json`);
  }
};
