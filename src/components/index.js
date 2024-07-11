// 注册全局组件
import MxBtn from './MxBtn.vue';
import MxDialog from './MxDialog.vue';
import MxIcon from './MxIcon.vue';
import MxTabs from './MxTabs.vue';
import MxTabPane from './MxTabPane.vue';
import MxSwiper from './MxSwiper.vue';
import { SwiperSlide } from 'swiper/vue';

export function setupComponents(vueApp) {
  vueApp.component('MxBtn', MxBtn);
  vueApp.component('MxDialog', MxDialog);
  vueApp.component('MxIcon', MxIcon);
  vueApp.component('MxTabs', MxTabs);
  vueApp.component('MxTabPane', MxTabPane);
  vueApp.component('MxSwiper', MxSwiper);
  vueApp.component('MxSwiperSlide', SwiperSlide);
}
