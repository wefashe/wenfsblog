import axios from 'axios';
import { LoadingBar, Message } from 'iview';
// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = '/api/v2';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.headers.common['User-Agent'] = 'wenfsblog';
// axios.defaults.headers.common['X-Auth-Token'] = 'QlDghkNyA7sIVDmSBMpjcekqvbiu6jW5OkX9gg59';
axios.defaults.headers = {
  // 'X-Requested-With': 'XMLHttpRequest',
  // 'User-Agent': 'wenfsblog',
  // 'X-Auth-Token':'QlDghkNyA7sIVDmSBMpjcekqvbiu6jW5OkX9gg59'
};
// http request 拦截器
axios.interceptors.request.use(
  config => {
    // 请求加载动画开始
    LoadingBar.start();
    // config.data = JSON.stringify(config.data);
    config.headers = {
      'X-Auth-Token': 'QlDghkNyA7sIVDmSBMpjcekqvbiu6jW5OkX9gg59'
    };
    return config;
  },
  error => {
    LoadingBar.error();
    // Message.warning(error);
    return Promise.reject(error);
  }
);

// http response拦截器及异常处理
axios.interceptors.response.use(
  response => {
    // 请求加载动画关闭
    LoadingBar.finish();
    // if (response.data.result === 'TRUE') {
    return response;
    // } else {
    // 常规错误处理
    // Message.warning(response.data.data.msg)
    // }
  },
  err => {
    LoadingBar.error();
    // 响应错误处理
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          Message.error('错误的请求');
          break;
        case 401:
          Message.error('没有权限访问');
          break;
        case 403:
          Message.error('拒绝访问');
          break;
        case 404:
          Message.error('请求错误,未找到该资源');
          break;
        case 405:
          Message.error('请求方法未被允许');
          break;
        case 408:
          Message.error('请求超时');
          break;
        case 500:
          Message.error('服务器端出错');
          break;
        case 501:
          Message.error('网络未实现');
          break;
        case 502:
          Message.error('网络错误');
          break;
        case 503:
          Message.error('服务不可用');
          break;
        case 504:
          Message.error('网络超时');
          break;
        case 505:
          Message.error('http版本不支持该请求');
          break;
        default:
          Message.error(`连接错误${err.response.status}`);
      }
    } else {
      Message.error('连接到服务器失败');
    }
    return Promise.resolve(err.response);
  }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}
