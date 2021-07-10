// pages/stuDocument/stuDocument.js
import stuRequest from '../../utils/stuRequest'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: "tab1",//当前页
    isTriggered: false, //自定义刷新
    perTitle:{}, // 个人选题信息
    openId:'',//开题教师的唯一标识openID
    userId: '',
    userNum:'',//用户学号
    userName:'',//用户姓名
    taskFile: '', //任务书
    taskPath: '' , //任务书路径
    taskCheck: null,//任务书审核状态
    startFile: '',  //开题报告
    startPath:'',//开题报告路径
    startCheck:'',//开题报告审核状态
    middleFile: '', //中期检查
    middlePath:'', //中期检查路径
    middleCheck:'',//中期检查审核状态
    planStart: '',  //进度计划开始日期
    planEnd: '',//进度计划结束日期
    planCheck:'',//进度计划审核状态
    guidanceDate:'', // 指导记录日期
    guidanceCheck:'',//指导记录审核状态
    translationFile: '',  //外文译文
    translationPath:'' ,//外文译文路径
    translationCheck:'',//外文译文审核状态
    originalFile: '',  //外文原文
    originalPath:'',//外文原文路径
    originalCheck:'',//外文原文审核状态
    literatureFile: '',  //文献综述
    literaturePath:'',//文献综述
    literatureCheck:'',//文献综述审核状态
    thesisFile: '' , //毕业论文
    thesisPath:'', //毕业论文路径
    thesisCheck:'',//毕业论文审核状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    //导航栏
    app.editTabBar()

    //学生用户userId
    let userId = wx.getStorageSync('userId')

    //个人选题信息
    let list = await stuRequest('/stuTitleDetail',{userId: userId},"GET")
    console.log(list)

    //用户个人信息
    let perInfo = await stuRequest('/getUserInfo',{userId: userId},'GET')
    //console.log(perInfo)

    //更新数据
    this.setData({
      perTitle: list.data,
      userNum: perInfo.data.usernum,
      userName: perInfo.data.username
    })

    //过程文档数据更新
    let file = await stuRequest('/readStuDocuments',{userId: userId},'GET')
    console.log(file)

    this.setData({
      userId:userId,
      taskFile: file.data.taskName,
      taskPath: file.data.taskPath,
      taskCheck: file.data.taskCheck,
      startFile: file.data.startName,
      startPath: file.data.startPath,
      startCheck: file.data.startCheck,
      middleFile:file.data.middleName,
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

  // 标签页切换
  handleChange({detail}){
    this.setData({
      current:detail.key
    })
  },
  //取消选题
  async cancelTitle(){
    let userId = wx.getStorageSync('userId')
    let state = this.data.perTitle.state
    console.log(state)
    let teachId = this.data.perTitle.userId
    let getOpenId = await stuRequest('/getOpenId',{userId: teachId},'GET')
    //订阅消息接受者的openID
    let openId = getOpenId.data.openId
    let usernum = this.data.userNum
    let username = this.data.userName
    let titleName = this.data.perTitle.titleName
    let remarks = username + '取消了对该题的选择!'

    if(state == "待确认"){
      //发送订阅消息
      wx.requestSubscribeMessage({
        tmplIds: ['1JGJ-f9hY9PjAp94ufwjdD1fCPozS52j1Ynxx00Dgj4'],
        success: async(res) => {
          let value = await stuRequest('/cancelTitle',{openId: openId,remarks: remarks,titleName: titleName,username: username,usernum: usernum},'GET')

          console.log(value)
        },
        fail:(error) => {
          console.log(error)
        }
      })

      //发送取消选题请求
      let cancelRes = await stuRequest('/stuCancelTitle',{userId:userId},'GET')
      if(cancelRes.code == 200){
        wx.showToast({
          title: '取消成功',
          icon: 'none'
        })

        this.setData({
          perTitle:null
        })

       }else if(cancelRes.code != 200){
        wx.showToast({
          title: '取消失败',
          icon: 'none'
       })
        return
      }
    }else if(state == "教师已确认"){
      wx.showToast({
        title: '教师已确认选题，不能取消选择，若坚持要取消，请与选题教师联系！',
        icon: 'none',
        duration: 3000
      })
    }
    
  },
  //任务书预览
  readtaskFile(e){
    let taskPath = this.data.taskPath
    //console.log(taskPath)
    wx.downloadFile({
      url: taskPath,
      success: (result) => {
        //console.log(result)
        if(result.statusCode == 200){
          wx.openDocument({
            filePath: result.tempFilePath,
            showMenu: false,
            success: (res) => {
              //console.log(res)
              console.log('打开成功！')
            },
            fail:(error) => {
              console.log(error)
              wx.showToast({
                title: '打开失败！',
                icon: 'error',
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
  //开题报告上传
  startFileUpload(e){
    let titleState = this.data.perTitle.state
    //console.log(titleState)
    if(titleState == '待确认'){
      wx.showToast({
        title: '请在教师确认选择该题目后，再上传相关文件！',
        icon: 'none'
      })
      return
    }
    let userId = this.data.userId
    wx.navigateTo({
      url: '/pages/stuDocUploadStart/stuDocUploadStart?userId=' + userId,
    })
  },
  //开题报告预览
  readStartFile(e){
    let startPath = this.data.startPath
    
    wx.downloadFile({
      url: startPath,
      success: (result) => {
        if(result.statusCode == 200){
          wx.openDocument({
            filePath: result.tempFilePath,
            showMenu: false,
            success: (res) => {
              console.log('开题报告打开成功')
            },
            fail: (error) => {
              wx.showToast({
                title: '打开失败',
                icon: 'none'
              })
            }
          })
        }

      },
      fail: (error) => {
        console.log(error)
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        })
      }
    })
  },
  // 中期检查上传
  middleFileUpload(e){
    let titleState = this.data.perTitle.state
    if(titleState == '待确认'){
      wx.showToast({
        title: '请在教师确认选择该题目后，再上传相关文件！',
        icon: 'none'
      })
      return
    }

    let userId = this.data.userId
    wx.navigateTo({
      url: '/pages/stuDocUploadMiddle/stuDocUploadMiddle?userId='+ userId,
    })
  },
  // 中期检查预览
  readMiddleFile(e){
    let middlePath = this.data.middlePath
    
    wx.downloadFile({
      url: middlePath,
      success: (result) => {
        if(result.statusCode == 200){
          wx.openDocument({
            filePath: result.tempFilePath,
            showMenu: false,
            success: (res) => {
              console.log('中期检查打开成功！')
            },
            fail: (error) => {
              wx.showToast({
                title: '打开失败！',
                icon: 'error',
                duration: 3000
              })
            }
          })

        }
      },
      fail: (error) => {
        wx.showToast({
          title: '打开失败',
          icon: 'none'
        })
      }
    })
  },
  // 进度计划上传
  planFileUpload(e){
    let titleState = this.data.perTitle.state
    if(titleState == '待确认'){
      wx.showToast({
        title: '请在教师确认选择该题目后，再上传相关文件！',
        icon: 'none'
      })
      return
    }
    let userId = this.data.userId
    wx.navigateTo({
      url: '/pages/stuDocUploadPlan/stuDocUploadPlan?userId=' + userId,
    })
  },
  // 进度计划预览
  readPlanFile(e){
    let planPath = this.data.planPath
    wx.openDocument({
      filePath: planPath,
      showMenu: false,
      success: (res) => {
        console.log('打开成功！')
      },
      fail: (error) => {
        console.log('打开失败！')
        wx.showToast({
          title: '打开失败',
          icon: 'error',
          duration: 3000
        })
      }
    })
  },
  // 指导记录上传
  guidanceFileUpload(e){
    let titleState = this.data.perTitle.state
    if(titleState == '待确认'){
      wx.showToast({
        title: '请在教师确认选择该题目后，再上传相关文件！',
        icon: 'none'
      })
      return
    }
   
    let userId = this.data.userId
    wx.navigateTo({
      url: '/pages/stuDocUploadGuidance/stuDocUploadGuidance?userId=' + userId,
    })
  },
  // 指导记录预览
  readGuidanceFile(e){
    let guidancePath = this.data.guidancePath
    wx.openDocument({
      filePath: guidancePath,
      showMenu: false,
      success: (res) => {
        console.log('打开成功')
      },
      fail: (error) => {
        console.log('打开失败')
        wx.showToast({
          title: '打开失败！',
          icon: 'error',
          duration: 3000
        })
      }
    })
  },
  // 外文译文上传
  translationFileUpload(e){
    let titleState = this.data.perTitle.state
    if(titleState == '待确认'){
      wx.showToast({
        title: '请在教师确认选择该题目后，再上传相关文件！',
        icon: 'none'
      })
      return 
    }

    let userId = this.data.userId
    wx.navigateTo({
      url: '/pages/stuDocUploadTranslation/stuDocUploadTranslation?userId=' + userId,
    })
  },
  // 外文译文预览
  readTranslationFile(e){
    let translationPath = this.data.translationPath
    
    wx.downloadFile({
      url: translationPath,
      success: (result) => {
        wx.openDocument({
          filePath: result.tempFilePath,
          showMenu: false,
          success: (res) => {
            console.log("外文译文打开成功")
          },
          fail: (error) => {
            wx.showToast({
              title: '打开失败',
              icon: 'none'
            })
          }
        })

      },
      fail: (error) => {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        })
      }
    })
  },
  // 外文原文上传
  originalFileUpload(e){
    let titleState = this.data.perTitle.state
    if(titleState == '待确认'){
      wx.showToast({
        title: '请在教师确认选择该题目后，再上传相关文件！',
        icon: 'none'
      })
      return 
    }

    let userId = this.data.userId
    wx.navigateTo({
      url: '/pages/stuDocUploadOriginal/stuDocUploadOriginal?userId=' + userId,
    })
  },
  // 外文原文预览
  readOriginalFile(e){
    let originalPath = this.data.originalPath
    
    wx.downloadFile({
      url: originalPath,
      success: (result) => {
        wx.openDocument({
          filePath: result.tempFilePath,
          showMenu: false,
          success: (res) => {
            console.log('外文原文打开成功')
          },
          fail: (error) => {
            wx.showToast({
              title: '打开失败！',
              icon: 'error',
              duration: 3000
            })
          }
        })

      },
      fail: (error) => {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        })
      }
    })
  },
  // 文献综述上传
  literatureFileUpload(e){
    let titleState = this.data.perTitle.state
    if(titleState == '待确认'){
      wx.showToast({
        title: '请在教师确认选择该题目后，再上传相关文件！',
        icon: 'none'
      })
      return 

    }

    let userId = this.data.userId
    wx.navigateTo({
      url: '/pages/stuDocUploadLiterature/stuDocUploadLiterature?userId=' + userId,
    })
  },
  // 文献综述预览
  readLiteratureFile(e){
    let literaturePath = this.data.literaturePath
    wx.downloadFile({
      url: literaturePath,
      success: (result) => {
        wx.openDocument({
          filePath: result.tempFilePath,
          showMenu: false,
          success: (res) => {
            console.log('文献综述打开成功')
          },
          fail: (error) => {
            wx.showToast({
              title: '打开失败！',
              icon: 'error',
              duration: 3000
            })
          }
        })

      },
      fail: (error) => {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        })
      }
    })
  },
  // 毕业论文上传
  thesisFilePath(e){
    let titleState = this.data.perTitle.state
    if(titleState == '待确认'){
      wx.showToast({
        title: '请在教师确认选择该题目后，再上传相关文件！',
        icon: 'none'
      })
      return 
    }

    let userId = this.data.userId
    wx.navigateTo({
      url: '/pages/stuDocUploadThesis/stuDocUploadThesis?userId=' + userId,
    })
  },
  // 毕业论文预览
  readThesisFile(e){
    let thesisPath = this.data.thesisPath
    
    wx.downloadFile({
      url: thesisPath,
      success: (result) => {
        wx.openDocument({
          filePath: result.tempFilePath,
          showMenu: false,
          success: (res) => {
            console.log('毕业论文打开成功')
          },
          fail: (error) => {
            wx.showToast({
              title: '打开失败！',
              icon: 'error',
              duration: 3000
            })
          }
        })

      },
      fail: (error) => {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        })
      }
    })
  },
  //下拉刷新回调函数
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