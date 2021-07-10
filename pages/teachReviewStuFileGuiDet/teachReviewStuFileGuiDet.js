// pages/teachReviewStuFileGuiDet/teachReviewStuFileGuiDet.js
import teachRequest from '../../utils/stuRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuInfo:{} ,//学生信息
    guidanceDetail: {} ,//指导记录内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    //学生信息
    let titleId = wx.getStorageSync('reviewTitleId')

    let stuInfo = await teachRequest('/chooseTitleDetail',{titleId: titleId},'GET')

    //指导记录详细内容
    let guidanceId = wx.getStorageSync('reviewGuiId')
    let guidanceDetail = await teachRequest('/getGuidanceItemDetail',{guidanceId: guidanceId},'GET')

    this.setData({
      stuInfo: stuInfo.data,
      guidanceDetail: guidanceDetail.data
    })

  },
  //本地预览指导记录附件
  openGuidanceFile(){
    let guidancePath = this.data.guidanceDetail.guidancePath

    wx.downloadFile({
      url: guidancePath,
      success: res => {
        if(res.statusCode == 200){
          wx.openDocument({
            filePath: res.tempFilePath,
            showMenu: false,
            success: result => {
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