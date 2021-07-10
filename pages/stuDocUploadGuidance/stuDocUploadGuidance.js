// pages/stuDocUploadGuidance/stuDocUploadGuidance.js
import stuRequest from '../../utils/stuRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    perInfo: {},//个人选题信息
    guidanceList:[],//指导记录列表

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let userId = wx.getStorageSync('userId')

    //个人选题信息
    let perInfo = await stuRequest('/stuTitleDetail',{userId: userId},'GET')

    // 指导记录审核列表
    let guidanceList = await stuRequest('/getGuidanceList',{userId: userId},'GET')
    //console.log(guidanceList)

    this.setData({
      perInfo: perInfo.data,
      guidanceList: guidanceList.data
    })

  },
  //调转到添加进度计划表单页面
  addGuidance(){
    wx.navigateTo({
      url: '/pages/stuDocUploadGuiForm/stuDocUploadGuiForm',
    })
  },
  //跳转至指导记录详情页面
  toGuiDetail(e){
    let guidanceId = e.currentTarget.id

    wx.setStorage({
      data: guidanceId,
      key: 'guidanceId',
    })
    
    wx.navigateTo({
      url: '/pages/stuDocUploadGuiDetail/stuDocUploadGuiDetail?guidanceId=' + guidanceId,
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