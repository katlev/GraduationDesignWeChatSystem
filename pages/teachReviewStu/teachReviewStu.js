// pages/teachReviewStu/teachReviewStu.js
import teachRequest from '../../utils/stuRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuList:[] ,//待评阅学生列表
    isTriggered: false, //下拉刷新标识
    currentPage: 0 ,//当前页
    totalPage: 0 ,//总页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let userId = wx.getStorageSync('userId')
    let stuList = await teachRequest('/getReviewStuList',{userId: userId},'GET')
    //console.log(stuList)
    this.setData({
      stuList: stuList.data,
      currentPage: stuList.pageInfo.pageNum,
      totalPage: stuList.pageInfo.pages
    })

  },
  //获取点击列表id
  toTeachReviewStuFile(event){
    //console.log(event)
    let reviewTitleId = event.currentTarget.id

    let reviewStuId = event.currentTarget.dataset.userid
    //console.log(reviewStuId)
    wx.setStorage({
      data: reviewTitleId,
      key: 'reviewTitleId',
    })

    wx.setStorage({
      data: reviewStuId,
      key: 'reviewStuId',
    })
  },
  //自定义下拉刷新
  async handleRefresher(){
  
    let userId = wx.getStorageSync('userId')
    let stuList = await teachRequest('/getReviewStuList',{userId: userId},'GET')
    //console.log(stuList)
    this.setData({
      stuList: stuList.data,
      currentPage: stuList.pageInfo.pageNum,
      isTriggered: false
    })
  },
  //下拉触底
  async handleToLower(){
    let currentPage = this.data.currentPage + 1
    let totalPage = this.data.totalPage

    if(currentPage <= totalPage){
      let userId = wx.getStorageSync('userId')
      let stuList = await teachRequest('/getReviewStuList',{page:currentPage,userId: userId},'GET')
      //console.log(stuList)
      let newList = stuList.data
      let list = this.data.stuList
      list.push(...newList)

      this.setData({
        stuList: list,
        currentPage: stuList.pageInfo.pageNum
      })
    }
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