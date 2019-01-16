import fetch from 'fetch'

export default {
  /**
   * 用户登录
   */
  Login(params) {
    return fetch('/users/api/userLogin', params)
  },

  /**
   * 用户注册
   */
  Regist(params) {
    return fetch('/users/api/userRegist', params)
  },

  /**
   * 发送注册验证码
   */
  RegistVerifiCode(tellphone) {
    return fetch('/users/api/registVerifiCode', {
      tellphone: tellphone
    })
  },

  /**
   * 获取约跑步列表
   */
  SportsList() {
    return fetch('/api/sportList')
  },

  /**
   * 获取约出行列表
   */
  TravelsList() {
    return fetch('/api/travelList')
  },

  /**
   * 获取约跑步详情
   */
  SportsDetail(id) {
    return fetch('/api/sportDetail', {
      sportId: id
    })
  },

  /**
   * 获取约出行详情
   */
  TravelsDetail(id) {
    return fetch('/api/travelDetail', {
      travelId: id
    })
  },

  /**
   * 获取出行活动点击次数
   */
  travelClicks(id) {
    return fetch('/api/travelClickNum', {
      travelId: id
    })
  },

  /**
   * 获取用户信息
   */
  UserInfo(id) {
    return fetch('/users/api/userInfo', {
      userId: id
    })
  },

  /**
   * 获取用户发布约行个数
   */
  getPubTotravelNum(id) {
    return fetch('/users/api/getPubTotravelNum', {
      userId: id
    })
  },

  /**
   * 获取用户自己发布的约行
   */
  getMyTravel(id) {
    return fetch('/users/api/myTravel', {
      userId: id
    })
  },

  /**
   * 发布约行活动
   */
  PostTravel(params) {
    return fetch()
  },

  /**
   * 获取全国JSON数据
   */
  getAddressJson() {
    return fetch('/api/address')
  }
}
