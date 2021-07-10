// pages/teachInfo/teachInfo.js
import teachRequest from '../../utils/stuRequest'
import rootPath from '../../utils/config'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:'', //获取教师userId
    teachNum:'', //教师学号
    teachName:'',//教师姓名
    teachPosition:'',//教师职称
    imgSrc:'' //头像路径
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    app.editTabBar1()

    //获取教师userId
    let userId = wx.getStorageSync('userId')

    let info = await teachRequest('/getUserInfo',{userId: userId},'GET')

    //console.log(info)

    this.setData({
      userId: userId,
      teachNum: info.data.usernum,
      teachName: info.data.username,
      teachPosition: info.data.position,
      imgSrc: info.data.avatar
    })

  },
  // 跳转至个人信息页面
  toTeachDetail(event){
    let userId = this.data.userId
    wx.navigateTo({
      url: '/pages/teachInfoDetail/teachInfoDetail?userId=' + userId,
    })
  },
  //跳转至留言列表页面
  toTeachReview(){
    let userId = this.data.userId
    wx.navigateTo({
      url: '/pages/teachInfoReview/teachInfoReview',
    })

  },
  //跳转至开题答辩页面
  toOpenDefence(){
    let userId = this.data.userId
    wx.navigateTo({
      url: '/pages/teachInfoOpen/teachInfoOpen?userId=' + userId,
    })

  },
  //跳转至毕设答辩页面
  toDesignDefence(){
    let userId = this.data.userId
    wx.navigateTo({
      url: '/pages/teachInfoDesign/teachInfoDesign?userId=' + userId,
    })

  },
  // 跳转至开题记录页面
  toTeachTitles(event){
    let userId = this.data.userId
    wx.navigateTo({
      url: '/pages/teachInfoTitleList/teachInfoTitleList?userId=' + userId,
    })
  },
  // 跳转至修改密码页面
  toTeachPwd(event){
    let userId = this.data.userId
    wx.navigateTo({
      url: '/pages/teachInfoDetPwd/teachInfoDetPwd?userId=' + userId,
    })
  },
  //点击图片更换头像
  changeAvatar(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success:async (res) => {
        //console.log(res)
        let imgSrc = res.tempFilePaths[0]
        //console.log(imgSrc)

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
          success: (result)=>{
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
          fail:(error)=>{
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
    let out = await teachRequest('/signOut',{},'GET')
    
    if(out.code == 200){
      wx.showToast({
        title: '退出成功',
        icon: 'none',
      })
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else if(out.code != 200){
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