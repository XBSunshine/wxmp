//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    dialogShow: false,
    show: false,
    showError: false,
    buttons: [{
      type: 'primary',
      className: '',
      text: '确认',
      value: 0
    }]
  },
  //事件处理函数
  bindViewTap: function () {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad: function () {

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  submitForm() {
    this.setData({
      showError: true
    })
  },
  open: function (e) {
    if (e.target.dataset.param) {
      if (e.target.dataset.param == 'video') {
        wx.navigateTo({
          url: '/static/video/securityintroduce',
        })
      } else if (e.target.dataset.param == 'picture') {
        wx.navigateTo({
          url: '/static/image/myPicture',
        })
      } else if (e.target.dataset.param == 'about') {
        wx.navigateTo({
          url: '/static/about/about',
        })
      } else if (e.target.dataset.param == 'user') {
        wx.navigateTo({
          url: '/static/userDetail/user',
        })
      }else if (e.target.dataset.param == 'music') {
        wx.navigateTo({
          url: '/static/music/music',
        })
      }else if (e.target.dataset.param == 'setting') {
        wx.navigateTo({
          url: '/static/setting/setting',
        })
      }else if (e.target.dataset.param == 'favor') {
        wx.navigateTo({
          url: '/static/favor/favor',
        })
      }else {
        // this.setData({
        //   show: true
        // })
      }
    }
  },
  buttontap(e) {
    this.setData({
      show: false
    })
  }
})