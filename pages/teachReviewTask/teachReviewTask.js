// pages/teachReviewTask/teachReviewTask.js
import teachRequest from '../../utils/stuRequest'
import rootPath from '../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [], //任务书列表
    result: [],
    isTriggered: false ,//下拉刷新标识
    currentPage: 0 ,//当前页
    totalPage:0 ,//总页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let userId = wx.getStorageSync('userId')
    let list = await teachRequest('/getTaskCheckList',{userId: userId},'GET')
    //console.log(list)
    let arr = []

    list.data.forEach(item => {
      let obj = {userId:'',taskName:'',taskCheck:''}
      obj.userId = item.userId.toString()
      obj.taskName = item.taskName
      if(item.taskCheck == 0){
        obj.taskCheck = '待审核'
      }else if(item.taskCheck == 1){
        obj.taskCheck = '审核通过'
      }else if(item.taskCheck == 2){
        obj.taskCheck = '审核不通过'
      }
      arr.push(obj)
    })

    this.setData({
      list: arr,
      currentPage: list.pageInfo.pageNum,
      totalPage: list.pageInfo.pages
    })

  },
  //当勾选框状态改变时的回调
  onChange(event) {
    //console.log(event)
    this.setData({
      result: event.detail
    });
  },
  //跳转至任务书审核页面
  toTaskDetail(event){
    let checkTaskId = event.currentTarget.id
    wx.setStorage({
      data: checkTaskId,
      key: 'checkTaskId',
    })
    wx.navigateTo({
      url: '/pages/teachReviewTaskDetail/teachReviewTaskDetail?userId=' + checkTaskId,
    })

  },
  //全选按钮
  selectAll(){
    let arr = this.data.list
    let res = []

    arr.forEach(item => {
      res.push(item.userId)
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

  //审核通过按钮
  checkTask(){
    let result = this.data.result
    if(result.length === 0){
      wx.showToast({
        title: '请选择要审核的任务书',
        icon: 'none'
      })
      return
    }

    let token = wx.getStorageSync('token')

    wx.showModal({
      cancelColor: 'cancelColor',
      title: '提示',
      content: '确定要审核通过这些任务书么',
      success: res => {
        if(res.confirm){
          wx.request({
            url: rootPath.host + '/checkTaskItem',
            method: 'PUT',
            header:{
              'Authorization' : token,
              'content-type' : 'application/json;charset=UTF-8'
            },
            data: JSON.stringify({
              titleId: result
            }),
            success: putResult => {
              //console.log(putResult)
              if(putResult.data.code === 200){
                wx.showToast({
                  title: '通过成功',
                  icon: 'none'
                })

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
        }
      }
    })

  },

  //退回任务书
  returnTask(){
    let result = this.data.result
    if(result.length == 0){
      wx.showToast({
        title: '请选择要退回的任务书',
        icon: 'none'
      })
      return 
    }

    let token = wx.getStorageSync('token')

    wx.showModal({
      cancelColor: 'cancelColor',
      title: '提示',
      content: '确认要退回这些任务书么',
      success: res => {
        if(res.confirm){
          wx.request({
            url: rootPath.host + '/returnTaskItem',
            method: 'PUT',
            header: {
              'Authorization' : token,
              'content-type' : 'application/json;charset=UTF-8'
            },
            data: JSON.stringify({
              titleId: result
            }),
            success: putResult => {
              //console.log(putResult)
              if(putResult.data.code == 200){
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
        }
      }
    })

  },

  //自定义下拉刷新
  async handleRefresher(){
    
    let userId = wx.getStorageSync('userId')
    let list = await teachRequest('/getTaskCheckList',{userId: userId},'GET')
    //console.log(list)
    let arr = []

    list.data.forEach(item => {
      let obj = {userId:'',taskName:'',taskCheck:''}
      obj.userId = item.userId.toString()
      obj.taskName = item.taskName
      if(item.taskCheck == 0){
        obj.taskCheck = '待审核'
      }else if(item.taskCheck == 1){
        obj.taskCheck = '审核通过'
      }else if(item.taskCheck == 2){
        obj.taskCheck = '审核不通过'
      }
      arr.push(obj)
    })

    this.setData({
      list: arr,
      currentPage: list.pageInfo.pageNum,
      isTriggered: false
    })

  },
  //自定义下拉触底
  async handleToLower(){
    //console.log("下拉触底")
    let currentPage = this.data.currentPage + 1
    let totalPage = this.data.totalPage

    if(currentPage <= totalPage){

      let userId = wx.getStorageSync('userId')
      let list = await teachRequest('/getTaskCheckList',{page:currentPage,userId: userId},'GET')
      //console.log(list)
      let arr = []

      list.data.forEach(item => {
        let obj = {userId:'',taskName:'',taskCheck:''}
        obj.userId = item.userId.toString()
        obj.taskName = item.taskName
        if(item.taskCheck == 0){
          obj.taskCheck = '待审核'
        }else if(item.taskCheck == 1){
          obj.taskCheck = '审核通过'
        }else if(item.taskCheck == 2){
          obj.taskCheck = '审核不通过'
        }
        arr.push(obj)
      })

      let taskList = this.data.list
      taskList.push(...arr)

      this.setData({
        list: taskList,
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