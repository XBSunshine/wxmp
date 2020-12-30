// static/noteEdit/noteEdit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    context: '',
    showButton: true,
    index: -1,
    array: ['红色-red', '绿色-green', '橙色-orange', '紫色-purple', '黄色-yellow', '灰色-gray'],
    colors: ['red', 'green', 'orange', 'purple', 'yellow', 'gray'],
    tips: {
      message: '',
      type: 'info',
      show: false
    },
    token: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init()
    let that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', (data) => {
      that.setData({
        title: data.title,
        showButton: false,
        context: data.context,
        index: that.data.colors.indexOf(data.color)
      })
    })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'http',
      // 传给云函数的参数
      data: {
        method: 'get',
        url: 'https://api.weixin.qq.com/cgi-bin/token',
        param: {
          grant_type: 'client_credential',
          appid: 'wx4c3b86073eb87d06',
          secret: '815d4b7fcd1ae9297cdcb894d522987a'
        }
      },
      success: function (res) {
        that.setData({
          token: res.result.access_token
        })
      },
      fail: console.error
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindKeyInput: function (e) {
    let that = this
    if (e.detail.value) {
      wx.cloud.callFunction({
        // 云函数名称
        name: 'http',
        // 传给云函数的参数
        data: {
          method: 'post',
          url: 'https://api.weixin.qq.com/wxa/msg_sec_check?access_token=' + this.data.token,
          param: {
            content: e.detail.value
          }
        },
        success: function (res) {
          if (res.result.errcode == 0) {
            if (e.target.dataset.param == 'title') {
              that.setData({
                title: e.detail.value
              })
            } else if (e.target.dataset.param == 'context') {
              that.setData({
                context: e.detail.value
              })
            }
          } else if (res.result.errcode == 87014) {
            that.setData({
              tips: {
                message: '输入内容含有违法违规内容',
                type: 'warn',
                show: true
              }
            })
            if (e.target.dataset.param == 'title') {
              that.setData({
                title: that.data.title
              })
            } else if (e.target.dataset.param == 'context') {
              that.setData({
                context: that.data.context
              })
            }
          } else {
            that.setData({
              tips: {
                message: res.result.errmsg,
                type: 'warn',
                show: true
              }
            })
            if (e.target.dataset.param == 'title') {
              that.setData({
                title: that.data.title
              })
            } else if (e.target.dataset.param == 'context') {
              that.setData({
                context: that.data.context
              })
            }
          }
        },
        fail: console.error
      })
    } else {
      if (e.target.dataset.param == 'title') {
        this.setData({
          title: e.detail.value
        })
      } else if (e.target.dataset.param == 'context') {
        this.setData({
          context: e.detail.value
        })
      }
    }
  },
  doSave() {
    if (this.data.title == '') {
      this.setData({
        tips: {
          message: "主题不能为空",
          type: 'info',
          show: true
        }
      })
      return
    }
    if (this.data.index == -1) {
      this.setData({
        tips: {
          message: "字体颜色不能为空",
          type: 'info',
          show: true
        }
      })
      return
    }
    let that = this
    wx.cloud.callFunction({
      name: 'http',
      data: {
        url: 'https://api.weixin.qq.com/wxa/msg_sec_check?access_token=' + this.data.token,
        param: {
          content: this.data.title
        },
        method: 'post'
      },
      success(res) {
        if (res.result.errcode == 0) {
          if (that.data.context) {
            wx.cloud.callFunction({
              name: 'http',
              data: {
                url: 'https://api.weixin.qq.com/wxa/msg_sec_check?access_token=' + that.data.token,
                param: {
                  content: that.data.context
                },
                method: 'post'
              },
              success(res1) {
                if (res1.result.errcode == 0) {
                  let notesListStr = wx.getStorageSync('notesList')
                  let notesList = []
                  if (notesListStr) {
                    notesList = JSON.parse(notesListStr)
                  }
                  notesList.push({
                    title: that.data.title,
                    color: that.data.colors[that.data.index],
                    context: that.data.context
                  })
                  wx.setStorage({
                    data: JSON.stringify(notesList),
                    key: 'notesList',
                    success() {
                      wx.reLaunch({
                        url: '/pages/note/note'
                      })
                    }
                  })
                } else if (res1.result.errcode == 87014) {
                  that.setData({
                    tips: {
                      message: '内容含有违法违规内容',
                      type: 'warn',
                      show: true
                    }
                  })
                } else {
                  that.setData({
                    tips: {
                      message: res1.result.errmsg,
                      type: 'warn',
                      show: true
                    }
                  })
                }
              },
              fail(error) {
                console.log(error)
              }
            })
          } else {
            let notesListStr = wx.getStorageSync('notesList')
            let notesList = []
            if (notesListStr) {
              notesList = JSON.parse(notesListStr)
            }
            notesList.push({
              title: that.data.title,
              color: that.data.colors[that.data.index],
              context: that.data.context
            })
            wx.setStorage({
              data: JSON.stringify(notesList),
              key: 'notesList',
              success() {
                wx.reLaunch({
                  url: '/pages/note/note'
                })
              }
            })
          }
        } else if (res.result.errcode == 87014) {
          that.setData({
            tips: {
              message: '主题含有违法违规内容',
              type: 'warn',
              show: true
            }
          })
        } else {
          that.setData({
            tips: {
              message: res.result.errmsg,
              type: 'warn',
              show: true
            }
          })
        }
      },
      fail(error) {
        console.log(error)
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