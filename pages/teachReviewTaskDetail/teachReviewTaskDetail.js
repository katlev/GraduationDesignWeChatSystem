// pages/teachReviewTaskDetail/teachReviewTaskDetail.js
import teachRequest from '../../utils/stuRequest'
import rootPath from '../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskDetail:{},//审核任务书详情
    taskCheck:'',//任务书审核
    userId: '',//任务书id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let userId = wx.getStorageSync('checkTaskId')

    let taskDetail = await teachRequest('/getCheckTaskDetail',{userId: userId},'GET')
    console.log(taskDetail)
    let check = ''
    if(taskDetail.data.taskCheck === 0){
      check = '待审核'
    }else if(taskDetail.data.taskCheck === 1){
      check = '审核通过'
    }else if(taskDetail.data.taskCheck === 2){
      check = '审核不通过'
    }
    this.setData({
      taskDetail: taskDetail.data,
      taskCheck: check,
      userId: userId
    })

  },
  //任务书本地预览
  readTaskFile(){
    let taskPath = this.data.taskDetail.taskPath
    wx.downloadFile({
      url: taskPath,
      success: res => {
        wx.openDocument({
          filePath: res.tempFilePath,
          showMenu: false,
          success: result => {
            console.log('打开成功')
          },
          fail: error => {
            wx.showToast({
              title: '打开失败',
              icon: 'none'
            })
          }
        })
      }
    })

  },

  //审核通过任务书
  checkTaskSingle(){
    let arr = []
    arr.push(this.data.userId)

    let token = wx.getStorageSync('token')

    let state = this.data.taskCheck
    if(state != '待审核'){
      wx.showToast({
        title: '该任务书已审核',
        icon: 'none'
      })
      return
    }

    wx.showModal({
      cancelColor: 'cancelColor',
      title: '提示',
      content: '确认审核通过该任务书么',
      success: res => {
        if(res.confirm){
          wx.request({
            url: rootPath.host + '/checkTaskItem',
            method: 'PUT',
            header: {
              'Authorization' : token,
              'content-type' : 'application/json;charset=UTF-8'
            },
            data: JSON.stringify({
              titleId: arr
            }),
            success: putResult => {
              //console.log(putResult)
              if(putResult.data.code == 200){
                wx.showToast({
                  title: '通过成功',
                  icon: 'none'
                })
                this.onLoad()

                setTimeout(() => {
                  let pages = getCurrentPages()
                  let beforePage = pages[pages.length - 2]
                  beforePage.onLoad()
                  wx.navigateBack({
                    delta:1,
                  })
                },1000)

              }else {
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
  //审核回退按钮
  returnTaskSingle(){
    let arr = []
    arr.push(this.data.userId)
    let token = wx.getStorageSync('token')

    let state = this.data.taskCheck
    if(state != '待审核'){
      wx.showToast({
        title: '该任务已审核',
        icon: 'none'
      })
      return 
    }

    wx.showModal({
      cancelColor: 'cancelColor',
      title: '提示',
      content: '确定要回退该任务书么',
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
              titleId: arr
            }),
            success: putResult => {
              //console.log(putResult)
              if(putResult.data.code == 200){
                wx.showToast({
                  title: '退回成功',
                  icon:'none'
                })
                this.onLoad()

                setTimeout(() => {
                  let pages = getCurrentPages()
                  let beforePage = pages[pages.length - 2]
                  beforePage.onLoad()
                  wx.navigateBack({
                    delta:1,
                  })
                },1000)
                
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