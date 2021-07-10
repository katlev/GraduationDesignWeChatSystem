// pages/teachReviewStuFileScore/teachReviewStuFileScore.js
import teachRequest from '../../utils/stuRequest'
import rootPath from '../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuInfo:{} ,//个人信息
    imgUrl:'' ,//数字签名路径
    readScore:'', //评阅分数
    readValue:'',//评阅评阅
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let titleId = wx.getStorageSync('reviewTitleId')
    //学生信息
    let stuInfo = await teachRequest('/chooseTitleDetail',{titleId: titleId},'GET')

    this.setData({
      stuInfo: stuInfo.data
    })

  },
  //上传图片回调函数
  getSignature(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: res => {
        this.setData({
          imgUrl: res.tempFilePaths[0]
        })
      }
    })
  },
  //当输入框内容发生改变时的回调
  handleChange(event){
    let type = event.currentTarget.id

    this.setData({
      [type]: event.detail.value
    })
  },
  //提交按钮
  submitBtn(){
    let readScore = this.data.readScore
    let readValue = this.data.readValue
    let readSignature = this.data.imgUrl
    let readEditor = wx.getStorageSync('username')

    let userId = wx.getStorageSync('reviewStuId')
    let token = wx.getStorageSync('token')

    if(readScore == ''){
      wx.showToast({
        title: '请输入评阅分数',
        icon: 'none'
      })
      return
    }

    let testScore = /^100$|^(\d|[1-9]\d)(\.\d+)*$/
    if(!testScore.test(readScore)){
      wx.showToast({
        title: '请输入0-100之间的数字',
        icon: 'none'
      })
      return 
    }

    if(readValue == ''){
      wx.showToast({
        title: '请输入评阅评语',
        icon: 'none'
      })
      return
    }

    if(readSignature == ''){
      wx.showToast({
        title: '请上传电子签名图片',
        icon: 'none'
      })
      return
    }

    wx.uploadFile({
      filePath: readSignature,
      name: 'file',
      url: rootPath.host + '/inputReadScore',
      header: {
        'content-type':'multipart/form-data',
        'Authorization':token
      },
      formData: {
        'file': readSignature,
        'readEditor': readEditor,
        'readScore': readScore,
        'readValue': readValue,
        'userId': userId
      },
      success: res => {
        console.log(res)
        if(res.statusCode == 200){
          wx.showToast({
            title: '录入成功',
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
            title: '录入失败',
            icon: 'none'
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