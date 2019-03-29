// pages/A2-1/A2-1.js
Page({
  data: {
    isfocus:null,
    Value:null,
    list:"",
    list2:"",
    pic_head: "http://39.108.180.53/",
    page:2,

    more: null,
    nomore: null,
    from2: null,
  },

  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://39.108.180.53/api/v1/recommend',
      success: function (res) {
        console.log(res.data)
        that.setData({
          list2: res.data.data,
        })
        //console.log(that.data.list)
      }
    }) 
  },
  event1:function(e){
    var that = this;
    //console.log(e.detail.value)
    var inputValue = e.detail.value;
    that.setData({
      Value: inputValue,
    })
    console.log(that.data.Value)
  },
  event2: function () {
    var that=this;
    wx.request({
      url: 'http://39.108.180.53/api/v1/search/text',
      data: {
        page:1,
        title: that.data.Value
      },
      success:function(res){
        console.log(res.data)
        that.setData({
          list: res.data.data,
          page:2
        })
        console.log(that.data.list)
      }
    })  
  },
  event3:function(){
    wx.switchTab({
      url: '../classify/classify',
    })
  },
  event4: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../A1-1/A1-1?id=' + e.currentTarget.dataset.key,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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
      url: 'http://39.108.180.53/api/v1/recommend',
      data: {
        page: that.data.page
      },
      success: function (res) {
        console.log('---是否有数据---' + res.data.from)
        var from = res.data.from
        if (from == that.data.from2) {
          that.setData({
            nomore: 1,
            more: 0,
          })
        } else {
          that.setData({
            list2: that.data.list2.concat(res.data.data),
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