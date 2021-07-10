// pages/stuDocUploadPlanForm/stuDocUploadPlanForm.js
import rootPath from '../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate:'',//开始日期
    endDate:'',//结束日期
    planValue:'' ,//计划内容
    actualValue:'',//实际内容
    planName:'',// 附件
    planPath:'',//附件路径
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 当输入框内容发生改变时的回调
  handleValue(e){
    //console.log(e)
    let type = e.currentTarget.id
    this.setData({
      [type] : e.detail.value
    })
  },
  // 开始日期选择器
  startDatePicker(e){
    this.setData({
      startDate: e.detail.value
    })
  },
  // 结束日期选择器
  endDatePicker(e){
    this.setData({
      endDate: e.detail.value
    })
  },
  // 添加附件
  uploadPlanFile(){
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success: async (res) => {
        let tempFileName = res.tempFiles[0].name
        let tempFilePath = res.tempFiles[0].path
        this.setData({
          planName: tempFileName,
          planPath: tempFilePath
        })
      }
    })

  },
  // 添加一条进度计划
  addPlanItem(){
    let userId = wx.getStorageSync('userId')
    let token = wx.getStorageSync('token')
    let schoolYear = wx.getStorageSync('schoolYear')
    let planStart = this.data.startDate
    let planEnd = this.data.endDate
    let planValue = this.data.planValue
    let actualValue = this.data.actualValue
    let planName = this.data.planName
    let planPath = this.data.planPath
    //console.log(userId,planStart,planEnd,planValue,actualValue,planName,planPath)
    if(planStart == ''){
      wx.showToast({
        title: '开始时间不能为空',
        icon: 'none'
      })
      return
    }
    if(planEnd == ''){
      wx.showToast({
        title: '结束时间不能为空',
        icon: 'none'
      })
      return 
    }
    if(planValue == ''){
      wx.showToast({
        title: '计划内容不能为空',
        icon: 'none'
      })
      return
    }
    if(actualValue == ''){
      wx.showToast({
        title: '实际内容不能为空',
        icon: 'none'
      })
      return
    }
    if(planName == ''){
      wx.showToast({
        title: '附件不能为空',
        icon: 'none'
      })
      return
    }

    wx.uploadFile({
      filePath: planPath,
      name: 'file',
      url: rootPath.host + '/addPlanItem',
      header:{
        'content-type':'multipart/form-data',
        'Authorization':token
      },
      formData:{
        'actualValue':actualValue,
        'file': planPath,
        'planEnd': planEnd,
        'planName': planName,
        'planStart': planStart,
        'planValue': planValue,
        'schoolYear': schoolYear,
        'userId': userId
      },
      success: (res) => {
        console.log(res.data)
        if(res.statusCode == 200){
          wx.showToast({
            title: '添加成功',
            icon: 'none',
          })
          setTimeout( () => {
            wx.navigateTo({
              url: '/pages/stuDocUploadPlan/stuDocUploadPlan',
            })
          },2000)

        }else{
          wx.showToast({
            title: '添加失败',
            icon: 'none'
          })
        }
      },
      fail: (error) => {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        })
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