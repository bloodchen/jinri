import{c as te,r as I,a as w,o as u,b as _,d as D,n as z,F as k,e as Z,w as Q,f as h,g as p,h as F,i as g,t as M,j as H,k as y,u as $,l as q,m as le,p as N,q as oe,s as ie}from"./index-2741252e.js";const se=["onDragstart","onDragenter","onDragleave","onDragend"],ne=["src"],ae=["src","onError"],ue={class:"mx-hwebsite-text"},re=g("span",null," • ",-1),ce=["src"],me={key:2,class:"mx-hwebsite-btns"},X={__name:"HomeWebsiteGroup",props:{data:{type:Array,default:null},editable:{type:Boolean,default:!1},cols:{type:String,default:""}},emits:["remove","edit","sort","imgError"],setup(o,{emit:l}){const t=o,e=l,c=te(()=>{var v;let x=-1;const C=[],T=t.cols*4;return(v=t.data)==null||v.forEach((V,m)=>{(m===0||m===T)&&(x+=1,C.push({groupName:x,children:[]})),V.sortIndex=m,C[x].children.push(V)}),C});function s(x){e("edit",x)}function i(x){e("remove",x)}const a=I(""),n=I({}),r=I({});function b(x){a.value="start",n.value=x}function S(x){x.id!==n.value.id&&(a.value="enter",r.value=x)}function j(x,C){if(x.id!==n.value.id){a.value=C.offsetX>0?"leaveright":"leaveleft",r.value=x;const T=n.value.sortIndex,v=r.value.sortIndex,V=a.value==="leaveleft"&&T===v-1,m=a.value==="leaveright"&&T===v+1;if(V||m)return;e("sort",{dragItem:n.value,dragIndex:T,targetIndex:v})}}function E(){a.value="",n.value={},r.value={}}function B(x){e("imgError",x)}return(x,C)=>{const T=w("MxLink"),v=w("MxIcon");return u(!0),_(k,null,D(c.value,V=>(u(),_("div",{key:V.groupName,style:z({"--cols":o.cols}),class:"mx-hwebsite-list"},[(u(!0),_(k,null,D(V.children,m=>(u(),_("div",{key:m.title,class:Z(["mx-hwebsite-item",{"is-draging":!!a.value,"is-dragitem":m.id===n.value.id,"is-targetitem":m.id===r.value.id}]),draggable:"true",onDragstart:A=>b(m),onDragenter:Q(A=>S(m),["prevent"]),onDragover:C[0]||(C[0]=Q(()=>{},["prevent"])),onDragleave:A=>j(m,A),onDragend:A=>E()},[h(T,{class:"mx-hwebsite-link",title:m.title,style:z({color:m.color,"font-weight":m.bold?"bold":""}),href:a.value?"javascript:;":m.url},{default:p(()=>[m.titleImg?(u(),_("img",{key:0,class:"mx-hwebsite-img",src:m.titleImg},null,8,ne)):(u(),_(k,{key:1},[m.icon||m.iconSet?(u(),_("img",{key:0,class:"mx-hwebsite-icon",src:m.icon||m.iconSet,onError:A=>B(m)},null,40,ae)):F("",!0),g("span",ue,M(m.title),1)],64))]),_:2},1032,["title","style","href"]),m.subTitle&&m.subUrl?(u(),_(k,{key:0},[re,h(T,{class:"mx-hwebsite-link",title:m.subTitle,style:z({color:m.subColor,"font-weight":m.subBold?"bold":""}),href:a.value?"javascript:;":m.subUrl},{default:p(()=>[H(M(m.subTitle),1)]),_:2},1032,["title","style","href"])],64)):F("",!0),m.bubbleUrl&&m.bubbleImg?(u(),y(T,{key:1,href:a.value?"javascript:;":m.bubbleUrl},{default:p(()=>[g("img",{class:"mx-hwebsite-bubble",src:m.bubbleImg},null,8,ce)]),_:2},1032,["href"])):F("",!0),o.editable?(u(),_("div",me,[h(v,{class:"mx-hwebsite-edit",onClick:A=>s(m)},null,8,["onClick"]),h(v,{class:"mx-hwebsite-remove",onClick:A=>i(m)},null,8,["onClick"])])):F("",!0)],42,se))),128))],4))),128)}}},W=[{id:"01",title:"百度",titleImg:"",url:"https://www.baidu.com/index.php?tn=myie2_2_dg",color:null,icon:"./images/home-websites-popular/baidu.png",subTitle:"贴吧",subUrl:"https://tieba.baidu.com/",bubbleImg:""},{id:"02",title:"新浪",titleImg:"",url:"https://www.sina.com.cn",icon:"./images/home-websites-popular/sina.png",subTitle:"微博",subUrl:"https://weibo.com",bubbleImg:""},{id:"03",title:"搜狐",titleImg:"",url:"https://www.sohu.com/",color:null,icon:"./images/home-websites-popular/sohu.png",subTitle:"搜狗",subUrl:"https://www.sogou.com/index.php?pid=sogou-brse-201ecef3255bae21",bubbleImg:""},{id:"04",title:"腾讯QQ",titleImg:"",url:"https://www.qq.com/",color:null,icon:"./images/home-websites-popular/qq.png",subTitle:"空间",subUrl:"https://qzone.qq.com",bubbleImg:""},{id:"05",title:"网易",titleImg:"",url:"https://www.163.com",icon:"./images/home-websites-popular/163.png",subTitle:"邮箱",subUrl:"https://email.163.com",bubbleImg:""},{id:"06",title:"知乎",titleImg:"",url:"https://www.zhihu.com/explore",color:null,bold:!1,icon:"./images/home-websites-popular/zhihu.png",subTitle:"专栏",subUrl:"https://zhuanlan.zhihu.com/",subColor:null,subBold:!1,bubbleUrl:"",bubbleImg:""},{id:"07",title:"京东商城",titleImg:"",url:"https://u.jd.com/kbQv9J4",color:null,bold:!1,icon:"./images/home-websites-popular/jd.png",subTitle:"",subUrl:"",subColor:"#383838",subBold:!1,bubbleUrl:"https://u.jd.com/kbQv9J4",bubbleImg:"./images/home-websites-popular/jd-2.png"},{id:"08",title:"淘宝",titleImg:"",url:"https://s.click.taobao.com/qJZRSnt",icon:"./images/home-websites-popular/taobao.png",subTitle:"",subUrl:"",bubbleUrl:"https://s.click.taobao.com/qJZRSnt",bubbleImg:"./images/home-websites-popular/taobao-2.png"},{id:"09",title:"拼多多",titleImg:"",url:"https://p.gouwubang.com/59h3P2",icon:"./images/home-websites-popular/pdd.png",subTitle:"",subUrl:"",bubbleImg:""},{id:"10",title:"阿里1688",titleImg:"",url:"https://tb.jiuxinban.com/7b3PAO",icon:"./images/home-websites-popular/1688.png",subTitle:"",subUrl:"",bubbleUrl:"https://www.amazon.cn/?tag=maxthon02-23",bubbleImg:""},{id:"11",title:"聚划算",titleImg:"",url:"https://mos.m.taobao.com/union/jhsjx2020?pid=mm_12431063_2220385_279456551",color:null,icon:"./images/home-websites-popular/jhs.png",subTitle:"",subUrl:"",subColor:null,subBold:!1,bubbleUrl:"",bubbleImg:""},{id:"12",title:"天猫精选",titleImg:"",url:"https://s.click.taobao.com/qJZRSnt",color:null,bold:!1,icon:"./images/home-websites-popular/tmall.png",subTitle:"",subUrl:"",subColor:null,bubbleUrl:"https://s.click.taobao.com/qJZRSnt",bubbleImg:"./images/home-websites-popular/tmall-2.gif"},{id:"13",title:"腾讯视频",titleImg:"",url:"https://v.qq.com/",color:null,icon:"./images/home-websites-popular/v.qq.png",subTitle:"",subUrl:"",bubbleUrl:"https://p.gouwubang.com/4pYf2P",bubbleImg:"./images/home-websites-popular/v.qq-2.png"},{id:"14",title:"爱奇艺",titleImg:"",url:"https://www.iqiyi.com/",icon:"./images/home-websites-popular/iqiyi.png",subTitle:"",subUrl:"",subColor:null,subBold:!1,bubbleUrl:"",bubbleImg:""},{id:"15",title:"优酷",titleImg:"",url:"https://www.youku.com/",color:null,bold:!1,icon:"./images/home-websites-popular/youku.png",subTitle:"土豆",subUrl:"https://www.tudou.com/",subColor:"#383838",subBold:!1,bubbleUrl:"",bubbleImg:""},{id:"16",title:"哔哩哔哩",titleImg:"",url:"https://www.bilibili.com",color:null,bold:!1,icon:"./images/home-websites-popular/bilibili.png",subTitle:"",subUrl:"",bubbleImg:""},{id:"17",title:"小红书",titleImg:"",url:"https://www.xiaohongshu.com/explore?m_source=xiaomanaoyouliulanqi",icon:"./images/home-websites-popular/xiaohongshu.png",bubbleUrl:"",bubbleImg:""},{id:"18",title:"抖音",titleImg:"",url:"https://www.douyin.com/",color:null,bold:!1,icon:"./images/home-websites-popular/douyin.png",subTitle:"快手",subUrl:"https://www.kuaishou.com/",bubbleImg:""},{id:"19",title:"凤凰网",titleImg:"",url:"https://www.ifeng.com/?_aoyou",color:null,icon:"./images/home-websites-popular/ifeng.png",bubbleUrl:"",bubbleImg:""},{id:"20",title:"新华网",titleImg:"",url:"https://www.xinhuanet.com/",color:null,bold:!1,icon:"./images/home-websites-popular/xinhuanet.png",bubbleImg:""},{id:"21",title:"环球新闻",titleImg:"",url:"https://toutiao.china.com/huanqiu/?ay1",bold:!1,icon:"./images/home-websites-popular/huanqiu.png",subTitle:"",subUrl:"",subColor:null,subBold:!0,bubbleImg:""},{id:"22",title:"头条军事",titleImg:"",url:"https://ay.miercn.com/?maxthon",icon:"./images/home-websites-popular/miercn.png",bubbleImg:""},{id:"23",title:"天猫狂欢节",titleImg:"./images/home-websites-popular/tmall-618.png",url:"https://s.click.taobao.com/qJZRSnt",icon:"",subTitle:"",subUrl:"",subColor:"#000000",bubbleImg:""},{id:"24",title:"东方财富",titleImg:"",url:"https://www.eastmoney.com/",color:null,bold:!1,icon:"./images/home-websites-popular/eastmoney.png",subTitle:"",subUrl:"",subColor:"#383838",subBold:!0,bubbleUrl:"",bubbleImg:""},{id:"25",title:"携程旅行",titleImg:"",url:"https://go.mxfast.com/ctrip/",bold:!1,icon:"./images/home-websites-popular/ctrip.png",bubbleImg:""},{id:"26",title:"12306",titleImg:"",url:"https://www.12306.cn/mormhweb/",color:"#383838",bold:!1,icon:"./images/home-websites-popular/12306.png",subTitle:"",subUrl:"",subColor:"#ff0000",bubbleUrl:"",bubbleImg:""},{id:"27",title:"机票",titleImg:"",url:"https://go.mxfast.com/ctrip/",icon:"",subTitle:"火车票",subUrl:"https://go.mxfast.com/ctrip/",bubbleImg:""},{id:"28",title:"飞猪",titleImg:"",url:"https://www.fliggy.com/",icon:"",subTitle:"去哪儿",subUrl:"https://www.qunar.com/?ex_track=UNID100019_100042&amp;ouid=",bubbleUrl:"",bubbleImg:""},{id:"29",title:"百度地图",titleImg:"",url:"https://map.baidu.com/",color:null,icon:"",subTitle:"",subUrl:"",subColor:null,bubbleImg:""},{id:"30",title:"58同城",titleImg:"",url:"https://go.mxfast.com/58",color:null,icon:"./images/home-websites-popular/58.png",subTitle:"",subUrl:"",bubbleUrl:"",bubbleImg:""},{id:"32",title:"4399小游戏",titleImg:"",url:"https://www.4399.net/",color:"#383838",icon:"",bubbleImg:""},{id:"33",title:"斗鱼直播",titleImg:"",url:"https://www.douyu.com/",color:null,icon:"",bubbleImg:""},{id:"34",title:"豆瓣",titleImg:"",url:"https://www.douban.com/",color:"#383838",bold:!1,icon:"",subTitle:"天涯",subUrl:"https://www.tianya.cn/",bubbleUrl:"https://union-click.jd.com/jdc?e=&p=JF8AAJoDIgZlGmsUMlZYDUUEJVtXQhRZUAscVEETBABAHUBZCSsiCwBSYAZuIXVyaEcgYCcPVBNUAksNGQ4iAlUaWhcHFA5UHWsWAxIHUhpSEAUXN2UbWiVJfAZlGVoUABcBVx9ZEjISAFYbXhQBFQdTGl0dMhUHXCuPpoHFjtzM36vbhL6Bs8IlMiIEZStrFQIiB2VEH0hfIgVUGl8c",bubbleImg:""},{id:"35",title:"起点",titleImg:"",url:"https://www.qidian.com/",color:null,icon:"",subTitle:"晋江",subUrl:"https://www.jjwxc.net/fenzhan/yq/",bubbleImg:""},{id:"36",title:"文心一言",titleImg:"",url:"https://yiyan.baidu.com/?utm_source=aoyou",icon:"./images/home-websites-popular/yiyan.png",bubbleImg:""},{id:"37",title:"虎扑体育",titleImg:"",url:"https://www.hupu.com/",icon:"",subTitle:"",bubbleImg:""},{id:"38",title:"爱淘宝",titleImg:"",url:"https://s.click.taobao.com/qJZRSnt",color:null,icon:"./images/home-websites-popular/ai.taobao.png",subTitle:"",subUrl:"",bubbleUrl:"",bubbleImg:""},{id:"39",title:"苏宁易购",titleImg:"",url:"https://p.gouwubang.com/c?w=628&amp;c=4459&amp;i=5662&amp;pf=y&amp;e=&amp;t=https://www.suning.com/",icon:"./images/home-websites-popular/suning.png",subTitle:"",subUrl:"",bubbleImg:""},{id:"41",title:"当当网",titleImg:"",url:"https://www.dangdang.com/?_ddclickunion=P-303956-mingzhan|ad_type=10|sys_id=1#dd_refer=",color:null,icon:"./images/home-websites-popular/dangdang.png",subTitle:"",subUrl:"",bubbleUrl:"",bubbleImg:""},{id:"42",title:"唯品会",titleImg:"",url:"https://click.union.vip.com/redirect.php?code=6IgKgCc",icon:"./images/home-websites-popular/vip.png",subTitle:"",bubbleImg:""},{id:"43",title:"东方购物",titleImg:"",url:"https://p.gouwubang.com/Jc0rO",color:null,bold:!1,icon:"./images/home-websites-popular/gouwubang.png",subTitle:"",subUrl:"",subColor:null,bubbleUrl:"",bubbleImg:""},{id:"44",title:"蘑菇街",titleImg:"",url:"https://www.mogujie.com/cps/open/track?uid=12o3xbw&amp;feedback=mingzhan&amp;channel=&amp;target=https%3A%2F%2Fwww.mogujie.com%2F",color:null,bold:!1,icon:"./images/home-websites-popular/mogujie.png",subTitle:"",subUrl:"",bubbleImg:""},{id:"45",title:"小米有品",titleImg:"",url:"https://tb.jiuxinban.com/7b3PW3",color:null,icon:"./images/home-websites-popular/youpin.png",subTitle:"",subUrl:"",subColor:null,subBold:!1,bubbleUrl:"",bubbleImg:""},{id:"46",title:"华为商城",titleImg:"",url:"https://p.yiqifa.com/n?k=2mLErnWm1NRSrI6H2mLErI6H6EKO1QLF6NtSWl4HWNWqWl3qrI6HYQLErnDSWn3S3ljLrn6x1Z4ENmL-&amp;t=https://www.vmall.com",color:null,icon:"./images/home-websites-popular/vmall.png",bubbleImg:""},{id:"47",title:"苹果官网",titleImg:"",url:"https://p.gouwubang.com/59esCa",color:null,icon:"./images/home-websites-popular/apple.png",bubbleImg:""},{id:"48",title:"亚马逊",titleImg:"",url:"https://www.amazon.cn/?tag=maxthon02-23",color:null,icon:"./images/home-websites-popular/amazon.png",subTitle:"",subUrl:"",bubbleUrl:"",bubbleImg:""},{id:"49",title:"澳洲PO药房",titleImg:"",url:"https://p.gouwubang.com/13Baxv",icon:"./images/home-websites-popular/po.png",bubbleUrl:"",bubbleImg:""},{id:"50",title:"珍爱网",titleImg:"",url:"https://www.zhenai.com",color:null,icon:"",subTitle:"",subUrl:"",bubbleImg:""},{id:"52",title:"QQ音乐",titleImg:"",url:"https://y.qq.com/",icon:"",bubbleImg:""},{id:"53",title:"喜马拉雅",titleImg:"",url:"https://www.ximalaya.com/",color:null,bold:!1,icon:"",bubbleImg:""},{id:"54",title:"中关村在线",titleImg:"",url:"https://www.zol.com.cn/",icon:"",bubbleImg:""},{id:"55",title:"太平洋电脑网",titleImg:"",url:"https://www.pconline.com.cn/",icon:"",bubbleImg:""},{id:"56",title:"QQ邮箱",titleImg:"",url:"https://mail.qq.com/",icon:"",bubbleImg:""},{id:"57",title:"工商银行",titleImg:"",url:"https://www.icbc.com.cn/ICBC/default.htm",icon:"",bubbleImg:""}],be={__name:"HomeWebsitePopular",setup(o,{expose:l}){const t=$("home-website-popular",W);function e({dragItem:s,dragIndex:i,targetIndex:a}){t.value.splice(i,1),t.value.splice(a,0,s)}function c(){t.value=W}return l({resetSite:c}),(s,i)=>(u(),y(X,{data:q(t),cols:"6",onSort:e},null,8,["data"]))}};/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */var Y=de,G=he,pe=Object.prototype.toString,P=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function de(o,l){if(typeof o!="string")throw new TypeError("argument str must be a string");for(var t={},e=l||{},c=e.decode||ge,s=0;s<o.length;){var i=o.indexOf("=",s);if(i===-1)break;var a=o.indexOf(";",s);if(a===-1)a=o.length;else if(a<i){s=o.lastIndexOf(";",i-1)+1;continue}var n=o.slice(s,i).trim();if(t[n]===void 0){var r=o.slice(i+1,a).trim();r.charCodeAt(0)===34&&(r=r.slice(1,-1)),t[n]=_e(r,c)}s=a+1}return t}function he(o,l,t){var e=t||{},c=e.encode||we;if(typeof c!="function")throw new TypeError("option encode is invalid");if(!P.test(o))throw new TypeError("argument name is invalid");var s=c(l);if(s&&!P.test(s))throw new TypeError("argument val is invalid");var i=o+"="+s;if(e.maxAge!=null){var a=e.maxAge-0;if(isNaN(a)||!isFinite(a))throw new TypeError("option maxAge is invalid");i+="; Max-Age="+Math.floor(a)}if(e.domain){if(!P.test(e.domain))throw new TypeError("option domain is invalid");i+="; Domain="+e.domain}if(e.path){if(!P.test(e.path))throw new TypeError("option path is invalid");i+="; Path="+e.path}if(e.expires){var n=e.expires;if(!fe(n)||isNaN(n.valueOf()))throw new TypeError("option expires is invalid");i+="; Expires="+n.toUTCString()}if(e.httpOnly&&(i+="; HttpOnly"),e.secure&&(i+="; Secure"),e.partitioned&&(i+="; Partitioned"),e.priority){var r=typeof e.priority=="string"?e.priority.toLowerCase():e.priority;switch(r){case"low":i+="; Priority=Low";break;case"medium":i+="; Priority=Medium";break;case"high":i+="; Priority=High";break;default:throw new TypeError("option priority is invalid")}}if(e.sameSite){var b=typeof e.sameSite=="string"?e.sameSite.toLowerCase():e.sameSite;switch(b){case!0:i+="; SameSite=Strict";break;case"lax":i+="; SameSite=Lax";break;case"strict":i+="; SameSite=Strict";break;case"none":i+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return i}function ge(o){return o.indexOf("%")!==-1?decodeURIComponent(o):o}function we(o){return encodeURIComponent(o)}function fe(o){return pe.call(o)==="[object Date]"||o instanceof Date}function _e(o,l){try{return l(o)}catch{return o}}function xe(){const o=typeof global>"u"?void 0:global.TEST_HAS_DOCUMENT_COOKIE;return typeof o=="boolean"?o:typeof document=="object"&&typeof document.cookie=="string"}function ve(o){return typeof o=="string"?Y(o):typeof o=="object"&&o!==null?o:{}}function J(o,l={}){const t=Ie(o);if(!l.doNotParse)try{return JSON.parse(t)}catch{}return o}function Ie(o){return o&&o[0]==="j"&&o[1]===":"?o.substr(2):o}class ye{constructor(l,t={}){this.changeListeners=[],this.HAS_DOCUMENT_COOKIE=!1,this.update=()=>{if(!this.HAS_DOCUMENT_COOKIE)return;const c=this.cookies;this.cookies=Y(document.cookie),this._checkChanges(c)};const e=typeof document>"u"?"":document.cookie;this.cookies=ve(l||e),this.defaultSetOptions=t,this.HAS_DOCUMENT_COOKIE=xe()}_emitChange(l){for(let t=0;t<this.changeListeners.length;++t)this.changeListeners[t](l)}_checkChanges(l){new Set(Object.keys(l).concat(Object.keys(this.cookies))).forEach(e=>{l[e]!==this.cookies[e]&&this._emitChange({name:e,value:J(this.cookies[e])})})}_startPolling(){this.pollingInterval=setInterval(this.update,300)}_stopPolling(){this.pollingInterval&&clearInterval(this.pollingInterval)}get(l,t={}){return t.doNotUpdate||this.update(),J(this.cookies[l],t)}getAll(l={}){l.doNotUpdate||this.update();const t={};for(let e in this.cookies)t[e]=J(this.cookies[e],l);return t}set(l,t,e){e?e=Object.assign(Object.assign({},this.defaultSetOptions),e):e=this.defaultSetOptions;const c=typeof t=="string"?t:JSON.stringify(t);this.cookies=Object.assign(Object.assign({},this.cookies),{[l]:c}),this.HAS_DOCUMENT_COOKIE&&(document.cookie=G(l,c,e)),this._emitChange({name:l,value:t,options:e})}remove(l,t){const e=t=Object.assign(Object.assign(Object.assign({},this.defaultSetOptions),t),{expires:new Date(1970,1,1,0,0,1),maxAge:0});this.cookies=Object.assign({},this.cookies),delete this.cookies[l],this.HAS_DOCUMENT_COOKIE&&(document.cookie=G(l,"",e)),this._emitChange({name:l,value:void 0,options:t})}addChangeListener(l){this.changeListeners.push(l),this.HAS_DOCUMENT_COOKIE&&this.changeListeners.length===1&&(typeof window=="object"&&"cookieStore"in window?window.cookieStore.addEventListener("change",this.update):this._startPolling())}removeChangeListener(l){const t=this.changeListeners.indexOf(l);t>=0&&this.changeListeners.splice(t,1),this.HAS_DOCUMENT_COOKIE&&this.changeListeners.length===0&&(typeof window=="object"&&"cookieStore"in window?window.cookieStore.removeEventListener("change",this.update):this._stopPolling())}}function ke(o,{doNotParse:l=!1,autoUpdateDependencies:t=!1}={},e=new ye){const c=t?[...o||[]]:o;let s=e.getAll({doNotParse:!0});const i=I(0),a=()=>{const n=e.getAll({doNotParse:!0});Se(c||null,n,s)&&i.value++,s=n};return e.addChangeListener(a),le(()=>{e.removeChangeListener(a)}),{get:(...n)=>(t&&c&&!c.includes(n[0])&&c.push(n[0]),i.value,e.get(n[0],{doNotParse:l,...n[1]})),getAll:(...n)=>(i.value,e.getAll({doNotParse:l,...n[0]})),set:(...n)=>e.set(...n),remove:(...n)=>e.remove(...n),addChangeListener:(...n)=>e.addChangeListener(...n),removeChangeListener:(...n)=>e.removeChangeListener(...n)}}function Se(o,l,t){if(!o)return!0;for(const e of o)if(l[e]!==t[e])return!0;return!1}function Ue(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,o=>{const l=Math.random()*16|0;return(o==="x"?l:l&3|8).toString(16)})}const K=[{title:"百度",url:"https://www.baidu.com/index.php?tn=myie2&ch=1"},{title:"新浪",url:"https://www.sina.com.cn/"},{title:"腾讯qq",url:"https://www.qq.com/",icon:"./images/home-websites-favorite/qq.ico"},{title:"搜狐",url:"https://www.sohu.com/",icon:"./images/home-websites-favorite/sohu.ico"},{title:"新浪微博",url:"https://weibo.com/?c=spr_web_yilang_maxthon_weibo_t001"},{title:"人人网",url:"https://www.renren.com/"},{title:"凤凰网",url:"https://www.ifeng.com/"},{title:"网易",url:"https://www.163.com/"},{title:"淘宝网",url:"https://www.taobao.com/?pid=mm_12431063_2220385_111469400049"},{title:"优酷",url:"https://www.youku.com/"},{title:"百度贴吧",url:"https://tieba.baidu.com/"},{title:"知乎",url:"https://www.zhihu.com/"},{title:"京东",url:"https://www.360buy.com/"},{title:"4399小游戏",url:"https://www.4399.net/"},{title:"网易邮箱",url:"https://email.163.com/"},{title:"豆瓣网",url:"https://www.douban.com/"},{title:"亚马逊",url:"https://www.amazon.cn/?source=maxthon"},{title:"世纪佳缘",url:"https://www.jiayuan.com/st/?id=399514&url=https://www.jiayuan.com"},{title:"东方财富",url:"https://www.eastmoney.com/"},{title:"汽车之家",url:"https://www.autohome.com.cn/"}];const Te={key:0},Ce={class:"mx-hwebsite-hint"},Me={__name:"HomeWebsiteFavorite",setup(o,{expose:l}){const e=!!ke().get("MXTOKEN"),c=$("home-website-favorite-init",!1),s=$("home-website-favorite",[]);i();async function i(){if(!c.value){if(e){const d=await N.getHomeFavoriteSites("get");s.value=a(d)||a(K)}else s.value=a(K);c.value=!0,E()}}function a(d){return d?d.map(f=>n(f)):[]}function n(d){const f=d.url.replace("http://","https://"),U=new URL(f);return{...d,id:d.id||Ue(),url:f,iconSet:`${U.origin}/favicon.ico`}}const r=I(!1),b=I({}),S=I(null);function j(d,f){r.value=d,b.value=JSON.parse(JSON.stringify(f)),S.value=d==="编辑"?T:d==="删除"?v:C}function E(){r.value=!1}function B(d){const U=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(d);return U||alert("网址格式错误！"),U}function x(){if(s.value.length>=36){alert("自定义网址数量已达到最大数量，无法继续添加！");return}j("添加",{title:"",url:"https://"})}async function C(){const{title:d,url:f}=b.value;if(!B(f))return;const O=n({title:d,url:f});s.value.push(O),E(),e&&N.getHomeFavoriteSites("add",{title:d,url:f})}async function T(){const{sortIndex:d,id:f,title:U,url:O}=b.value;if(!B(O))return;const L=n({id:f,title:U,url:O});s.value.splice(d,1,L),E(),e&&N.getHomeFavoriteSites("edit",{index:d,title:U,url:O})}async function v(){const{sortIndex:d}=b.value;s.value.splice(d,1),E(),e&&N.getHomeFavoriteSites("del",{index:d})}function V({dragItem:d,dragIndex:f,targetIndex:U}){s.value.splice(f,1),s.value.splice(U,0,d),e&&N.getHomeFavoriteSites("swap",{aIndex:f,bIndex:U})}function m(){s.value=a(K),e&&N.getHomeFavoriteSites("reset")}function A(d){d.icon="./images/home-websites-favorite/default.png",s.value.splice(d.sortIndex,1,d)}return l({addSite:x,resetSite:m}),(d,f)=>{const U=w("MxFormItem"),O=w("MxBtn"),R=w("MxDialog");return u(),_(k,null,[h(X,{data:q(s),editable:!0,cols:"4",onEdit:f[0]||(f[0]=L=>j("编辑",L)),onRemove:f[1]||(f[1]=L=>j("删除",L)),onSort:V,onImgError:A},null,8,["data"]),r.value?(u(),y(R,{key:0,modelValue:r.value,"onUpdate:modelValue":f[4]||(f[4]=L=>r.value=L),title:`${r.value}网址`},{footer:p(()=>[h(O,{disabled:!b.value.title||!b.value.url,onClick:S.value},{default:p(()=>[H(" 确定 ")]),_:1},8,["disabled","onClick"]),h(O,{type:"info",onClick:E},{default:p(()=>[H(" 取消 ")]),_:1})]),default:p(()=>[r.value==="删除"?(u(),_("div",Te,"你确定要删除这条网址？")):(u(),_(k,{key:1},[h(U,{modelValue:b.value.title,"onUpdate:modelValue":f[2]||(f[2]=L=>b.value.title=L),label:"标题："},null,8,["modelValue"]),h(U,{modelValue:b.value.url,"onUpdate:modelValue":f[3]||(f[3]=L=>b.value.url=L),label:"网址："},null,8,["modelValue"])],64)),g("div",Ce,"注意："+M(r.value)+"网址只会修改起始页内容，不会改变浏览器内其他应用和已有收藏夹的内容",1)]),_:1},8,["modelValue","title"])):F("",!0)],64)}}},Le=[{title:"携程酒店",url:"https://go.mxfast.com/ctrip/"},{title:"特价机票",url:"https://go.mxfast.com/ctrip/"},{title:"生鲜超市",url:"https://s.click.taobao.com/t?e=m%3D2%26s%3D7NvimWKmgyUcQipKwQzePCperVdZeJviK7Vc7tFgwiFRAdhuF14FMcv%2F7HA24mdiRitN3%2FurF3zpob5g1Jxx6HcGSeUjL%2BKpFOkS9SZMneMpjF4NDHztfo7LAa3DUrM2zt5vEinufIW9AmARIwX9Ky8UTyjdhQwHJPwiig1bxLM7kJwmAcM4EpWl9ELVPsYNYpyF7ku%2BxKhN0J6DMxb6mZ3PLI70IiRV1BzquzWonCvGDmntuH4VtA%3D%3D",color:null},{title:"美食狂欢",url:"https://s.click.taobao.com/t?e=m%3D2%26s%3DG%2FqqXlxTcagcQipKwQzePCperVdZeJviK7Vc7tFgwiFRAdhuF14FMU89N3DB0XzKlovu%2FCElQOvpob5g1Jxx6HcGSeUjL%2BKppwK8Ppz4zbeSriCiPvS5O47LAa3DUrM2zt5vEinufIVAFEHVckI7b5%2FNZpdQjSxu1vgFTVPz8OPAUxBJ7QMuvA2AEy2uNjNbW5uzda0ufWWyeCMHCcwBtvKO4THue%2BU6XSE718E8byhcf5Af17rpjg%3D%3D",color:null},{title:"时尚女装",url:"https://s.click.taobao.com/t?e=m%3D2%26s%3DGA5o6N95GzscQipKwQzePCperVdZeJviK7Vc7tFgwiFRAdhuF14FMU6SWLrjS%2BCAMMgx22UI05bpob5g1Jxx6HcGSeUjL%2BKp0dYrKxVOLP9jC%2BvtFIr8%2FY7LAa3DUrM2zt5vEinufIVAFEHVckI7b8p35nW8TNQZT514CLy6K5PsUPwqwJSNRJ3PLI70IiRV1BzquzWonCvGDmntuH4VtA%3D%3D",color:null},{title:"运动户外",url:"https://s.click.taobao.com/t?e=m%3D2%26s%3D%2FAiB1yR%2FMXQcQipKwQzePCperVdZeJviK7Vc7tFgwiFRAdhuF14FMbC6vtHTnIdY79%2FTFaMDK6Tpob5g1Jxx6HcGSeUjL%2BKpZfPxhza3%2BrxodWeyUSyT9I7LAa3DUrM2zt5vEinufIVAFEHVckI7b5%2FNZpdQjSxu1vgFTVPz8ONCDbOiFo9dg2qFT2L8zA8AJJ7mmMkYHL5inIXuS77EqJvnJoppoClcTlT4SLzYDiDN%2Fy37Hpx24SGFCzYOOqAQ",color:null},{title:"品质男装",url:"https://s.click.taobao.com/t?e=m%3D2%26s%3D4dtEkr1whYYcQipKwQzePCperVdZeJviK7Vc7tFgwiFRAdhuF14FMZrRwT26x74R8sviUM61dt3pob5g1Jxx6HcGSeUjL%2BKpFVsW1u0t3XFfLFV23yS%2FcY7LAa3DUrM2zt5vEinufIVAFEHVckI7b%2B0LptVJ0%2BgRax1Jg6Rhl%2F1%2BPGXoAieI2r83SSGhKw4KanI%2BhgYmnMtG4ybd2yV57E64rLpkatXyI8uGSyeGq2MHzZI089hXeN7hdrGX5UWJusOrsVEs3vGoHAiKeX5n10pq3n%2FLrlcykXRjIjpUFhQP7gX9e0IASW8tN5gTkBazLnhQwt2ExY4rYepRjNU%2BxFx5VAJbISNOWQsPoD1uSyrMe1P4cGLwbu1faKNnipooaSPSJyQgfYQIHiTch6dCdeIKl4JSR4lzxgxdTc00KD8%3D"},{title:"58同城",url:"https://go.mxfast.com/58"}];const De={class:"mx-hwebsite-btn-row"},Ee=g("span",null,"添加网址",-1),Fe=g("div",null,"恢复默认将覆盖你当前的操作和显示，确认要执行此操作吗？",-1),Ve={class:"mx-hwebsite-ad"},Ae={__name:"HomeWebsite",setup(o){const l=$("tab-hwebsite","popular"),t=I(!1),e=I(!1);function c(b){b==="popular"?t.value=!0:e.value=!0}const s=I(!1),i=I(null),a=I(null);function n(){s.value=!1,l.value==="popular"?i.value.resetSite():a.value.resetSite()}function r(){l.value="favorite",a.value.addSite()}return(b,S)=>{const j=w("MxIcon"),E=w("MxBtn"),B=w("MxDialog"),x=w("MxTabPane"),C=w("MxLink"),T=w("MxTabs");return u(),y(T,{modelValue:q(l),"onUpdate:modelValue":S[3]||(S[3]=v=>oe(l)?l.value=v:null),class:"mx-hwebsite",autoplay:!1,theme:"blue",onChange:c},{header:p(()=>[g("div",De,[g("span",{class:"mx-hwebsite-btn-item",onClick:S[0]||(S[0]=v=>s.value=!0)},"恢复默认"),g("div",{class:"mx-hwebsite-btn-item",onClick:r},[h(j,{class:"mx-hwebsite-btn-icon is-add"}),Ee])]),h(B,{modelValue:s.value,"onUpdate:modelValue":S[2]||(S[2]=v=>s.value=v),title:"恢复默认"},{footer:p(()=>[h(E,{onClick:n},{default:p(()=>[H("确定")]),_:1}),h(E,{type:"info",onClick:S[1]||(S[1]=v=>s.value=!1)},{default:p(()=>[H(" 取消 ")]),_:1})]),default:p(()=>[Fe]),_:1},8,["modelValue"])]),footer:p(()=>[g("div",Ve,[(u(!0),_(k,null,D(q(Le),v=>(u(),y(C,{key:v.title,href:v.url,class:"mx-hwebsite-ad-item"},{default:p(()=>[H(M(v.title),1)]),_:2},1032,["href"]))),128))])]),default:p(()=>[h(x,{data:{name:"popular",label:"常用网址"}},{default:p(()=>[t.value?(u(),y(be,{key:0,ref_key:"popularRef",ref:i},null,512)):F("",!0)]),_:1}),h(x,{data:{name:"favorite",label:"经常访问网站"}},{default:p(()=>[e.value?(u(),y(Me,{key:0,ref_key:"favoriteRef",ref:a},null,512)):F("",!0)]),_:1})]),_:1},8,["modelValue"])}}};const Ne={class:"mx-htools"},Oe={class:"mx-htools-title"},He={__name:"HomeTools",setup(o){const l=[{label:"天气",iconBase:"3px 3px",iconActive:"-32px 3px",url:"/weather"},{label:"携程",iconBase:"3px -172px",iconActive:"-33px -172px",url:"https://go.mxfast.com/ctrip/"},{label:"快递",iconBase:"3px -65px",iconActive:"-32px -65px",url:"http://www.kuaidi.com/"},{label:"星座",iconBase:"4px -102px",iconActive:"-31px -102px",url:"http://www.d1xz.net"},{label:"外汇",iconBase:"7px -32px",iconActive:"-28px -32px",url:"http://www.boc.cn/sourcedb/whpj/"}];return(t,e)=>{const c=w("MxIcon"),s=w("MxLink");return u(),_("div",Ne,[(u(),_(k,null,D(l,i=>h(s,{key:i.label,class:"mx-htools-link",title:i.label,href:i.url},{default:p(()=>[h(c,{class:"mx-htools-icon",style:z(`--icon-base: ${i.iconBase}; --icon-active: ${i.iconActive}`)},null,8,["style"]),g("div",Oe,M(i.label),1)]),_:2},1032,["title","href"])),64))])}}};const je=["src","alt"],Be={class:"mx-hfnews-text"},ee={__name:"HomeNewsFocus",props:{data:{type:Object,default:null}},setup(o){return(l,t)=>{const e=w("MxLink"),c=w("MxSwiperSlide"),s=w("MxSwiper");return u(),y(s,{class:"mx-hfnews"},{default:p(()=>[(u(!0),_(k,null,D(o.data.focus,i=>(u(),y(c,{key:i.title},{default:p(()=>[h(e,{class:"mx-hfnews-link",title:i.title,href:i.url},{default:p(()=>[g("img",{class:"mx-hfnews-img",src:i.img,alt:i.title},null,8,je),g("div",Be,M(i.title),1)]),_:2},1032,["title","href"])]),_:2},1024))),128))]),_:1})}}};const Pe={key:0,class:"mx-hmnews-content"},ze={class:"mx-hmnews-left"},$e={class:"mx-hmnews-img"},qe=["src","alt"],Je={class:"mx-hmnews-img-text"},Ke={class:"mx-hmnews-right"},Re={key:0,class:"mx-hmnews-text-dot"},Qe={__name:"HomeNewsMain",setup(o){const l=I("chief"),t=I([{name:"chief",label:"要闻",data:null},{name:"ent",label:"娱乐",data:null},{name:"finance",label:"财经",data:null},{name:"social",label:"社会",data:null},{name:"military",label:"军事",data:null,url:"https://ay.miercn.com/?maxthon"}]);async function e(c){const s=t.value.findIndex(a=>a.name===c);if(t.value[s].data)return;const{data:i}=await N.getHomeMainNews(c);t.value[s].data=i}return(c,s)=>{const i=w("MxLink"),a=w("MxTabPane"),n=w("MxTabs");return u(),y(n,{modelValue:l.value,"onUpdate:modelValue":s[0]||(s[0]=r=>l.value=r),class:"mx-hmnews",onChange:e},{default:p(()=>[(u(!0),_(k,null,D(t.value,r=>(u(),y(a,{key:r.name,data:r},{default:p(()=>[r.data?(u(),_("div",Pe,[g("div",ze,[h(ee,{class:"mx-hmnews-focus",data:r.data},null,8,["data"]),g("div",$e,[(u(!0),_(k,null,D(r.data.midImg,b=>(u(),y(i,{key:b.title,class:"mx-hmnews-img-link",title:b.title,href:b.url},{default:p(()=>[g("img",{class:"mx-hmnews-img-img",src:b.img,alt:b.title},null,8,qe),g("div",Je,M(b.title),1)]),_:2},1032,["title","href"]))),128))])]),g("div",Ke,[(u(!0),_(k,null,D(r.data.text,(b,S)=>(u(),y(i,{key:b[0].title,class:"mx-hmnews-text-item",title:b[0].title,href:b[0].url},{default:p(()=>[S%5!==0?(u(),_("span",Re,"•")):F("",!0),g("span",null,M(b[0].title),1)]),_:2},1032,["title","href"]))),128))])])):F("",!0),h(i,{class:"mx-hmnews-bottom",href:r.url},{default:p(()=>[H(" 查看更多 ")]),_:2},1032,["href"])]),_:2},1032,["data"]))),128))]),_:1},8,["modelValue"])}}};const We={class:"mx-hhnews-word"},Ge={class:"mx-hhnews-score"},Ze={__name:"HomeNewsHot",setup(o){const l=I("hot"),t=I([]);return N.getBaiduHotword().then(({data:e})=>{t.value=e.success?e.data.cards[0].content.slice(0,10):[]}),(e,c)=>{const s=w("MxLink"),i=w("MxTabPane"),a=w("MxTabs");return u(),y(a,{modelValue:l.value,"onUpdate:modelValue":c[0]||(c[0]=n=>l.value=n),class:"mx-hhnews"},{header:p(()=>[H("搜索指数")]),default:p(()=>[h(i,{data:{name:"hot",label:"新闻搜索排行榜"}},{default:p(()=>[(u(!0),_(k,null,D(t.value,n=>(u(),y(s,{key:n.eventId,class:"mx-hhnews-item",title:n.word,href:`${n.url}&tn=68018901_dg`},{default:p(()=>[g("span",{class:Z(["mx-hhnews-rank",{"is-top3":n.index<3}])},M(n.index+1),3),g("span",We,M(n.word),1),g("span",Ge,M(n.hotScore),1)]),_:2},1032,["title","href"]))),128))]),_:1})]),_:1},8,["modelValue"])}}};const Xe={class:"mx-hrnews-list"},Ye=g("span",{class:"mx-hrnews-list-dot"},"•",-1),et={__name:"HomeNewsRecommend",setup(o){const l=I("chief"),t=I([{name:"chief",label:"头条",data:null},{name:"military",label:"军事",data:null},{name:"social",label:"社会",data:null},{name:"ent",label:"娱乐",data:null}]);async function e(c){const s=t.value.findIndex(a=>a.name===c);if(t.value[s].data)return;const{data:i}=await N.getHomeRecommendNews(c);t.value[s].data=i}return(c,s)=>{const i=w("MxLink"),a=w("MxTabPane"),n=w("MxTabs");return u(),y(n,{modelValue:l.value,"onUpdate:modelValue":s[0]||(s[0]=r=>l.value=r),class:"mx-hrnews",onChange:e},{default:p(()=>[(u(!0),_(k,null,D(t.value,r=>(u(),y(a,{key:r.name,data:r},{default:p(()=>[r.data?(u(),_(k,{key:0},[h(ee,{class:"mx-hrnews-focus",data:r.data},null,8,["data"]),g("div",Xe,[(u(!0),_(k,null,D(r.data.list,b=>(u(),y(i,{key:b.title,class:"mx-hrnews-list-item",title:b.title,href:b.url},{default:p(()=>[Ye,g("span",null,M(b.title),1)]),_:2},1032,["title","href"]))),128))])],64)):F("",!0)]),_:2},1032,["data"]))),128))]),_:1},8,["modelValue"])}}};const tt={class:"mx-home"},lt={class:"mx-home-module"},ot={class:"mx-home-right"},it={class:"mx-home-module mx-mt-10"},st={class:"mx-home-right"},at={__name:"index",setup(o){const l=I("hot");return ie(()=>{const t=document.createElement("script");t.async=!0,t.src="https://res.dashet.com/da/da.js?cid=450B6ED0&skey=120fa11b",document.getElementById("homeGame").append(t)}),(t,e)=>{const c=w("MxIframe"),s=w("MxTabPane"),i=w("MxTabs");return u(),_("div",tt,[g("div",lt,[h(Ae,{class:"mx-home-left"}),g("div",ot,[h(He),h(c,{src:"./ad.html",height:"279",class:"mx-mt-10"})])]),g("div",it,[h(Qe,{class:"mx-home-left"}),g("div",st,[h(Ze),h(et,{class:"mx-mt-10"})])]),h(i,{modelValue:l.value,"onUpdate:modelValue":e[0]||(e[0]=a=>l.value=a),class:"mx-mt-10"},{default:p(()=>[h(s,{id:"homeGame",data:{name:"game",label:"游戏专区"}})]),_:1},8,["modelValue"])])}}};export{at as default};