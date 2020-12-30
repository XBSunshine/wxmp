// static/audio/audioView.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    picture: '',
    describe: '',
    ifshow: true,
    author: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    let that = this
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      that.setData({
        picture: data.picture,
        author: data.author,
        name: data.name,
        describe:data.describe
      })
      that.innerAudioContext = wx.createInnerAudioContext({})
      that.innerAudioContext.autoplay = false
      that.innerAudioContext.src = data.url
      that.innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
      that.innerAudioContext.onPause(() => {
        console.log('暂停播放')
      })
      that.innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
    })
  },
  pause() {
    this.setData({
      ifshow: true
    })
    this.innerAudioContext.pause()
  },
  start() {
    this.setData({
      ifshow: false
    })
    this.innerAudioContext.play()
  },
  goToTop(){
    wx.pageScrollTo({
      scrollTop:0
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

  }
})