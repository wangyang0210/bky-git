<template>
    <van-tabbar v-model="active" style="z-index:999">
        <van-tabbar-item v-for="(tab, i) in tabs" :key="i" :icon="tab.icon" :to="{path:tab.path,query:{invite_uid:invite_uid}}" :replace="true">{{tab.label}}</van-tabbar-item>
    </van-tabbar>
</template>

<script>
    export default {
        data() {
            return {
                active:0,
                invite_uid:0,
                tabs:[{
                    label: '奖品场',
                    icon: 'point-gift',
                    path: '/home',

                    pathName: 'home'
                }, {
                    label: '发起抽奖',
                    icon: 'add-o',
                    path: '/draw',
                    pathName:'draw'
                },{
                    label: '我的',
                    icon: 'contact',
                    path: '/my',
                    pathName:'my'
                }]
            }
        },
        watch: {
            $route(to,from) {
                this.setActive(to.name);
            }
        },
        methods: {
            setActive(routeName) {
                let index = _.findIndex(this.tabs, {'pathName':routeName});
                this.active = index;
            }
        },
        created() {
            if (this.$route.query.invite_uid) {
                this.invite_uid = this.$route.query.invite_uid;
            }
            let routeName = this.$route.name;
            this.setActive(routeName);
        }
    }
</script>

<style scoped>
    .van-tabbar-item {
        color: #9b9b9b;
    }
    .van-tabbar-item--active {
        color: #E55044;
    }
    .van-tabbar-item__icon {
        font-size: 20px;
    }
</style>