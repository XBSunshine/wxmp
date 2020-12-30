//index.js
//获取应用实例
const app = getApp()
const createRecycleContext = require('miniprogram-recycle-view')
const json = require('../../static/json/index-data')
let ctx = null
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    dataList: json.json.list
  },
  //事件处理函数
  bindViewTap(e) {
    console.log(e)
    if (e.currentTarget.dataset.param != "") {
      wx.navigateTo({
        url: '/static/dataPage/' + e.currentTarget.dataset.param
      })
    }

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
    this.setData({
      search: this.search.bind(this)
    })
  },
  onReady: function () {
    ctx = createRecycleContext({
      id: 'recycleId',
      dataKey: 'recycleList',
      page: this,
      itemSize: { // 这个参数也可以直接传下面定义的this.itemSizeFunc函数
        width: 200,
        height: 57
      }
    })
    ctx.append(this.data.dataList)
    // ctx.update(beginIndex, list)
    // ctx.destroy()
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  openConfirm: function () {
    this.setData({
      dialogShow: true
    })
  },
  tapDialogButton(e) {
    this.setData({
      dialogShow: false,
      showOneButtonDialog: false
    })
  },
  tapOneDialogButton(e) {
    this.setData({
      showOneButtonDialog: true
    })
  },
  open: function () {
    this.setData({
      show: true
    })
  },
  buttontap(e) {
    console.log(e.detail)
  },
  search: function (value) {
    ctx.splice(0, json.json.list.length, json.json.list.filter(row => row.title.indexOf(value) > -1))
    return new Promise((resolve, reject) => {
      resolve([])
    })
  },
  bindclear: function (e) {
    ctx.splice(0, json.json.list.length, json.json.list)
  }
})