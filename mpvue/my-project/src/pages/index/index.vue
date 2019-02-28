<template>
  <div>
    <!-- 顶部切换 -->
    <van-tabs class="custom" :active="active" color="#fff" :line-width="0">
      <!-- <van-tab v-for="tab in tabs" :key="tab.title">
        <div slot="title">
          {{tab.day}}
          <div class="status">{{tab.status}}</div>
        </div>
      </van-tab> -->
      <van-tab title="星期一">内容 1</van-tab>
      <van-tab title="星期二">内容 2</van-tab>
      <van-tab title="今天">内容 3</van-tab>
      <van-tab title="星期四">内容 4</van-tab>
      <van-tab title="星期五">内容 5</van-tab>
    </van-tabs>
    <div class="hint" @click="showHint()">
      <img src="/static/images/hint.png" alt>
    </div>
    <!-- <hint-popup ref="hint"></hint-popup> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 2,
      tabs: [
        {
          day: "1",
          date: "2019-02-25",
          status: "已结束"
        },
        {
          day: "2",
          date: "2019-02-26",
          status: "已结束"
        },
        {
          day: "3",
          date: "2019-02-27",
          status: "正在进行"
        },
        {
          day: "4",
          date: "2019-02-28",
          status: "即将开始"
        },
        {
          day: "5",
          date: "2019-03-01",
          status: "即将开始"
        }
      ]
    };
  }
};
</script>



<style lang="less" scoped>
.custom {
  position: flex;
  // padding-top: 56px;
  /deep/ .van-tabs__nav {
    height: 54px;
    background: linear-gradient(to right, #ff4825, #eb2d2d);
  }
  /deep/.van-tab {
    line-height: 1.4;
    padding-top: 10px;
    font-size: 16px;
    background-color: transparent;
    color: rgba(255, 255, 255, 0.4);
  }
  /deep/.van-tabs__wrap.van-tabs__wrap--scrollable {
    height: 56px;
    position: fixed;
    background: linear-gradient(to right, #ff4825, #eb2d2d);
  }
  /deep/.van-tabs__line {
    height: 0;
  }
  /deep/.status {
    font-size: 12px;
  }
  /deep/.van-tab--active {
    font-weight: 500;
    color: #fff !important;
  }
}

.list {
  position: absolute;
  top: 56px;
  bottom: 30px;
  width: 100%;
  -webkit-overflow-scrolling: touch;
}
.hint {
  position: absolute;
  left: 0;
  bottom: 90px;
  img {
    width: 65px;
    height: 32px;
  }
}
</style>

