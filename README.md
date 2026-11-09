# 傲游今日（国内版）

- 页面地址 `https://icn.maxthon.com/`
- 仓库地址 `git@github.com:bloodchen/jinri.git`
- 原仓库地址 `git@gitlab.maxthon.net:web/i.maxthon.cn.git`
- 使用 `vue3 + vite` 重构

## 开始

```bash
npm install     # 安装依赖
npm run dev     # 运行
npm run build   # 构建，提交后自动发布
```

## 日常维护

- 更新推荐站点：在 `data/websites-websites-popular.js` 中更新站点数据，在 `public/images/home-websites` 中更新图片。链接一般是完整的 URL，不需要处理直接填入即可。如果是360curl，需要在 `utils/use-360-curl.js` 中更新对照表，然后填入键名即可。
- 开启活动广告：在 `data/ad.js` 中更新对应广告的活动时间、链接、图片等数据，在 `public/images/ad` 中更新图片
- 接入合作方站点：如果提供一个站点链接，需要在页面内显示内容，可以在 `public/iframe/` 目录下添加对应的 iframe 页面，然后在对应的组件内引入这个 iframe 即可
