// pages/cover/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    name: '',
    remark: '',
    img: '',
    ifChoose: true,
    tips: {
      message: '',
      type: 'info',
      show: false
    },
    token: '',
    loading: false
  },
  chooseImg(e) {
    let that = this
    wx.chooseImage({
      count: 1,
      success(res) {
        if (res.tempFiles[0].size > 2000000) {
          that.setData({
            tips: {
              message: '图片大小不能超过2M',
              type: 'warn',
              show: true
            }
          })
        } else {
          that.setData({
            img: res.tempFiles[0].path,
            ifChoose: false
          })
        }
      }
    })
  },
  viewImg(e) {
    let urls = []
    urls.push(this.data.img)
    wx.previewImage({
      urls: urls
    })
  },
  doSave(e) {
    this.setData({
      loading: true
    })
    const db = wx.cloud.database()
    let that = this
    console.log(this.data.id)
    if (this.data.id) {
      //修改
      if (this.data.img && !this.data.img.startsWith('cloud://beta-9gj5ms3d16d7942c.6265-beta-9gj5ms3d16d7942c-1304172471/')) {
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + '.png', // 上传至云端的路径
          filePath: this.data.img, // 小程序临时文件路径
          success: res => {
            db.collection('free_music').doc(that.data.id).update({
              data: {
                name: this.data.name,
                img:res.fileID,
                remark: this.data.remark,
                updatetime: new Date()
              },
              success(res) {
                that.setData({
                  tips: {
                    message: '保存成功',
                    type: "success",
                    show: true
                  }
                })
                that.goToList()
              },
              fail(error) {
                that.setData({
                  loading: false,
                  tips: {
                    message: error,
                    type: 'warn',
                    show: true
                  }
                })
              }
            })
          },
          fail: function (error) {
            that.setData({
              loading: false,
              tips: {
                message: error,
                type: 'warn',
                show: true
              }
            })
          }
        })
      } else {
        db.collection('free_music').doc(that.data.id).update({
          data: {
            name: this.data.name,
            remark: this.data.remark,
            updatetime: new Date()
          },
          success(res) {
            that.setData({
              tips: {
                message: '保存成功',
                type: "success",
                show: true
              }
            })
            that.goToList()
          },
          fail(error) {
            that.setData({
              loading: false,
              tips: {
                message: error,
                type: 'warn',
                show: true
              }
            })
          }
        })
      }
    } else {
      //新增
      if (this.data.img) {
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + '.png', // 上传至云端的路径
          filePath: this.data.img, // 小程序临时文件路径
          success: res => {
            db.collection('free_music').add({
              // data 字段表示需新增的 JSON 数据
              data: {
                name: that.data.name,
                img: res.fileID,
                remark: that.data.remark,
                createtime: new Date(),
                updatetime: new Date()
              },
              success: function (res) {
                that.setData({
                  tips: {
                    message: '保存成功',
                    type: "success",
                    show: true
                  }
                })
                that.goToList()
              },
              fail: function (error) {
                that.setData({
                  loading: false,
                  tips: {
                    message: error,
                    type: 'warn',
                    show: true
                  }
                })
              }
            })
          },
          fail: function (error) {
            that.setData({
              loading: false,
              tips: {
                message: error,
                type: 'warn',
                show: true
              }
            })
          }
        })
      } else {
        db.collection('free_music').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            name: this.data.name,
            img: "",
            remark: this.data.remark,
            createtime: new Date(),
            updatetime: new Date()
          },
          success: function (res) {
            that.setData({
              tips: {
                message: '保存成功',
                type: "success",
                show: true
              }
            })
            that.goToList()
          },
          fail(error) {
            that.setData({
              loading: false,
              tips: {
                message: error,
                type: 'warn',
                show: true
              }
            })
          }
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init()
    const that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', (data) => {
      const db = wx.cloud.database()
      db.collection("free_music").doc(data.id).get({
        success(res) {
          if (res.data.img) {
            that.setData({
              id: data.id,
              name: res.data.name,
              img: res.data.img,
              remark: res.data.remark,
              ifChoose: false
            })
          } else {
            that.setData({
              id: data.id,
              name: res.data.name,
              remark: res.data.remark
            })
          }
        }
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
  bindKeyInput(e) {
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
            if (e.target.dataset.param == 'name') {
              that.setData({
                name: e.detail.value
              })
            } else if (e.target.dataset.param == 'remark') {
              that.setData({
                remark: e.detail.value
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
            if (e.target.dataset.param == 'name') {
              that.setData({
                name: that.data.name
              })
            } else if (e.target.dataset.param == 'remark') {
              that.setData({
                remark: that.data.remark
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
            if (e.target.dataset.param == 'name') {
              that.setData({
                name: that.data.name
              })
            } else if (e.target.dataset.param == 'remark') {
              that.setData({
                remark: that.data.remark
              })
            }
          }
        },
        fail: console.error
      })
    } else {
      if (e.target.dataset.param == 'name') {
        this.setData({
          name: e.detail.value
        })
      } else if (e.target.dataset.param == 'remark') {
        this.setData({
          remark: e.detail.value
        })
      }
    }
  },
  goToList() {
    setTimeout(() => {
      wx.reLaunch({
        url: '/pages/cover/cover',
      })
    }, 1500)
  }
})