<template>
    <!-- <div class="list-page"> -->
    <van-pull-refresh class="list-page" v-model="loading" @refresh="onRefresh">
        <div v-if="list.length" class="prize-item2" v-for="item in list" :key="item.id">
            <!-- 未结束 -->
            <div v-if="item.is_end!=0||item.is_prize!=1">
                <div class="card"  @click="clickItem(item)">
                    <div class="main-info">
                        <img :src="item.img" />
                        <!-- 未开始 -->
                        <div class="time" v-if="item.is_end==1">
                            开始时间：{{item.start_time|formatDate}}-{{item.end_time|formatDate}}
                        </div>
                        <div class="time" v-else>
                            距离开奖时间只剩 {{item.open_time|countdown(now)}}
                        </div>
                        <div class="title">
                            {{item.name}}
                        </div>
                    </div>
                    <div class="other-info">
                        <div class="line first-line">
                            <span>价值：
                                <span class="red-text">￥
                                    <span class="text-num">{{item.money}}</span>
                                </span>
                            </span>
                            <span>奖品总数：
                                <span class="red-text text-num">{{item.num}}</span>
                            </span>
                            <span class="right">
                                <span class="avatar-item" v-for="user in item.userinfo" :key="user.uid">
                                    <img :src="user.avatar" alt="">
                                </span>
                            </span>
                        </div>
                        <div class="line">
                            <span class="gold-text">
                                <img class="gold" src="../assets/images/gold@3x.png" alt="">{{item.use_gold}}
                            </span>
                            <span class="right grey-text">{{item.user_count||item.played}}人{{item.is_end==1?'关注奖品':'正在参与'}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 已结束 -->
            <div v-else>
                <div class="card"  @click="clickItem(item)">
                    <div class="main-info">
                        <img :src="item.img" />
                        <div class="mask">
                            {{item.played}}人
                            <br />
                            参与答题
                        </div>
                        <div class="title">
                            {{item.name}}
                        </div>
                    </div>
                    <div class="other-info">
                        <div class="line grey-text">
                            <span>价值：￥
                                    <span class="text-num">{{item.money}}</span>
                            </span>
                            <span>
                                <img class="gold" src="../assets/images/gold2@3x.png" alt="">
                                <span class="text-num">{{item.use_gold}}</span>
                            </span>
                            <span class="right">
                                奖品总数：
                                <span class="text-num">{{item.num}}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="winner-list" v-if="item.played!=0">
                    <div>中奖名单</div>
                    <div class="users">
                        <div class="user-item" v-for="user in item.userinfo" :key="user.uid">
                            <img :src="user.avatar" alt="">
                            <span class="username">{{user.username}}</span>
                            <span class="join-time">参与时间：{{user.created_time|formatDate}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="hint">加载完毕</div>
    </van-pull-refresh>
    <!-- <div v-else>暂无数据</div> -->
    <!-- </div> -->
</template>

<script>
    import moment from 'moment';
    export default {
        data() {
            return {
                loading: true,
                now: '',
                timer: null
            }
        },
        filters: {
            formatDate: function(value) {
                if(!value) return '';
                return moment(new Date(value * 1000)).format('MM-DD HH:mm');
            }  
        },
        props: {
            list:{
                type: Array,
                default:()=>[]
            },
            refreshMethod: {
                type: Function
            }
        },
        methods: {
            hideLoading() {
                this.loading = false;
            },
            startLoading() {
                this.loading = true;
            },
            onRefresh() {
                // this.$emit('refresh');
                this.refreshMethod()
                    .finally(()=>{
                        setTimeout(() => {
                            this.hideLoading();
                        }, 800);
                    })
            },
            clickItem(item) {
                this.$emit('clickItem',item);
            },
            setNow() {
                this.now = Date.now();
            }

        },
        created() {
             this.timer = setInterval(()=>{
                this.setNow();
            }, 1000)
            this.setNow();
        },
        beforeDestroy() {
            if(this.timer) {
                // console.log('aaa')
                clearInterval(this.timer)
            }
        }
    }
</script>

<style>
    .list-page .van-pull-refresh__track {
        min-height: 100%;
    }
</style>
<style scoped lang="less">

    .list-page {
        box-sizing: border-box;
        padding: 20px 16px;
        padding-bottom: 40px;
        height: 100%;
        overflow: auto;
        color: #aaa;
        .hint {
            font-size: 14px;
        }
    }
    .prize-item2 {
        margin-bottom: 20px;
    }
    .card {
        border-radius: 10px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        position: relative;
        overflow: hidden;

        .main-info {
            position: relative;
            height: 173px;
            overflow: hidden;
            img {
                // position: absolute;
                width: 100%;
                min-height: 100%;
                // top: 50%;
                // left: 50%;
                // transform: translate(-50%, -50%);
            }
        }

        .time {
            position: absolute;
            top: 0;
            right: 0;
            padding: 7px 9px;
            color: #fff;
            border-top-right-radius: 10px;
            border-bottom-left-radius: 10px;
            background-color: rgba(0,0,0,.2);
            font-size: 12px;
            line-height: 17px;
        }

        .mask {
            position: absolute;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            top: 0;
            padding-top: 15%;
            left: 0;
            background: rgba(0,0,0,.4);
            color: #fff;
            font-size: 22px;
            font-weight: bold;
        }

        .title {
            position: absolute;
            box-sizing: border-box;
            line-height: 1.3;
            width: 100%;
            text-align: left;
            color: #fff;
            font-size: 16px;
            font-weight: bold;
            bottom: 0;
            padding: 10px 15px;
            background: linear-gradient(RGBA(92, 92, 92, 0.02), RGBA(43, 43, 43, 0.53));
        }

        .other-info {
            padding: 9px 12px;
            color: #333;
            font-size: 11px;
            text-align: left;
            .red-text {
                color: red;
            }
            .grey-text {
                color: #9b9b9b;
            }
            .gold-text {
                color: #F5A623;
            }
            .text-num {
                font-size: 15px;
            }
            .line {
                & > span {
                    display: inline-block;
                    // width: 33%;
                    margin-right: 15px;

                    &:last-child {
                        margin-right: 0;
                    }
                }
            }

            .first-line {
                height: 26px;
            }

            .avatar-item {
                position: relative;
                // right: 0;
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
                    max-width: 100%;
                    object-fit:cover;
                }
            }

            .gold {
                width: 10px;
                height: 10px;
                margin-right: 5px;
            }

            .right {
                float:right;
                text-align: right;
            }
        }
    }

    .winner-list {
        color: #333;
        font-size: 12px;
        text-align: left;
        padding: 10px;

        .users {
            margin-top: 15px;
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
                overflow:hidden;
                text-overflow:ellipsis;
                -o-text-overflow:ellipsis;
                -webkit-text-overflow:ellipsis;
                -moz-text-overflow:ellipsis;
                white-space:nowrap;
                vertical-align: middle;
            }

            .join-time {
                margin-right: 30px;
            }
        }
    }
</style>