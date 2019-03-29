//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: "",
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,

    //data1: '/images/Bitmap (1).png',
    //data2:'儿童文学',
    

    list:[],
    pic_head: "http://39.108.180.53/",
    page:2,

    inputValue: [],
    Value: "",
    isFocus : true,
    bookid:"",

    more:null,
    nomore:null,
    from2: null,
  },

  event3(e){
    var that = this;
    console.log(e.detail.value);
    var inputValue = e.detail.value;
    that.setData({
      Value: inputValue, 
    })
  },
  event4(){
    var that = this;
    that.setData({
      isFocus: true,
    }) 
  },
  event5:function(){
    wx.navigateTo({
      url: '../A2-1/A2-1',
    })
  },
  event6: function () {
    var that=this
    wx.request({
      url: 'http://39.108.180.53/api/v1/search/code',
      data: {
        code: that.data.Value
      },
      success: function (e) {
        console.log(e)
        var condition=e.data
        if(condition==0){
          wx.showToast({
            title: '视频编码错误',
            icon: 'none',
            duration: 1000,
          })
        }else{
          that.setData({
            bookid: e.data[0].book_id
          })
          wx.navigateTo({
            url: '../A1-2/A1-2?id=' + that.data.bookid + "&list_id=" + e.data[0].order,
          })
        }
      },
      fail:function(e){
      }
    })
  },

  //跳转到tab页面使用wx:switchTab跳转
  event1:function(){
    wx:wx.switchTab({
      url: '../classify/classify',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //页面跳转及数据获取方法1：navigateTo可以返回原页面（保留当前页面），redirectTo不能返回原页面（关闭当前页面）
  event2:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../A1-1/A1-1?id='+e.currentTarget.dataset.key,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  //上拉加载更多
  onReachBottom:function(){
    var that=this 
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
        console.log('---是否有数据---'+res.data.from)
        var from = res.data.from
        if(from==that.data.from2){
          that.setData({
            nomore:1,
            more:0,
          })
        }else{
          that.setData({
            list: that.data.list.concat(res.data.data),
            page: res.data.current_page + 1,
            more: 0,
          })
          console.log(that.data.page)
        } 
      }
    })
  },

  onLoad:function(){
    var that = this 
    wx.request({
      url: 'http://39.108.180.53/api/v1/banner',
      success:function(res){
        //console.log(res)
        that.setData({
          imgUrls:res.data,
          nomore:0,
        })
        console.log(that.data.imgUrls)
      }
    })
    wx.request({
      url: 'http://39.108.180.53/api/v1/recommend',
      data:{
        page:1
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          list: res.data.data,
        })
        //console.log(that.data.list)
      }
    })
  },
})
