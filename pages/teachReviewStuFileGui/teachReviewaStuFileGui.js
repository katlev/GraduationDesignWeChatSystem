// pages/teachReviewStuFileGui/teachReviewaStuFileGui.js
import teachRequest from '../../utils/stuRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuInfo:{},//学生信息
    guidanceList:[], //指导记录集合

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let titleId = wx.getStorageSync('reviewTitleId')

    //获取学生信息
    let stuInfo = await teachRequest('/chooseTitleDetail',{titleId: titleId},'GET')

    let userId = stuInfo.data.userId
    let guidanceList = await teachRequest('/getGuidanceList',{userId: userId},'GET')
    this.setData({
      stuInfo: stuInfo.data,
      guidanceList: guidanceList.data
    })
  },
  //跳转至详情页
  toGuidanceDetail(event){
    let reviewGuiId = event.currentTarget.id
    wx.setStorage({
      data: reviewGuiId,
      key: 'reviewGuiId',
    })
    wx.navigateTo({
      url: '/pages/teachReviewStuFileGuiDet/teachReviewStuFileGuiDet?defenceId=' + reviewGuiId,
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