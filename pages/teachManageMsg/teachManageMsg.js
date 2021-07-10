// pages/teachManageMsg/teachManageMsg.js
import teachRequest from '../../utils/stuRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTriggered: false,
    selectInfo:{}, //选题信息
    info:{},
    openId: ''//学生唯一标识openID
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {

    //获取学生选题信息
    let titleId = wx.getStorageSync('selectTitleId')
    let userId = wx.getStorageSync('userId')

    let list = await teachRequest('/chooseTitleDetail',{titleId: titleId},"GET")
    //console.log(list)

    let stuId = list.data.userId

    //获取选题学生的唯一标识openID
    let openIdResult = await teachRequest('/getOpenId',{userId: stuId},'GET')
    console.log(openIdResult)

    //获取个人信息
    let info = await teachRequest('/getUserInfo',{userId: userId},'GET')
    //console.log(info)

    this.setData({
      selectInfo: list.data,
      info: info.data,
      openId: openIdResult.data.openId
    })

  },
  //同意学生选题
  async agreeTitle(){
    let titleId = wx.getStorageSync('selectTitleId')

    // 发送订阅消息

    //学生的唯一标识openID
    let openId = this.data.openId
    let titleName = this.data.selectInfo.titleName
    let titleState = "教师已确认"
    let username = this.data.info.username
    
    // 同意选题
    let state = this.data.selectInfo.state
    if(state == '待确认'){

      wx.requestSubscribeMessage({
        tmplIds: ['iLZOh4WPTrnjpacJA4WOaRPhCkRb-qyOBwt9DrP6poE'],
        success:async (res) => {
          let value = await teachRequest("/teachSend",{openId: openId,titleName: titleName,titleState:titleState,username:username},'GET')
            console.log(value)
        },
        fail: (error)=> {
            console.log(error)
        }
      })

      let result = await teachRequest('/checkChoose',{titleId: titleId},'GET')
    //console.log(result)
      if(result.code == 200){
        wx.showToast({
          title: '选择成功！',
          icon: 'success',
        })

        this.onLoad()
        
        // setTimeout(()=>{
        //   wx.navigateTo({
        //     url: '/pages/teachManage/teachManage',
        //   })
        // },3000)

      }else if(result.code != 200){
        wx.showToast({
          title: result.message,
          icon: 'none',
          duration: 3000
        })
        return
      }else{
        wx.showToast({
          title: '你已选择',
          icon: 'none'
        })
        return
      }
    }else{
      wx.showToast({
        title: '你已选择，请勿重复操作',
        icon: 'none'
      })
    }
    
  },

  //拒绝学生选题
  async refuseTitle(){
    let titleId = wx.getStorageSync('selectTitleId')

    // 发送订阅消息
    
    //学生的唯一标识openID
    let openId = this.data.openId
    let titleName = this.data.selectInfo.titleName
    let titleState = "开题教师已拒绝，请重新选题"
    let username = this.data.info.username

    let state = this.data.selectInfo.state
    if(state == '待确认'){

      wx.requestSubscribeMessage({
        tmplIds: ['iLZOh4WPTrnjpacJA4WOaRPhCkRb-qyOBwt9DrP6poE'],
        success:async (res) => {
          let value = await teachRequest("/teachSend",{openId: openId,titleName: titleName,titleState:titleState,username:username},'GET')
            console.log(value)
        },
        fail: (error)=> {
            console.log(error)
        }
      })

      // 拒绝选题
      let result = await teachRequest('/refuseChoose',{titleId: titleId},'GET')
      console.log(result)
      if(result.code == 200){
        wx.showToast({
          title: '已成功拒绝',
          icon: 'success',
        })

        this.onLoad()
        
        // setTimeout(()=>{
        //   wx.navigateTo({
        //     url: '/pages/teachManage/teachManage',
        //   })
        // },3000)

      }else if(result.code != 200){
        wx.showToast({
          title: result.message,
          icon: 'none',
          duration: 3000
        })
        return
      }
    }else{
      wx.showToast({
        title: '你已选择，请勿重复操作',
        icon: 'none'
      })
    } 
  },
  //下拉刷新
  async handleRefresher(){

    //获取学生选题信息
    let titleId = wx.getStorageSync('selectTitleId')

    let list = await teachRequest('/chooseTitleDetail',{titleId: titleId},"GET")

    this.setData({
      selectInfo: list.data,
      isTriggered: false
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