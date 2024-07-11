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
  // 天气接口
  // 获取城市
  getCityByIp() {
    return jsonp('https://api-i.maxthon.cn/tianqi/api/js_v5.php');
  },
  // 获取天气
  getWeatherByCityId(id) {
    return jsonp(`https://api-i.maxthon.cn/tianqi/api/weather.php?id=${id}`);
  },
  // 获取省市区
  // provinces
  // cities?province-id=
  // districts?province-id=&city-id=
  getAreaById(path) {
    return axios.post(`https://i.maxthon.cn/geo/${path}`);
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
  // 百度热搜
  getHotword() {
    return axios.get('https://nowcn-api.maxthon.cn/now/v1/hotword');
  },
  // 首页接口
  // 获取主要新闻
  getHomeNewsMain(category) {
    return axios.get(`https://icn-news.maxthon.com/files/index/news/v1/${category}.json`);
  },
  // 获取推荐新闻
  getHomeNewsRecommend(category) {
    return axios.get(`https://icn-news.maxthon.com/files/index/news/recommends/${category}.json`);
  }
};
