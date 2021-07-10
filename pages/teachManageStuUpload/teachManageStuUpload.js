// pages/teachManageStuUpload/teachManageStuUpload.js
import teachRequest from '../../utils/stuRequest'
import rootPath from '../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuInfo:{},//学生个人信息
    userId:'',//选题学生userId
    taskName:'', //学生任务书名字
    taskPath:'', //学生任务书路径
    taskCheck:'', //任务书审核状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let titleId = wx.getStorageSync('stuTitleId')

    //获取学生个人信息
    let stuInfo = await teachRequest('/chooseTitleDetail',{titleId: titleId},'GET')
    //console.log(stuInfo)
    let userId = stuInfo.data.userId
    let file = await teachRequest('/readStuDocuments',{userId: userId},'GET')

    this.setData({
      stuInfo: stuInfo.data,
      userId: userId,
      taskPath: file.data.taskPath,
      taskName: file.data.taskName,
      taskCheck: file.data.taskCheck

    })

  },

// 任务书上传
  fileUpload(e){
    wx.chooseMessageFile({
      count: 1,
      type:'file',
      success: async (res)=>{
        //console.log("选择", res)
        let tempFileName = res.tempFiles[0].name
        let tempFilePath = res.tempFiles[0].path
        //console.log(res.tempFiles[0])
  
        let userId = this.data.userId
        let schoolYear = wx.getStorageSync('schoolYear')
        let token = wx.getStorageSync('token')

        wx.uploadFile({
          filePath: tempFilePath,
          name: 'file',
          url: rootPath.host + '/uploadTaskFile',
          header:{
            'content-type' : 'multipart/form-data',
            'Authorization' : token
          },
          formData:{
            'file': tempFilePath, 
            'schoolYear': schoolYear,
            'taskName': tempFileName,
            'userId': userId
          },
          success: (res) => {
            //console.log(res)
            if(res.statusCode === 200){
              wx.showToast({
                title: '上传成功',
                icon: 'none'
              })

              this.onLoad()

            }else if(res.statusCode !== 200){
              wx.showToast({
                title: '上传失败',
                icon: 'none'
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
        
      }
    })
  },
  // 任务书在本地打开
  openFile(e){
    let taskFilePath = this.data.taskPath
    console.log(taskFilePath)
  
    wx.downloadFile({
      url: taskFilePath,
      success:(res) => {
        console.log(res.tempFilePath)
        if(res.statusCode === 200){
          wx.openDocument({
            filePath: res.tempFilePath,
            showMenu: false,
            success: (result) => {
              console.log("打开成功！")
            },
            fail: (error) => {
              wx.showToast({
                title: '打开失败',
                icon: 'none',
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