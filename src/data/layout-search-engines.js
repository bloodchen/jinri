// 搜索栏-搜索引擎
export default [
  {
    groupName: 'website',
    groupTitle: '网页',
    engines: [
      {
        engineName: 'baidu',
        engineTitle: '百度',
        engineLogo: '/images/layout-search-engines/baidu.png',
        engineUrl: 'https://www.baidu.com/?tn=myie2_2_dg&ch=1',
        searchUrl: 'https://www.baidu.com/s',
        searchParams: {
          tn: 'myie2_2_dg',
          ch: '1',
          wd: '{KEY}'
        }
      }
      // {
      //   engineName: 'bing',
      //   engineTitle: '必应',
      //   engineLogo: '/images/layout-search-engines/bing.png',
      //   engineUrl: 'https://cn.bing.com/?pc=CNPA13',
      //   searchUrl: 'https://www.bing.com/search',
      //   searchParams: {
      //     pc: 'CNPA13',
      //     q: '{KEY}'
      //   }
      // }
    ]
  },
  {
    groupName: 'video',
    groupTitle: '视频',
    engines: [
      {
        engineName: 'youku',
        engineTitle: '优酷视频',
        engineLogo: '/images/layout-search-engines/youku.png',
        engineUrl: 'https://www.youku.com/',
        searchUrl: 'https://www.soku.com/v',
        searchParams: {
          from: '1',
          keyword: '{KEY}'
        }
      },
      {
        engineName: 'baidu-video',
        engineTitle: '百度视频',
        engineLogo: '/images/layout-search-engines/baidu-video.png',
        engineUrl: 'https://v.baidu.com/',
        searchUrl: 'https://video.baidu.com/v',
        searchParams: {
          ct: '301989888',
          rn: '20',
          pn: '0',
          db: '0',
          s: '0',
          fbl: '1024',
          word: '{KEY}'
        }
      },
      {
        engineName: 'kankan',
        engineTitle: '迅雷视频',
        engineLogo: '/images/layout-search-engines/kankan.png',
        engineUrl: 'https://www.kankan.com/',
        searchUrl: 'https://search.kankan.com/search.php',
        searchParams: {
          keyword: '{KEY}'
        }
      }
    ]
  },
  {
    groupName: 'image',
    groupTitle: '图片',
    engines: [
      {
        engineName: 'baidu-photo',
        engineTitle: '百度图片',
        engineLogo: '/images/layout-search-engines/baidu-photo.png',
        engineUrl: 'https://image.baidu.com/',
        searchUrl: 'https://image.baidu.com/search/index',
        searchParams: {
          tn: 'baiduimage',
          ct: '201326592',
          lm: '-1',
          word: '{KEY}'
        }
      }
    ]
  },
  {
    groupName: 'music',
    groupTitle: '音乐',
    engines: [
      {
        engineName: 'baidu-music',
        engineTitle: '百度音乐',
        engineLogo: '/images/layout-search-engines/baidu-music.png',
        engineUrl: 'https://music.baidu.com/',
        searchUrl: 'https://music.baidu.com/search',
        searchParams: {
          key: '{KEY}'
        }
      }
    ]
  },
  {
    groupName: 'baike',
    groupTitle: '百科',
    engines: [
      {
        engineName: 'baidu-zhidao',
        engineTitle: '百度知道',
        engineLogo: '/images/layout-search-engines/baidu-zhidao.png',
        engineUrl: 'https://zhidao.baidu.com/',
        searchUrl: 'https://zhidao.baidu.com/q',
        searchParams: {
          tn: 'ikaslist',
          ct: '17',
          lm: '0',
          rn: '10',
          fr: 'search',
          word: '{KEY}'
        }
      },
      {
        engineName: 'baidu-baike',
        engineTitle: '百度百科',
        engineLogo: '/images/layout-search-engines/baidu-baike.png',
        engineUrl: 'https://baike.baidu.com/',
        searchUrl: 'https://baike.baidu.com/search/word',
        searchParams: {
          pic: '1',
          sug: '1',
          word: '{KEY}'
        }
      }
    ]
  },
  {
    groupName: 'map',
    groupTitle: '地图',
    engines: [
      {
        engineName: 'baidu-map',
        engineTitle: '百度地图',
        engineLogo: '/images/layout-search-engines/baidu-map.png',
        engineUrl: 'https://map.baidu.com/',
        searchUrl: 'https://map.baidu.com/m',
        searchParams: {
          word: '{KEY}'
        }
      }
    ]
  },
  {
    groupName: 'shop',
    groupTitle: '购物',
    engines: [
      {
        engineName: 'taobao',
        engineTitle: '淘宝',
        engineLogo: '/images/layout-search-engines/taobao.png',
        engineUrl: 'https://www.taobao.com/?mode=&ref=&ali_trackid=2%3Amm_12431063_0_0%3A92705700_2_282229071',
        searchUrl: 'https://ai.taobao.com/search/index.htm',
        searchParams: {
          pid: 'mm_12431063_2220385_55870514',
          unid: '',
          source_id: 'tdj_search',
          w: 'unionapijs',
          p: 'mm_12431063_2220385_55870514',
          b: 'display_601_0_0_0_0',
          c: 'cn',
          pvid: '0_0_0',
          k: '317b874644f98ccc',
          key: '{KEY}'
        }
      },
      {
        engineName: 'dangdang',
        engineTitle: '当当',
        engineLogo: '/images/layout-search-engines/dangdang.png',
        engineUrl: 'https://union.dangdang.com/transfer.php?from=P-303956&sys_id=1&ad_type=40&backurl=https://www.dangdang.com',
        searchUrl: 'https://union.dangdang.com/transfer.php',
        searchParams: {
          from: 'P-303956',
          ad_type: '40',
          sys_id: '1',
          dd_key: '{KEY}',
          backurl: 'https://search.dangdang.com/search.php?key={KEY}'
        }
      },
      {
        engineName: 'amazon',
        engineTitle: '亚马逊',
        engineLogo: '/images/layout-search-engines/amazon.png',
        engineUrl: 'https://www.amazon.cn/?tag=maxthon02-23',
        searchUrl: 'https://www.amazon.cn/s/ref=nb_sb_noss',
        searchParams: {
          '__mk_zh_CN': '%E4%BA%9A%E9%A9%AC%E9%80%8A%E7%BD%91%E7%AB%99',
          'urrl': 'search-alias%3Daps',
          'field-keywords': '{KEY}',
          'x': '0',
          'y': '0',
          'tag': 'maxthon1'
        }
      },
      {
        engineName: 'jd',
        engineTitle: '京东',
        engineLogo: '/images/layout-search-engines/jd.png',
        engineUrl: 'https://dwz.cn/6nhQjN',
        searchUrl: 'https://search.jd.com/Search',
        searchParams: {
          keyword: '{KEY}'
        }
      }
    ]
  },
  {
    groupName: 'fanyi',
    groupTitle: '翻译',
    engines: [
      {
        engineName: 'youdao-fanyi',
        engineTitle: '有道翻译',
        engineLogo: '/images/layout-search-engines/youdao-fanyi.png',
        engineUrl: 'https://www.youdao.com/',
        searchUrl: 'https://fanyi.youdao.com/translate',
        searchParams: {
          i: '{KEY}'
        }
      },
      {
        engineName: 'baidu-fanyi',
        engineTitle: '百度翻译',
        engineLogo: '/images/layout-search-engines/baidu-fanyi.png',
        engineUrl: 'https://fanyi.baidu.com/translate',
        searchUrl: 'https://fanyi.baidu.com/',
        searchParams: {}
      }
    ]
  },
  {
    groupName: 'auto',
    groupTitle: '汽车',
    engines: [
      {
        engineName: 'autohome',
        engineTitle: '汽车之家',
        engineLogo: '/images/layout-search-engines/autohome.png',
        engineUrl: 'https://www.autohome.com.cn/?pvareaid=101194',
        searchUrl: 'https://sou.autohome.com.cn/zonghe',
        searchParams: {
          q: '{KEY}',
          pvareaid: '101194'
        }
      }
    ]
  }
];
