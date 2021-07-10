// pages/stuDocUploadPlanDetail/stuDocUploadPlanDetail.js
import stuRequest from '../../utils/stuRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    perInfo:{},//个人选题信息
    planDetail:{}, //进度计划详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let userId = wx.getStorageSync('userId')

    //个人选题信息
    let perInfo = await stuRequest('/stuTitleDetail',{userId: userId},'GET')

    //进度计划详情
    let planId = wx.getStorageSync('planId')
    let planDetail = await stuRequest('/getPlanItemDetail',{planId: planId},'GET')
    //console.log(planDetail)

    this.setData({
      perInfo: perInfo.data,
      planDetail: planDetail.data
    })

  },
  // 进度计划预览
  readPlanFile(){
    let planPath = this.data.planDetail.planPath
    //console.log(planPath)
    wx.downloadFile({
      url: planPath,
      success: (result) => {
        wx.openDocument({
          filePath: result.tempFilePath,
          showMenu: false,
          success: (res) => {
            console.log('进度计划打开成功')
          },
          fail: (error) => {
            wx.showToast({
              title: '打开失败',
              icon: 'none'
            })
          }
        })

      },
      fail: (error) => {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        })
      }
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