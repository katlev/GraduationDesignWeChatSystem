// pages/teachInfoOpen/teachInfoOpen.js
import teachRequest from '../../utils/stuRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames:'1',
    listContent:[]  //分组列表

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let username = wx.getStorageSync('username')
    let schoolYear = wx.getStorageSync('schoolYear')

    let listContent = await teachRequest('/teachSelectOpen',{openTeachs: username,schoolYear: schoolYear},'GET')
    //console.log(listContent)
    this.setData({
      listContent: listContent.data
    })

  },
   // 折叠面板
   onChange(e){
    this.setData({
      activeNames:e.detail
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