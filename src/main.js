import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router'
import store from '@/store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import '@/assets/style/global.less'

// var $path = document.querySelector('meta[name="AppPublic"]');
// __webpack_public_path__ = $path ? $path.getAttribute('content') : '/';
Vue.use(iView);

const root = document.createElement('div');
document.body.appendChild(root);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount(root);
