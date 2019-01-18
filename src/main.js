import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router'
import store from '@/store'
import iview from '@/iview'
import {
  get,
  post
} from '@/fetch/http'
import '@/assets/style/global.less'

// var $path = document.querySelector('meta[name="AppPublic"]');
// __webpack_public_path__ = $path ? $path.getAttribute('content') : '/';


//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$get = get;

const root = document.createElement('div');
document.body.appendChild(root);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount(root);
