<template>
    <van-popup class="game-rules custom" :show="showRules">
        <div class="container">
            <div class="top-header">
                <img src="/static/images/knot@3x.png" alt="">
            </div>
            <div class="box-container">
                <div class="first"></div>
                <div class="second">
                    <div class="title">金币获取攻略</div>
                    <div class="detail">
                        <!-- 答题 -->
                        <div class="detail-title">
                            <img src="/static/images/rule@3x.png" alt="">
                            方法一：登陆
                        </div>
                        <div class="detail-item">
                            <p>首次登入活动主页，即可获取<span class="gold-text">5个</span>金币</p>
                        </div>
                        <div class="detail-title">
                            <img src="/static/images/rule@3x.png" alt="">
                            方法二：邀请
                        </div>
                        <div class="detail-item">
                            <p>用户通过分享链接或二维码邀请好友，好友登录活动主页，则邀请成功，每成功邀请一位，即可获<span class="gold-text">10个</span>金币</p>
                            <!-- ，2位好友，获得<span class="gold-text">10+2个</span>金币，n位好友获得<span class="gold-text">10个</span>金币 -->
                        </div>
                        <div class="detail-title">
                            <img src="/static/images/rule@3x.png" alt="">
                            方法三：充值
                        </div>
                        <div class="detail-item">
                            <p>用户可通过“我的”-“充值”，进行充值</p>
                        </div>
                         <div class="detail-title">
                            <img src="/static/images/rule@3x.png" alt="">
                            方法四：关注公众号
                        </div>
                        <div class="detail-item">
                            <p>新用户关注公众号「百万智库达人」，即可获取<span class="gold-text">10个</span>金币</p>
                            <img  class="img" src="/static/images/3ec37d2fae58c3b1a6c21839799feeb.jpg" alt="">
                        </div>
                    </div>
                    <span class="iknow raise-button orange" @click="close">知道了</span>
                    <div class="hint">最终解释权归上海沉甸数字技术有限公司所有</div>
                </div>
            </div>
        </div>
    </van-popup>
</template>

<script>
    export default {
        data() {
            return {
                showRules: false
            }
        },
        methods: {
            open() {
                this.showRules = true;
            },
            close() {
                this.showRules = false;
            }
        },
    }
</script>

<style lang="less" scoped>
  .game-rules {

        color: #fff;
        font-size: 12px;
        text-align: center;
        /deep/.van-popup {
        background: none !important;
        }
        .top-header {
            position: relative;
            top: 10px;
            image {
                width: 210px;
                height: 65px;
            }
        }

        .first {
            width: 343px;
            height: 42px;
            border-radius: 8px;
            background: linear-gradient(to bottom, #F47979, #E54444);
        }

        .second {
            width: calc(100% - 30px);
            box-sizing: border-box;
            margin: 0 auto;
            padding: 16px 14px;
            padding-right: 10px;
            background: linear-gradient(to bottom, #F86D6D, #E13333);
            border-radius: 0 0 8px 8px;

            .detail {
                text-align: left;
                margin-bottom: 16px;
            }
            .detail-title {
                margin-top: 8px;
                margin-bottom: 8px;
                font-weight: bold;
                image {
                    width: 15px;
                    height: 15px;
                    margin-right: 5px;
                    vertical-align: text-top;
                }
            }
            .detail-item {
                line-height: 1.3;
            }
        }
        .title {
            font-size: 16px;
        }
        .hint {
            color: rgba(255,255,255,0.5);
            font-size: 10px;
            margin-top: 15px;
        }
        .iknow {
            font-size: 15px;
            width: 75px;
            height: 30px;
            line-height: 30px;
        }
        .gold-text {
            color: yellow;
        }
        .img {
            width:66px;
            height:66px;
            position: relative;
            left: 108px;
            top: 4px
        }
    }
</style>