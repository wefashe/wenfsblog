import * as type from '@client/store/type';
export default {
  state: {
    list: [],
    hasNextPage: true
  },

  mutations: {
    SET_POSTS(state, { page, data }) {
      if (+page === 1) {
        state.posts.list = [];
      }
      if (data.length > 0) {
        state.posts.list.push(...data);
      } else {
        state.posts.hasNextPage = false;
      }
    }
  },
  actions: {
    showloader: ({ commit }) => {
      commit(type.SHOWLOADING);
    },
    hideloader: ({ commit }) => {
      commit(type.HIDELOADING);
    }
  },
  getters: {
    showLoading: state => state.showLoading
  }
};
