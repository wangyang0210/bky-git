<template>
  <div class="draw-view">
    <div class="draw-head">
      <div class="text-area">
        选择奖品<i class="iconfont icon-jiantour"></i>获奖者地址<i class="iconfont icon-jiantour"></i> 包邮送到家
      </div>
      <div class="opera" @click="operaManual">操作指南</div>
    </div>
    <div class="prize-set">
      <span class="gray-text text-postion">设置奖品</span>
      <div class="img">
        <div class="img-text">更改奖品图片</div>
      </div>
      <div class="form-area">
        <div class="form-wrap">
          <van-cell-group name="form-list">
            <div class="form-item">
              <label class="label-text" for="prizeName">奖品名称</label>
              <van-field
                class="input"
                id="prize"
                name="prizeName"
                v-model="contactFormData.prizeName"
                placeholder="请输入奖品名称"
              />
            </div>
            <div class="form-item">
              <label class="label-text" for="prizeNumber">奖品数量</label>
              <van-field
                class="input"
                id="prizeNumber"
                name="prizeNumber"
                type="number"
                v-model="contactFormData.prizeNumber"
                placeholder="请输入奖品数量"
                onkeyup = "value=value.replace(/[^0-9]/g,'')"
                onpaste = "value=value.replace(/[^0-9]/g,'')"
                oncontextmenu = "value=value.replace(/[^0-9]/g,'')"
              />
            </div>
            <div class="form-item">
              <label class="label-text" for="userName">联系人</label>
              <van-field
                class="input"
                id="userName"
                name="userName"
                v-model="contactFormData.userName"
                placeholder="请输入姓名"
              />
            </div>
            <div class="form-item">
              <label class="label-text" for="mobile">联系电话</label>
              <van-field
                class="input"
                id="mobile"
                name="mobile"
                type="number"
                v-model="contactFormData.mobile"
                placeholder="请输入联系电话"
                maxlength="11"
              />
            </div>
            <div class="form-item">
              <label class="label-text" for="goodsLink">商品链接</label>
              <van-field
                class="input"
                id="goodsLink"
                name="goodsLink"
                v-model="contactFormData.goodsLink"
                placeholder="请输入商品链接"
              />
            </div>
            <div class="form-item h200">
              <label class="label-text" for="prize">备注信息</label>
              <van-field
                class="input-big"
                type="textarea"
                id="remark"
                name="remark"
                v-model="contactFormData.remark"
                rows="2"
                autosize
                placeholder="请输入备注信息"
              />
            </div>
          </van-cell-group>
          <!--</form>-->
        </div>
        <div class="submit-btn" @click="submitContactFormData">发起抽奖</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      invite_uid: 0,
      contactAllow: false,
      file: null,
      contactFormData: {
        prizeName: '',
        prizeNumber: '',
        userName: '',
        mobile: '',
        goodsLink: '',
        remark: ''
      }
    }
  },
  methods: {
    operaManual () {
      window.location.href="https://www.baidu.com";
    }
  },
}
</script>
<style scoped>
html {
  background: rgba(245, 245, 245);
  height: 100%;
}
</style>
<style lang="less" scoped>
.draw-view {
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
  .draw-head {
    position: relative;
    width: 100%;
    height: 50px;
    color: rgb(254, 235, 18);
    font-size: 12px;
    background: #ff2f47;
    .text-area {
      position: relative;
      width: 250px;
      .iconfont {
        width: 20px;
      }
    }
    .opera {
      color: #fff;
      width: 60px;
      height: 20px;
      line-height: 20px;
      border: 1px solid #fff;
      border-radius: 10px;
      position: relative;
      right: -300px;
      top: -35px;
    }
  }
  .prize-set {
    width: 100%;
    position: absolute;
    font-size: 14px;
    background-color: #f5f5f5;
    .text-postion {
      // width:280px;
      line-height: 80px;
      position: relative;
      left: -145px;
    }
    .img {
      position: relative;
      width: 340px;
      height: 170px;
      background-image: url(/static/images/draw.png);
      background-size: 100%;
      background-repeat: no-repeat;
      // left: 18px;
      top: -14px;
    }
    /deep/.img-inputer--light {
      border: none !important;
    }
    /deep/.img-inputer__placeholder {
      opacity: 0 !important;
    }
    /deep/.img-inputer--light .img-inputer__icon {
      opacity: 0;
    }
    /deep/.img-inputer__file-name {
      opacity: 0;
    }
    /deep/.img-inputer__change {
      opacity: 0;
    }

    .img-text {
      font-size: 0.48rem;
      color: #ccc;
      width: 4rem;
      height: 1.2rem;
      line-height: 1.2rem;
      border: 1px solid #ccc;
      border-radius: 0.24rem;
      position: relative;
      left: 10.1rem;
      top: -7.4rem;
      z-index: 99;
    }
    .form-area {
      width: 100%;
      position: relative;
      bottom: 1.88rem;
      .form-wrap {
        width: 340px;
        position: relative;
        left: 20px;
        .van-cell-group {
          background-color: #f5f5f5 !important;
        }
        .form-item {
          width: 100%;
          height: 50px;
          margin: 5px 0;
          border-radius: 10px;
          background-color: #fff;
          .label-text {
            font-size: 16px;
            display: inline-block;
            width: 300px;
            height: 50px;
            text-align: left;
            line-height: 48px;
          }
          .input {
            position: relative;
            width: 180px;
            top: -47px;
            right: -151px;
          }
          .input-big {
            width: 100%;
            position: absolute;
            // top: -80px;
            height: 89px;
          }
        }
      }
      /deep/.form-item .van-field__control {
        font-size: 0.48rem;
        text-align: right;
      }
      /deep/.form-item .input-big .van-field__control {
        font-size: 0.48rem;
        text-align: left;
      }
      .submit-btn {
        width: 14rem;
        height: 1.5rem;
        line-height: 1.5rem;
        -webkit-border-radius: 0.6rem;
        -moz-border-radius: 0.6rem;
        border-radius: 0.6rem;
        background-color: #ff5d5d;
        // margin: 0.6rem auto 0;
        margin: 0.6rem 0.6rem;
        font-size: 0.55rem;
        text-align: center;
        color: #fff;
      }
      .submit-btn:active {
        background-color: #ff4346;
      }
    }
  }
  .gray-text {
    color: rgb(175, 175, 175);
  }
  .h200 {
    height: 150px !important;
  }
}
</style>