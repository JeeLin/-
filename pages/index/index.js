//index.js
const app = getApp()
Page({
  data: {
    imgUrls: "",  //轮播图

    list:[], //推荐 书籍
    headPath: app.globalData.headPath,
    page: 2,
    lastPage:6,
    more: true,

    inputValue: [],
    value: "",
    isFocus : true,
    bookid:""
  },

  onLoad: function () {
    var that = this
    //轮播图获取
    wx.request({
      url: 'http://39.108.180.53/api/v1/banner',
      success: function (res) {
        that.setData({
          imgUrls: res.data
        })
      }
    })
    //推荐内容获取
    wx.request({
      url: 'http://39.108.180.53/api/v1/recommend',
      data: {
        user_id: app.globalData.user_id
      },
      success: function (res) {
        that.setData({
          list: res.data.data,
          lastPage: res.last_page
        })
      }
    })
  },

  //文字搜索栏,直接跳转A2-1
  textSearch: function () {
    wx.navigateTo({
      url: '../A2-1/A2-1',
    })
  },

  //编码搜索框输入
  codeSearch() {
    var that = this;
    that.setData({
      isFocus: true,
    })
  },
  //点击编码查询键
  search: function () {
    var that = this
    wx.request({
      url: 'http://39.108.180.53/api/v1/search/code',
      data: {
        code: that.data.value
      },
      success: function (e) {
        var condition = e.data
        if (condition == 0) {
          wx.showToast({
            title: '视频编码错误',
            icon: 'none',
            duration: 1000,
          })
        } else {
          that.setData({
            bookid: e.data[0].book_id
          })
          wx.navigateTo({
            url: '../A1-2/A1-2?id=' + that.data.bookid + "&list_id=" + e.data[0].order,
          })
        }
      },
      fail: function (e) {
      }
    })
  },
  //获取输入的视频代码
  getCode(e){
    var that = this;
    console.log(e.detail.value);
    var inputValue = e.detail.value;
    that.setData({
      value: inputValue, 
    })
  },
  
  //跳转到tab页面使用wx:switchTab跳转
  toClassify:function(){
    wx:wx.switchTab({
      url: '../classify/classify',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //跳转图书详情页
  //页面跳转及数据获取方法1：navigateTo可以返回原页面（保留当前页面），redirectTo不能返回原页面（关闭当前页面）
  bookDetail:function(e){
    wx.navigateTo({
      url: '../A1-1/A1-1?id='+e.currentTarget.dataset.key,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //长按不感兴趣    未完成访问
  disincline:function(e){
    var that = this;
    console.log(e.currentTarget.dataset.key)
    wx.showActionSheet({
      itemList: ['不感兴趣'],
      success(res) {
        console.log('不感兴趣')
        //访问/return/disincline，扣除兴趣分
      },
      fail(res) {
        console.log('取消')
      },
    });
  },

  //上拉加载更多
  onReachBottom:function(){
    var that = this;
    wx.request({
      url: 'http://39.108.180.53/api/v1/recommend',
      data: {
        user_id: app.globalData.user_id,
        page: that.data.page
      },
      success: function (res) {
        console.log(that.data.lastPage)
        var next = res.next_page_url;
        console.log(next)
        if(!next){
          that.setData({
            more: false
          })
        }
        that.setData({
          list: that.data.list.concat(res.data.data),
          page: that.data.page+1
        })
        console.log(that.data.more)
      }
    })
  }
})
