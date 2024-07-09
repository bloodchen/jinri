// 注册全局组件
import MxTabs from './MxTabs.vue';
import MxTabPane from './MxTabPane.vue';
import MxSwiper from './MxSwiper.vue';
import { SwiperSlide } from 'swiper/vue';

export function setupComponents(vueApp) {
  vueApp.component('MxTabs', MxTabs);
  vueApp.component('MxTabPane', MxTabPane);
  vueApp.component('MxSwiper', MxSwiper);
  vueApp.component('MxSwiperSlide', SwiperSlide);
}
