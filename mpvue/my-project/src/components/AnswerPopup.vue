<template>
    <van-popup class="answer-page custom" v-model="showDiv" :close-on-click-overlay="false">
        <div class="container">
            <!-- 题目图片 -->
            <div class="top-header">
                <img v-if="current==1" src="/static/images/firstQ@3x.png" alt="">
                <img v-else-if="current==2" src="/static/images/secondQ@3x.png" alt="">
                <img v-else src="/static/images/thirdQ@3x.png" alt="">
            </div>
            <div class="box-container" v-if="question&&question.question">
                <van-circle
                v-model="percentage"
                :rate="percentage"
                color="#E13333"
                layer-color="#FFF2DE"
                size="60px"
                :stroke-width="60"
                :speed="2000"
                :text="remainTimeText"
                />
                <div class="title">{{current}}. {{question.question.question_title}}</div>
                <div class="answer">
                    <span class="answer-button" v-for="answer in question.question.answers" :key="answer.letter" @click="goAnswer(answer)" v-if="answer.question_txt">
                        <span class="white-line"></span>
                        <span class="white-dot"></span>
                        {{answer.letter}}. {{answer.question_txt}}
                    </span>
                </div>
                <div class="right">
                    {{current}}/{{totalNum}}
                </div>
            </div>
        </div>
    </van-popup>
</template>

<script>
    import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
    export default {
        data() {
            return {
                showDiv: false,
                percentage: 100,
                timer: ''
            }
        },
        computed: {
            remainTimeText() {
                return String(this.remainTime);
            },
            ...mapState({
                current: state=>state.answers.currentNum,
                remainTime: state=>state.answers.remainTime,
                question: state=>state.answers.questionDetail,
                totalNum: state=>state.answers.TOTAL_NUM,
                totalTime:state=>state.answers.TOTAL_TIME
            })
        },
        watch:{
            remainTime() {
                this.percentage = this.remainTime*100/this.totalTime;
                // 超时
                if(this.remainTime <= 0) {
                    this.clearTimer();
                    this.goResult({
                        status:'timeout'
                    });
                }
            }
        },
        methods: {
            open() {
                this.initData();
                this.getQuestion()
                    .then((res)=>{
                        if(res.data.question) {
                            // 成功
                            this.showDiv = true
                        } else {
                            this.$toast.fail("获取不到问题");
                        }
                    })
                    .catch((err)=>{
                        this.$toast.fail("出错了");
                    })
            },
            close() {
                this.showDiv = false;
            },
            goResult(data) {
                this.$emit('finish', data);
            },
            goAnswer(answer) {
                this.answerQueston(answer.letter)
                    .then(res=>{
                        if(res.data.error == 1) {
                            if(this.current == this.totalNum) {
                                this.goResult({
                                    status:'success',
                                    data: res.data});
                            } else {
                                return res;
                            }
                        } else {
                            this.goResult({
                                status:'fail',
                                data: res.data
                            });
                        }
                    })
                    .then(res=>{
                        if(!res) return;
                        return this.getQuestion()
                    })
                    .catch(err=>{
                        this.$toast.fail("出错了")
                    })
            },
            ...mapActions(['getQuestion', 'answerQueston']),
            ...mapMutations(['initData', 'countDown', 'clearTimer'])
        },
        beforeDestroy() {
            this.clearTimer();
        }
    }
</script>

<style lang="less" scoped>
    .van-pop.answer-page {
        color: #333;
        font-size: 16px;
    }
    .top-header {
        top: -22px;
        img {
            width: 172px;
        }
    }
    .box-container {
        border-radius: 8px;
        overflow: hidden;
        padding: 30px 20px 10px;
        background-color: #fff;
        color: #333;

        .van-circle .van-circle__text {
            font-size: 24px;
        }

        .title {
            margin-top: 15px;
            margin-bottom: 15px;
        }
        .right {
            text-align: right;
        }

        .answer {
            padding: 0 30px;
            span.answer-button {
                box-sizing: border-box;
                padding-left: 15px;
                padding-right: 15px;
                margin-bottom: 20px;
            }
        }
    }
</style>