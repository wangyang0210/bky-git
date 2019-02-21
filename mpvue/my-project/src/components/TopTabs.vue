<template>
    <van-tabs class="custom" v-model="active" color="#fff" :line-width="0" @change="onChange">
        <van-tab v-for="tab in tabs" :key="tab.title">
            <div slot="title">
                    {{tab.day|formatDay}}
                <div class="status">{{tab.status}}</div>
            </div>
        </van-tab>
    </van-tabs>
</template>

<script>
    import moment from 'moment';
    import { mapState, mapActions, mapGetters } from 'vuex'
    export default {
        data() {
            return {
                active: 2,
                tabs: []
            }
        },
        computed: {
            ...mapState({
                date: state=>state.games.date
            })
        },
        filters: {
            formatDay: function (value) {
                if (!value) return ''
                if (value == new Date().getDay()) return '今天';
                switch(value) {
                    case '0': return "周日";
                    case '1': return '周一';
                    case '2': return '周二';
                    case '3': return '周三';
                    case '4': return '周四';
                    case '5': return '周五';
                    case '6': return '周六';
                }
            }
        },
        methods: {
            createTabs() {
                // 今天的前两天
                for(var i = 1; i <= 2; i++) {
                    var d = moment().subtract(i, 'days');
                    this.tabs.unshift({
                        day: d.format('d'),
                        date: d.format('YYYY-MM-DD'),
                        status: '已结束'
                    })
                }
                this.tabs.push({
                    day: moment().format('d'),
                    date: moment().format('YYYY-MM-DD'),
                    status: '正在进行'
                })
                // 今天的后两天
                for(var i = 1; i <=2; i++) {
                    var d = moment().add(i, 'days');
                    this.tabs.push({
                        day:d.format('d'),
                        date: d.format('YYYY-MM-DD'),
                        status: '即将开始'
                    })
                }
            },
            onChange(index) {
                var date = this.tabs[index].date;
                this.$emit('changeTab', date);
                this.active = index;
            }
        },
        created() {
            this.createTabs();
            if(!this.date) return this.onChange(2);
            let index = _.findIndex(this.tabs, (item)=>{
                return item.date == this.date
            })
            this.onChange(index);
        },
        mounted() {

        }
    }
</script>

<style lang="less">
    .van-tabs.custom {
        padding-top: 56px;
        .van-tabs__nav {
            background: linear-gradient(to right,#FF4825,#EB2D2D);
        }
        .van-tab {
            line-height: 1.4;
            padding-top: 10px;
            font-size: 16px;
            background-color: transparent;
            color: rgba(255,255,255,0.4);
        }
        .van-tabs__wrap.van-tabs__wrap--scrollable {
            height: 56px;
            position: fixed;
        }
        .van-tabs__line {
            height: 0;
        }
        .status {
            font-size: 12px;
        }
        .van-tab--active {
            font-weight: 500;
            color: #fff !important;
        }
    }
</style>