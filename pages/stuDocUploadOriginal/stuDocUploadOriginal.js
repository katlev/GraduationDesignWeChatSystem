// pages/stuDocUploadOriginal/stuDocUploadOriginal.js
import stuRequest from '../../utils/stuRequest'
import rootPath from '../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:'',
    perInfo: {},//个人选题信息
    originalName:'',//外文原文
    originalPath:'',//外文原文路径
    originalCheck:false, //外文原文审核状态
    originalOpinion: '' //外文原文审核意见
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let userId = wx.getStorageSync('userId')

    // 个人选题信息
    let perInfo = await stuRequest('/stuTitleDetail',{userId: userId},'GET')

    // 过程文档信息
    let files = await stuRequest('/getFileCheck',{userId: userId},'GET')

    this.setData({
      userId: userId,
      perInfo: perInfo.data,
      originalName: files.data.originalName,
      originalPath: files.data.originalPath,
      originalCheck: files.data.originalCheck,
      originalOpinion: files.data.originalOpinion
    })

  },
  // 上传外文原文
  uploadOriginalFile(){
    let originalCheck = this.data.originalCheck
    if(originalCheck == true){
      wx.showToast({
        title: '文件已审核，不能修改',
        icon: 'none'
      })
      return 
    }

    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success: (res) => {
        let tempFileName = res.tempFiles[0].name
        let tempFilePath = res.tempFiles[0].path

        let userId = this.data.userId
        let token = wx.getStorageSync('token')
        let schoolYear = wx.getStorageSync('schoolYear')

        wx.uploadFile({
          filePath: tempFilePath,
          name: 'file',
          url: rootPath.host + '/uploadOriginalFile',
          header: {
            'content-type':'multipart/form-data',
            'Authorization': token
          },
          formData: {
            'file': tempFilePath,
            'schoolYear': schoolYear,
            'originalName': tempFileName,
            'userId': userId
          },
          success: (res) => {
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
  // 外文原文预览
  readOriginalFile(){
    let originalPath = this.data.originalPath
    wx.downloadFile({
      url: originalPath,
      success: (result) => {
        wx.openDocument({
          filePath: result.tempFilePath,
          showMenu: false,
          success: (res) => {
            console.log("外文原文打开成功")
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