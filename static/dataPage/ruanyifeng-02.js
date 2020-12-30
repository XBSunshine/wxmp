// static/ruanyifeng-02.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     value1:'<view><text class="title">hello world</text></view>',
     value2:'<view><button class="weui-btn weui-btn_primary">主操作</button><button class="weui-btn weui-btn_primary weui-btn_loading"><i class="weui-loading"></i>正在加载</button><button class="weui-btn weui-btn_primary weui-btn_disabled">禁止点击</button></view>',
     value3:'<view><image src="https://picsum.photos/200"></image></view>',
     value4:'<view><image src="https://picsum.photos/200" style="height: 375rpx; width: 375rpx;"></image></view>',
     value5:'<view><swiper indicator-dots="{{true}}" autoplay="{{true}}" style="width: 750rpx;"><swiper-item><image src="https://picsum.photos/200"></image></swiper-item> <swiper-item><image src="https://picsum.photos/250"></image></swiper-item><swiper-item><image src="https://picsum.photos/300"></image></swiper-item></swiper></view>',
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
      url: './ruanyifeng-01',
    })
  }
})