import Vue from 'vue';
import Vuex from 'vuex';

import loading from '@client/store/module/loading';
Vue.use(Vuex);

export function createStore() {
  const store = new Vuex.Store({
    modules: {
      loading
    }
  });
  return store;
}
