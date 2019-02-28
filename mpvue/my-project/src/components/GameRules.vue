<template>
    <van-popup class="game-rules custom" v-model="showRules">
        <div class="container">
            <div class="top-header">
                <img src="../assets/images/knot@3x.png" alt="">
            </div>
            <div class="box-container">
                <div class="first"></div>
                <div class="second">
                    <div class="title">活动规则</div>
                    <div class="detail">
                        <!-- 答题 -->
                        <div class="detail-title">
                            <img src="../assets/images/rule@3x.png" alt="">
                            答题
                        </div>
                        <div class="detail-item">
                            <p>1. 答题一次消耗该场奖品所对应的金币数量</p>
                            <p>2. 答题过程中超时未作答或选错答案便终止答题</p>
                            <p>3. 每题有20秒选择时间，全部答对即可获得抽奖机会</p>
                            <!-- <p>4. 每个奖品最多可答题20次</p> -->
                            <p>4.抽奖机会越多中奖机会越大</p>
                        </div>
                        <div class="detail-title">
                            <img src="../assets/images/rule@3x.png" alt="">
                            开奖
                        </div>
                        <div class="detail-item">
                            <p>1. 关注公众号「百万智库达人」，我们会在第一时间内推送开奖结果</p>
                            <p>2.中奖结果可在“我的”-“奖品记录”中查看</p>
                        </div>
                        <div class="detail-title">
                            <img src="../assets/images/rule@3x.png" alt="">
                            领奖
                        </div>
                        <div class="detail-item">
                            <p>1.当您成为幸运中奖用户后，请尽快提交确认后的收货信息，超过3天未提交收货信息，将视为自动放弃该奖品，确认收货信息后，工作人员会在7个工作日内为您安排发货</p>
                            <p>2.中奖未关注公众号领取奖品一律无效</p>
                        </div>
                    </div>
                    <span class="iknow raise-button orange" @click="clickBtn">知道了</span>
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
                showRules: false,
                // rules: [{
                //     title: '答题',
                //     list: ['答题一次消耗该场奖品所对应的金币数', '答题过程中超时未作答或选错答案便终止答题', '每题有10秒选择时间，全部答对即可获得抽奖机会', '每个奖品最多可答题5次']
                // }, {
                //     title: '抽奖',
                //     list: ['每日20:00开奖', '获奖用户在获得抽奖机会的用户中随机抽出', '用户需关注公众号填写收货地址方可领取奖品']
                // }]
            }
        },
        methods: {
            openRules() {
                this.showRules = true;
            },
            clickBtn() {
                this.showRules = false;
            }
        },
    }
</script>

<style lang="less" scoped>
    .van-popup.game-rules {

        color: #fff;
        font-size: 12px;

        .top-header {
            top: -50px;

            img {
                width: 216px;
            }
        }

        .first {
            width: 100%;
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
                img {
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

    }
</style>