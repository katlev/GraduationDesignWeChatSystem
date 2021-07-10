// pages/teachManageStu/teachManageStu.js
import teachRequest from '../../utils/stuRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTriggered:false,
    stuInfo:{}, //选题学生信息
    stuId: '', //选题学生id
    taskName:'', //任务书
    taskPath:'', //任务书路径
    startName:'' ,//开题报告
    startPath:'' ,//开题报告路径
    middleName:'' ,// 中期检查
    middlePath: '' ,//中期检查路径
    planStart:'' ,//进度计划开始日期
    planEnd:'' ,//进度计划结束日期
    guidanceDate:'' ,//指导日期
    translationName:'',//外文翻译
    translationPath:'',//外文翻译路径
    originalName:'',//外文原文
    originalPath:'' ,//外文原文路径
    literatureName:'' ,// 文献综述
    literaturePath:'' ,// 文献综述路径
    thesisName:'' ,//毕业论文
    thesisPath:'' ,// 毕业论文路径
    guidanceScore:'',//指导成绩
    readScore: ''//评阅成绩
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let titleId = wx.getStorageSync('stuTitleId')

    //获取选题学生信息
    let stuInfo = await teachRequest('/chooseTitleDetail',{titleId: titleId},'GET')
    console.log(stuInfo)

    let userId = stuInfo.data.userId

    //获取过程文档提交信息
    let files = await teachRequest('/readStuDocuments',{userId: userId},'GET')
    console.log(files)

    //获取学生个人分数信息
    let score = await teachRequest('/getStuScore',{userId: userId},'GET')
    console.log(score)

    this.setData({
      stuInfo: stuInfo.data,
      stuId: userId,
      taskName: files.data.taskName,
      taskPath: files.data.taskPath,
      startName: files.data.startName,
      startPath: files.data.startPath,
      middleName: files.data.middleName,
      middlePath: files.data.middlePath,
      planStart: files.data.planStart,
      planEnd: files.data.planEnd,
      guidanceDate: files.data.guidanceDate,
      translationName: files.data.translationName,
      translationPath: files.data.translationPath,
      originalName: files.data.originalName,
      originalPath: files.data.originalPath,
      literatureName: files.data.literatureName,
      literaturePath: files.data.literaturePath,
      thesisName: files.data.thesisName,
      thesisPath: files.data.thesisPath,
      guidanceScore: score.data.guidanceScore
    })

  },
  //下拉刷新
  handleRefresher(){
    this.onLoad()
    this.setData({
      isTriggered: false
    })
  },
  // 跳转到任务书上传页面
  taskUpload(e){
    let userId = this.data.userId
    wx.navigateTo({
      url: '/pages/teachManageStuUpload/teachManageStuUpload?userId=' + userId,
    })
  },
  // 跳转到文档查阅页面
  fileRead(e){
    let userId = this.data.userId
    wx.navigateTo({
      url: '/pages/teachManageStuFile/teachManageStuFile?userId=' + userId,
    })
  },
  //跳转到成绩录入页面
  scoreEdit(e){
    let userId = this.data.userId
    wx.navigateTo({
      url: '/pages/teachManageStuEdit/teachManageStuEdit?userId=' + userId,
    })
  },
  //本地预览任务书
  openTaskFile(){
    let taskPath = this.data.taskPath
    wx.downloadFile({
      url: taskPath,
      success: (res) => {
        //console.log(res)
        if(res.statusCode == 200){
          wx.openDocument({
            filePath: res.tempFilePath,
            showMenu: false,
            success:(result) => {
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
  //本地开题报告
  openStartFile(){
    let startPath = this.data.startPath
    wx.downloadFile({
      url: startPath,
      success: (result) => {
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
       // console.log(error)
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
  //本地预览进度计划
  openPlanFile(){
    let planPath = this.data.planPath
    wx.openDocument({
      filePath: planPath,
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
  },
  //本地预览指导记录
  openGuidanceFile(){
    let guidancePath = this.data.guidancePath
    wx.openDocument({
      filePath: guidancePath,
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
  },
  //本地预览外文翻译
  openTranslationFile(){
    let translationPath = this.data.translationPath
    
    wx.downloadFile({
      url: translationPath,
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
       // console.log(error)
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
        //console.log(result)
        if(result.statusCode == 200) {
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
  //本地预览文献综述
  openLiteratureFile(){
    let literaturePath = this.data.literaturePath
    
    wx.downloadFile({
      url: literaturePath,
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
  //本地预览毕业论文
  openThesisFile(){
    let thesisPath = this.data.thesisPath
    
    wx.downloadFile({
      url: thesisPath,
      success: (result) => {
       // console.log(result)
        if(result.statusCode == 200){
          wx.openDocument({
            filePath: result.tempFilePath,
            showMenu: false,
            success: (res) => {
              console.log('打开成功')
            },
            fail: (error) => {
             // console.log(error)
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