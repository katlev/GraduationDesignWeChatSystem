// pages/teachManageStuFilePlan/teachManageStuFilePlan.js
import teachRequest from '../../utils/stuRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuInfo:{},//学生信息
    planList:[],//进度计划记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let titleId = wx.getStorageSync('stuTitleId')
    // 学生信息
    let stuInfo = await teachRequest('/chooseTitleDetail',{titleId: titleId},'GET')

    let userId = stuInfo.data.userId
    // 获取进度计划集合
    let planList = await teachRequest('/getPlanList',{userId: userId},'GET')
    //console.log(planList)

    this.setData({
      stuInfo: stuInfo.data,
      planList: planList.data
    })
  },
  //跳转至进度计划审核详情页
  toPlanCheck(e){
    //console.log(e)
    let planId = e.currentTarget.id

    wx.setStorage({
      data: planId,
      key: 'stuPlanId',
    })

    wx.navigateTo({
      url: '/pages/teachManageStuFilePlanCheck/teachManageStuFilePlanCheck?planId=' + planId,
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