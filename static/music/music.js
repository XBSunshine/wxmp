const createRecycleContext = require('miniprogram-recycle-view')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    this.ctx = createRecycleContext({
      id: 'recycleIdforMusic',
      dataKey: 'recycleList',
      page: this,
      itemSize: { // 这个参数也可以直接传下面定义的this.itemSizeFunc函数
        width: 200,
        height: 82
      }
    })
    wx.cloud.init()
    this.db = wx.cloud.database()
    this.db.collection("free_music_musicShare").limit(10).get({
      success(res) {
        that.setData({
          page: that.data.page + res.data.length
        })
        that.ctx.append(res.data)
      }
    })

  },
  bindscrolltolower(e) {
    let that = this
    this.db.collection("free_music_musicShare").skip(this.data.page).limit(10).get({
      success(res) {
        that.setData({
          page: that.data.page + res.data.length
        })
        that.ctx.append(res.data)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  audioPause: function (e) {
    console.log(e.target.dataset.param)
    let context = wx.createAudioContext(e.target.dataset.param)
    context.pause()
    context.seek(0)
  },
})