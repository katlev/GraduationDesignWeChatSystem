// pages/teachManageStuFileGuidanceCheck/teachManageStuFileGuidanceCheck.js
import teachRequest from '../../utils/stuRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked:false,
    message:'',
    stuInfo:{},//学生信息
    guidanceDetail:{},//指导记录内容
    true: true ,//switch开状态
    false: false ,//switch关状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let titleId = wx.getStorageSync('stuTitleId')

    // 学生信息
    let stuInfo = await teachRequest('/chooseTitleDetail',{titleId: titleId},'GET')
    //console.log(stuInfo)

    let guidanceId = wx.getStorageSync('stuGuidanceId')
    // 指导记录内容
    let guidanceDetail = await teachRequest('/getGuidanceItemDetail',{guidanceId: guidanceId},'GET')
    console.log(guidanceDetail)
    this.setData({
      stuInfo: stuInfo.data,
      guidanceDetail: guidanceDetail.data
    })
  },
  // 当审核按钮发生变化时的回调
  onChange(e){
    this.setData({
      checked: e.detail
    })
  },
  // 当输入内容发生变化使得回调
  inputMessage(e){
    this.setData({
      message: e.detail
    })
  },
  // 提交按钮
  async submitGuidanceCheck(){
    let guidanceId = this.data.guidanceDetail.guidanceId
    let guidanceCheck = this.data.checked
    let guidanceOpinion = this.data.message


    if(guidanceOpinion == ''){
      wx.showToast({
        title: '请填写审核意见',
        icon: 'none'
      })
      return 
    }

    let submitResult = await teachRequest('/checkGuidanceFile',{check: guidanceCheck,guidanceId: guidanceId,guidanceOpinion: guidanceOpinion},'GET')
    console.log(submitResult)

    if(submitResult.code == 200){
      wx.showToast({
        title: '提交成功',
        icon: 'none'
      })

      setTimeout(() => {
        let pages = getCurrentPages()
        let beforePage = pages[pages.length - 2]
        beforePage.onLoad()
        wx.navigateBack({
          delta:1,
        })
      },1000)
      
    }else{
      wx.showToast({
        title: '提交失败',
        icon: 'none'
      })
    }
  },
  // 本地预览
  openGuidanceFile(){
    let guidancePath = this.data.guidanceDetail.guidancePath
    wx.downloadFile({
      url: guidancePath,
      success: result => {
        wx.openDocument({
          filePath: result.tempFilePath,
          showMenu: false,
          success: res => {
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