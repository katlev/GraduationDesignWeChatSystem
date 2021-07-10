// pages/teachInfoTitleList/teachInfoTitleList.js
import teachRequest from '../../utils/stuRequest'
import rootPath from '../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:" ",
    titleList:[], //开题记录列表
    isTriggered: false, //下拉刷新标识
    currentPage: 0 ,//当前页
    totalPage: 0 ,//总页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options){
    //获取本地日期
    var timestamp = Date.parse(new Date)
    var date = new Date(timestamp)
    var year = date.getFullYear()
    var month = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1)
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    var today = year + '-' + month + '-' + day
    this.setData({
      date:today
    })

    //获取开题记录列表
    let userId = wx.getStorageSync('userId')
    let data = await teachRequest('/titleRecord',{userId:userId},'GET')
    //console.log(data)
    this.setData({
      titleList: data.data,
      currentPage: data.pageInfo.pageNum,
      totalPage: data.pageInfo.pages
    })

  },
  // 年份选择器
  async yearChoicePicker(e){
    let value = e.detail.value
    //console.log(value)
    this.setData({
      date:value
    })

    let userId = wx.getStorageSync('userId')

    // let result = await teachRequest('/searchRecord',JSON.stringify({titleYear:value,userId:userId}),'POST')
    // console.log(result)
    let token = wx.getStorageSync('token')
    wx.request({
      url: rootPath.host + '/searchRecord',
      method: 'POST',
      header:{
        'Authorization' : token,
        'content-type' : 'application/json;charset=UTF-8'
      },
      data:JSON.stringify({
        titleYear:value,
        userId:userId
      }),
      success:(res) => {
        //console.log(res)
        if(res.data.code == 200){
          this.setData({
            titleList: res.data.data
          })
        }else if(res.data.code != 200){
          wx.showToast({
            title: res.data.message,
            icon: 'error'
          })
        }
      },
      fail:(error) => {
        console.log(error)
        wx.showToast({
          title: '请求失败！',
          icon: 'error',
          duration: 3000
        })
      }

    })
  },
  toDetail(e){
    console.log(e)
    let id = e.currentTarget.id
    wx.setStorage({
      data: id,
      key: 'openTitleId',
    })
  },
  //自定义下拉刷新的回调
  async handleRefresher(){
    //console.log('下拉刷新')
    let userId = wx.getStorageSync('userId')
    let data = await teachRequest('/titleRecord',{userId:userId},'GET')
    //console.log(data)
    this.setData({
      titleList: data.data,
      currentPage: data.pageInfo.pageNum,
      isTriggered: false
    })
  },
  //自定义下拉触底回调
  async handleToLower(){
    //console.log('下拉触底')
    let currentPage = this.data.currentPage + 1
    let totalPage = this.data.totalPage
    if(currentPage <= totalPage){
      let userId = wx.getStorageSync('userId')
      let data = await teachRequest('/titleRecord',{page:currentPage,userId:userId},'GET')

      let newList = data.data
      let list = this.data.titleList
      list.push(...newList)

      this.setData({
        titleList: list,
        currentPage: data.pageInfo.pageNum
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