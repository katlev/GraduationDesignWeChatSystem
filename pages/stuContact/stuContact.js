// pages/stuDefence/stuDefence.js
import stuRequset from '../../utils/stuRequest'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue:'',
    teachList:[], //联系教师列表
    isTriggered: false, //下拉刷新标识
    currentPage: 0 ,// 当前页
    totalPage: 0 ,// 总页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    app.editTabBar()
    
    //获取联系教师列表
    let schoolYear = wx.getStorageSync('schoolYear')
    let result = await stuRequset('/getContactList',{schoolYear: schoolYear},'GET')
    //console.log(result)
    this.setData({
      teachList: result.data,
      currentPage: result.pageInfo.pageNum,
      totalPage: result.pageInfo.pages
    })
  },

  //监听搜索框内容
  handleInput(e){
    //console.log(e)
    this.setData({
      searchValue: e.detail
    })
  },
  //搜索
  async onSearch(e){
    let value = this.data.searchValue
    let schoolYear = wx.getStorageSync('schoolYear')
    //console.log(value)

    if(value == ''){
      wx.showToast({
        title: '请输入搜索内容！',
        icon: 'none'
      })
      return
    }

    let group = await stuRequset('/searchContactList',{schoolYear: schoolYear,searchValue: value},"GET")
    console.log(group)
    if(group.code == 200){
      if(group.data.length == 0){
        wx.showToast({
          title: '没有搜索到任何内容，请换个关键词试试',
          icon: 'none'
        })
      }else{
        this.setData({
          teachList: group.data
        })
      }
      
    }else{
      wx.showToast({
        title: '搜索失败',
        icon: 'none'
      })
      this.setData({
        teachList: []
      })
    }
  
  },
  //点击取消时的回调
  async onCancel(){
    let schoolYear = wx.getStorageSync('schoolYear')

    let result = await stuRequset('/getContactList',{schoolYear: schoolYear},'GET')
    //console.log(result)
    this.setData({
      teachList: result.data
    })

  },
  //点击选中列表时的回调
  clickCell(event){
    let contactTeachId = event.currentTarget.id

    wx.setStorage({
      data: contactTeachId,
      key: 'contactTeachId',
    })
  },
  //自定下拉刷新
  async handleRefresher(){
    let schoolYear = wx.getStorageSync('schoolYear')
    let result = await stuRequset('/getContactList',{schoolYear: schoolYear},'GET')
    //console.log(result)
    this.setData({
      teachList: result.data,
      currentPage: result.pageInfo.pageNum,
      isTriggered : false
    })
  },
  //自定义上拉触底
  async handleToLower(){
    console.log('上拉触底')
    let currentPage = this.data.currentPage + 1
    let totalPage = this.data.totalPage
    if(currentPage <= totalPage){

      let schoolYear = wx.getStorageSync('schoolYear')
      let result = await stuRequset('/getContactList',{page:currentPage,schoolYear: schoolYear},'GET')
      console.log(result)
      let newList = result.data
      let teachList = this.data.teachList
      teachList.push(...newList)

      this.setData({
        teachList: teachList,
        currentPage: result.pageInfo.pageNum
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