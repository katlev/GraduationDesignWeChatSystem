//发送ajax请求
import config from './config'
export default (url,data={},method='') => {
  return new Promise((resolve,reject) => {
    wx.request({
      url: config.host + url,
      data,
      method,
      header:{
        'content-type' : 'application/x-www-form-urlencoded',
        'Authorization' : wx.getStorageSync('token')
      },
      success: (res) => {
        resolve(res.data)
      },
      fail: (error) => {
        reject(error)
      }
    })
  })
}