// pages/login/login.js
//const { default: stuRequest } = require("../../utils/stuRequest")
import stuRequest from '../../utils/stuRequest'
import rootPath from '../../utils/config'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    usernum:'', //教工号
    password:'',  //密码
    identity:''   //身份
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  //身份选择框
  handleRadio(event){
    //console.log(event)
    this.setData({
      identity:event.detail.value
    })
  },
  //表单项内容发生改变时的回调
  handleInput(event){
    //console.log(event)
    let type = event.currentTarget.id  //id传值
    this.setData({
      [type] : event.detail.value
    })
  },
  login(event){
    let identity = this.data.identity
    let usernum = this.data.usernum
    let password = this.data.password
    //console.log(identity,usernum,password)

    if(usernum == ''){
      wx.showToast({
        title: '学号不能为空！',
        icon: 'error'
      })
      return
    }

    let numCheck = /^\d{10}$/
    if(!numCheck.test(usernum)){
      wx.showToast({
        title: '学号格式输入错误！',
        icon: 'error'
      })
      return
    }

    if(password == ''){
      wx.showToast({
        title: '密码不能为空！',
        icon: 'error'
      })
      return
    }

    let pwdCheck = /^[0-9A-Za-z]{6,}$/
    if(!pwdCheck.test(password)){
      wx.showToast({
        title: '密码错误，密码至少为6位，可由数字和字母组成！',
        icon: 'none'
      })
    }

    if(identity == ''){
      wx.showToast({
        title: '身份不能为空!',
        icon: 'error'
      })
      return
    }

    wx.request({
      url: rootPath.host + '/stuAndTeachLogin',
      method: 'POST',
      data:{
        identity: identity,
        password: password,
        usernum: usernum
      },
      header: {
        'content-type' : 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        console.log(res.data)
        if(res.data.code == 200){
          wx.showToast({
            title: '登录成功！',
            icon: 'success'
          })

          wx.setStorage({
            data: res.data.data.userId,
            key: 'userId',
          })

          wx.setStorage({
            data: res.data.data.usernum,
            key: 'usernum',
          })

          wx.setStorage({
            data: res.data.data.token,
            key: 'token',
          })

          wx.setStorage({
            data: res.data.data.schoolYear,
            key: 'schoolYear',
          })

          wx.setStorage({
            data: res.data.data.username,
            key: 'username',
          })

          wx.setStorage({
            data: res.data.data.role,
            key: 'role',
          })

          let userId = res.data.data.userId
          //console.log(userId)

          // 登录
          wx.login({
            success: res => {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              let code = res.code
              //console.log(code)
              let appId = 'wxad592d94592676a3'
              let secret = '4dff31cc7b93738ac4c3cf5aa105d9ef'

              wx.request({
                url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
                data:{},
                header:{'content-type':'json'},
                success:async (result) => {
                  //console.log(result)
                  let openId = result.data.openid
                  //console.log(openId)
                  //console.log(typeof openId)
                  // wx.setStorage({
                  //   data: openId,
                  //   key: 'openId',
                  // })

                  let uploadResult = await stuRequest('/uploadOpenId',{openId: openId,userId: userId},'POST')
                  console.log(uploadResult)
                }
              })
            }
          })
          let identity = res.data.data.role
          //console.log(identity)
          let arr = identity.split(',')
          //console.log(arr)
          //console.log(arr[0])
          let role = arr[0]
          console.log(role)
          if(role == 'teacher'){
            wx.navigateTo({
              url: '/pages/teachIndex/teachIndex',
            }) 

            }else if(res.data.data.role == 'student'){
              wx.navigateTo({
                url: '/pages/stuIndex/stuIndex',
              })
          }else{
            wx.showToast({
              title: '跳转失败！',
              icon: 'error'
            })
          }
  
        }else{
          wx.showToast({
            title: res.data.message,
          })
        }
      },
      fail: (error) => {
        console.log(error)
        
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