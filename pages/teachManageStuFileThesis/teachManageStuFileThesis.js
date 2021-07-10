// pages/teachManageStuFileThesis/teachManageStuFileThesis.js
import teachRequest from '../../utils/stuRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked:false,
    message:'',//输入审核意见
    sutInfo:{},//学生信息
    userId: '',
    thesisName:'',//毕业论文
    thesisPath:'',//毕业论文路径
    thesisCheck:'',//毕业论文审核
    thesisOpinion: '',//毕业论文审核意见
    true: true ,//switch开状态
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

    this.setData({
      stuInfo: stuInfo.data,
      userId: userId,
      thesisName: files.data.thesisName,
      thesisPath: files.data.thesisPath,
      thesisCheck: files.data.thesisCheck
    })

    if(files.data.thesisOpinion == null || files.data.thesisOpinion == ""){
      this.setData({
        thesisOpinion: null
      })
    }
  },
  // 审核按钮发生改变时的回调
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
  // 提交按钮
  async submitThesisCheck(){
    let thesisCheck = this.data.checked
    let thesisOpinion = this.data.message
    let userId = this.data.userId

    if(thesisOpinion == ''){
      wx.showToast({
        title: '请填写审核意见',
        icon: 'none'
      })
      return
    }

    let submitResutl = await teachRequest('/checkThesisFile',{check: thesisCheck,thesisOpinion: thesisOpinion,userId: userId},'GET')

    if(submitResutl.code == 200){
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
  openThesisFile(){
    let thesisPath = this.data.thesisPath
    wx.downloadFile({
      url: thesisPath,
      success: (result) => {
        wx.openDocument({
          filePath: result.tempFilePath,
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