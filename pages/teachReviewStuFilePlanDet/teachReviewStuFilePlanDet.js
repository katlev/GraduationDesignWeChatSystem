// pages/teachReviewStuFilePlanDet/teachReviewStuFilePlanDet.js
import teachRequest from '../../utils/stuRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuInfo:{}, //学生信息
    planDetail:{},//进度计划内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let titleId = wx.getStorageSync('reviewTitleId')

    // 学生信息
    let stuInfo = await teachRequest('/chooseTitleDetail',{titleId: titleId},'GET')

    //进度计划详细内容
    let planId = wx.getStorageSync('reviewPlanId')

    let planDetail = await teachRequest('/getPlanItemDetail',{planId: planId},'GET')

    this.setData({
      stuInfo: stuInfo.data,
      planDetail: planDetail.data
    })

  },

  //本地预览进度计划附件
  openPlanFile(){
    let planPath = this.data.planDetail.planPath
    wx.downloadFile({
      url: planPath,
      success: result => {
        if(result.statusCode == 200){
          wx.openDocument({
            filePath: result.tempFilePath,
            success: res => {
              console.log('打开成功')
            },
            fail: error => {
              wx.showToast({
                title: '打开失败',
                icon: 'none'
              })
            }
          })
        }
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