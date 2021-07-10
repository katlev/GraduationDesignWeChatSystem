// pages/teachInfoDesignScore/teachInfoDesignScore.js
import teachRequest from '../../utils/stuRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuList:[],//学生列表

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
      let defenceId = wx.getStorageSync('defenceId')

      let list = await teachRequest('/getDesignStuList',{defenceId: defenceId},'GET')
      //console.log(list)

      this.setData({
        stuList: list.data
      })
  },
  //点击当前列表
  clickCell(event){
    //console.log(event)
    let desTitleId = event.currentTarget.id
    wx.setStorage({
      data: desTitleId,
      key: 'desTitleId',
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