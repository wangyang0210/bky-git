<template>
    <div class="main">
         <div class="buy-key">
            <!-- <img class="bukey-top-titlebg" src="/static/dabei-img/bukey-top-titlebg.png" alt="活动图片标题"> -->
            <div class="buy-key-wrap">
                <p class="preferential">新年限时充值特惠</p>
                <div class="key-box">
                    <div class="key-box-item" v-for="(item,index) in keyMeal" :key="index" :class="{cur:curKeyMeal === index}" @click="setCurKeyMeal(index)">
                        <div class="key-num">x {{item.keyNum}}</div>
                        <img class="box-img" src="/static/images/bukey-box.png" alt="箱子">
                         <div class="key-price">
                            <img src="/static/images/gold-coin.png" alt="金币">
                            <span>{{item.price}}元</span>
                        </div> 
                    </div>
                </div>
                <p class="other-key-num"><span>其他数量</span>（1元=10个金币）</p>
                <div class="input-key-num">
                    <input type="tel" placeholder="在此输入其他数" maxlength="4" v-model.trim.number="otherKeyNum">
                    <div>{{needMoney}}元</div>
                </div>
                <div class="confirm-buy" @click="buyKeyBtnHandle">确认充值</div>
            </div>
        </div> 
        <van-popup  class="trans-pop-css"  :show="confirmBuyVisible">
            <div class="confirm-buy index-pop-container">
                <img class="head-img" src="/static/images/pop-bg-head2.png">
                <img class="close-pop-btn" src="/static/images/pop-close-icon2.png" @click="closeConfirmBuy">
                <div class="confirm-buy-wrap">
                    <p class="confirm-buy-tips">立即获得<span>{{confirmBuyKeyNum}}</span>个金币！</p>
                    <div class="confirm-buy-btn" @click="confirmBuyKeyHandle">{{confirmBuyKeyMoney}}元购买</div>
                </div>
            </div>
        </van-popup>
        <van-popup  class="trans-pop-css" :show="buySuccessVisible">
            <div class="confirm-buy index-pop-container buy-success">
                <img class="head-img" src="/static/images/pop-bg-head2.png">
                <img class="close-pop-btn" src="/static/images/pop-close-icon2.png" @click="closeBuySuccess">
                <div class="confirm-buy-wrap">
                  <!-- {{confirmBuyKeyNum}} -->
                    <p class="confirm-buy-tips">成功购买<span>240</span>个金币！</p>
                    <div class="confirm-buy-btn to-answer" @click="toAnswer">去答题</div>
                    <div class="confirm-buy-btn" @click="continueBuy">继续购买</div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
export default {
  name: "PrizeRecord",
  data() {
    return {
      confirmBuyVisible: false, //确认购买钥匙弹出层
      buySuccessVisible: false, //购买钥匙成功弹出层
      isPayIng: false,
      curKeyMeal: 0,
      curKeyMealS: 0,
      keyMeal: [
        {
          keyNum: 240,
          price: 20
        },
        {
          keyNum: 55,
          price: 5
        },
        {
          keyNum: 10,
          price: 1
        }
      ],
      otherKeyNum: "", //其它钥匙数量
      confirmBuyKeyNum: "", //最终确定购买钥匙数量
      confirmBuyKeyMoney: "" //最终确定购买钥匙所需金钱
    };
  },
  computed: {
    needMoney() {
      return (Number(this.otherKeyNum) * 0.1).toFixed(1);
    }
  },
  watch: {
    otherKeyNum: function (newVal,oldVal) {
      if(newVal !== ""){
        this.curKeyMeal = "";
      }else {
        this.curKeyMeal = this.curKeyMealS;
      }
    },
    buySuccessVisible(newVal,oldValue){
      if (!newVal) {
        this.isPayIng = false;
      }
    },
    confirmBuyVisible(newVal,oldValue){
      if (!newVal) {
        this.isPayIng = false;
      }
    },
  },
 
  methods: {
    buyKeyBtnHandle() {
      //确认充值，打点
      if (this.otherKeyNum !== "") {
        this.confirmBuyKeyNum = this.otherKeyNum;
        this.confirmBuyKeyMoney = (Number(this.otherKeyNum) * 0.1).toFixed(1);
      } else {
        this.confirmBuyKeyNum = this.keyMeal[this.curKeyMeal].keyNum;
        this.confirmBuyKeyMoney = this.keyMeal[this.curKeyMeal].price;
      }
      this.confirmBuyVisible = true;
    },
    confirmBuyKeyHandle() {
      //点击X元购买按钮
      console.log("确定购买个金币", this.confirmBuyKeyNum);
      if (this.isPayIng) {
        return;
      }
      this.isPayIng = true;
      var _self = this;
    },
    toAnswer() {
      wx.navigateBack({
        delta: 1
      })
    },
    continueBuy() {
      this.buySuccessVisible = false;
    },
    setCurKeyMeal(index) {
      //每个套餐点击打点
     this.curKeyMeal = index;
      this.curKeyMealS = index;
      this.otherKeyNum = "";
    },
    closeConfirmBuy() {
      this.confirmBuyVisible = false;
    },
    closeBuySuccess() {
      this.buySuccessVisible = false;
    },
    onBridgeReady(callback, payConfig) {
        console.log('微信支付')
    }
  }
};
</script>
<style>
body,html,#app{
  height: 100%;
}


</style>
<style scoped lang="less">
.main {
  min-height: 100%;
  background: -webkit-linear-gradient(top, rgb(107, 65, 255), rgb(64, 34, 162));
  background: -o-linear-gradient(top, rgb(107, 65, 255), rgb(64, 34, 162));
  background: linear-gradient(to bottom, rgb(107, 65, 255), rgb(64, 34, 162));
}
.buy-key {
  overflow: hidden;
}
.bukey-top-titlebg {
  width: 100%;
  height: 86px;
  margin: 12px auto 0;
}
.buy-key-wrap {
  width: 358px;
  background: -webkit-linear-gradient(top, rgb(124, 88, 255), rgb(84, 55, 176));
  background: -o-linear-gradient(top, rgb(124, 88, 255), rgb(84, 55, 176));
  background: linear-gradient(to bottom, rgb(124, 88, 255), rgb(84, 55, 176));
  border-radius: 4px;
  margin: 8px auto 0;
  overflow: hidden;
  padding-bottom: 16px;
}
.buy-key-wrap .preferential {
  padding-left:54px;
  margin-top:18px;
  height:26px;
  line-height:24px;
  font-size:13px;
  font-weight:400;
  color:rgba(255, 255, 255, 1);
  text-align:left;
  background-image:url("http://cache.wangyangyang.vip/czth-bg.png");
  -webkit-background-size:18px;
  background-size:18px;
  background-repeat:no-repeat;
  background-position:24px center;
}
.buy-key-wrap .key-box {
  padding: 0 15px;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.buy-key-wrap .key-box .key-box-item {
  position: relative;
  width:104px;
  height:170px;
  background:rgba(132,99,255,1);
  border-radius:8px;
  padding-top:8px;
  box-sizing: border-box;
}
.buy-key-wrap .key-box .key-box-item.cur {
  border: 1px solid rgba(255, 219, 0, 1);
}
.buy-key-wrap .key-box .key-box-item.cur:after {
  position: absolute;
  content: "";
  width: 44px;
  height: 44px;
  left: 0;
  right: 0;
  top: -22px;
  margin: auto;
  background-image: url("http://cache.wangyangyang.vip/bukey-hat.png");
  -webkit-background-size: contain;
  background-size: contain;
  background-repeat: no-repeat;
}
.buy-key-wrap .key-box .key-box-item .key-num {
  width:70px;
  height:22px;
  border-radius:6px;
  line-height: 22px;
  background: rgba(0, 0, 0, 0.3013);
  margin: auto;
  background-image: url("http://cache.wangyangyang.vip/bukey-key.png");
  background-repeat: no-repeat;
  -webkit-background-size: 16px;
  background-size: 16px;
  background-position: 7px center;
  color:#fff;
  text-align: left;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding-left: 26px;
}
.buy-key-wrap .key-box .key-box-item .box-img {
  margin:10px 4px 2px 4px;
  width:92px;
  height:88px;
}
.buy-key-wrap .key-box .key-box-item .key-price {
  position:relative;
  width:86px;
  height:20px;
  line-height:20px;
  color:#fff;
  margin:4px auto 0;
  background:rgba(255, 107, 77, 1);
  border-radius:16px;
  box-sizing:border-box;
  padding-left:35px;
}
.buy-key-wrap .key-box .key-box-item .key-price span {
  font-size: 16px;
}
.buy-key-wrap .key-box .key-box-item .key-price img {
  position:absolute;
  left:-1px;
  top:0px;
  display:block;
  width:21px;
  height:21px;
  background:rgba(251, 152, 4, 1);
  border-radius:100%;
}
.buy-key-wrap .other-key-num {
  height:44px;
  line-height:44px;
  font-weight:400;
  color:rgba(255, 255, 255, 1);
  letter-spacing:2px;
  text-align:left;
  margin-top:20px;
  padding-left:60px;
  font-size:14px;
  background-image:url("http://cache.wangyangyang.vip/bukey-key.png");
  -webkit-background-size:23px;
  background-size:23px;
  background-repeat:no-repeat;
  background-position:25px center;
}
.buy-key-wrap .other-key-num span {
  font-size:16px;
  font-weight:500;
  letter-spacing:4px;
}
.buy-key-wrap .input-key-num {
  width:349px;
  height:40px;
  line-height:40px;
  background:rgba(116, 82, 234, 1);
  border-radius:36px;
  overflow:hidden;
  border:1px solid rgba(97, 49, 156, 1);
  margin:14px auto 0;
  display:flex;
  justify-content:flex-start;
  align-items:center;
  box-sizing:border-box;
}
.buy-key-wrap .input-key-num input {
  border:none;
  outline:none;
  padding:0 10px;
  width:50%;
  font-size:16px;
  font-weight:400;
  color:rgba(216, 205, 255, 1);
  letter-spacing:2px;
  background-color:transparent;
}
.buy-key-wrap .input-key-num input::-webkit-input-placeholder {
  color: rgba(216, 205, 255, 1);
}
.buy-key-wrap .input-key-num div {
  flex-grow:1;
  font-size:18px;
  font-weight:400;
  color:rgba(241, 210, 57, 1);
  letter-spacing:2px;
  text-align:right;
  padding:0 25px;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.buy-key-wrap .confirm-buy {
  width:220px;
  height:41px;
  line-height:41px;
  background:rgba(251, 152, 4, 1);
  border-radius:84rpx;
  color:#fff;
  margin:30px auto 3px;
  text-align:center;
}
.buy-key-wrap .confirm-buy:active {
  background: rgb(251, 130, 3);
}

.trans-pop-css {
  background-color: transparent;
  overflow: visible;
  /deep/.van-popup {
    background-color: transparent !important;
    overflow: visible;
  }
}

.index-pop-container {
  position: relative;
  width: 304px;
  height: 265px;
  -webkit-background-size: contain;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: transparent;
}
.index-pop-container .head-img {
    position: absolute;
    width: 146px;
    height: 90px;
    top: -47px;
    left: 0;
    right: 0;
    margin: auto;
}
.index-pop-container .close-pop-btn {
  position: absolute;
  width: 21px;
  height: 21px;
  top: 26px;
  right: 39px;
}

/*确认购买弹出层样式*/
.confirm-buy-wrap {
  overflow: hidden;
}
.confirm-buy {
  background-image: url("http://cache.wangyangyang.vip/confirm-buy-bg.png");
  height:265px;
}
.confirm-buy-wrap .confirm-buy-tips {
    height: 30px;
    line-height: 25px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    letter-spacing: 4px;
    margin-top: 95px;
    text-align: center
}
.confirm-buy-wrap .confirm-buy-tips span {
  font-size: 16px;
  color: #fff100;
}
.confirm-buy-wrap .confirm-buy-btn {
    width: 118px;
    height: 35px;
    line-height: 35px;
    background: #61319c;
    border-radius: 18px;
    color: #fff;
    margin: 48px auto 0;
    text-align:center;
}

.confirm-buy-wrap .confirm-buy-btn:active {
  background: rgb(85, 31, 156);
}
/*确认购买弹出层样式*/

/*购买成功弹出层样式*/
.buy-success {
  background-image: url("http://cache.wangyangyang.vip/buy-success-bg.png");
  height:265px;
}
.buy-success .confirm-buy-btn {
  margin-top: 20px;
}
.buy-success .to-answer {
  margin-top:20px;
  background:rgba(97, 49, 156, 0.4);
  border:1px solid #61319c;

}
.buy-success .to-answer:active {
  background: rgba(97, 49, 156, 1);
}
/*购买成功弹出层样式*/
</style>

