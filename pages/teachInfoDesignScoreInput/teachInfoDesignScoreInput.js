// pages/teachInfoDesignScoreInput/teachInfoDesignScoreInput.js
import teachRequest from '../../utils/stuRequest'
import rootPath from '../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuInfo:{},//个人信息
    userId:'',//用户id
    imgUrl:'',//数字签名路径
    defenceScore:'',//答辩fensu
    defenceValue:'',//答辩评语
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let titleId = wx.getStorageSync('desTitleId')
    //学生信息
    let stuInfo = await teachRequest('/chooseTitleDetail',{titleId: titleId},'GET')

    this.setData({
      stuInfo: stuInfo.data,
      userId: stuInfo.data.userId
    })
  },
  //上传数字签名截图
  getSignature(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: res => {
        console.log(res)
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
  submitScore(){
    let defenceScore = this.data.defenceScore
    let defenceValue = this.data.defenceValue
    let defenceSignature = this.data.imgUrl
    let defenceEditor = wx.getStorageSync('username')

    if(defenceScore == ''){
      wx.showToast({
        title: '请输入毕设答辩分数',
        icon: 'none'
      })
      return
    }

    let testScore = /^100$|^(\d|[1-9]\d)(\.\d+)*$/
    if(!testScore.test(defenceScore)){
      wx.showToast({
        title: "请输入0-100之间的数字",
        icon: 'none'
      })
      return
    }

    if(defenceValue === ''){
      wx.showToast({
        title: '请输入毕设答辩评语',
        icon: 'none'
      })
      return
    }

    if(defenceSignature == ''){
      wx.showToast({
        title: '请上传电子签名图片',
        icon: 'none'
      })
      return
    }

    let userId = this.data.userId
    let token = wx.getStorageSync('token')

    wx.uploadFile({
      filePath: defenceSignature,
      name: 'file',
      url: rootPath.host + '/inputGuidanceScore',
      header:{
        'content-type':'multipart/form-data',
        'Authorization':token
      },
      formData:{
        'defenceEditor': defenceEditor,
        'defenceScore': defenceScore,
        'defenceValue': defenceValue,
        'file': defenceSignature,
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