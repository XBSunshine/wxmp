// static/dataPage/ruanyifeng-04.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '<view><text class="title" wx:for="{{items}}">{{index}}、 {{item}}</text></view>',
    value3: '<view><text>...</text><text>...</text><text>...</text></view>',
    value4: '<view><text class="title" wx:for="{{items}}">{{index}}、 {{item}}</text> <input placeholder="输入新增事项" bind:input="inputHandler"/><button bind:tap="buttonHandler">确定</button></view>',
    value2:'上面代码中，<text>标签的wx:for属性，表示当前标签（<text>）启用数组循环，处理items数组。数组有多少个成员，就会生成多少个<text>。渲染后的页面结构如下。',
    value5:'四、<open-data>组件',
    value6:'如果要在页面上展示当前用户的身份信息，可以使用小程序提供的<open-data>组件。',
    value7:'<view><open-data type="userAvatarUrl"></open-data><open-data type="userNickName"></open-data></view>',
    value8:'上面代码中，<open-data>组件的type属性指定所要展示的信息类型，userAvatarUrl表示展示用户头像，userNickName表示用户昵称。',
    value9:'<open-data>支持的用户信息如下。',
    value10:'<open-data>不需要用户授权，也不需要登录，所以用起来很方便。但也是因为这个原因，小程序不允许用户脚本读取<open-data>返回的信息。',
    value11:'<view><text class="title">hello {{name}}</text><button open-type="getUserInfo" bind:getuserinfo="buttonHandler">授权获取用户个人信息</button></view>',
    value12:'上面代码中，<button>标签的open-type属性，指定按钮用于获取用户信息，bind:getuserinfo属性表示点击按钮会触发getuserinfo事件，即跳出对话框，询问用户是否同意授权。',
    value13:'<view><text class="title">这是首页</text><navigator url="../second/second">前往第二页</navigator></view>',
    value14:'除了使用<navigator>组件进行页面跳转，小程序也提供了页面跳转的脚本方法wx.navigateTo()。',
    value15:'<view><text class="title">这是首页</text><button bind:tap="buttonHandler">前往第二页</button></view>',
    value16:'<view><text class="title">这是第二页</text><navigator url="../home/home">前往首页</navigator></view>',
    value17:'上面代码中，<navigator>就是链接标签，相当于网页标签<a>，只要用户点击就可以跳转到url属性指定的页面（这里是第一页的位置）。',
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
      url: './ruanyifeng-03',
    })
  }
})