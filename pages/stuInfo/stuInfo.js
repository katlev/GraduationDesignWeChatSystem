// pages/stuInfo/stuInfo.js
import stuRequest from '../../utils/stuRequest'
import rootPath from '../../utils/config'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:'',//学生userId
    stuNum:'',//学生学号
    stuName:'',//学生姓名
    imgSrc:''//头像路径
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    app.editTabBar()

    let userId = wx.getStorageSync('userId')

    let info = await stuRequest('/getUserInfo',{userId: userId},'GET')
    //console.log(info)

    this.setData({
      userId: userId,
      stuNum: info.data.usernum,
      stuName: info.data.username,
      imgSrc: info.data.avatar
    })
  },
  // 跳转至个人信息页面
  toStuDetail(event){
    let userId = this.data.userId
    wx.navigateTo({
      url: '/pages/stuInfoDetail/stuInfoDetail?userId=' + userId,
    })
  },
  //跳转至我的选题页面
  toStuPerTitle(event){
    let userId = this.data.userId
    wx.navigateTo({
      url: '/pages/stuPerTitle/stuPerTitle?userId=' + userId,
    })
  },
  //跳转至开题答辩页面
  toOpenDefence(){
    let userId = this.data.userId
    wx.navigateTo({
      url: '/pages/stuInfoOpen/stuInfoOpen?userId=' + userId,
    })
  },
  //跳转至毕设答辩页面
  toDesignDefence(){
    let userId = this.data.userId
    wx.navigateTo({
      url: '/pages/stuInfoDesign/stuInfoDesign?usesrId=' + userId,
    })

  },
  // 跳转至过程文档审核情况界面
  toStuDocCheck(){
    let userId = this.data.userId
    wx.navigateTo({
      url: '/pages/stuInfoDoc/stuInfoDoc?userId=' + userId,
    })
  },
  //跳转至个人成绩页面
  toStuScore(event){
    let userId = this.data.userId
    wx.navigateTo({
      url: '/pages/stuInfoScore/stuInfoScore?userId=' + userId,
    })
  },
  // 跳转至修改密码页面
  toStuPwd(event){
    let userId = this.data.userId
    wx.navigateTo({
      url: '/pages/stuInfoDetPwd/stuInfoDetPwd?userId=' + userId,
    })
  },
  //点击头像更换图片
  changeAvator(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: async (res) => {
        let imgSrc = res.tempFilePaths[0]

        let userId = this.data.userId
        let token = wx.getStorageSync('token')
        
        wx.uploadFile({
          filePath: imgSrc,
          name: 'file',
          url: rootPath.host + '/uploadImg',
          header:{
            'content-type' : 'multipart/form-data',
            'Authorization' : token
          },
          formData:{
            'file': imgSrc, 
            userId: userId
          },
          success: (result) => {
            console.log(result)
            if(result.statusCode == 200){
              wx.showToast({
                title: '上传成功',
                icon: 'none'
              })
              this.onLoad()
            }else if(result.statusCode != 200){
              wx.showToast({
                title: '上传失败',
                icon: 'none'
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
        
      }
    })

  },
  //退出登录
  async signOut(){
    let logOut = await stuRequest('/signOut',{},'GET')
    console.log(logOut)
    if(logOut.code == 200){
      wx.showToast({
        title: '退出成功',
        icon: 'none'
      })
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else if(logOut.code != 200){
      wx.showToast({
        title: '退出失败',
        icon: 'none'
      })
    }
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