// pages/teachManage/teachManage.js
import teachRequest from '../../utils/stuRequest'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTriggered: false,//下拉刷新
    isTriggeredTab2:false,//标签页2下拉刷新
    current:"tab1", //当前标签页
    slideButtons:[{ //滑动删除
      type: 'warn',
      text: '删除',
      extClass: 'test'
    }],
    stuList:[], //选题学生消息列表
    msgList:[],//选题消息列表
    stuSelect:{},//学生选题信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    app.editTabBar1()

    let userId = wx.getStorageSync('userId')

    //选题学生列表
    let stuList = await teachRequest('/choiceTitleStu',{userId: userId},'GET')
    console.log(stuList)

    //选题消息列表
    let msgList = await teachRequest('/chooseTitle',{userId: userId},'GET')

    this.setData({
      stuList: stuList.data,
      msgList: msgList.data
    })
  },
  //滑动列表:删除按钮
  async slideButtonTap(e) {
     // console.log(e)
      let userId = e.currentTarget.id
      console.log(userId)

      let openIdResult = await teachRequest('/getOpenId',{userId:userId},'GET')
      let openId = openIdResult.data.openId
      
      //学生个人选题信息
      let stuSelect = await teachRequest('/stuTitleDetail',{userId: userId},'GET')
      let titleName = stuSelect.data.titleName
      let username = stuSelect.data.username
      let titleState = "开题教师已取消你的选题，请重新选题"

      wx.requestSubscribeMessage({
        tmplIds: ['iLZOh4WPTrnjpacJA4WOaRPhCkRb-qyOBwt9DrP6poE'],
        success: async (res) => {
          let value = await teachRequest('/teachSend',{openId:openId,titleName:titleName,titleState: titleState,username:username},'GET')
          console.log(value)
        },
        fail: (error) => {
          console.log(error)
        }
      })

      let cancelStu = await teachRequest("/cancelStuTitle",{userId: userId},'GET')
      //console.log(cancelStu)
      if(cancelStu.code != 200){
        wx.showToast({
          title: '删除失败',
          icon: 'none'
        })
      }else if(cancelStu.code == 200){
        this.onLoad()
      }
  },
// 标签页切换
  handleChange({detail}){
    this.setData({
      current:detail.key
    })
  },
  // 跳转到选题消息详情
  toMsgDetail(e){
    let selectTitleId = e.currentTarget.id
    wx.setStorage({
      data: selectTitleId,
      key: 'selectTitleId',
    })
    console.log(e)
    wx.navigateTo({
      url: '/pages/teachManageMsg/teachManageMsg?titleId=' + selectTitleId,
    })
  },
  // 跳转到学生管理页面
  toStuManage(e){
    let stuTitleId = e.currentTarget.id
    wx.setStorage({
      data: stuTitleId,
      key: 'stuTitleId',
    })
    wx.navigateTo({
      url: '/pages/teachManageStu/teachManageStu?titleId=' + stuTitleId,
    })
  },
  //标签页1自定义下拉刷新
  async handleRefresher(){
    let userId = wx.getStorageSync('userId')
     //选题消息列表
     let msgList = await teachRequest('/chooseTitle',{userId: userId},'GET')
    console.log(msgList)
    this.setData({
      msgList: msgList.data,
      isTriggered: false
    })
  },
  //标签页2自定义下拉刷新
 async handleRefresherTab2(){

    let userId = wx.getStorageSync('userId')
    //选题学生列表
    let stuList = await teachRequest('/choiceTitleStu',{userId: userId},'GET')
    
    console.log(stuList)

    this.setData({
      stuList: stuList.data,
      isTriggeredTab2: false
      
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