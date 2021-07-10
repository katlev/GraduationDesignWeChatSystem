// pages/teachReview/teachReview.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    expert:'',//评阅专家身份

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabBar1()

    let role = wx.getStorageSync('role')
    let roleArr = role.split(',')
    let expert = roleArr[1]

    this.setData({
      expert: expert

    })
    //console.log(roleArr)
  },
  //跳转至审核题目页面
  toReviewTitle(){
    wx.navigateTo({
      url: '/pages/teachReviewTitle/teachReviewTitle',
    })
  },

  //跳转至审核任务书页面
  toReivewTask(){
    wx.navigateTo({
      url: '/pages/teachReviewTask/teachReviewTask',
    })
  },

  //跳转至评阅学生页面
  toReviewStu(){
    wx.navigateTo({
      url: '/pages/teachReviewStu/teachReviewStu',
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