// pages/teachReviewStuFilePlan/teachReviewStuFilePlan.js
import teachRequest from '../../utils/stuRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuInfo: {} ,//学生信息
    planList:[],//进度计划列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let titleId = wx.getStorageSync('reviewTitleId')
    let stuId = wx.getStorageSync('reviewStuId')

    //获取学生选题信息
    let stuInfo = await teachRequest('/chooseTitleDetail',{titleId: titleId},'GET')

    let planList = await teachRequest('/getPlanList',{userId: stuId},'GET')

    this.setData({
      stuInfo: stuInfo.data,
      planList: planList.data
    })
  },
  //跳转至进度计划详情页
  toPlanDetail(event){
    let reviewPlanId = event.currentTarget.id
    wx.setStorage({
      data: reviewPlanId,
      key: 'reviewPlanId',
    })
    wx.navigateTo({
      url: '/pages/teachReviewStuFilePlanDet/teachReviewStuFilePlanDet?planId=' + reviewPlanId,
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