// pages/teachinfoReviewDet/teachInfoReviewDet.js
import teachRequest from '../../utils/stuRequest'
import stuRequest from '../../utils/stuRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuInfo: {} ,//学生信息
    messageList: [] ,//留言记录
    message:'' ,//回复信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    //学生信息
    let stuId = wx.getStorageSync('contactStuId')
    let stuInfo = await teachRequest('/getUserInfo',{userId: stuId},'GET')
    //console.log(stuInfo)

    let teachId = wx.getStorageSync('userId')
    let messageList = await teachRequest('/getStuMessage',{stuId: stuId,teachId: teachId},'GET')
    console.log(messageList)
    this.setData({
      stuInfo: stuInfo.data,
      messageList: messageList.data
    })
  },
  //当输入框内容发生改变时的回调
  handleInput(event){
    console.log(event)
    let type = event.currentTarget.id
    this.setData({
      [type]: event.detail.value
    })
  },
  //回复学生留言
  async sendMessageToStu(event){
    let messageId = event.currentTarget.id
    let value = this.data.message
    if(value.trim() == ''){
      wx.showToast({
        title: '输入不为空',
        icon :'none'
      })
      return
    }

    let sendReuslt = await stuRequest('/sendMessageToStu',{messageId: messageId,teachMessage: value},'POST')
    console.log(sendReuslt)
    if(sendReuslt.code == 200){
      wx.showToast({
        title: '回复成功',
        icon: 'none'
      })

      this.onLoad()
    }else{
      wx.showToast({
        title: '回复失败',
        icon: 'none'
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