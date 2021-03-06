// pages/head/head.js
const app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false
  },

  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo);
            }
          });
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index'
            })
          }, 1000);
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      console.log(e.detail.userInfo);
      wx.login({
        success: res => {
          console.log(res.code)
          wx.request({
            url: 'http://39.108.180.53/api/v1/user/onload',
            data:{
              nickName: e.detail.userInfo.nickName,
              avatarUrl: e.detail.userInfo.avatarUrl,
              code: res.code
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              app.globalData.user_id = res.data;
            }
          })
        }
      });
      
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
      setTimeout(function () {
        wx.switchTab({
          url: '../index/index'
        })
      }, 1000);
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  }
}) 
