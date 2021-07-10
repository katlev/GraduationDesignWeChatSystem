// pages/teachManageStuFileTranslation/teachmanageStuFileTranslation.js
import teachRequest from '../../utils/stuRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    stuInfo:{},//学生信息
    checked:false,
    message:'',//输入审核意见
    translationName:'',//外文译文
    translationPath:'',//外文译文路径
    translationCheck: '',//外文译文审核状态
    translationOpinion: '', // 外文译文审核意见
    true: true, //swtich开状态
    false: false ,//switch关状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let titleId = wx.getStorageSync('stuTitleId')

    // 学生信息
    let stuInfo = await teachRequest('/chooseTitleDetail',{titleId: titleId},'GET')

    let userId = stuInfo.data.userId
    let files = await teachRequest('/getFileCheck',{userId: userId},'GET')
    //console.log(files)

    this.setData({
      stuInfo: stuInfo.data,
      userId: userId,
      translationName: files.data.translationName,
      translationPath: files.data.translationPath,
      translationCheck: files.data.translationCheck
    })

    if(files.data.translationOpinion == null || files.data.translationOpinion == ""){
      this.setData({
        translationOpinion: null
      })
    }

  },
  // 审核按发生改变时的回调
  onChange(e){
    this.setData({
      checked: e.detail
    })
  },
  // 输入框发生改变时的回调
  inputMessage(e){
    this.setData({
      message: e.detail
    })
  },
  // 提交审核
  async submitTranslationCheck(){
    let translationCheck = this.data.checked
    let translationOpinion = this.data.message
    let userId = this.data.userId

    if(translationOpinion == ''){
      wx.showToast({
        title: '请填写审核意见',
        icon: 'none'
      })
      return 
    }

    let submitResult = await teachRequest('/checkTranslationFile',{check:translationCheck,translationOpinion: translationOpinion,userId: userId},'GET')

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
  openTranslationFile(){
    let translationPath = this.data.translationPath

    wx.downloadFile({
      url: translationPath,
      success: (result) =>{
        wx.openDocument({
          filePath: result.tempFilePath,
          showMenu: false,
          success: (res) => {
            console.log("打开成功")
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