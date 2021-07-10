// pages/teachReviewTitle/teachReviewTitle.js
import teachRequest from '../../utils/stuRequest'
import rootPath from '../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    result: [],
    isTriggered: false ,//自定义下拉刷新
    currentPage:0 ,//当前页
    totalPage:0 ,//总页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let userId = wx.getStorageSync('userId')

    //题目列表
    let list = await teachRequest('/getTitleCheckList',{userId: userId},'GET')
    //console.log(list)
    let arr = []
    list.data.forEach(item => {
      let obj = {titleId:'',titleName:'',titleState:''}
      obj.titleId = item.titleId.toString()
      obj.titleName = item.titleName
      obj.titleState = item.titleState
      arr.push(obj)
    })
    //console.log(arr)

    this.setData({
      list: arr,
      currentPage: list.pageInfo.pageNum,
      totalPage: list.pageInfo.pages
    }) 
  },
  //当勾选状态改变时的回调
  onChange(event) {
    //console.log(event)
    this.setData({
      result: event.detail
    });
  },
  //跳转至审核题目详情页
  toCheckDetail(event){
    let checkTitleId = event.currentTarget.id
    wx.setStorage({
      data: checkTitleId,
      key: 'checkTitleId',
    })
    wx.navigateTo({
      url: '/pages/teachReviewTitleDetail/teachReviewTitleDetail?titleId=' + checkTitleId,
    })

  },
  //全选
  selectAll(){
    let arr = this.data.list
    let res = []
    arr.forEach(item => {
      //console.log(item)
      res.push(item.titleId)
    })
    let result = this.data.result

    if(result.length === arr.length){
      this.setData({
        result: []
      })
    }else{
      this.setData({
        result: res
      })
    }
  },
  //批量通过
  checkTitle(){
    let result = this.data.result
    if(result.length === 0){
      wx.showToast({
        title: '请选择要审核的题目',
        icon: 'none'
      })
      return
    }

    let token = wx.getStorageSync('token')
    wx.showModal({
      cancelColor: 'cancelColor',
      title: '提示',
      content: '确定要审核通过这些题目么',
      success: res => {
        if(res.confirm){
          wx.request({
            url: rootPath.host + '/updateCheckTitle',
            method: 'PUT',
            header:{
              'Authorization' : token,
              'content-type' : 'application/json;charset=UTF-8'
            },
            data:JSON.stringify({
              titleId: result
            }),
            success: resul => {
              //console.log(resul)
              if(resul.data.code == 200){
                wx.showToast({
                  title: '通过成功',
                  icon: 'none'
                })
                //console.log(this)
                this.setData({
                  result: []
                })
                
                this.onLoad()
      
              }else{
                wx.showToast({
                  title: '通过失败',
                  icon: 'none'
                })
              }
            }
          })
        }else if(res.cancel){
          console.log('已取消选择')
        }
      }
    })
  },
  //审核回退题目
  returnTitle(){
    let arr = this.data.result
    if(arr.length === 0){
      wx.showToast({
        title: '请选择要回退的题目',
        icon: 'none'
      })
      reutrn 
    }

    let token = wx.getStorageSync('token')
    wx.showModal({
      cancelColor: 'cancelColor',
      title: '提示',
      content: '确认要退回这些题目么',
      success: res => {
        if(res.confirm){
          wx.request({
            url: rootPath.host + '/updateReturnTitle',
            method: 'PUT',
            header:{
              'Authorization' : token,
              'content-type' : 'application/json;charset=UTF-8'
            },
            data: JSON.stringify({
              titleId: arr
            }),
            success: result => {
              //console.log(result)
              if(result.data.code == 200){
                wx.showToast({
                  title: '退回成功',
                  icon: 'none'
                })

                this.setData({
                  result: []
                })

                this.onLoad()
              }else{
                wx.showToast({
                  title: '退回失败',
                  icon: 'none'
                })
              }
            }
          })
        }else{
          console.log('已取消')
        }
      }      
    })

  },
  //自定义下拉刷新的回调
  async handleRefresher(){
    //console.log("下拉刷新")
    let userId = wx.getStorageSync('userId')

    //题目列表
    let list = await teachRequest('/getTitleCheckList',{userId: userId},'GET')
    //console.log(list)
    let arr = []
    list.data.forEach(item => {
      let obj = {titleId:'',titleName:'',titleState:''}
      obj.titleId = item.titleId.toString()
      obj.titleName = item.titleName
      obj.titleState = item.titleState
      arr.push(obj)
    })
    //console.log(arr)

    this.setData({
      list: arr,
      currentPage: list.pageInfo.pageNum,
      isTriggered: false
    })

  },
  //自定义下拉触底的回调
  async handleToLower(){
    console.log('下拉触底')
    let currentPage = this.data.currentPage + 1
    let totalPage = this.data.totalPage
    if(currentPage <= totalPage){

      let userId = wx.getStorageSync('userId')

    //题目列表
    let list = await teachRequest('/getTitleCheckList',{page:currentPage,userId: userId},'GET')
    //console.log(list)
    let arr = []
    list.data.forEach(item => {
      let obj = {titleId:'',titleName:'',titleState:''}
      obj.titleId = item.titleId.toString()
      obj.titleName = item.titleName
      obj.titleState = item.titleState
      arr.push(obj)
    })
    //console.log(...arr)
    let titleList = this.data.list
    titleList.push(...arr)

    this.setData({
      list: titleList,
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