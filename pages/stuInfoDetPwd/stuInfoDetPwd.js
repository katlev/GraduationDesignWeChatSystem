// pages/stuInfoDetPwd/stuInfoDetPwd.js
import stuRequest from '../../utils/stuRequest'
import rootPath from '../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    usernum:'', //用户学号
    originalPwd:'', //原始密码
    newPwd:'',  //新密码
    checkPwd:''  //确认密码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从缓存中取用户学号
    wx.getStorage({
      key: 'usernum',
      success: (res) => {
        //console.log(res.data)
        this.setData({
          usernum: res.data
        })
      }
    })
  },
  //表单项内容发生改变时的回调
  handInput(event){
    //console.log(event)
    let type = event.currentTarget.id
    this.setData({
      [type]: event.detail.value
    })
  },
  //提交按钮
  async stuPwdSet(event){
    
    let originalPwd = this.data.originalPwd
    let newPwd = this.data.newPwd
    let checkPwd = this.data.checkPwd

    let userId = wx.getStorageSync('userId')

    let list = await stuRequest('/getUserInfo',{userId: userId},'GET')

    let pwd = list.data.password
    console.log(pwd,originalPwd,newPwd,checkPwd)

    if(originalPwd == ''){
      wx.showToast({
        title: '原密码不能为空',
        icon: 'error'
      })
      return
    }

    if(originalPwd !== pwd){
      wx.showToast({
        title: '原密码错误',
        icon: 'error'
      })
      return
    }

    if(newPwd == ''){
      wx.showToast({
        title: '新密码不能为空',
         icon: 'error'
      })
      return
    }

    let check = /^[0-9A-Za-z]{6,}$/
    if(!check.test(newPwd)){
      wx.showToast({
         title: '密码错误，密码至少为6位，可由数字和字母组成！',
        icon: 'none'
       })
       return
    }

    if(checkPwd == ''){
       wx.showToast({
        title: '确认密码不能为空',
         icon: 'none'
       })
      return
    }

     if(checkPwd !== newPwd){
       wx.showToast({
         title: '两个密码不一致',
        icon: 'error'
       })
       return
     }

    let token = wx.getStorageSync('token')
    //console.log(token)

     wx.request({
      url: rootPath.host + '/updataUserPwd',
      method: 'POST',
      data:{
        id:userId,
        password:checkPwd
      },
      header:{
        'content-type' : 'application/x-www-form-urlencoded',
        'Authorization' : token
      },
      success:(result) => {
         //console.log(result)
         if(result.data.code == 200){
           wx.showToast({
             title: '修改成功！',
             icon: 'success',
             duration: 2000
           })

           wx.navigateTo({
             url: '/pages/login/login',
           })

         }else{
           wx.showToast({
             title: '修改失败',
             icon: 'error'
           })
         }
      },
      fail:(error) => {
        wx.showToast({
          title:'请求失败',
          icon:'error'
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