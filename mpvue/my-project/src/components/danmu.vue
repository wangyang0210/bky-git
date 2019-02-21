<template>
  <div>
    <transition name="translate">
      <div v-if="danmuVisible" class="danmu-wrap">
        <img :src="danmuImg" alt="用户头像">
        <p><span>{{danmuUser}}</span><span>{{danmuActive}}</span><span>{{danmuGame}}</span></p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Danmu',
  data () {
    return {
      danmuVisible: false, //弹幕是否渲染，true为渲染
      danmuImg: require("/static/images/avatar.png"),
      danmuUser: "实例销毁之前调用。在这一步，实例仍然完全可用。",
      danmuTimer: null,
      danmuGame: '小凤凤',
      danmuActive: '参与',
    }
  },
  beforeDestroy(){
    clearTimeout(this.danmuTimer);
    this.danmuTimer = null;
  },
  methods: {
    render(imgUrl,user,active,game, ms) {
      clearTimeout(this.danmuTimer);
      ms = ms || 3000;
      this.danmuImg = imgUrl;
      this.danmuUser = user;
      this.danmuGame = game;
      this.danmuActive = active;
      this.danmuVisible = true;
      var _this = this;
      this.danmuTimer = setTimeout(() => {
        _this.danmuVisible = false;
        clearTimeout(_this.danmuTimer);
      }, ms)
    }
  }
}
</script>

<style scoped>
  .danmu-wrap {
    position: fixed;
    left: 0;
    /* left: -11.4rem; */
    top: 1.04rem;
    z-index: 1;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.45);
    height: 1.04rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 0.52rem;
    margin-left: 15px;
    margin-top: 35px;
  }

  .danmu-wrap img {
    width: 1.04rem;
    height: 1.04rem;
    border-radius: 0.52rem;
    /* -webkit-box-shadow: 0 0 0.1rem rgba(198, 198, 198, 0.6); */
    /* box-shadow: 0 0 0.1rem rgba(198, 198, 198, 0.6); */
    /*position: absolute;*/
    /* left: 0.1rem; */
    z-index: 2;
  }

  .danmu-wrap p {
    min-width: 3rem;
    max-width: 9.5rem;
    height: 1.04rem;
    line-height: 1.04rem;
    /*padding: 0 0.5rem 0 1.25rem;*/
    padding-right: 0.5rem;
    color:rgba(238,238,238,1);
    font-size: 0.44rem;
    text-align: left;
    border-bottom-right-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    /*margin-left: 0.75rem;*/
  }
  .danmu-wrap p span{
    display: inline-block;
    vertical-align: bottom;
    color:rgba(255,255,255,1);
    padding: 0 0.2rem;
    max-width: 2.39999993rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .translate-enter-active,.translate-leave-active {
    transition: all .5s cubic-bezier(0.4, 0, 1, 1);
  }
  .translate-enter-to,
  .translate-leave {
    left: 0;
    opacity: 1;
  }
  .translate-enter,
  .translate-leave-to {
    left: -10.56rem;
    opacity: 0;
  }
</style>
