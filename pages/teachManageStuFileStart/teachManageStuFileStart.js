// pages/teachManageStuFileStart/teachManageStuFileStart.js
import teachRequest from '../../utils/stuRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    check:false,
    stuInfo:{},//个人选题信息
    startName: '',//开题报告
    startPath: '',//开题报告路径
    startCheck: '',//开题报告审核情况
    message: '',//审核意见
    startOpinion:'', 
    true: true, //switch开状态
    false: false, //switch关状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let titleId = wx.getStorageSync('stuTitleId')
    // 学生选题信息
    let stuInfo = await teachRequest('/chooseTitleDetail',{titleId: titleId},'GET')
    //console.log(stuInfo)

    // 选题学生userId
    let userId = stuInfo.data.userId
    let files = await teachRequest('/getFileCheck',{userId: userId},'GET')
    console.log(files)

    this.setData({
      userId: userId,
      stuInfo: stuInfo.data,
      startName: files.data.startName,
      startPath: files.data.startPath,
      startCheck: files.data.startCheck
    })

    if(files.data.startOpinion == null || files.data.startOpinion == ""){
      this.setData({
        startOpinion: null
      })
    }
  },
  //当审核按钮改变时的回调
  onChange({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ check: detail });
  },
  // 当输入框内容改变时的回调
  inputMessage(e){
    //console.log(e)
    this.setData({
      message: e.detail
    })

  },
  // 提交审核
  async submitStartCheck(){
    let startCheck = this.data.check
    let message = this.data.message
    let userId = this.data.userId

    if(message == ''){
      wx.showToast({
        title: '请填写审核意见',
        icon: 'none'
      })
      return
    }

    let submitResult = await teachRequest('/checkStartFile',{check: startCheck,startOpinion:message,userId: userId},'GET')
    //console.log(submitResult)

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
  // 本地预览文件
  openStartFile(){
    let startPath = this.data.startPath
    wx.downloadFile({
      url: startPath,
      success: (result) => {
        wx.openDocument({
          filePath: result.tempFilePath,
          showMenu: false,
          success: (res) => {
            console.log("打开成功")
          },
          fail: (error) => {
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