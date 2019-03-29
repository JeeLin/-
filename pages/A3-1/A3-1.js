var interval = null
// pages/A3-1/A3-1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id:1,
    phone:"",
    id_code:"",
    id_code_ture:"",
    id_code_again:0,
    false_time:10,
    remake:0,
    email:"",
    picture:[],
    id:1,
    time: '获取验证码',
    tims:"",
    currentTime: 61,
    updata:"",
  },
  
  //输入获取手机号值
  event1:function(e){
    var that = this;
    console.log('电话号码：'+e.detail.value);
    that.setData({
      phone: e.detail.value,
    })
  },

  //输入验证码
  event2: function (e) {
    var that = this;
    console.log('验证码：'+e.detail.value);
    that.setData({
      id_code: e.detail.value,
    })
  },

  //验证码倒计时
  event3: function () { 
    var that = this
    var currentTime = that.data.currentTime
    that.setData({
      remake:1
    })
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        times: currentTime + 's后重新获取'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 61,
          remake:0,
        })
        wx.request({
          url: 'http://39.108.180.53/api/v1/user/set_code',
          data: {
            user_id: 1,
          }
        })
      }
    }, 1000)//1000为1秒（每记一次数的时间）
    //将电话号码发给后端，并生成验证码
    wx.request({
      url: 'http://39.108.180.53/api/v1/user/code',
      data:{
        user_id:1,
        phone:that.data.phone
      },
      success:function(e){
        console.log(e)
      }
    })
   
  },

  //输入邮箱号
  event4: function (e) {
    var that = this;
    console.log('邮箱号：' + e.detail.value);
    that.setData({
      email: e.detail.value,
    })
  },

  //拉取本地图片
  event5: function (e) {
    var picture = this.data.picture;
    console.log(picture)
    var picid = 2;
    //console.log(e)
    console.log(picid)
    var that=this;
    var n=3;
    if(3>picture.length>0){
      n=3-picture.length;
    }
    else if(picture.length==3){
      n=1;
    }
    wx.chooseImage({
      count: n,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) { 
        console.log(res.tempFilePaths)
        if (picture.length==0){
          picture = res.tempFilePaths
        }
        else if(3>picture.length){
          picture =picture.concat(res.tempFilePaths)
        }
        else{
          picture[picid] = res.tempFilePaths[0]
        }
        that.setData({
          picture: picture,
        })
        console.log(that.data.picture)
      }
    })
  },

  //删除图片
  event6:function(e){
    var that = this;
    var index = e.currentTarget.dataset.key;
    console.log(e)
    console.log(e.currentTarget.dataset.key)
    let picture = this.data.picture;
    picture.splice(index, 1)
    that.setData({
      picture: picture
    });
  },

  //确定按钮，上传数据
  event7: function () {
    var that = this;
    var id_code=that.data.id_code
    var email=that.data.email
    var tempFilePaths=that.data.picture
    var uploadImgCount = 0;
    if (that.data.id_code.length==0){
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 1000,
      })
    } else if (that.data.email.length == 0){
      wx.showToast({
        title: '请输入邮箱',
        icon: 'none',
        duration: 1000,
      })
    } else if (that.data.picture.length == 0) {
      wx.showToast({
        title: '请添加营业执照图片',
        icon: 'none',
        duration: 1000,
      })
    }else{
      console.log('需要上传的图片' + tempFilePaths)
      for (var i = 0, h = tempFilePaths.length; i < h; i++) {
        wx.uploadFile({
          url: 'http://39.108.180.53/api/v1/user/upload',
          filePath: tempFilePaths[i],
          name: 'file',
          formData: {
            user_id: 1,
            code: id_code,
            email: email,
            index: i,
          },
          header: {
            "Content-Type": "multipart/form-data"
          },
          success: function (res) {
            console.log(res)
            uploadImgCount++;
            console.log('成功上传张数' + uploadImgCount)
            //如果是最后一张,则隐藏等待中
            if (uploadImgCount == tempFilePaths.length) {
              wx.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 1000,
              })
              console.log('----完成----')
            }
            var condition = res.data
            console.log(condition)
            //根据返回状态，判断输入信息或跳转
            if (condition == 1) {
              wx.showToast({
                title: '验证码错误，请重新输入',
                icon: 'none',
                duration: 1000,
              })
            } else if (condition == 2) {
              wx.showToast({
                title: '邮箱格式错误，请重新输入',
                icon: 'none',
                duration: 1000,
              })
            } else {
              wx.switchTab({
                url: '../mine/mine',
              })
            }
          },
          fail: function (res) {
            console.log(res)
          }
        });
      } 
    } 
  },

  //跳过此步骤
  event8:function(){
    wx.switchTab({
      url: '../index/index',
    })
  },

  //返回个人中心
  event9: function () {
    wx.switchTab({
      url: '../mine/mine',
    })
  },

  //电话联系客服
  event10:function(){
    wx.makePhoneCall({
      phoneNumber: '12412341234'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options)
    that.setData({
      id: options.id
    })
    console.log('认证状态（园长页）：'+that.data.id)
    if (that.data.id == 2 || that.data.id == 3){
      wx.request({
        url: 'http://39.108.180.53/api/v1/user/info',
        data:{
          user_id:1
        },
        success:function(res){
          console.log(res.data)
          var pic_num=0
          var pic_length = res.data.url.length-1
          that.setData({
            phone: res.data.phone,
            email: res.data.email,
          })
          for (; pic_num<pic_length;pic_num++){
            that.setData({ picture: that.data.picture.concat('http://39.108.180.53/' + res.data.url[pic_num]) })
          }
          console.log(that.data.picture)
        }
      })
    }
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