// pages/teachInfoDetail/teachInfoDetail.js
import teachRequest from '../../utils/stuRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    perInfo:{} //教师个人信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let userId = wx.getStorageSync('userId')

    //获取教师个人信息
    let data = await teachRequest('/getUserInfo',{userId: userId},'GET')
    //console.log(data)

    this.setData({
      perInfo: data.data
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})