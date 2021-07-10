import stuRequset from '../../utils/stuRequest'

// pages/stuIndexDetail/stuIndexDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleDetail:{}, //题目详情
    stuInfo:{},//用户信息
    openId: ''//该题教师的唯一标识openID
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {

    let titleId = wx.getStorageSync('titleId')
    let userId = wx.getStorageSync('userId')

    //题目详情获取
    let list = await stuRequset('/getTitleDetail',{titleId: titleId},"GET")
    console.log(list)
    //该题开题教师的userId
    let teachId = list.data.userId

    // 获取该题教师的唯一标识openID
    let openId = await stuRequset('/getOpenId',{userId: teachId},'GET')
    console.log(openId)

    //  获取用户信息
    let stuInfo = await stuRequset('/getUserInfo',{userId: userId},"GET")

    this.setData({
      titleDetail: list.data,
      stuInfo: stuInfo.data,
      openId: openId.data.openId
    })
  },
  //确定选题
  async checkSelect(e){

    let userId = wx.getStorageSync('userId')
    let titleId = wx.getStorageSync('titleId')
    //console.log(openId)

    let openId = this.data.openId
    let stuNum = this.data.stuInfo.usernum
    let stuName = this.data.stuInfo.username
    let titleName = this.data.titleDetail.titleName
    //console.log(stuNum,stuName,titleName)

    wx.requestSubscribeMessage({
      tmplIds: ['UO7X3CbeJZ3REJndljqRuXENCsmU94Whvhg0xLvw9PU'],
      success: async(res) => {
        //console.log(res)
        let value = await stuRequset('/sendSelectMsg',{openId: openId,titleName:titleName,username:stuName,usernum:stuNum},'GET')
        console.log(value)
      },
      fail: (error) => {
        console.log(error)
      }
    })

    let result = await stuRequset('/checkSelect',{titleId:titleId,userId:userId},'POST')
    if(result.code == 200){
      wx.showToast({
        title: '选题成功',
        icon: 'success'
      })

    //  setTimeout(()=>{
    //   wx.navigateTo({
    //     url: '/pages/stuIndex/stuIndex',
    //   })
    //  },3000)

    }else if(result.code !== 200){
      wx.showToast({
        title: result.message,
        icon: 'none',
        duration: 3000
      })
      return
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