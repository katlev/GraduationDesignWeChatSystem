// pages/stuDocUploadGuiForm/stuDocUploadGuiForm.js
import rootPath from '../../utils/config'
import stuRequest from '../../utils/stuRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'', //日期选择器
    guiFormIndex:0,//指导形式
    guiFormArr:['线上指导','现场指导'],
    guiFormValue:'',//选择器当前选择内容
    guiSupplement:'',//补充说明
    guiValue:'',//指导内容
    guiName:'',//附件
    guiPath:''// 附件路径
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //日期选择器
  datePicker(e){
    this.setData({
      date:e.detail.value
    })

  },
  // 指导形式选择器
  guiFormPicker(e){
    let value = this.data.guiFormArr[e.detail.value]
    this.setData({
      guiFormValue:value,
      guiFormIndex: e.detail.value
    })
  },
  // 当输入框内容发生改变时的回调
  handleValue(event){
    let type = event.currentTarget.id
    this.setData({
      [type]: event.detail.value
    })
  },
  // 添加附件
  uploadGuidanceFile(){
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success: (result) => {
        let tempFileName = result.tempFiles[0].name
        let tempFilePath = result.tempFiles[0].path

        this.setData({
          guiName: tempFileName,
          guiPath: tempFilePath
        })
      }
    })
  },
  //添加一条指导记录
  async addGuidanceItem(){
    let userId = wx.getStorageSync('userId')
    let token = wx.getStorageSync('token')
    let schoolYear = wx.getStorageSync('schoolYear')

    let guidanceDate = this.data.date
    let guiFormValue = this.data.guiFormValue
    let guiSupplement = this.data.guiSupplement
    let guidanceForm = guiFormValue + ',' + guiSupplement
    let guidanceValue = this.data.guiValue
    let guidanceName = this.data.guiName
    let guidancePath = this.data.guiPath
    console.log(userId,guidanceDate,guidanceForm,guidanceValue,guidanceName,guidancePath)

    if(guidanceDate == ''){
      wx.showToast({
        title: '指导日期不能为空',
        icon: 'none'
      })
      return
    }
    if(guiFormValue == ''){
      wx.showToast({
        title: '指导形式不能为空',
        icon: 'none'
      })
      return 
    }
    if(guiSupplement == ''){
      wx.showToast({
        title: '指导形式补充内容不能为空',
        icon: 'none'
      })
      return
    }
    if(guidanceValue == ''){
      wx.showToast({
        title: '指导内容不能为空',
        icon: 'none'
      })
      return
    }
    if(guidanceName == ''){
      wx.showToast({
        title: '附件不能为空',
        icon: 'none'
      })
      return
    }

    wx.uploadFile({
      filePath: guidancePath,
      name: 'file',
      url: 'http://localhost:8080/katle/addGuidanceItem',
      header:{
        'content-type':'multipart/form-data',
        'Authorization':token
      },
      formData:{
        file: guidancePath,
        guidanceDate: guidanceDate,
        guidanceForm: guidanceForm,
        guidanceName: guidanceName,
        guidanceValue: guidanceValue,
        schoolYear: schoolYear,
        userId: userId
      },
      success: (res) => {
        console.log(res)
        if(res.statusCode == 200){
          wx.showToast({
            title: '添加成功',
            icon: 'none'
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/stuDocUploadGuidance/stuDocUploadGuidance',
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
        //console.log(error)
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