<template>
  <div class="prize-list" v-if="list.length">
    <div class="prize-item flex hvCenter" v-for="item in list" @click="goDetail(item.game_id)" :key="item.game_id">
      <div class="flex">
        <img :src="item.cover + '?imageView2/2/w/150/h/150/interlace/1/q/95'" alt>
      </div>
      <div class="flex2">
        <h2 class="title">{{item.name}}</h2>
        <p>开奖时间：{{item.open_time}}</p>
        <p>答题时间：{{item.created_at}}</p>
        <p>您有
          <font color="red">{{item.times}}次</font>抽奖机会
        </p>
      </div>
      <div class="flex">
        <a href="javascript:;" class="ui-btn hover">查看</a>
      </div>
    </div>
  </div>
  <div class="empty-view" v-else>
    <img class="empty-img" src="/static/images/empty2.png" alt>
    <p class="img-text">您这里什么都没有哦</p>
    <img @click="goHome" class="empty-btn" src="/static/images/btn1.png" alt>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          game_id: 594,
          name: "【伊利安慕希】希腊风味常温酸奶香草味",
          cover:
            "http://images.ecdpower.net/image/jpt2nud4_5zwaztm9rmxn5c184ddbc0baa.png",
          created_at: 1550914106,
          times: 5,
          open_time: "2019.02.23 23:00:00"
        },
        {
          game_id: 589,
          name: "养乐多活菌型乳酸菌饮品100ml*20瓶",
          cover:
            "http://images.ecdpower.net/image/jsb57bp4_34xajzoltycr5c6b682b64d1c.jpg",
          created_at: 1550798633,
          times: 1,
          open_time: "2019.02.22 23:00:00"
        },
        {
          game_id: 590,
          name: "煎蛋迷你电煎锅煮早餐神器电器 ",
          cover:
            "http://images.ecdpower.net/image/jsb54fj4_1mukx2cj4bs45c6b67a4348d1.jpg",
          created_at: 1550798583,
          times: 10,
          open_time: "2019.02.22 23:00:00"
        }
      ]
    };
  },
  methods: {
    goHome() {
      mpvue.reLaunch({ url: "/pages/index/main" });
    }
  },
};
</script>

<style lang="less" scoped>
.empty-view {
  position: relative;
  left: 110px;
  font-size: 12px;
  color: #aaa;
  .empty-img {
    width: 141px;
    height: 109px;
    margin-top: 20%;
    margin-bottom: 30px;
  }
  .img-text {
    margin-left: 13px;
  }
  .empty-btn {
    margin-top: 15px;
    width: 86px;
    height: 28px;
    margin-left: 20px;
  }
}
.prize-list {
  padding: 16px;
  padding-top: 0;
}
.prize-item {
  width: 343px;
  height: 86px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.11);
  border-radius: 10px;
  margin-top: 20px;
}
.prize-item.prize-no {
  background: url("http://cache.wangyangyang.vip/prize_no.png");
  background-repeat: no-repeat;
  background-position: 287px -4px;
  background-size: 60px auto;
}
.prize-item.prize-get {
  background: url("http://cache.wangyangyang.vip/prize_get.png");
  background-repeat: no-repeat;
  background-position: 287px -4px;
  background-size: 60px auto;
}
.prize-item img {
  margin-left: 10px;
  width: 66px;
  height: 66px;
  margin-right: 20px;
  object-fit: cover;
  display: inline-block;
  border-radius: 10px;
}
.prize-item .title {
  font-size: 14px;
  color: #333;
  font-family: "PingFangSC-Medium";
  text-align: left;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  white-space: nowrap;
}
.prize-item .prize-title {
  width: 44px;
  height: 11px;
  font-size: 11px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(74, 74, 74, 1);
  line-height: 11px;
}
.prize-item p {
  font-size: 10px;
  text-align: left;
  margin-top: 7px;
}
.prize-item .ui-btn {
  background: #e13735;
  color: #fff;
  text-align: center;
  height: 20px;
  line-height: 20px;
  margin-right: 10px;
  font-size: 14px;
  padding: 5px 20px;
  border-radius: 30px;
}
</style>