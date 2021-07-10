// pages/stuDocUploadGuiDetail/stuDocUploadGuiDetail.js
import stuRequest from '../../utils/stuRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    perInfo:{},//个人选题信息 
    guidanceDetail:{}//指导记录详细内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let userId = wx.getStorageSync('userId') 

    // 个人选题信息
    let perInfo = await stuRequest('/stuTitleDetail',{userId: userId},'GET')

    let guidanceId = wx.getStorageSync('guidanceId')
    let guidanceDetail = await stuRequest('/getGuidanceItemDetail',{guidanceId: guidanceId},'GET')

    this.setData({
      perInfo: perInfo.data,
      guidanceDetail: guidanceDetail.data
    })

  },
  // 指导记录预览
  readGuidanceFile(){
    let guidancePath = this.data.guidanceDetail.guidancePath

    wx.downloadFile({
      url: guidancePath,
      success: (result) => {
        wx.openDocument({
          filePath: result.tempFilePath,
          showMenu: false,
          success: (res) => {
            console.log('指导记录打开成功')
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