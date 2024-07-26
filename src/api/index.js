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
  // 天气-获取城市
  getWeatherCityByIp() {
    return jsonp('https://api-i.maxthon.cn/tianqi/api/js_v5.php');
  },
  // 天气-获取详情
  getWeatherDetailByCityId(id) {
    return jsonp(`https://api-i.maxthon.cn/tianqi/api/weather.php?id=${id}`);
  },
  // 天气-获取省市区
  // provinces
  // cities?province-id=
  // districts?province-id=&city-id=
  getWeatherAreaById(path) {
    return axios.post(`https://i.maxthon.cn/geo/${path}`);
  },
  // 百度热搜
  getBaiduHotword() {
    return axios.get('https://nowcn-api.maxthon.cn/now/v1/hotword');
  },
  // 百度搜索建议
  getBaiduSuggest(wd) {
    return jsonp(`https://unionsug.baidu.com/su?json=1&from=imaxthoncn&wd=${wd}`, { jsonpCallback: 'cb' });
  },
  // 汽车之家搜索建议
  getAutohomeSuggest(wd, cb) {
    window.Sou.Autocomplate.bindAutocomplate = cb;
    jsonp(`https://sou.autohome.com.cn/Controls/AutoComplateQuery.ashx?q=${wd}`);
  },
  // 首页-网址导航
  websiteRequest(url, params = {}) {
    const data = new URLSearchParams();
    for (const key in params) {
      data.append(key, params[key]);
    }
    return axios.post(url, data, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  },
  // 首页-最常访问网址 get, add, edit, remove, swap, reset, reset-at-start-up
  getHomeFavSites(path, params) {
    return this.websiteRequest(`https://icn-api.maxthon.com/api/fav/${path}`, params);
  },
  // 首页-获取主要新闻
  getHomeMainNews(category) {
    return axios.get(`https://icn-news.maxthon.com/files/index/news/v1/${category}.json`);
  },
  // 首页-获取推荐新闻
  getHomeRecommendNews(category) {
    return axios.get(`https://icn-news.maxthon.com/files/index/news/recommends/${category}.json`);
  }
};
