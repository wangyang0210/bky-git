<template>
  <div>
    <div class="page">
      <van-nav-bar title="奖品详情" left-text="返回" left-arrow @click-left="onClickLeft"/>
      <div class="top-time" v-if="detail.live_status==1||detail.live_status==2">
        距离开奖时间只剩：
        <span class="red-text" v-if="detail.gift_info">{{detail.gift_info.open_time}}</span>
      </div>
      <!-- 图片 -->
      <div class="top-img">
        <img v-if="detail.gift_info" class="img-responsive" :src="detail.gift_info.main_cover" alt>
        <div class="time" v-if="detail.live_status==1">{{detail.user_count}}人正在参与</div>
        <div
          class="time"
          v-else-if="detail.live_status==2||detail.live_status==3"
        >{{detail.user_count}}人参与了答题</div>
        <div class="time" v-else>答题时间：{{detail.gift_info.start_time}}-{{detail.gift_info.end_time}}</div>
      </div>
      <!-- 内容 -->
      <div class="info">
        <div class="name large-text">{{detail.gift_info?detail.gift_info.name:'未知'}}</div>
        <div class="other-info">
          <!-- 价格 -->
          <span class="red-text">
            ￥
            <span class="large-text">{{detail.gift_info?detail.gift_info.money:'-'}}</span>
          </span>
          <!-- 金币 -->
          <span class="use-gold" v-if="detail.live_status==2||detail.live_status==3">
            <img class="gold" src="/static/images/gold2@3x.png" alt>
            <span class="text-num">{{detail.gift_info.use_gold}}</span>
          </span>
          <!-- 奖品总数 -->
          <span :class="{'float-right':detail.live_status==2||detail.live_status==3}">
            奖品总数：
            <span class="red-text large-text">{{detail.gift_info?detail.gift_info.num:'-'}}</span>
          </span>
          <!-- 参与人 -->
          <span class="people float-right" v-if="detail.live_status==0||detail.live_status==1">
            <div class="img-container">
              <span
                class="avatar-item"
                v-for="(user, $index) in detail.prize_info"
                :key="$index"
                track-by="$index"
              >
                <img :src="user.avatar" alt>
              </span>
            </div>
            <div
              class="grey-text"
            >{{detail.prize_count}}人{{detail.live_status==1?'获得了抽奖机会':'关注了该奖品'}}</div>
          </span>
          <div class="clearfix"></div>
          <!-- 参与人 -->
        </div>
      </div>
      <!-- 已结束的 -->
      <div class="prize" v-if="detail.live_status==3">
        <div class="line-title">{{detail.prize_count}}人中奖</div>
        <div class="winner-list">
          <div class="users">
            <span v-if="!detail.prize_count">暂无中奖名单</span>
            <!-- <div v-else class="user-item" v-for="user in detail.prize_info" :key="user.uid">
                        <img :src="user.avatar" alt>
                        <span class="username">{{user.username}}</span>
                        <span class="join-time">参与时间：{{user.created_time|formattime}}</span>
            </div>-->
          </div>
        </div>
      </div>
     
      <div
        class="prize-draw-list"
        style="background:#f9f9f9;margin-bottom:15px;margin-top:10px;overflow:hidden"
        v-if="info"
      >
        <div class="users" style="background-color:transparent">
          <div v-if="info" class="user-item border-user">
            <img :src="info.avatar" alt>
            <span class="username">{{info.username}}</span>
            <span class="draw-count">您有<span class="red-text">{{info.times}}次</span>抽奖机会</span>
            <span class="gray-text"><span class="red-text md-text">⬆+{{info.percent}}%</span>
              <span class="prize-luck">中奖率</span>
            </span>
          </div>
        </div>
      </div>
       <div class="badge-box">   
            <span class="badge" v-if="draw_user.length>=1">
            <span>{{user_number}}</span>
            </span>
    </div>
      <div v-if="detail.live_status==0">
        <div class="line-title">商品详情</div>
        <div class="detail" v-if="detail.gift_info&&detail.gift_info.img_detail">
          <!-- <div class="line-title">商品详情</div> -->
          <div class="imgs" v-html="detail.gift_info.img_detail">
                        <!-- <div ></div> -->
          </div>
          <!-- <rich-text class="imgs" type="node" :nodes="detail.gift_info.img_detail"></rich-text> -->
          <!-- <div class="imgs">
                      <img class="img-responsive" v-for="(img,index) in detail.img_detail" :key="index" :src="img" alt="">
          </div>-->
        </div>
      </div>
      <van-tabs v-else="detail.live_status==1" v-model="active" sticky swipeable>
        <van-tab title="商品详情">
          <div class="detail" v-if="detail.gift_info&&detail.gift_info.img_detail">
            <div class="imgs" v-html="detail.gift_info.img_detail">
            </div>
          </div>
        </van-tab>
        <van-tab title="本期参与记录">
          <div class="prize-draw-list">
            <div class="prize-user" v-if="draw_user.length>=1">
              共有
              <span>{{user_number}}</span>人参与抽奖
            </div>
            <div class="users">
              <div v-for="user in draw_user" class="user-item" :key="user.uid">
                <img :src="user.avatar" alt>
                <span class="username">{{user.username}}</span>
                <span class="draw-count">
                  获得
                  <span class="red-text">{{user.times}}次</span>抽奖机会
                </span>
                <font v-if="user.times>=10">👍</font>
                <span class="gray-text">
                  <span class="red-text md-text">⬆+{{user.percent}}%</span>
                  <span class="prize-luck">中奖率</span>
                </span>
              </div>
            </div>
            <div class="load-more mr-bottom" v-if="page<page_count" @click="loadMore">点击加载更多</div>
            <div class="load-more mr-bottom" v-else>没有更多了</div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <van-popup v-model="show">
      <div class="bg">
        <div class="bg-prize">天降锦鲤</div>
        <div>
          <img class="bg-qrcode" src="/static/images/3ec37d2fae58c3b1a6c21839799feeb.jpg" alt>
        </div>
        <div class="bg-text">
          <span>喜迎新春,天降福利</span>
          <br>
          <span>恭喜您获了每天每场一次免费答题机会</span>
          <br>
          <span>长按扫描二维码</span>
          <br>关注公众号马上获得答题机会
        </div>
      </div>
    </van-popup>
    <div class="buttons">
      <span class="flat-button red" v-if="detail.live_status!='1'" @click.stop="toBuy">优惠购买</span>
      <div v-else>
        <span class="flat-button yellow" style="width:40%" @click.stop="toBuy">优惠购买</span>
        <span class="flat-button red" style="width:40%" @click="enterGame">
          <span class="yellow-text price">
            <img class="gold" src="/static/images/gold@3x.png" alt>
            {{detail.gift_info?detail.gift_info.use_gold:'-'}}
          </span>
          立即答题
        </span>
        <span class="flat-button red" style="width:20%" @click="openRules">
          <van-icon name="question-o"  />
        </span>
        <span class="free-text">
          <span class="free" v-if="free>0">
            <sup class="large-text free-postion">{{free}}</sup>
            <small>免费</small>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // status: '',
      now: "",
      invite_uid: 0,
      timer: null,
      code_result: [],
      free: 0,
      info: 
    {
  "uid": 10002,
  "username": "王洋",
  "avatar": "http://thirdwx.qlogo.cn/mmopen/vi_32/mg86W2NaRPVib9VykaicbGRoB3eC78HahibRSYwRG7g2CnzjeTJUK3BicXekjm6DjQicw3VJp7b7drc6Y5nejicPfjZQ/132",
  "times": 1,
  "percent": "100"
}
    ,
      id: "",
      isEnterGame: false,
      active: 0,
      page: 1,
      show: false,
      page_count: "",
      user_number: 1,
      draw_user: [
        {
          uid: 10002,
          username: "王洋",
          avatar:
            "http://thirdwx.qlogo.cn/mmopen/vi_32/mg86W2NaRPVib9VykaicbGRoB3eC78HahibRSYwRG7g2CnzjeTJUK3BicXekjm6DjQicw3VJp7b7drc6Y5nejicPfjZQ/132",
          times: 1,
          percent: "100"
        }
      ],
      detail: {
        user_count: 1,
        is_prize: 0,
        prize_count: 1,
        prize_info: [
          {
            uid: 10002,
            created_time: 1551259332,
            username: "王洋",
            avatar:
              "http://thirdwx.qlogo.cn/mmopen/vi_32/mg86W2NaRPVib9VykaicbGRoB3eC78HahibRSYwRG7g2CnzjeTJUK3BicXekjm6DjQicw3VJp7b7drc6Y5nejicPfjZQ/132"
          }
        ],
        gift_info: {
          start_time: "2019-02-27",
          end_time: "2019-02-28",
          open_time: "29:29:29",
          name: "塑料仿藤脏衣服收纳筐手提篮子洗衣筐编织衣篓",
          img: "",
          main_cover:
            "http://images.ecdpower.net/image/jrh45xgo_3ziaq7qdjnnd5c4fb379801e5.jpg",
          money: 83,
          use_gold: 5,
          img_detail:
            '<p><img src="http://images.ecdpower.net/data/upload/20190129/15487272567.jpg"/></p><p><img src="http://images.ecdpower.net/data/upload/20190129/15487272569.jpg"/></p><p><img src="http://images.ecdpower.net/data/upload/20190129/15487272579.jpg"/></p><p><img src="http://images.ecdpower.net/data/upload/20190129/15487272574.jpg"/></p>',
          num: 1,
          remain_num: 1,
          url: "https://u.jd.com/N0CrmP"
        },
        live_status: 1,
        openid: "ox3E-0aBNXao8o7eK80dZQvxNfIk"
      }
    };
  },
  created() {
    // this.detail.gift_info.img_detail = this.detail.gift_info.img_detail.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
  }
};


// function sortKey(array,key){
//     return array.sort(function(a,b){
//         var x = a[key];
//         var y = b[key];
//         return ((x>y)?-1:(x<y)?1:0)
//     })
// };
function decodeUnicode(str) {
  str = str.replace(/\\/g, "%");
  return unescape(str);
}
</script>
<style lang="less">
.detail .imgs {
  overflow-x: hidden;
  p {
    -webkit-margin-before: 0px;
    -webkit-margin-after: 0px;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    img {
      display: block;
      height: auto;
      max-width: 100%;
    }
  }
}
</style>
<style scoped lang="less">
/deep/._van-icon .van-icon {
    font-size: 25px;
    top:6px;
}
.van-popup {
  background-color: rgba(0, 0, 0, 0) !important;
  .bg {
    width: 300px;
    height: 300px;
    background: url("http://cache.wangyangyang.vip/bilibili.jpg") #d80606;
    background-size: 100% 100%;
    border-radius: 6px;
    .bg-prize {
      padding: 10px;
      color: rgb(255, 245, 151);
      font-size: 20px;
      font-weight: 600;
    }
    .bg-qrcode {
      width: 132px;
      height: 132px;
    }
    .bg-text {
      width: 100%;
      color: rgb(255, 245, 151);
      font-weight: 500;
      font-size: 15px;
      text-align: center;
      line-height: 25px;
      padding-top: 10px;
    }
  }
}

.van-dialog {
  z-index: 4000;
}
.badge-box {
  position: relative;
  z-index:99999;

  .badge {
    position: absolute;
    right: 45px;
    top: 5px;
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    font-family: PingFang SC, Helvetica Neue, Arial, sans-serif;
    text-align: center;
    box-sizing: border-box;
    padding: 0 3px;
    min-width: 16px;
    line-height: 14px;
    // border: 1px solid #fff;
    border-radius: 16px;
    background-color: #f44;
    -webkit-transform: translateX(50%);
    transform: translateX(50%);
    -webkit-transform-origin: 100%;
    transform-origin: 100%;
  }
}

.page {
  overflow: auto;
  margin-bottom: 50px;
  background-color: #f9f9f9;
  -webkit-overflow-scrolling: touch;
}

.buttons {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px;
  z-index: 100;

  .price {
    font-size: 12px;
    margin-right: 5px;
    vertical-align: middle;

    img {
      width: 12px;
      height: 12px;
      vertical-align: middle;
    }
  }

  .van-icon {
    font-size: 26px;
    vertical-align: middle;
  }
}

img.img-responsive {
  max-width: 100%;
  padding: 0;
  margin: 0;
  display: block;
}

.top-time {
  padding: 20px 0;
  font-size: 16px;
  color: #666;
  text-align: center;
}

.top-img {
  width: 100%;
  position: relative;
  img {
    width: 375px;
    height: 282px;
  }
  .time {
    background-color: rgba(0, 0, 0, 0.4);
    padding: 10px 30px;
    color: #fff;
    font-size: 12px;
    position: absolute;
    top: 0px;
    right: 0;
    border-bottom-left-radius: 10px;
  }
}

.red-text {
  color: red;
}

.bold-text {
  font-weight: bold;
  color: #000 !important;
}

.grey-text {
  color: #ccc;
}

.yellow-text {
  color: yellow;
}

.large-text {
  font-size: 18px;
}

.info {
  padding: 10px 16px;
  background-color: #fff;
  text-align: left;
  font-size: 12px;

  .name {
    color: #333;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .other-info {
    color: #333;

    & > span {
      margin-right: 20px;

      &.float-right {
        float: right;
        margin-right: 0;
      }
    }

    img.gold {
      width: 12px;
      height: 12px;
      margin-right: 5px;
    }

    .people {
      display: inline-block;
      margin-top: -15px;
      text-align: right;

      .img-container {
        height: 30px;
      }

      .avatar-item {
        position: relative;
        float: right;
        margin-left: -10px;
        height: 22px;
        width: 22px;
        border: 1px solid #fff;
        border-radius: 50%;
        overflow: hidden;
        display: inline-block;

        img {
          height: 100%;
          width: 100%;
        }
      }
    }
  }
}

.line-title {
  font-size: 14px;
  color: #aaa;
  position: relative;
  padding-top: 10px;
  padding-bottom: 10px;

  // width: 100%;
  &:before,
  &:after {
    height: 1px;
    width: 30px;
    background-color: #aaa;
    position: absolute;
    content: "";
    top: 50%;
  }

  &:before {
    left: calc(50% - 65px);
  }

  &:after {
    right: calc(50% - 65px);
  }
}

.winner-list {
  color: #333;
  font-size: 12px;
  text-align: left;
  // height: 70px;
  // max-height: 70px;

  .users {
    // margin-top: 15px;
    padding: 20px;
    background-color: #fff;
    display: flex;
    overflow-x: auto;
    flex-direction: column;
    // width: 100%;
    max-height: 70px;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .user-item {
    align-items: center;
    height: 30px;

    img {
      height: 24px;
      width: 24px;
      border-radius: 50%;
      margin-right: 15px;
      vertical-align: middle;
    }

    span {
      display: inline-block;
    }

    .username {
      width: 60px;
      overflow: hidden;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      -webkit-text-overflow: ellipsis;
      -moz-text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
    }

    .join-time {
      margin-right: 30px;
    }
  }
}
.load-more {
    width:100%;
    height:34px;
    font-size:12px;
    font-family:PingFangSC-Medium;
    font-weight:700;
    color:#9e9e9e;
    line-height:34px;
    padding-top:8px;
    text-align:center;
}

.prize-draw-list {
  color: #333;
  font-size: 12px;
  text-align: left;

  .users {
    padding: 1px 18px;
    background-color: #fff;
    //flex-direction: column;
    //width: 100%;
    //height: 100%;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .mr-bottom {
    margin: 10px 0px 70px 0px;
  }
  .user-item {
    width: 343px;
    height: 67px;
    background: rgba(255, 255, 255, 1);
    margin-top: 7px;
    border-bottom: 1px solid rgba(204, 204, 204, 0.24);

    img {
      height: 34px;
      width: 34px;
      border-radius: 50%;
      margin-right: 15px;
      position: relative;
      top: 17px;
      left: 22px;
    }

    span {
      display: inline-block;
    }

    .username {
      width: 127px;
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 14px;
      position: relative;
      top: -2px;
      left: 20px;
    }

    .draw-count {
      width: 166px;
      height: 18px;
      font-size: 12px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: #4a4a4a;
      line-height: 18px;
      position: relative;
      left: -127px;
      top: 17px;
      left: -108px;
      word-break: keep-all;
      white-space: nowrap;
    }

    .gray-text {
      width: 28px;
      height: 9px;
      font-size: 9px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(204, 204, 204, 1);
      line-height: 9px;
      position: relative;
      right: -270px;
      top: -17px;
    }
  }
}

.prize-user {
    width:100%;
    height:32px;
    font-size:12px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:#cccccc;
    line-height:32px;
    background:#fff;
    padding-top:8px;
    text-align:center;
}

.md-text {
  font-size: 12px;
}

.prize-luck {
  position: relative;
  top: 10px;
  left: 5px;
  color: #aaaaaa;
}

.free-text {
  font-size: 12px;
  .free-postion {
    position: relative;
    top: 4px;
  }
  .free {
    position: absolute;
    right: 93px;
    top: -10px;
    color: #f44336;
    width: 30px;
    height: 30px;
    font-size: 12px;
    font-weight: 500;
    font-family: PingFang SC, Helvetica Neue, Arial, sans-serif;
    text-align: center;
    box-sizing: border-box;
    padding: 0 3px;
    min-width: 10px;
    line-height: 14px;
    // border: 1px solid #fff;
    border-radius: 100px 100px 100px 0px;
    background-color: #ffee58;
    -webkit-transform: translateX(50%);
    transform: translateX(50%);
    -webkit-transform-origin: 100%;
    transform-origin: 100%;
  }
}

.border-user {
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.11);
  border-radius: 10px;
}
</style>