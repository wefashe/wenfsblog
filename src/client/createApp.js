import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from '@client/App';
import iview from '@client/iview';
import { createRouter } from '@client/router';
import { createStore } from '@client/store';
import { get, post } from '@client/fetch/http';

// var $path = document.querySelector('meta[name="AppPublic"]');
// __webpack_public_path__ = $path ? $path.getAttribute('content') : '/';

// 定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$get = get;

export function createApp() {
  // 创建 router 和 store 实例
  const router = createRouter();
  const store = createStore();

  // 同步路由状态(route state)到 store
  sync(store, router);

  // 创建应用程序实例，将 router 和 store 注入
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });

  // 暴露 app, router 和 store。
  return { app, router, store };
}
