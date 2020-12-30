const createRecycleContext = require('miniprogram-recycle-view')
const json = require('../../static/json/audio-data')
Page({
  data: {
    dataList: json.json.list
  },
  onReady: function () {
    let ctx = createRecycleContext({
      id: 'recycleIdforaudio',
      dataKey: 'recycleList',
      page: this,
      itemSize: { // 这个参数也可以直接传下面定义的this.itemSizeFunc函数
        width: 200,
        height: 57
      }
    })
    ctx.append(this.data.dataList)
  },
  chooseMusic(e) {
    wx.navigateTo({
      url: '/static/audio/audioView',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          picture: e.target.dataset.param.poster,
          url: e.target.dataset.param.src,
          author:e.target.dataset.param.author,
          name:e.target.dataset.param.name,
          describe:e.target.dataset.param.describe
        })
      }
    })
  },
  bindscrolltolower(e){
    console.log(e)
  }
})