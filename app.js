//app.js
App({
onLaunch: function () { 
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              //console.log(res)

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }, 

   //第一种底部  
  editTabBar: function () {
    //使用getCurrentPages可以获取当前加载中所有的页面对象的一个数组，数组最后一个就是当前页面。
 
    var curPageArr = getCurrentPages();    //获取加载的页面
    var curPage = curPageArr[curPageArr.length - 1];    //获取当前页面的对象
    var pagePath = curPage.route;    //当前页面url
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }
    
    var tabBar = this.globalData.tabBar;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == pagePath) {
        tabBar.list[i].active = true;    //根据页面地址设置当前页面状态    
      }
    }
    curPage.setData({
      tabBar: tabBar
    });
  }, 
  //第二种底部，原理同上
  editTabBar1: function () {
    var curPageArr = getCurrentPages();
    var curPage = curPageArr[curPageArr.length - 1];
    var pagePath = curPage.route;
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }
    var tabBar = this.globalData.tabBar1;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == pagePath) {
        tabBar.list[i].active = true; 
      }
    }
    curPage.setData({
      tabBar: tabBar
    });
  },

  globalData:{
    userInfo: null,
    //第一种底部导航栏显示
    tabBar:{
      "color":"#cdcdcd",
      "selectedColor":"#07C160",
      "backgroundColor":"#fff",
      "list":[
        {
          "pagePath":"/pages/stuIndex/stuIndex",
          "text":"选题",
          "iconPath":"/static/images/xuanze.png",
          "selectedIconPath":"/static/images/xuanze-active.png",
          "clas": "menu-item",
          active: true
        },
        {
          "pagePath":"/pages/stuDocument/stuDocument",
          "text":"管理",
          "iconPath":"/static/images/guanli.png",
          "selectedIconPath":"/static/images/guanli-active.png",
          "clas": "menu-item",
          active: false
        },
        {
          "pagePath":"/pages/stuContact/stuContact",
          "text":"联系教师",
          "iconPath":"/static/images/lianxiDef.png",
          "selectedIconPath":"/static/images/lianxi.png",
          "clas": "menu-item",
          active: false
        },
        {
          "pagePath":"/pages/stuInfo/stuInfo",
          "text":"我的",
          "iconPath":"/static/images/wode.png",
          "selectedIconPath":"/static/images/wode-active.png",
          "clas": "menu-item",
          active: false
        },
      ],
      "position": "bottom"
    },
    //第二种底部导航栏显示
    tabBar1:{
      "color":"#cdcdcd",
      "selectedColor":"#07C160",
      "backgroundColor":"#fff",
      "list":[
        {
          "pagePath":"/pages/teachIndex/teachIndex",
          "text":"开题",
          "iconPath":"/static/images/tianjia.png",
          "selectedIconPath":"/static/images/tianjia-active.png",
          "clas": "menu-item1",
          active:true
        },
        {
          "pagePath":"/pages/teachManage/teachManage",
          "text":"管理",
          "iconPath":"/static/images/guanli.png",
          "selectedIconPath":"/static/images/guanli-active.png",
          "clas": "menu-item1",
          active: false
        },
        {
          "pagePath":"/pages/teachReview/teachReview",
          "text":"评审",
          "iconPath":"/static/images/pingshen.png",
          "selectedIconPath":"/static/images/pingshenAct.png",
          "clas": "menu-item1",
          active: false
        },
        {
          "pagePath":"/pages/teachInfo/teachInfo",
          "text":"我的",
          "iconPath":"/static/images/wode.png",
          "selectedIconPath":"/static/images/wode-active.png",
          "clas": "menu-item1",
          active: false
        },
      ],
      "position": "bottom"
    }
  }

})