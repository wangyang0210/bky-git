<template>
    <van-popup class="loterry custom" v-model="showDiv" :close-on-click-overlay="true">
        <!-- 恭喜你 -->
        <!-- <div>{{closeOnDiv}}</div> -->
        <div class="container" v-if="success">
            <div class="bg-light">
                <img src="/static/images/light.png" alt="">
            </div>
            <div class="top-header">
                <img src="/static/images/congrad@3x.png" alt="">
            </div>
            <div class="box-container">
                <div class="red-part">
                    <!-- title插槽 -->
                        <div>恭喜您抽中了{{detail.gift_name}}</div>

                    <div class="prize-img">
                        <img v-if="detail.gift_img" :src="detail.gift_img" alt="">
                        <img v-else src="/static/images/tissue@3x.png" />
                    </div>
                    <div v-if="detail.open_time">开奖时间：{{detail.open_time}}</div>
                </div>
                <div class="white-part">
                    <!-- buttons -->
                    <div class="buttons" style="margin-bottom:10px">
                            <span style="margin-right:10px" class="raise-button red" @click="getPrize">立即领取</span>
                            <span class="raise-button orange" @click.stop="share">得瑟一下</span>
                    </div>
                    <small class="hint"></small>
                </div>
            </div>
        </div>
        <!-- 很遗憾 -->
        <div class="container" v-else>
            <div class="top-header">
                <img src="/static/images/sad@3x.png" alt="">
            </div>
            <div class="box-container">
                <div class="red-part fail">
                        <div>您与奖品只有一步之遥</div>
                </div>
                <div class="fail-img">
                    <img src="/static/images/cry@3x.png" />
                </div>
                <div class="white-part fail">
                        <div>听说乐于分享的人运气会更好哦</div>
                    <!-- buttons 插槽 -->
                    <div class="buttons" style="margin-top:10px">
                            <span style="margin-right:10px" class="raise-button red">看看其他奖品</span>
                            <span class="raise-button red">获得更多金币</span>
                    </div>
                </div>
            </div>
        </div>
    </van-popup>
</template>

<script>
    export default {
        data() {
            return {
                detail:{},
                showDiv: false,
                success: false
            }
        },
        methods: {
            open(data, success) {
                this.success = success || false;
                this.detail = data;
                this.showDiv = true;
            },
            close() {
                this.showDiv = false;
            },
            getPrize() {
                this.$emit("getPrize")
            },
            share(){
                this.showDiv = false;
                this.$emit('share');
            }
        }

    }
</script>

<style lang="less" scoped>
    .van-popup.loterry {
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

        .bg-light img{

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
                    max-width: 100%;
                    object-fit:cover;
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
</style>