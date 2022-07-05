import Vue from 'vue'
import App from './App.vue'
import router from '@/router';
// 三级联动组件
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination';
import { Button,MessageBox } from 'element-ui';
 

import store from '@/store';

import '@/mock/mockServe';
import "swiper/css/swiper.css"

// 统一接口api文件夹里的所有请求函数
import * as API from '@/api';

import VueLazyload from 'vue-lazyload';

Vue.config.productionTip = false

// 全局注册组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)

Vue.use(Button)


// elementui注册组件：挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

import panda from '@/assets/images/panda.gif';
Vue.use(VueLazyload,{
  // 懒加载默认的图片
  loading:panda
})

import "@/plugins/validate"

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API
  },
  created() {
    console.log(this.$store);
  },
}).$mount('#app')
