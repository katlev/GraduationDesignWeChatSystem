// pages/teachInfoDetPws/teachInfoDetPwd.js
import teachRequest from '../../utils/stuRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    usernum:'',//用户教工号
    originalPwd:'',//原始密码
    newPwd:'',//新密码
    checkPwd:""//确认密码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户教工号
    let userNum = wx.getStorageSync('usernum')
    this.setData({
      usernum:userNum
    })

  },
  //表单项内容发生变化时的回调
  handInput(event){
    let type = event.currentTarget.id
    this.setData({
      [type] : event.detail.value
    })
  },
  // 提交密码修改
  async teachPwdSet(event){
    let originalPwd = this.data.originalPwd
    let newPwd = this.data.newPwd
    let checkPwd = this.data.checkPwd

    let userId = wx.getStorageSync('userId')

    let list = await teachRequest('/getUserInfo',{userId:userId},'GET')
    console.log(list)
    let pwd = list.data.password

    if(originalPwd == ''){
      wx.showToast({
        title: '原始密码不为空！',
        icon: 'error'
      })
      return
    }

    if(originalPwd != pwd){
      wx.showToast({
        title: '原始密码错误！',
        icon:'error',
      })
      return
    }

    if(newPwd == ''){
      wx.showToast({
        title: '新密码不为空！',
        icon: 'error'
      })
      return
    }

    let check = /^[0-9A-Za-z]{6,}$/
    if(!check.test(newPwd)){
      wx.showToast({
        title: '密码错误，密码至少为6位，由数字和字母组成！',
        icon: 'none'
      })
      return
    }

    if(checkPwd == ''){
      wx.showToast({
        title: '确认密码不为空！',
        icon: 'error'
      })
      return
    }

    let result = await teachRequest('/updataUserPwd',{id:userId,password:checkPwd},'POST')
     //console.log(result)

     if(result.code == 200){
       wx.showToast({
         title: '修改成功！',
         icon: 'success',
         duration: 3000
       })

       wx.navigateTo({
         url: '/pages/login/login',
       })
     }else if(result.code != 200){
       wx.showToast({
         title: '修改失败！',
         icon: 'error',
         duration: 3000
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