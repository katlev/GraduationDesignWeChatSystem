// pages/teachReviewTitleDetail/teachReviewTitleDetail.js
import teachRequest from '../../utils/stuRequest'
import rootPath from '../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleDetail:{}, //题目详情
    titleId: '', //题目id
    titleState:'',//题目审核状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let titleId = wx.getStorageSync('checkTitleId')

    //题目详情获取
    let list = await teachRequest('/getTitleDetail',{titleId: titleId},"GET")
    console.log(list)

    this.setData({
      titleDetail: list.data,
      titleId: titleId,
      titleState: list.data.titleState
    })
  },
  //题目审核通过按钮
  checkTitleBtn(){
    let arr = []
    arr.push(this.data.titleId)
    //console.log(arr)
    let token = wx.getStorageSync('token')
    let state = this.data.titleState
    if(state != '待审核'){
      wx.showToast({
        title: '该题目已审核',
        icon: 'none'
      })
      return
    }

    wx.showModal({
      cancelColor: 'cancelColor',
      title: '提示',
      content:'确定审核通过该题目么',
      success: res => {
        if(res.confirm){
          wx.request({
            url: rootPath.host + '/updateCheckTitle',
            method: 'PUT',
            header: {
              'Authorization' : token,
              'content-type' : 'application/json;charset=UTF-8'
            },
            data: JSON.stringify({
              titleId: arr
            }),
            success: result => {
              if(result.data.code === 200){
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
  //审核回退按钮
  returnTitleBtn(){
    let arr = []
    arr.push(this.data.titleId)

    let token = wx.getStorageSync('token')
    let state = this.data.titleState
    if(state != '待审核'){
      wx.showToast({
        title: '该题目已审核',
        icon: 'none'
      })
      return
    }

    wx.showModal({
      cancelColor: 'cancelColor',
      title: '提示',
      content: '确定要退回该题目么',
      success: res => {
        if(res.confirm){
          wx.request({
            url: rootPath.host + '/updateReturnTitle',
            method: 'PUT',
            header: {
              'Authorization' : token,
              'content-type' : 'application/json;charset=UTF-8'
            },
            data: JSON.stringify({
              titleId: arr
            }),
            success: result => {
              if(result.data.code === 200){
                wx.showToast({
                  title: '退回成功',
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