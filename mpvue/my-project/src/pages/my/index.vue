<template>
  <div class="my-view">
    <div class="user-info">
      <div class="user-info-wrap">
        <img class="user-head-img" :src="user.userInfo.avatar" alt="用户头像">
        <div class="user-name">
          <div class="user-nick-name">{{user&&user.userInfo.username?user.userInfo.username:"匿名用户"}}</div>
        </div>
        <div class="user-key-detail">
          <img class="key-icon" src="/static/images/my_gold@3x.png" alt="金币数">
          <span>{{user&&user.userInfo?user.userInfo.gold:0}}</span>
          <span class="buy-key-tips" @click="toBuyKey">充值</span>
        </div>
        <div class="detail-btn">
          <div>
            <img src="/static/images/game_count@3x.png" alt="参与场次">
            <span @click="openResult">参与场次</span>
          </div>
          <div>
            <img src="/static/images/game_log@3x.png" alt="奖品记录">
            <span @click="viewPrizeRecord">奖品记录</span>
          </div>
        </div>
      </div>
      <div class="user-address" @click="myAddress">收货地址
        <div
          class="add"
          v-if="address.username"
        >{{address.province}}{{address.city}}{{address.country}}{{address.address}}</div>
        <div class="add" v-if="address.username">{{address.username}} {{address.mobile}}</div>
         <p
          v-if="!address.username"
          style="font-size:14px;padding-bottom:0;margin-bottom:0;color:#fff;font-weight:600"
        >添加新的收货地址</p>
      </div>
    </div>
    <!-- <ContactUs></ContactUs> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        "uid": 10002,
        "token": "WmoEMAFpVTwDMAc1UUdcMAosA0cFF1ZjCGMNcQZiUWsBMQE6UyVXTVdmCT5eSFoqW2UHQlFDDD5RMQRlUjNXbVpiBEQBYlU9",
        "username": "王洋",
        "userInfo": {
          // "mobile": "",
          // "uid": 10002,
          // "gold": 20,
          // "avatar": "http://thirdwx.qlogo.cn/mmopen/vi_32/mg86W2NaRPVib9VykaicbGRoB3eC78HahibRSYwRG7g2CnzjeTJUK3BicXekjm6DjQicw3VJp7b7drc6Y5nejicPfjZQ/132",
          // "username": "王洋",
          // "sex": 1,
          // "token": "WmoEMAFpVTwDMAc1UUdcMAosA0cFF1ZjCGMNcQZiUWsBMQE6UyVXTVdmCT5eSFoqW2UHQlFDDD5RMQRlUjNXbVpiBEQBYlU9",
          // "address": [],
          // "pay_openid": null
        }
      },
      "address":{
        "id": 629,
        "uid": 10002,
        "username": "王洋洋",
        "mobile": "15551677671",
        "status": 0,
        "address": "中山南一路",
        "created_at": 1551083717,
        "updated_at": 1551083717,
        "isdelete": 0,
        "areaCode": "310101",
        "city": "上海市",
        "country": "黄浦区",
        "county": "",
        "postalCode": null,
        "province": "上海市"
      }
    };
  },
  created() {
    //   this.$fly.request({
    //   method:"post", 
    //   url:"live/get_liveinfo",
    //   body:{
    //     uid:1228,
    //     token:'test1234'
    //   }
    // }).then(res =>{
    //   console.log(res)
    // })
    // var data={token:"test1234",uid:1228}
    // this.$fly.get("live/get_liveinfo",data).then((d) => {
    //     console.log(d.data)
    //   })
    this.$http.post({
        url:"live/get_liveinfo",
        data:{
            "token":"test1234",
            "uid":"1228",
        }
    }).then(res =>{
      //  console.log(res.status)
        if(res.status == 1) {
          this.user.userInfo = res.data
        } else {
          wx.showToast({
          title: '系统开小差', 
          icon: 'loading', 
          duration: 2000, 
          mask: true, 
        });
      }
    });
  },
  methods: {
    openResult() {
      mpvue.navigateTo({ url: "./join/main" });
    },
    viewPrizeRecord() {
      mpvue.navigateTo({ url: "./prize/main" });
    },
    toBuyKey() {
      mpvue.navigateTo({ url: "./pay/main" });
    },
    myAddress() {
      mpvue.navigateTo({ url: "./address/main" });
    }
  }
  
};
</script>
<style scoped>
html {
  background: red;
  height: 100%;
}
</style>
<style lang="less" scoped>
.my-view {
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  background-image: url("http://cache.wangyangyang.vip/my_bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.user-address {
  margin-top: 20px;
  width: 334px;
  margin-left: 20px;
  // height:96px;
  background: linear-gradient(
    180deg,
    rgba(255, 211, 65, 1) 0%,
    rgba(243, 166, 15, 1) 100%
  );
  border-radius: 8px;
  opacity: 0.9;
  color: #fff;
  text-align: left;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  &:after {
    position: absolute;
    right: 15px;
    top: 15px;
    content: " ";
    width: 7px;
    height: 7px;
    border-top: 2px solid #ffffff;
    border-right: 2px solid #ffffff;
    transform: rotate(45deg);
  }
  .add {
    font-size: 12px;
    margin-top: 10px;
  }
}
.user-info {
  margin-top: 35px;
}

.user-info-wrap {
  position: relative;
  height: 150px;
  margin: 20px 20px;
  background: transparent url("http://cache.wangyangyang.vip/user-info-bg.png")
    no-repeat;
  background-position: center center;
  -webkit-background-size: cover;
  background-size: cover;
  border-top: 1px solid transparent;
  color: #fff;
}

.user-head-img {
  position: absolute;
  top: -58rpx;
  left: 0;
  right: 0;
  margin: auto;
  width: 124rpx;
  height: 124rpx;
  border-radius: 100%;
  overflow: hidden;
  border: 4rpx solid #fff;
  object-fit: cover;
}

.user-name {
  margin-top: 75rpx;
  line-height: 84rpx;
  font-size: 32rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-nick-name {
  position: relative;
}

.user-key-detail {
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-key-detail .key-icon {
  width: 22px;
  height: 22px;
}

.user-key-detail .buy-key-icon {
  height: 0.64rem;
  width: 0.64rem;
}

.user-key-detail span {
  height: 22px;
  margin-right: 8px;
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(180, 112, 0, 1);
  line-height: 22px;
}

.user-key-detail .buy-key-tips {
  font-size: 28rpx;
  font-weight: 400;
  width: 85rpx;
  height: 44rpx;
  line-height: 44rpx;
  background: #ffbf1c;
  border-radius: 28rpx;
  color: #fff;
  padding-left: 28rpx;
}

.detail-btn {
  margin-top: 20rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  line-height: 100rpx;
  image {
    width: 28px;
    height: 28px;
  }
}

.detail-btn > div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  width: 50%;
}

.detail-btn > div:first-child {
  border-right: 1px solid #fff;
  height: 17px;
}

.detail-btn > div span {
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 20px;
  padding-left: 4px;
}
/*
.detail-btn > :first-child img {
  width: 20px;
  height: 20px;
}

.detail-btn > :last-child img {
  width: 20px;
  margin-top: -3px;
  height: 20px;
}
*/
.custom-service {
  position: absolute;
  right: -0.72rem;
  bottom: -0.72rem;
  width: 1.84rem;
  height: 1.84rem;
}

.trans-pop-css {
  background-color: transparent;
  overflow: visible;
}

.index-pop-container {
  position: relative;
  width: 12.24rem;
  height: 12.28rem;
  -webkit-background-size: contain;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: transparent;
}

.index-pop-container .head-img {
  position: absolute;
  width: 5.8rem;
  height: 3.8rem;
  top: -1.9rem;
  left: 0;
  right: 0;
  margin: auto;
}

.index-pop-container .close-pop-btn {
  position: absolute;
  width: 0.96rem;
  height: 0.96rem;
  top: 1rem;
  right: 1rem;
}
</style>