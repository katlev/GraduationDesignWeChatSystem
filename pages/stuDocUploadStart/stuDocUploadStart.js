// pages/stuDocUploadStart/stuDocUploadStart.js
import stuRequest from '../../utils/stuRequest'
import rootPath from '../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    perInfo: {},
    userId:'',//学生userId
    startPath:'',//开题报告路径
    startName: '',//开题报告
    startCheck:false ,//文件审核状态
    startOpinion:''//开题报告审核意见

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let userId = wx.getStorageSync('userId')
    
    //个人选题信息
    let perInfo = await stuRequest('/stuTitleDetail',{userId: userId},'GET')
    //console.log(perInfo)

    //过程文档
    let files = await stuRequest('/getFileCheck',{userId: userId},'GET')
    //console.log(files)

    this.setData({
      userId: userId,
      perInfo: perInfo.data,
      startName: files.data.startName,
      startPath: files.data.startPath,
      startCheck: files.data.startCheck,
      startOpinion: files.data.startOpinion
    })
  },
  // 上传开题报告
  uploadStartFile(){
    let startCheck = this.data.startCheck
    if(startCheck == true){
      wx.showToast({
        title: '文件已审核，不能修改',
        icon: 'none'
      })
      return
    }

    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success:async (res) => {

        let tempFileName = res.tempFiles[0].name
        let tempFilePath = res.tempFiles[0].path

        let userId = this.data.userId
        let token = wx.getStorageSync('token')
        let schoolYear = wx.getStorageSync('schoolYear')

        wx.uploadFile({
          filePath: tempFilePath,
          name: 'file',
          url: rootPath.host + '/uploadStartFile',
          header: {
            'content-type':'multipart/form-data',
            'Authorization':token
          },
          formData:{
            'file': tempFilePath,
            'schoolYear': schoolYear,
            'startName': tempFileName,
            'userId': userId
          },
          success: (res) => {
            console.log(res)
            if(res.statusCode == 200){
              wx.showToast({
                title: '上传成功',
                icon: 'none'
              })

              this.onLoad()

              setTimeout(() => {
                let pages = getCurrentPages()
                let beforePage = pages[pages.length - 2]
                beforePage.onLoad()
                wx.navigateBack({
                  delta:1,
                })
              },1000)
            
            }else if(res.statusCode != 200){
              wx.showToast({
                title: '上传失败',
                icon: 'none'
              })
            }
          },
          fail: (error)=>{
            wx.showToast({
              title: '请求失败',
              icon: 'none'
            })
          }
        })
      }
    })

  },
  // 开题报告预览
  readStartFile(){
    let startPath = this.data.startPath
    wx.downloadFile({
      url: startPath,
      success: (result) => {
        wx.openDocument({
          filePath: result.tempFilePath,
          showMenu: false,
          success: (res) => {
            console.log("开题报告打开成功")
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