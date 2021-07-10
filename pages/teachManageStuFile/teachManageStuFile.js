// pages/teachManageStuFile/teachManageStuFile.js
import teachRequest from '../../utils/stuRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeName:'1',
    isTriggered: false,//自定义刷新标识
    stuInfo:{},//个人学生信息
    userId: '',//学生userId
    startFile:'', //开题报告
    startPath:'',//开题报告路径
    startCheck:'',//开题报告审核情况
    middleFile:'', //中期检查
    middlePath: '' ,//中期检查路径
    middleCheck: '',//中期检查审核情况
    planStart:'', // 进度计划开始
    planEnd:'',//进度计划结束
    planCheck:'',//进度计划审核情况
    guidanceDate:'',//指导记录路径
    guidanceCheck:'',//指导记录审核情况
    translationFile:'', //外文翻译
    translationPath:'',//外文翻译路径
    translationCheck:'',//外文翻译审核情况
    originalFile:'', //外文原文
    originalPath:'',//外文原文路径
    originalCheck:'',//外文原文审核情况
    literatureFile:'', //文献综述
    literaturePath:'',//文献综述路径
    literatureCheck:'',//文献综述审核情况
    thesisFile:'',//毕业论文
    thesisPath:'',//毕业论文路径
    thesisCheck:''//毕业论文审核情况
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let titleId = wx.getStorageSync('stuTitleId')

    //获取选题学生信息
    let stuInfo = await teachRequest('/chooseTitleDetail',{titleId: titleId},'GET')

    let userId = stuInfo.data.userId

    let file = await teachRequest('/readStuDocuments',{userId: userId},'GET')
    console.log(file)
    this.setData({
      stuInfo: stuInfo.data,
      userId: userId,
      startFile: file.data.startName,
      startPath: file.data.startPath,
      startCheck: file.data.startCheck,
      middleFile: file.data.middleName,
      middlePath: file.data.middlePath,
      middleCheck: file.data.middleCheck,
      planStart: file.data.planStart,
      planEnd: file.data.planEnd,
      planCheck: file.data.planCheck,
      guidanceDate: file.data.guidanceDate,
      guidanceCheck: file.data.guidanceCheck,
      translationFile: file.data.translationName,
      translationPath: file.data.translationPath,
      translationCheck: file.data.translationCheck,
      originalFile: file.data.originalName,
      originalPath: file.data.originalPath,
      originalCheck: file.data.originalCheck,
      literatureFile: file.data.literatureName,
      literaturePath: file.data.literaturePath,
      literatureCheck: file.data.literatureCheck,
      thesisFile: file.data.thesisName,
      thesisPath: file.data.thesisPath,
      thesisCheck: file.data.thesisCheck
    })
  },
  onChange(event) {
    this.setData({
      activeName: event.detail,
    });
  },
  //本地预览开题报告
  openStartFile(){
    let startPath = this.data.startPath

    wx.downloadFile({
      url: startPath,
      success: (result) => {
        //console.log(result)
        if(result.statusCode == 200){
          wx.openDocument({
            filePath: result.tempFilePath,
            showMenu: false,
            success: (res) => {
              console.log('打开成功')
            },
            fail: (error) => {
              //console.log(error)
              wx.showToast({
                title: '打开失败',
                icon: 'none',
                duration: 3000
              })
            }
          })
        }
      },
      fail: (error) => {
        //console.log(error)
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        })
      }
    })

    

  },
  //本地预览中期检查
  openMiddleFile(){
    let middlePath = this.data.middlePath
    
    wx.downloadFile({
      url: middlePath,
      success: (result) => {
        if(result.statusCode == 200){
          wx.openDocument({
            filePath: result.tempFilePath,
            showMenu: false,
            success: (res) => {
              console.log('打开成功')
            },
            fail: (error) => {
              console.log(error)
              wx.showToast({
                title: '打开失败',
                icon: 'none',
                duration: 3000
              })
            }
          })
        }
      },
      fail: (error) => {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        })
      }
    })
  },
  //本地预览外文译文
  openTranslationFile(){
    let translationPath = this.data.translationPath

    wx.downloadFile({
      url: translationPath,
      success: (result) => {
        if(result.statusCode == 200){
          wx.openDocument({
            filePath: result.tempFilePath,
            showMenu: false,
            success: (res) => {
              console.log('打开成功')
            },
            fail: (error) => {
              console.log(error)
      
              wx.showToast({
                title: '打开失败',
                icon: 'none',
                duration: 3000
              })
            }
          })
        }
      },
      fail: (error) => {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        })

      }
    })
  },
  //本地预览外文原文
  openOriginalFile(){
    let originalPath = this.data.originalPath
    
    wx.downloadFile({
      url: originalPath,
      success: (result) => {
        if(result.statusCode == 200){
          wx.openDocument({
            filePath: result.tempFilePath,
            showMenu: false,
            success: (res) => {
              console.log('打开成功')
            },
            fail: (error) => {
              console.log(error)
              wx.showToast({
                title: '打开失败',
                icon: 'none',
                duration: 3000
              })
            }
          })
        }
      },
      fail: (error) => {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        })
      }
    })
  },
  //本地预览文献综述
  openLiteratureFile(){
    let literaturePath = this.data.literaturePath
    
    wx.downloadFile({
      url: literaturePath,
      success: (result) => {
        if(result.statusCode == 200){
          wx.openDocument({
            filePath: result.tempFilePath,
            showMenu: false,
            success: (res) => {
              console.log('打开成功')
            },
            fail: (error) => {
              console.log(error)
              wx.showToast({
                title: '打开失败',
                icon: 'none',
                duration: 3000
              })
            }
          })
        }
      },
      fail: (error) => {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        })
      }
    })
  },
  //本地预览毕业论文
  openThesisFile(){
    let thesisPath = this.data.thesisPath

    wx.downloadFile({
      url: thesisPath,
      success: (result) => {
        if(result.statusCode == 200){
          wx.openDocument({
            filePath: result.tempFilePath,
            showMenu: false,
            success: (rea) => {
              console.log('打开成功')
            },
            fail: (error) => {
              console.log(error)
              wx.showToast({
                title: '打开失败',
                icon: 'none',
                duration: 3000
              })
            }
          })
        }
      },
      fail: (error) => {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        })
      }
    })
  },
  //审核通过开题报告
  checkStartFile(){
    let userId = this.data.userId
    //console.log(userId)

    if(this.data.startFile == '' || this.data.startFile == null){
      wx.showToast({
        title: '开题报告暂未提交',
        icon: 'none'
      })
      return
    }

    wx.navigateTo({
      url: '/pages/teachManageStuFileStart/teachManageStuFileStart?userId=' + userId,
    })

  },
  //审核通过中期检查
  checkMiddleFile(){
    let userId = this.data.userId

    if(this.data.middleFile == '' || this.data.middleFile == null){
      wx.showToast({
        title: '中期检查暂未提交',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/teachManageStuFileMiddle/teachManageStuFileMiddle?userId=' + userId,
    })
  },
  //审核通过进度计划
  checkPlanFile(){
    let userId = this.data.userId
    wx.navigateTo({
      url: '/pages/teachManageStuFilePlan/teachManageStuFilePlan?userId='+userId,
    })
  },
  //审核通过指导记录
  checkGuidanceFile(){
    let userId = this.data.userId

    wx.navigateTo({
      url: '/pages/teachManageStuFileGuidance/teachManageStuFileGuidance?userId=' + userId,
    })
  },
  //审核通过外文译文
  checkTranslationFile(){
    let userId = this.data.userId

    if(this.data.translationFile == '' || this.data.translationFile == null){
      wx.showToast({
        title: '外文译文暂未提交',
        icon: 'none'
      })
      return
    }

    wx.navigateTo({
      url: '/pages/teachManageStuFileTranslation/teachmanageStuFileTranslation?userId=' + userId,
    })
  },
  //审核通过外文原文
  checkOriginalFile(){
    let userId = this.data.userId

    if(this.data.originalFile == '' || this.data.originalFile == null){
      wx.showToast({
        title: '外文原文暂未提交',
        icon: 'none'
      })
      return
    }

    wx.navigateTo({
      url: '/pages/teachManageStuFileOriginal/teachManageStuFileOriginal?userId=' + userId,
    })
  },
  //审核通过文献综述
  checkLiteratureFile(){
    let userId = this.data.userId

    if(this.data.literatureFile == '' || this.data.literatureFile == null){
      wx.showToast({
        title: '文献综述暂未提交',
        icon: 'none'
      })
      return
    }

    wx.navigateTo({
      url: '/pages/teachManageStuFileLiterature/teachManageStuFileLiterature?userId=' + userId,
    })
  },
  //审核通过毕业论文
  checkThesisFile(){
    let userId = this.data.userId
    //console.log(this.data.thesisFile)
    if(this.data.thesisFile == '' || this.data.thesisFile == null){
      wx.showToast({
        title: '毕业论文暂未提交',
        icon: 'none'
      })
      return
    }

    wx.navigateTo({
      url:'/pages/teachManageStuFileThesis/teachManageStuFileThesis?userId=' + userId,
    })
  },
  //自定义下拉刷新回调函数
  handleRefresher(){
    this.onLoad()
    this.setData({
      isTriggered: false
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