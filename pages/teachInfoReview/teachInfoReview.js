// pages/teachInfoReview/teachInfoReview.js
import teachRequest from '../../utils/stuRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuList:[] ,//收到留言学生列表
    isTriggered: false ,//自定义下拉标识
    currentPage: 0 ,//当前页
    totalPage: 0 ,//总页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let teachId = wx.getStorageSync('userId')
    let stuList = await teachRequest('/getReceiveStuList',{teachId: teachId},'GET')
    //console.log(stuList)
    
    this.setData({
      stuList: stuList.data,
      currentPage: stuList.pageInfo.pageNum,
      totalPage: stuList.pageInfo.pages
    })
  },
  //点击当前列
  clickCell(event){
    let contactStuId = event.currentTarget.id

    wx.setStorage({
      data: contactStuId,
      key: 'contactStuId',
    })
  },
  //删除留言
  async deleteReview(event){
    console.log(event)

    let stuId = event.currentTarget.id

    let deleteResult = await teachRequest('/deleteContact',{stuId: stuId},'GET')
    console.log(deleteResult)

    if(deleteResult.code == 200){
      wx.showToast({
        title: '删除成功',
        icon: 'none'
      })
      this.onLoad()
    }else{
      wx.showToast({
        title: '删除失败',
        icon: 'none'
      })
    }

  },
  //自定义下拉刷新的回调
  async handleRefresher(){
    //console.log('下拉刷新')
    let teachId = wx.getStorageSync('userId')
    let stuList = await teachRequest('/getReceiveStuList',{teachId: teachId},'GET')
    //console.log(stuList)
    
    this.setData({
      stuList: stuList.data,
      currentPage: stuList.pageInfo.pageNum,
      isTriggered: false
    })
  },
  //自定下拉触底的回调
  async handleToLower(){
    console.log('下拉触底')

    let currentPage = this.data.currentPage + 1
    let totalPage = this.data.totalPage

    if(currentPage <= totalPage){

      let teachId = wx.getStorageSync('userId')
      let stuList = await teachRequest('/getReceiveStuList',{page: currentPage,teachId: teachId},'GET')
      console.log(stuList)

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