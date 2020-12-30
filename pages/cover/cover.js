const createRecycleContext = require('miniprogram-recycle-view')
Page({
  data: {
    openid: '',
    dataList: [],
    slideButtons: [{
      type: 'warn',
      text: '删除'
    }],
    tips: {
      message: '',
      type: 'info',
      show: false
    }
  },
  onReady: function () {
    const that = this
    this.ctx = createRecycleContext({
      id: 'recycleIdforCover',
      dataKey: 'recycleList',
      page: this,
      itemSize: { // 这个参数也可以直接传下面定义的this.itemSizeFunc函数
        width: 200,
        height: 137
      }
    })
    wx.cloud.init()
    wx.cloud.callFunction({
      name: 'getOpenId',
      success(res) {
        that.setData({
          openid: res.result.openid
        })
        that.db = wx.cloud.database()
        that.db.collection("free_music").where({_openid: that.data.openid}).limit(10).get({
          success(res) {
            that.setData({
              dataList: res.data.map(row => {
                return {
                  id: row._id,
                  name: row.name,
                  remark: row.remark,
                  img: row.img
                }
              })
            })
            that.ctx.append(that.data.dataList)
          }
        })
      }
    })

  },
  choose(e) {
    wx.navigateTo({
      url: './edit/edit',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        console.log(e.target.dataset)
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          id: e.target.dataset.id
        })
      }
    })
  },
  bindscrolltolower(e) {
    console.log(e)
    let that = this
    this.db.collection("free_music").where({_openid: that.data.openid}).skip(this.data.dataList.length).limit(10).get({
      success(res) {
        that.setData({
          dataList: that.data.dataList.concat(res.data.map(row => {
            return {
              id: row._id,
              name: row.name,
              remark: row.remark,
              img: row.img
            }
          }))
        })
        that.ctx.append(res.data.map(row => {
          return {
            id: row._id,
            name: row.name,
            remark: row.remark,
            img: row.img
          }
        }))
      }
    })
  },
  goToEdit() {
    wx.navigateTo({
      url: './edit/edit',
    })
  },
  slideButtonTap(e) {
    let that = this
    this.db.collection('free_music').doc(e.target.dataset.param.id).remove({
      success: function (res) {
        wx.cloud.deleteFile({
          fileList: [e.target.dataset.param.img],
          success: res => {
            that.ctx.splice(e.target.dataset.index, 1, () => {
              that.data.dataList.splice(e.target.dataset.index, 1)
              that.setData({
                dataList: that.data.dataList,
                tips: {
                  message: '删除成功',
                  type: 'success',
                  show: true
                }
              })
            })
          },
          fail: console.error
        })
      }
    })
  },
  onUnload() {
    this.ctx.destroy()
  }
})