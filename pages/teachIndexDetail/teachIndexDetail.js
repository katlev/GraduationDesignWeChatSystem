// pages/teachIndexDetail/teachIndexDetail.js
import teachRequest from '../../utils/stuRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleDetail:{},//题目详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    //获取题目详情
    let titleId = wx.getStorageSync('openTitleId')

    let data = await teachRequest('/getTitleDetail',{titleId: titleId},'GET')
    //console.log(data)
    this.setData({
      titleDetail: data.data
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