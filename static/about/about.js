// static/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    brand: '',
    model: '',
    pixelRatio: '',
    screenWidth: '',
    screenHeight: '',
    statusBarHeight: '',
    language: '',
    version: '',
    system: '',
    cameraAuthorized: false,
    locationAuthorized: false,
    microphoneAuthorized: false,
    notificationAuthorized: false,
    bluetoothEnabled: false,
    locationEnabled: false,
    wifiEnabled: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getSystemInfo({
      success(res) {
        console.log(res.cameraAuthorized)
        console.log(res.locationAuthorized)
        console.log(res.microphoneAuthorized)
        console.log(res.notificationAuthorized)
        console.log(res.bluetoothEnabled)
        that.setData({
          brand: res.brand,
          model: res.model,
          pixelRatio: res.pixelRatio,
          screenWidth: res.screenWidth,
          screenHeight: res.screenHeight,
          statusBarHeight: res.statusBarHeight,
          language: res.language,
          version: res.version,
          system: res.system,
          cameraAuthorized: res.cameraAuthorized,
          locationAuthorized: res.locationAuthorized,
          microphoneAuthorized: res.microphoneAuthorized,
          notificationAuthorized: res.notificationAuthorized,
          bluetoothEnabled: res.bluetoothEnabled,
          locationEnabled: res.locationEnabled,
          wifiEnabled: res.wifiEnabled
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