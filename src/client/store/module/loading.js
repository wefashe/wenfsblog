import * as type from '@client/store/type';

export default {
  // 对状态进行定义
  state: {
    showLoading: false
  },

  // 对状态进行注册
  mutations: {
    // ES2015 风格
    [type.SHOWLOADING](state) {
      state.showLoading = true;
    },
    [type.HIDELOADING](state) {
      state.showLoading = false;
    }
  },
  // 对状态进行操作
  actions: {
    showloader: ({ commit }) => {
      // 执行mutations上对应的方法
      commit(type.SHOWLOADING);
    },
    hideloader: ({ commit }) => {
      commit(type.HIDELOADING);
    }
  },
  getters: {
    // 对状态进行获取
    showLoading: state => state.showLoading
  }
};
