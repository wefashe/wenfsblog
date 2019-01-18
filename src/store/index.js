import Vue from 'vue';
import Vuex from 'vuex';

import loading from '@/store/module/loading';
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    loading
  },
})
