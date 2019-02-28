<template>
    <van-popup class="custom result" v-model="showResult" :close-on-click-overlay="true">

        <!-- 恭喜你 -->
        <div class="container" v-if="status=='success'">
            <div class="bg-light">
                <img src="../assets/images/light.png" alt="">
            </div>
            <div class="top-header">
                <img src="../assets/images/congrad@3x.png" alt="">
            </div>
            <div class="box-container">
                <div class="red-part">
                    喜得 <span class="yellow-text large-text">{{result.prize_time}}</span> 次抽奖机会
                    <br />
                   <!--  <span>
                        本场还有 <span class="yellow-text large-text">{{result.remain_time}}</span> 次答题机会哦
                    </span> -->
                    <div class="prize-img">
                         <span @click.stop="toBuy"><img v-if="result.gift_img&&result.is_subscribe" :src="result.gift_img" alt=""></span>
                        <img v-if="!result.is_subscribe" src="../assets/images/qrcode.png" alt="">
                        <!-- <img v-else src="../assets/images/tissue@3x.png" /> -->
                    </div>
                    <div v-if="result.open_time&&result.is_subscribe">开奖时间：{{result.open_time}}</div>
                    <!-- 未关注 -->
                    <div v-if="!result.is_subscribe">扫码关注公众号，第一时间接收开奖结果</div>
                </div>
                <div class="white-part">
                    <!-- buttons -->
                    <div class="buttons" style="margin-bottom:10px">
                        <div class="buttons" style="margin-top:10px">
                            <span style="margin-right:10px" class="raise-button red" @click="again()">
                                <img class="gold" src="../assets/images/gold3@3x.png" alt="">
                                <span class="yellow-text">{{result.use_gold}}</span>
                                再接再厉
                            </span>
                            <span class="raise-button red" @click="goHome">其他奖品</span>
                            <span class="raise-button orange" @click="share">
                                <img src="../assets/images/back@3x.png" alt="">
                            </span>
                        </div>
                    </div>
                    <small class="hint">邀请好友共同参与，还能获得更多金币哦</small>
                </div>
            </div>
        </div>
        <!-- 很遗憾 -->
        <div class="container" v-else>
            <div class="top-header">
                <img src="../assets/images/sad@3x.png" alt="">
            </div>
            <div class="box-container">
                <div class="red-part fail">
                    <div class="title" v-if="status=='fail'">
                        本次您一共答对
                        <br />
                        <span class="large-text">{{result.base_game_answer}} 题</span>
                    </div>
                    <div class="title" v-else>
                        <span class="large-text">时间不等人</span>
                    </div>
                </div>
                <div class="fail-img">
                    <img src="../assets/images/cry@3x.png" />
                </div>
                <div class="white-part fail">
                    离获得抽奖机会只剩
                    <span class="red-text large-text">{{totalNum-rightNum}}</span> 题
                    <div class="buttons" style="margin-top:10px">
                        <span style="margin-right:10px" class="raise-button red" @click="again()">
                            <img class="gold" src="../assets/images/gold3@3x.png" alt="">
                            <span class="yellow-text">{{gold}}</span>
                            再接再厉
                        </span>
                        <span class="raise-button red" @click="goHome">其他奖品</span>
                        <span class="raise-button orange" @click="share">
                            <img src="../assets/images/back@3x.png" alt="">
                        </span>
                    </div>
                    <small class="hint">邀请好友共同参与，还能获得更多金币哦</small>
                </div>
            </div>
        </div>
    </van-popup>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        computed: {
            ...mapState({
                totalNum: state=>state.answers.TOTAL_NUM,
                gold: state=>state.games.gameDetail.gift_info.use_gold,
                rightNum: state=>state.answers.rightAnswerNum,
                detail: state => state.games.gameDetail
            }),
        },
        data() {
            return {
                status: '',
                result: {},
                showResult: false
            }
        },
        methods: {
            open(status, result) {
                // console.log(status,'status')
                this.status = status;
                console.log(result,'result')
                this.result = result || {};
                this.showResult = true;
            },
            toBuy() {
                if (this.detail.gift_info.url) {
                    window.location.href = this.detail.gift_info.url;
                } else {
                    this.$toast("商家正在备货中..");
                }
            },
            close() {
                this.showResult = false;
            },
            goHome() {
                this.$router.replace('/home');
            },
            share(){
                // Toast("点击右上角 “...” 发送给好友");
                this.$emit('share');
            },
            again() {
                // this.close();
                this.$emit("playAgain");
            }
        }
    }
</script>

<style scoped lang="less">
    .van-popup.result {
        color: #fff;
        font-size: 16px;

    }
    .container {

        .top-header {
            top: -25px;
            img {
                width: 160px;
            }
        }

        .box-container {
            border-radius: 8px;
            overflow: hidden;
        }


        .red-part {
            background: linear-gradient(to right, #E13333 , #E96C54);
            padding-top: 40px;
            padding-bottom: 10px;

            &.fail {
                padding-bottom: 67px;
            }

            .prize-img {
                height: 108px;
                width: 108px;
                border-radius: 4px;
                overflow: hidden;
                margin: 10px auto;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .white-part {
            background: #fff;
            padding-top: 15px;
            padding-bottom: 20px;
            color: #000;

            &.fail {
                padding-top: 61px;
            }
        }

        .fail-img {
            position: absolute;
            width: 100%;
            margin: -54px auto;
            img{
                height: 108px;
                width: 108px;
            }
        }
        .hint {
            display: block;
            color: #ccc;
            font-size: 12px;
            margin-top: 15px;
        }
    }
    .yellow-text {
        color: yellow;
    }

    .large-text {
        font-size: 22px;
    }

    .red-text {
        color: red;
    }

    .raise-button {
        &.red {
            width: 110px;
            margin-right: 10px;
        }
        &.orange {
            width: 50px;
            img {
                width: 20px;
                height: 20px;
                vertical-align: middle;
            }
        }
    }
    img.gold {
        height: 18px;
        width: 18px;
        margin-right: 3px;
        vertical-align: middle;
    }
</style>