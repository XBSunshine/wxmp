// static/image/myPicture.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picturePathList: [],
    dialogShow: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
     this.innerAudioContext = wx.createInnerAudioContext({})
     this.innerAudioContext.autoplay = true
     this.innerAudioContext.src = 'http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_52626061&response=res&type=convert_url&'
     this.innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    this.innerAudioContext.onPause(()=>{
      console.log('停止播放')
    })
    this.innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
    let that = this
    wx.getStorage({
      key: 'myPictureList_key',
      success(res) {
        console.log(res.data)
        that.setData({
          picturePathList: JSON.parse(res.data)
        })
      }
    })
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
    this.innerAudioContext.destroy()
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

  },
  choosePicture() {
    let that = this
    wx.chooseImage({
      count: 10,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        let list = []
        if (wx.getStorageSync('myPictureList_key')) {
          list = JSON.parse(wx.getStorageSync('myPictureList_key'))
        }
        wx.setStorage({
          key: "myPictureList_key",
          data: JSON.stringify(list.concat(res.tempFilePaths)),
          success(val) {
            console.log(val)
            that.setData({
              picturePathList: list.concat(res.tempFilePaths)
            })
          }
        })
      }
    })
  },
  viewPicture(e) {
    let list = this.data.picturePathList.map(item => {
      return {
        url: item
      }
    })
    wx.previewMedia({
      sources: list,
      current:e.target.dataset.deleteindex
    }, true)
  },
  deletePicture(e) {
    this.setData({
      dialogShow: true
    })
    this.currentIndex = e.target.dataset.deleteindex
  },
  tapDialogButton(e) {
    console.log(this.currentIndex)
    if (e.detail.index == 1) {
      this.data.picturePathList.splice(this.currentIndex, 1)
      this.setData({
        picturePathList: this.data.picturePathList
      })
      wx.setStorageSync('myPictureList_key', JSON.stringify(this.data.picturePathList))
    }
    this.setData({
      dialogShow: false
    })
  },
})