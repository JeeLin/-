const app = getApp();

// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    id:1,
  },
  event1: function () {
    wx.navigateTo({
      url: '../A3-2/A3-2?id=' + this.data.userInfo.nickName + "&pic=" + this.data.userInfo.avatarUrl,
    })
  },
  event2: function () {
    wx.redirectTo({
      url: '../A3-1/A3-1?id='+this.data.id,
    })
  },
  event3: function () {
    wx.navigateTo({
      url: '../A3-3/A3-3'
    })
  },
  event4: function () {
    wx.makePhoneCall({
      phoneNumber: '12412341234'
    })
  },
  event5: function () {
    wx.navigateTo({
      url: '../A3-4/A3-4'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (that.data.canIUse) {
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.request({
      url: 'http://39.108.180.53/api/v1/user/status',
      data:{
        user_id:1
      },
      success:function(e){
        console.log(e.data)
        that.setData({
          id: e.data
        })
        console.log('认证状态：'+that.data.id)
      }
    })
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
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