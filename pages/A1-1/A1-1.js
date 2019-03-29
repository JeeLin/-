// pages/A1-1/A1-1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    no:null,
    cuu:null,
    hide1:true,
    hide2:true,
    current_item: null,
    bottom: "/images/classify(1).png",
    bottom1: "/images/classify.png",
    bind:false,
    collect:"/images/star(1).png",
    collect1:"/images/Star.png",
    bind1: false,
    book:[],
    pic_head: "http://39.108.180.53/",
    list:[],
  },
  event1:function(){
    this.setData({ hide1: !this.data.hide1})
  },
  event2: function () {
    this.setData({ hide2: !this.data.hide2 })
  },
  event3:function(e){
    let cuu = e.currentTarget.dataset.key;
    console.log(e);
    this.setData({current_item: cuu,}),
    wx.navigateTo({
      url: '../A1-2/A1-2?id=' + this.data.no + "&list_id=" + e.currentTarget.dataset.key,
    })
  },
  event4:function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  classify:function(){
    this.setData({ 
      bottom:this.data.bottom1 ,
      bind: !this.data.bind
    })
    wx.switchTab({
      url: '../classify/classify',
    })
  },
  collect:function(){
    var that=this
    wx.request({
      url: 'http://39.108.180.53/api/v1/collect/change',
      data:{
        user_id: 1,
        book_id: that.data.no
      },
      success:function(res){
        console.log(res.data)
        that.setData({
          bind1:!that.data.bind1
        })
        if(that.data.bind1==1){
          wx.showToast({
            title: '收藏成功',
            icon: 'success',
            duration: 1000,
          })
        }
        if (that.data.bind1 == 0) {
          wx.showToast({
            title: '取消收藏',
            icon: 'none',
            duration: 1000,
          })
        }
      }
    })
  },
  phone:function(){
    wx.makePhoneCall({
      phoneNumber: '12412341234'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    that.setData({
      no:options.id
    })
    wx.request({
      url: 'http://39.108.180.53/api/v1/detail',
      data: { 
        user_id:1,
        book_id: that.data.no
      },
      header: {
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: function (res) {
        console.log(res.data)
        that.setData({
          book:res.data.book,
          list: res.data.catalog,
          bind1: res.data.coll_status,
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})