// pages/A1-2/A1-2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hide:true,
    select:false,
    hide1:true,
    current_item: null,
    no:null,
    list_id:null,
    video_id:null,
    order_id: null,
    video:"",
    book: [],
    list: [],
    recmmend:[],
    pic_head: "http://39.108.180.53/",
    page:2,

    more: null,
    nomore: null,
    from2: null,
  },
  event1:function(){
    this.setData({hide:!this.data.hide})
  },
  
  event2: function (e) {
    var that=this
    console.log(e.currentTarget.dataset.key,)
    that.setData({
      current_item: e.currentTarget.dataset.key, 
      list_id: e.currentTarget.dataset.key,
    })
    wx.request({
      url: 'http://39.108.180.53/api/v1/video',
      data: {
        book_id: that.data.no,
        order: that.data.list_id,
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          video: res.data[0].video_url
        })
        console.log(that.data.video)
      }
    })
  },

  event3: function () {
    this.setData({ hide1: !this.data.hide1 })
  },
  event4:function(){
    wx.switchTab({
      url: '../classify/classify',
    })
  },
  event5:function(e){
    var that = this
    console.log(e)
    wx.navigateTo({
      url: "../A1-1/A1-1?id=" + e.currentTarget.dataset.key,
    })
  },
  
  //上拉加载更多
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    that.setData({
      no: options.id,
      list_id: options.list_id,
      current_item: options.list_id,
    })
    
    //图书简介+章节信息请求
    wx.request({
      url: 'http://39.108.180.53/api/v1/detail',
      data: {
        user_id: 1,
        book_id: that.data.no
      },
      header: {
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: function (res) {
        console.log(res.data)
        that.setData({
          book: res.data.book,
          list: res.data.catalog,
        })
        console.log(that.data.book)
      }
    })

    //跳转首次请求视频
    wx.request({
      url: 'http://39.108.180.53/api/v1/video',
      data: {
        book_id: that.data.no,
        order: that.data.list_id,
      },
      success:function(res){
        console.log(res.data)
        that.setData({
          video: res.data[0].video_url
        })
        console.log(that.data.video)
      }
    })

    //推荐内容请求
    wx.request({
      url: 'http://39.108.180.53/api/v1/recommend',
      data:{
        page:1
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          recmmend: res.data.data,
        })
        console.log(that.data.recmmend)
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
            recmmend: that.data.recmmend.concat(res.data.data),
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