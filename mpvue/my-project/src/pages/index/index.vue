<template>
  <div>
    <!-- 顶部切换 -->
    <top-tabs @changeTab="changeDate"></top-tabs>
    <div class="list" v-for="d in getAllDates" :key="d" v-show="d==date">
      <prize-list :list="allGames[d]" :refreshMethod="getAllGames" @clickItem="clickItem"></prize-list>
    </div>
    <div class="hint" @click="showHint()">
      <img src="/static/images/hint.png" alt>
    </div>
    <hint-popup ref="hint"></hint-popup>
  </div>
</template>
<script>
import TopTabs from "@/components/TopTabs";
import HintPopup from "@/components/HintPopup";
export default {
  data() {
    return {

    };
  },
   components: {
    "top-tabs": TopTabs,
    "hint-popup": HintPopup
  },
  methods: {
     showHint() {
      this.$refs.hint.open();
    },
    openGameRules() {
      this.$refs.rules.openRules();
    },
    changeDate(date) {
      this.$store.commit({
        type: "setCurrentDate",
        date: date
      });
    },
  },
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

