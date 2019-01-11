import Vue from 'vue';
import App from '@/App.vue';

// var $path = document.querySelector('meta[name="AppPublic"]');
// __webpack_public_path__ = $path ? $path.getAttribute('content') : '/';


const root = document.createElement('div');
document.body.appendChild(root);

new Vue({
  render: (h) => h(App)
}).$mount(root);
