<template>
    <van-popup class="nocoin custom" v-model="showDiv">
      <div class="container">
        <div class="box-container">
            <div class="img">
              <img src="/static/images/no-coin.png" alt="">
            </div>
            <div class="text">囊中羞涩，邀请好友可免费获得5个金币哦</div>
            <div class="buttons">
              <span style="margin-right:10px" class="raise-button red" @click="pay">充值</span>
              <span class="raise-button orange" @click="helpUser">邀请好友</span>
          </div>
          </div>
      </div>
    </van-popup>
</template>

<script>
  export default {
    data() {
      return {
        showDiv: false
      }
    },
    methods: {
      open() {
          this.showDiv= true;
      },
      close() {
        this.showDiv = false;
      },
      pay() {
        this.$router.push('/user/pay');
      },
      helpUser(){
        this.showDiv = false;
        this.$emit('share');
      },
    },
  }
</script>

<style scoped lang="less">
  .nocoin {
    font-size: 16px;
    color: #000;
    .box-container {
      border-radius: 8px;
      background-color: #fff;
      overflow: hidden;
      padding: 20px 15px 25px;
    }
    .img {
      margin-bottom: 16px;
      img {
        width: 150px;
        height: 150px;
      }
    }
    .text {
      line-height: 1.5;
      // letter-spacing: 2px;
    }
    .buttons {
      margin-top: 20px;
    }
  }
</style>