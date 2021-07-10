// pages/stuDocUploadPlan/stuDocUploadPlan.js
import stuRequest from '../../utils/stuRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    perInfo:{},//个人选题信息
    planList: [],//个人进度计划

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let userId = wx.getStorageSync('userId')

    //个人选题信息
    let perInfo = await stuRequest('/stuTitleDetail',{userId: userId},'GET')

    // 个人进度计划集合
    let planList = await stuRequest('/getPlanList',{userId: userId},'GET')
    //console.log(planList)

    this.setData({
      perInfo: perInfo.data,
      planList: planList.data
    })

  },
  // 跳转至添加进度计划页面
  addPlanRecord(){
    wx.navigateTo({
      url: '/pages/stuDocUploadPlanForm/stuDocUploadPlanForm',
    })
  },
  // 跳转至进度计划详情页面
  toPlanDetail(e){
    let planId = e.currentTarget.id
    wx.setStorage({
      data: planId,
      key: 'planId',
    })
    wx.navigateTo({
      url: '/pages/stuDocUploadPlanDetail/stuDocUploadPlanDetail?planId=' + planId,
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