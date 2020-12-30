// pages/note/note.js
const json = require('../../static/json/note-data')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notesList: [],
    slideButtons: [{
      type: 'warn',
      text: '删除',
      src: '/image/delete.svg'
    }]
  },
  showDetail(e) {
    wx.navigateTo({
      url: '/static/noteEdit/noteEdit',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          title: e.target.dataset.param.title,
          context: e.target.dataset.param.context,
          color:e.target.dataset.param.color
        })
      }
    })
  },
  goToEdit() {
    wx.navigateTo({
      url: '/static/noteEdit/noteEdit',
    })
  },
  slideButtonTap(e) {
    let that = this
    if (e.target.dataset.param <= json.json.list.length - 1) {
      this.data.notesList.splice(e.target.dataset.param, 1)
      this.setData({
        notesList: this.data.notesList
      })
    } else {
      let notesListStr = wx.getStorageSync('notesList')
      if (notesListStr) {
        let temp = JSON.parse(notesListStr)
        temp.splice(e.target.dataset.param - json.json.list.length, 1)
        wx.setStorage({
          data: JSON.stringify(temp),
          key: 'notesList',
          success() {
            that.data.notesList.splice(e.target.dataset.param, 1)
            that.setData({
              notesList: that.data.notesList
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
    let notesListStr = wx.getStorageSync('notesList')
    if (notesListStr) {
      this.setData({
        notesList: json.json.list.concat(JSON.parse(notesListStr))
      })
    } else {
      this.setData({
        notesList: json.json.list
      })
    }
  }
})