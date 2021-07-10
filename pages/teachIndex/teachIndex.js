// pages/teachIndex/teachIndex.js
import teachRequest from '../../utils/stuRequest'

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTriggered:false, //下拉刷新
    titleList:[],
    slideButtons:[{ //滑动删除
      type: 'warn',
      text: '删除',
      extClass: 'test'
    }],
    currentPage:0,//当前页
    totalPage:0 ,//总页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    //底部tabbar
    app.editTabBar1()

    //获取开题列表
    let userId = wx.getStorageSync('userId')
    let list = await teachRequest('/teachTitleList',{userId:userId},'GET')
    console.log(list)

    this.setData({
      titleList: list.data,
      currentPage: list.pageInfo.pageNum,
      totalPage: list.pageInfo.pages
    })
  },
  //开题表单
  toTitleForm(e){
    wx.navigateTo({
      url: '/pages/teachIndexForm/teachIndexForm',
    })
  },
  //滑动列表:删除按钮
  slideButtonTap(e) {
    //console.log(e)
    let titleId = e.currentTarget.id
    wx.showModal({
      cancelColor: 'cancelColor',
      title:'确定删除该题目么？',
      content:'删除后无法恢复哦',
      success: async(res) => {
        if(res.confirm){
          let delResult = await teachRequest('/delTitle',{titleId: titleId},'GET')
          //console.log(delResult)
          if(delResult.code == 200){
            wx.showToast({
              title: '删除成功',
              icon: 'success'
            })

            this.onLoad()

          }else if(delResult.code != 200){
            wx.showToast({
              title: delResult.message,
              icon: 'none'
            })
          }
        }else if(res.cancel){
          wx.showToast({
            title: '已取消删除！',
          })
        }
      }

    })
  },
  //题目详情
  toTitleDetail(e){
    let openTitleId = e.currentTarget.id
    wx.setStorage({
      data: openTitleId,
      key: 'openTitleId',
    })
    //console.log(e)
    wx.navigateTo({
      url: '/pages/teachIndexDetail/teachIndexDetail?titleId=' + openTitleId,
    })
  },
  //自定义下拉刷新
  async handleRefresher(){
     //获取开题列表
     let userId = wx.getStorageSync('userId')
     let list = await teachRequest('/teachTitleList',{userId:userId},'GET')
     //console.log(list)
 
     this.setData({
       titleList: list.data,
       currentPage: list.pageInfo.pageNum,
       isTriggered: false
     })
  },
  // 自定下拉触底回调
  async handleToLower(){
    let currentPage = this.data.currentPage + 1
    let totalPage = this.data.totalPage

    if(currentPage <= totalPage){

      let userId = wx.getStorageSync('userId')
      let list = await teachRequest('/teachTitleList',{page:currentPage,userId:userId},'GET')

      //console.log(list)
      let newList = list.data
      let titleList = this.data.titleList
      titleList.push(...newList)

      this.setData({
        titleList: titleList,
        currentPage: list.pageInfo.pageNum
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