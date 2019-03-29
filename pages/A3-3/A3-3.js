// pages/A3-3/A3-3.js
Page({

  data: {
    list:"",
    pic_head: "http://39.108.180.53/",
    page:2,
    more: null,
    nomore: null,
    from2: null,
  },

  event1:function(e){
    console.log(e)
    var i=e.currentTarget.dataset.key
    console.log(this.data.list[i].id)
    wx.navigateTo({
      url: '../A1-1/A1-1?id='+this.data.list[i].id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url: 'http://39.108.180.53/api/v1/collect/show',
      data:{
        user_id:1,
        page:1
      },
      success:function(res){
        console.log(res.data)
        that.setData({
          list: res.data.data,
        })
        console.log(that.data.list)
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
      url: 'http://39.108.180.53/api/v1/collect/show',
      data: {
        user_id:1,
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
            list: that.data.list.concat(res.data.data),
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