// pages/stuContactDetail/stuContactDetail.js
import stuRequest from '../../utils/stuRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teachInfo:{} ,//教师信息
    messageList: [] ,//留言记录
    message:'' ,//留言消息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let teachId = wx.getStorageSync('contactTeachId')
    
    //教师信息
    let teachInfo = await stuRequest('/getUserInfo',{userId: teachId},'GET')
    //console.log(teachInfo)
    
    //留言记录
    let stuId = wx.getStorageSync('userId')

    let messageList = await stuRequest('/getStuMessage',{stuId: stuId,teachId: teachId},'GET')
    //console.log(messageList)

    this.setData({
      teachInfo: teachInfo.data,
      messageList: messageList.data
    })

  },
  //当输入框发生变化时的回调
  handleInput(event){
    //console.log(event)
    let type = event.currentTarget.id
    this.setData({
      [type] : event.detail.value
    })

  },
  //发送留言按钮
  async sendMessage(){
    let value = this.data.message

    if(value.trim() == ''){
      wx.showToast({
        title: '输入不能为空',
        icon: 'none'
      })
      return
    }

    let teachId = this.data.teachInfo.userId
    let stuId = wx.getStorageSync('userId')

    let sendResult = await stuRequest('/sendMessageToTeach',{stuId: stuId,stuMessage:value,teachId: teachId},'POST')
    //console.log(sendResult)
    if(sendResult.code == 200){
      wx.showToast({
        title: '留言成功',
        icon: 'none'
      })

      this.onLoad()

      this.setData({
        message: ''
      })
    }else{
      wx.showToast({
        title: '发送失败',
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