// pages/stuInfoDoc/stuInfoDoc.js
import stuRequest from '../../utils/stuRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeName: '1',
    filesCheck:{},//文件审核情况
    plansCheck:[],//进度计划审核情况
    guidancesCheck:[] //指导记录审核情况

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async  function (options) {
    let userId = wx.getStorageSync('userId')
    // 过程文档审核情况
    let filesCheck = await stuRequest('/getFileCheck',{userId: userId},'GET')
    //console.log(filesCheck)

    // 进度计划审核情况
    let plansCheck = await stuRequest('/getPlanCheck',{userId: userId},'GET')
    //console.log(plansCheck)

    let guidancesCheck = await stuRequest('/getGuidanceCheck',{userId: userId},'GET')
    console.log(guidancesCheck)

    this.setData({
      filesCheck: filesCheck.data,
      plansCheck: plansCheck.data,
      guidancesCheck: guidancesCheck.data
    })

  },
  // 折叠面板改变
  onChange(event) {
    console.log(event)
    this.setData({
      activeName: event.detail,
    });
  },
  // 打开开题报告
  openStartFile(){
    let startPath = this.data.filesCheck.startPath

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
  //打开中期检查
  openMiddleFile(){
    let middlePath = this.data.filesCheck.middlePath
    wx.downloadFile({
      url: middlePath,
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
  // 打开进度计划附件
  openPlanFile(e){
    console.log(e)
    let planPath = e.currentTarget.id

    wx.downloadFile({
      url: planPath,
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
  // 打开指导记录附件
  openGuidanceFile(e){
    let guidancePath = e.currentTarget.id

    wx.downloadFile({
      url: guidancePath,
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
  // 打开外文译文
  openTranslationFile(){
    let translationPath = this.data.filesCheck.translationPath

    wx.downloadFile({
      url: translationPath,
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
  // 打开外文原文
  openOriginalFile(){
    let originalPath = this.data.filesCheck.originalPath
    wx.downloadFile({
      url: originalPath,
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
  // 打开文献综述
  openLiteratureFile(){
    let literaturePath = this.data.filesCheck.literaturePath

    wx.downloadFile({
      url: literaturePath,
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
  // 打开毕业论文
  openThesisPath(){
    let thesisPath = this.data.filesCheck.thesisPath

    wx.downloadFile({
      url: thesisPath,
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