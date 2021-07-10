// pages/teachManageStuEdit/teachManageStuEdit.js
import teachRequest from '../../utils/stuRequest'
import rootPath from '../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuInfo:{},//
    userId: '',//学生userId
    guidanceScore:'',//指导分数
    guidanceValue:'',//指导评语
    imgUrl:'',//
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let titleId = wx.getStorageSync('stuTitleId')

    //获取学生个人信息
    let stuInfo = await teachRequest('/chooseTitleDetail',{titleId: titleId},'GET')
    this.setData({
      stuInfo: stuInfo.data,
      userId: stuInfo.data.userId
    })
  },
  //当表单项内容发生改变时的回调
  handleChange(e){
    //console.log(e)
    let type = e.currentTarget.id

    this.setData({
      [type]: e.detail.value
    })
  },
  //上传数字签名后的回调
  signatureBtn(){
    wx.chooseImage({
      count: 1,
      sizeType:['original','compressed'],
      sourceType: ['album','camera'],
      success: (res) => {
        //console.log(res)
        this.setData({
          imgUrl: res.tempFilePaths[0]
        })
      }
    })

  },
  //提交分数
  async submitScore(){
    let guidanceScore = this.data.guidanceScore
    let guidanceValue = this.data.guidanceValue
    let guidanceSignature = this.data.imgUrl
    let guidanceEditor = wx.getStorageSync('username')
    //console.log(guidanceScore,guidanceValue,guidanceEditor,guidanceSignature)
    if(guidanceScore == ''){
      wx.showToast({
        title: '请输入指导成绩',
        icon: 'none',
      })
      return
    }

    let textScore = /^100$|^(\d|[1-9]\d)(\.\d+)*$/
    if(!textScore.test(guidanceScore)){
      wx.showToast({
        title: '请输入0-100之间的数字',
        icon: 'none'
      })
      return
    }

    if(guidanceValue == ''){
      wx.showToast({
        title: '请输入指导评语',
        icon: 'none',
      })
      return
    }

    if(guidanceSignature == ''){
      wx.showToast({
        title: '请上传电子签名图片',
        icon: 'none'
      })
      return
    }

    let userId = this.data.userId
    let token = wx.getStorageSync('token')

    // 检查是否已录入成绩
    let score = await teachRequest('/getStuScore',{userId: userId},'GET')
    //console.log(score)

    if(score.data.guidanceScore != null){
      wx.showToast({
        title: '你已录入过该学生成绩',
        icon: 'none',
      })
      return
    }

    wx.uploadFile({
      filePath: guidanceSignature,
      name: 'file',
      url: rootPath.host + '/inputScore',
      header:{
        'content-type':'multipart/form-data',
        'Authorization':token
      },
      formData:{
        'file': guidanceSignature,
        'guidanceEditor': guidanceEditor,
        'guidanceScore': parseFloat(guidanceScore),
        'guidanceValue': guidanceValue,
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