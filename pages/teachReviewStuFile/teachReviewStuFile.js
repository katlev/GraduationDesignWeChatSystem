// pages/teachReviewStuFile/teachReviewStuFile.js
import teachRequest from '../../utils/stuRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuInfo:{},//学生信息
    files: {} ,//文档信息
    readScore:'',//评阅分数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let titleId = wx.getStorageSync('reviewTitleId')
    let stuId = wx.getStorageSync('reviewStuId')

    //获取选题学生信息
    let stuInfo = await teachRequest('/chooseTitleDetail',{titleId: titleId},'GET')
    //console.log(stuInfo)

    //获取文档信息
    let files = await teachRequest('/readStuDocuments',{userId: stuId},'GET')
    //console.log(files)

    //获取学生分数
    let score = await teachRequest('/getStuScore',{userId:stuId},'GET')
    this.setData({
      stuInfo: stuInfo.data,
      files: files.data,
      readScore: score.data.readScore
    })
  },
  //跳转至进度计划列表页
  toPlanList(){
    wx.navigateTo({
      url: '/pages/teachReviewStuFilePlan/teachReviewStuFilePlan',
    })
  },
  //跳转至指导记录列表页
  toGuidanceList(){
    wx.navigateTo({
      url: '/pages/teachReviewStuFileGui/teachReviewaStuFileGui',
    })
  },
  //跳转至成绩录入页面
  toInputScore(){
    wx.navigateTo({
      url: '/pages/teachReviewStuFileScore/teachReviewStuFileScore',
    })
  },

  //开题报告预览
  readStartFile(){
    let startPath = this.data.files.startPath
    wx.downloadFile({
      url: startPath,
      success: result => {
        //console.log(result)
        if(result.statusCode == 200){
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
      }
    })
  },

  //预览中期检查
  readMiddleFile(){
    let middlePath = this.data.files.middlePath
    wx.downloadFile({
      url: middlePath,
      success: result => {
        if(result.statusCode == 200){
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
      }
    })
  },
  // 预览外文译文
  readTranslationFile(){
    let translationPath = this.data.files.translationPath

    wx.downloadFile({
      url: translationPath,
      success: result => {
        if(result.statusCode == 200){
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
      }
    })

  },
  //预览外文原文
  readOriginalFile(){
    let originalPath = this.data.files.originalPath

    wx.downloadFile({
      url: originalPath,
      success: result => {
        if(result.statusCode == 200){
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
      }
    })

  },
  //预览文献综述
  readLiteratureFile(){
    let literaturePath = this.data.files.literaturePath

    wx.downloadFile({
      url: literaturePath,
      success: result => {
        if(result.statusCode == 200){
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
      }
    })

  },
  //预览毕业论文
  readThesisFile(){
    let thesisPath = this.data.files.thesisPath

    wx.downloadFile({
      url: thesisPath,
      success: result => {
        if(result.statusCode == 200){
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