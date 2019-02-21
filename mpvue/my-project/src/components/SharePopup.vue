<template>
    <van-popup v-model="shareUrls" id="shareUrls" overlay-class="share-bg" position="top" :overlay="true">
          <!-- <div class='popContainerShare'> -->
              <div class="point-img">
                  <img class="" src="/static/images/point.png">
                  <span>邀请好友一起参与活动，共同获得金币</span>
              </div>
          <!-- </div> -->
      </van-popup>
</template>

<script>
  export default {
    data() {
      return {
        shareUrls:false,
      }
    },
    methods: {
      open() {
          this.shareUrls= true;
      },
      close() {
        this.shareUrls = false;
      },
    },
  }
</script>

<style scoped lang="less">
#shareUrls{
  background: transparent;
  color:#fff;
  line-height: 1.22449rem;
}


  .point-img {
        margin-top: 0.8rem;
        margin-right: 1.2rem;
        margin-bottom: 4.081633rem;
    }

    .point-img img {
        width: 2.244898rem;
        float: right;
        padding-bottom:2.040816rem;
        position: absolute;
        right:1.836735rem;
    }

    .point-img span {
        margin-top: 2.653061rem;
        float: right;
        width: 7rem;
        margin-right:1.22449rem;
        font-size: 0.734694rem;
    }

</style>