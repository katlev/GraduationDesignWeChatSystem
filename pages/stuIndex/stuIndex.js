// pages/stuIndex/stuIndex.js
import stuRequest from '../../utils/stuRequest'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTriggered: false, // 标识下拉刷新是否被触发
    titleList:[] ,//可选题目列表
    currentPage:0 ,//当前页
    pages:0, //总页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    //底部导航
    app.editTabBar()
    
    this.setData({
      search: this.search.bind(this)
    })

  
    //获取题目列表
    let titles = await stuRequest('/selectList',{},'GET')
    //console.log(titles)
    this.setData({
      titleList: titles.data,
      currentPage: titles.pageInfo.pageNum,
      pages: titles.pageInfo.pages
    })
  },
  //搜索框
  search:function(value){
    return new Promise((resolve, reject) => {
      setTimeout(async() => {
          //console.log(value)
          let searchValue = value
          let result = await stuRequest('/searchTitles',{searchValue: searchValue},'GET')
          console.log(result)

          this.setData({
            titleList: result.data
          })

          if(result.data.length == 0){
            wx.showToast({
              title: '搜索内容为空',
              icon: 'none'
            })
          }  
      }, 1000)
  })
  },
  //点击clear
  async clearValue(res){
    //console.log('点击了clear')
    //获取题目列表
    let titles = await stuRequest('/selectList',{},'GET')
    //console.log(titles)
    this.setData({
      titleList: titles.data
    })
  },
  //点击当前列表项
  clickCell(event){
    //console.log(event)
    let titleId = event.currentTarget.id

    wx.setStorage({
      data: titleId,
      key: 'titleId',
    })
  },
  // 自定义下拉刷新
  async handleRefresher(){
      //获取题目列表
      let titles = await stuRequest('/selectList',{},'GET')
      //console.log(titles)
      this.setData({
        titleList: titles.data,
        currentPage: titles.pageInfo.pageNum,
        isTriggered: false
      })
  },
  //自定义上拉触底
  async handleToLower(){
    let page = this.data.currentPage + 1
    let pages = this.data.pages
    if(page <= pages){

      let result = await stuRequest('/selectList',{page: page},'GET')

      let newList = result.data
      let titleList = this.data.titleList
      titleList.push(...newList)

      this.setData({
        titleList: titleList,
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