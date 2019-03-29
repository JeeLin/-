// pages/classify/classify.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    curNav: 1,
    left:[],
    right:[],
    page:2,
    pic_head:"http://39.108.180.53/",

    more: null,
    nomore: null,
    from2:null,
  },
 
  event1: function (e) {
    var that=this;
    let id = e.target.dataset.id;
    console.log(e.target.dataset.id)
    that.setData({ curNav: id });
    wx.request({
      url: 'http://39.108.180.53/api/v1/type/book',
      data: {
        type_id: that.data.curNav,
        page:1,
      },
      header: {
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: function (res) {
        console.log(res.data)
        that.setData({
          right: res.data.data,
          page:2
        })
      }
    })
  },
  event2:function(e){
    var that = this
    console.log(e)
    wx.navigateTo({
      url: "../A1-1/A1-1?id=" + e.currentTarget.dataset.key,
    })
  },
  event3:function(){
    wx.navigateTo({
      url: '../A2-1/A2-1',
    })
  }, 

  onLoad: function (options) {
    var that=this
    wx.request({
      url: 'http://39.108.180.53/api/v1/type',
      success: function (res) {
        console.log(res.data)
        that.setData({
          left:res.data
        })
      }
    })
    wx.request({
      url: 'http://39.108.180.53/api/v1/type/book',
      data: {
        type_id: 1,
        page:1
      },
      header: {
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: function (res) {
        console.log(res.data)
        that.setData({
          right:res.data.data
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
    var that = this
    that.setData({
      more: 1,
      nomore: 0,
    })
    console.log("加载更多")
    wx.request({
      url: 'http://39.108.180.53/api/v1/type/book',
      data: {
        type_id: that.data.curNav,
        page: that.data.page
      },
      success: function (res) {
        var from = res.data.from
        console.log(from + '判断是否有数据')
        if (from == that.data.from2) {
          that.setData({
            nomore: 1,
            more: 0,
          })
        } else {
          that.setData({
            right: that.data.right.concat(res.data.data),
            page: res.data.current_page + 1,
            // more: 0,
          })
          console.log(that.data.page)
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})