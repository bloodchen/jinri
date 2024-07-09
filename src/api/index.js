// 接口
// https://www.axios-http.cn/docs/api_intro
import axios from 'axios';

export default {
  // 获取百度热搜
  getHotword() {
    return axios.get('https://nowcn-api.maxthon.cn/now/v1/hotword');
  },
  // 获取首页-主要新闻
  getHomeNewsMain(category) {
    return axios.get(`https://icn-news.maxthon.com/files/index/news/v1/${category}.json`);
  },
  // 获取首页-推荐新闻
  getHomeNewsRecommend(category) {
    return axios.get(`https://icn-news.maxthon.com/files/index/news/recommends/${category}.json`);
  }
};
