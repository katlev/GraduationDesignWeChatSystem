// pages/teachIndexForm/teachIndexForm.js
import rootPath from '../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleName:'',
    kindIndex:0, //题目类型index
    kindArr:['工程设计','工程技术研究','软件开发','实验研究','理论研究'],
    kindValue:'', //所选择得题目类型
    sourceIndex:0, //题目来源index
    sourceArr:["实习单位课题","教师收集的结合生产实际的课题","教师自选课题","教师科研课题"],
    sourceValue:'',//所选择的题目来源
    stateIndex:0, //选题模式index
    stateArr:["师生互选课题"],
    stateValue:'',//所选模式
    typeIndex:0, //类型index
    typeArr:['毕业设计','毕业论文'],
    typeValue:'',//类型内容
    completeIndex:0,//实践选择index
    completeArr:['是','否'],
    completeValue:'' ,//实践选择内容
    date:"", //开题日期
    majorIndex:[0,0], //可选专业index
    majorArr:[['全校','机电工程学院','信息与通信学院','计算机与信息安全学院','艺术与设计学院','商学院','外国语学院','数学与计算科学学院','电子工程自动化学院','法学院','材料科学与工程学院','生命与环境科学学院','建筑与交通学院'],['全部专业']], //可选专业选择器
    majorValue:'',//所选专业
    titleValue:'',//题目内容
    titleRequire:'',//题目条件
    titleResult:''//预期成果
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
  },
  // 题目类型选择器
  kindPicker(e){
    //console.log(e.detail.value)
    let value = this.data.kindArr[e.detail.value]
    this.setData({
      kindIndex: e.detail.value,
      kindValue: value
    })
  },
  //题目来源选择器
  sourcePicker(e){
    let value = this.data.sourceArr[e.detail.value]
    this.setData({
      sourceIndex:e.detail.value,
      sourceValue: value
    })
  },
  // 题目模式选择器
  statePicker(e){
    let value = this.data.stateArr[e.detail.value]
    this.setData({
      stateIndex:e.detail.value,
      stateValue: value
    })
  },
  // 开题日期选择器
  // datePicker(e){
  //   this.setData({
  //     date:e.detail.value
  //   })
  // },

  //专业选择器 
  majorPicker(e){
    //console.log(e)
    let value = this.data.majorArr[0][e.detail.value[0]]
    let value2 = this.data.majorArr[1][e.detail.value[1]]
    //console.log(value + value2)
    //{{majorArr[0][majorIndex[0]]}}{{majorArr[1][majorIndex[1]]}}
    this.setData({
      majorIndex:e.detail.value,
      majorValue: value + value2
    })
  },
  majorColumnChange(e){
    //console.log(e.detail.column)
    var data = {
      majorArr: this.data.majorArr,
      majorIndex: this.data.majorIndex
    }
    data.majorIndex[e.detail.column] = e.detail.value
    switch(e.detail.column){
      case 0:
        switch(data.majorIndex[0]){
          case 0:
            data.majorArr[1] = ['全部专业'];
            break;
          case 1:
            data.majorArr[1] = ['全部专业',"机械设计制造",'机械电子工程','电子封装技术','车辆工程'];
            break;
          case 2:
            data.majorArr[1] = ['全部专业','通信工程','电子信息工程','电子科学与技术','微电子科学与工程','导航工程'];
            break;
          case 3:
            data.majorArr[1] = ['全部专业','计算机科学与技术','软件工程','信息安全','物联网工程','智能科学与技术','信息对抗'];
            break;
          case 4:
            data.majorArr[1] = ['全部专业','产品设计','视觉传达设计','环境设计','服装与服饰设计','动画设计'];
            break;
          case 5: 
            data.majorArr[1] = ['全部专业','会计学','财务管理','金融工程'];
            break;
          case 6:
            data.majorArr[1] = ['全部专业','英语专业','日语专业','汉语国际教育专业']
            break
          case 7:
            data.majorArr[1] = ['全部专业','数学与应用数学','数字经济','应用统计学']
            break
          case 8:
            data.majorArr[1] = ['全部专业','测控技术与仪器','自动化专业','光电信息科学与工程']
            break
          case 9:
            data.majorArr[1] = ['全部专业','法学','知识产权']
            break
          case 10:
            data.majorArr[1] = ['全部专业','材料科学与工程','材料成型机控制工程','高分子材料与工程']
            break;
          case 11:
            data.majorArr[1] = ['全部专业','环境工程','生物工程','生物医学工程']
            break;
          case 12 :
            data.majorArr[1] = ['全部专业','交通工程','土木工程','建筑环境与设备工程','建筑电气与智能化']
            break
        }
        data.majorIndex[1] = 0
        break
    }
    this.setData(data)
  },
  
  // 类型
  typePicker(e){
    let value = this.data.typeArr[e.detail.value]
    this.setData({
      typeIndex:e.detail.value,
      typeValue: value
    })
  },
  // 实践选择
  completePicker(e){
    let value = this.data.completeArr[e.detail.value]
    this.setData({
      completeIndex:e.detail.value,
      completeValue: value
    })
  },
  //表单项内容发生改变时的回调
  handleValue(event){
    //console.log(event)
    let type = event.currentTarget.id
    this.setData({
      [type] : event.detail.value
    })
  },
  //确认开题按钮
  openTitles(e){
    let titleName = this.data.titleName
    let titleKind = this.data.kindValue
    let titleSource = this.data.sourceValue
    let titleModel = this.data.stateValue
    let titleMajor = this.data.majorValue
    //let titleDate = this.data.date
    let titleType = this.data.typeValue
    let titleComplete = this.data.completeValue
    let titleValue = this.data.titleValue
    let titleRequire = this.data.titleRequire
    let titleResult = this.data.titleResult
    let titleSemester = wx.getStorageSync('schoolYear')

    if(titleName == ''){
      wx.showToast({
        title: '题目名不为空',
        icon: 'error',
        duration: 3000
      })
      return 
    }

    if(titleKind == ''){
      wx.showToast({
        title: '题目类型不为空',
        error: 'error',
        duration: 3000
      })
      return 
    }

    if(titleModel == ''){
      wx.showToast({
        title: '来源部位空',
        icon: 'error',
        duration: 3000
      })
      return 
    }

    if(titleMajor == ''){
      wx.showToast({
        title: '可选专业不为空',
        icon: 'error',
        duration: 3000
      })
      return
    }

    // if(titleDate == ''){
    //   wx.showToast({
    //     title: '日期不为空',
    //     icon: 'error',
    //     duration: 3000
    //   })
    //   return
    // }

    if(titleType == ''){
      wx.showToast({
        title: '类型不为空',
        icon: 'error',
        duration: 3000
      })
      return
    }

    if(titleComplete == ''){
      wx.showToast({
        title: '实践选择不为空',
        icon: 'error',
        duration: 3000
      })
      return 
    }

    if(titleValue == ''){
      wx.showToast({
        title: '命题内容不为空',
        icon: 'error',
        duration: 3000
      })
      return 
    }

    if(titleRequire == ''){
      wx.showToast({
        title: '所需条件不为空',
        icon: 'error',
        duration: 3000
      })
      return 
    }

    if(titleResult == ''){
      wx.showToast({
        title: '预期成果不为空',
        icon: 'error',
        duration: 3000
      })
      return
    }

    let userId = wx.getStorageSync('userId')
    let token = wx.getStorageSync('token')

    wx.request({
      url: rootPath.host + '/addTitles',
      method: 'POST',
      header:{
        'Authorization' : token,
        'content-type' : 'application/json;charset=UTF-8'
      },
      data:JSON.stringify({
        titleComplete: titleComplete,
        titleKind: titleKind,
        titleMajor: titleMajor,
        titleModel: titleModel,
        titleName: titleName,
        titleRequire: titleRequire,
        titleResult: titleResult,
        titleSemester: titleSemester,
        titleSource: titleSource,
        titleType: titleType,
        titleValue: titleValue,
        userId: userId
      }),
      success: (res) => {
        console.log(res)
        if(res.data.code == 200){
          wx.showModal({
            title:'请确认',
            content:`是否确认开题：${titleName}？`,
            success: (result) => {
              console.log(result)
              if(result.confirm){
                wx.showToast({
                  title: '开题成功',
                  icon: 'success',
                  duration: 3000
                })
                
                setTimeout(() => {
                  let pages = getCurrentPages()
                  let beforePage = pages[pages.length - 2]
                  beforePage.onLoad()
                  wx.navigateBack({
                    delta:1,
                  })
                },1000)
              }else if(result.cancel){
                wx.showToast({
                  title: '已取消',
                  icon: 'success',
                  duration: 3000
                })
              }
            }
          })
        }else if(res.data.code !== 200){
          wx.showToast({
            title: res.data.message,
            icon: 'error'
          })
        }
      },
      fail: (error) => {
        console.log(error)
        wx.showToast({
          title: '请求失败',
          icon:'error',
          duration: 3000
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