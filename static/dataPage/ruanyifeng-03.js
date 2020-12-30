// static/dataPage/ruanyifeng-03.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1: '<view><text class="title">hello {{name}}</text></view>',
    value2: '<view><text class="title">现在是 {{now}}</text></view>',
    value3: '<view><text class="title">hello {{name}}</text><button bind:tap="buttonHandler">点击</button></view>',
    value4: '上面代码中，Page()方法的参数配置对象里面，定义了buttonHandler()，这就是<button>元素的回调函数。它有几个地方需要注意。'
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

  },
  lastPage() {
    wx.navigateTo({
      url: './ruanyifeng-02',
    })
  },
  firstPage() {
    wx.navigateTo({
      url: './ruanyifeng-01',
    })
  }
})