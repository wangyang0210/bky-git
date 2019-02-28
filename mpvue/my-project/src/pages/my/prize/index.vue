<template>
    <div v-if="list.length">
        <div class="prize-list">
            <div class="prize-item flex hvCenter" v-for="item in list" :class="[{'prize-no':item.status==0},{'prize-get':item.status==1}]">
                <div class="flex">
                    <img src="/static/images/tissue@3x.png" alt="">
                </div>
                <div class="flex2">
                    <h2 class="title">{{item.name}}</h2>
                    <p>开奖时间：{{item.open_time}}</p>
                    <p>参与时间：{{item.created_at|time}}</p>
                </div>
                <div class="flex" v-if="item.status==2">
                    <a href="javascript:;" class="ui-btn hover" @click.stop="openAddressList(item)">领奖</a>
                </div>
            </div>
             <span class="raise-button red" @click.stop="goHome">查看今日奖品场</span>

        </div>

        <my-address ref="addressList" @selectFinished="selectAddress" ></my-address>
    </div>
    <div class="empty-view" v-else>
        <img class="empty-img" src="/static/images/empty1.png" alt="">
        <div class="img-text">空空如也，快去商品场看看吧</div>
        <img @click="goHome" class="empty-btn" src="/static/images/btn1.png" alt="">
    </div>
</template>
<script>
   export default {
      data() {
         return {
               list:[
                   {
                    "game_id":199,
                    "status":2,
                    "img":"http://cache.wangyangyang.vip/tissue@3x.png",
                    "name":"500元京东购物卡",
                    "created_at":1542017032,
                    "open_time":"2018.11.12",
                    "prize_status":1
                },
                {
                    "game_id":200,
                    "status":1,
                    "img":"http://cache.wangyangyang.vip/tissue@3x.png",
                    "name":"100元京东卡",
                    "created_at":1542013913,
                    "open_time":"2018.11.12",
                    "prize_status":1
                },
                 {
                    "game_id":199,
                    "status":0,
                    "img":"http://cache.wangyangyang.vip/tissue@3x.png",
                    "name":"500元京东购物卡",
                    "created_at":1542117032,
                    "open_time":"2018.12.12",
                    "prize_status":1
                }
                  
            ],
            status:1,
         }
      },
      methods: {
         goHome() {
               mpvue.reLaunch({url:'/pages/index/main'})
         }
      },
   }
</script>

<style lang="less" scoped>
    .raise-button {
        margin-top: 20px;
        width: 100%;
        font-size: 14px;
        text-align: center;
    }
    .flat-button {
        margin-top: 20px;
        font-size: 14px;
    }
    .empty-view {
        position: relative;
        font-size: 12px;
        color: #aaa;
        left:128px;
        .empty-img {
            margin-left: 10px;
            width: 103px;
            height: 117px;
            margin-top: 20%;
            margin-bottom: 30px;
        }
        .img-text {
           margin-left:-21px;
        }
        .empty-btn {
            margin-top: 15px;
            margin-left:12px;
            width: 86px;
            height: 28px;
        }
    }
    .prize-list{
        padding: 16px;
        padding-top: 0;
    }
    .prize-item{
        width:343px;
        height:86px;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 4px 0px rgba(0,0,0,0.11);
        border-radius:10px;
        margin-top: 20px;
    }
    .prize-item.prize-no{
        background: url("http://cache.wangyangyang.vip/prize_no.png");
        background-repeat: no-repeat;
        background-position: 287px -4px;
        background-size: 60px auto;
    }
    .prize-item.prize-get{
        background: url("http://cache.wangyangyang.vip/prize_get.png");
        background-repeat: no-repeat;
        background-position: 287px -4px;
        background-size: 60px auto;
    }
    .prize-item img{
        margin-left: 10px;
        width: 66px;
        height: 66px;
        margin-right: 20px;
        object-fit: cover;
        display: inline-block;
        border-radius: 10px;
    }
    .prize-item .title{
        font-size: 14px;
        color:#333;
        font-family: "PingFangSC-Medium";
        text-align: left;
    }
    .prize-item p{
        font-size: 10px;
        text-align: left;
        margin-top: 10px;
    }
    .prize-item .ui-btn{
        background: #E13735;
        color:#fff;
        text-align: center;
        height: 20px;
        line-height: 20px;
        margin-right: 10px;
        font-size: 14px;
        padding: 5px 20px;
        border-radius: 30px;
    }
</style>