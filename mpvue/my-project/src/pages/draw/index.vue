<template>
  <div class="draw-view">
    <div class="draw-head">
      <div class="text-area">
         选择奖品 <span class="iconfont icon-jiantour"> </span> 获奖者地址 <span class="iconfont icon-jiantour"></span> 包邮送到家
      </div>
      <div class="opera" >操作指南</div>
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
                adjust-position="true"
                input-align="right"
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
                adjust-position="true"
                input-align="right"
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
                adjust-position="true"
                input-align="right"
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
                adjust-position="true"
                input-align="right"
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
                adjust-position="true"
                input-align="right"
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
                adjust-position="true"
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
  }
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
      line-height:50px;
      margin:0 15px;
    }
    .opera {
      color:#fff;
      width:60px;
      height:20px;
      line-height:20px;
      border:2rpx solid #fff;
      border-radius:10px;
      position:relative;
      right:-290px;
      top:-35px;
      padding-left:10px;
    }
  }
  .prize-set {
    width: 100%;
    position: absolute;
    font-size: 14px;
    background-color: #f5f5f5;
    overflow-x: hidden;
    .text-postion {
      line-height: 80px;
      position: relative;
      left: 15px;
    }
    .img {
      position:relative;
      width:685rpx;
      height:170px;
      background:url("http://cache.wangyangyang.vip/draw.png") no-repeat;
      background-size:100%;
      top:-14px;
      // border-radius:10px;
      left:15px;
    }

    .img-text {
      font-size:14px;
      color:#ccc;
      width:94px;
      height:29px;
      line-height:29px;
      border:2rpx solid #ccc;
      border-radius:20rpx;
      position:relative;
      z-index:99;
      left:233px;
      padding-left:10px;
      top:4.5px;
    }
    .form-area {
      width: 100%;
      bottom: 1.88rem;
      .form-wrap {
        width: 340px;
        position: relative;
        left: 20px;
        .form-item {
          width: 100%;
          height: 50px;
          margin: 5px 0;
          border-radius: 10px;
          background-color: #fff;
        /deep/.van-cell {
            width: 240px !important;
            position: static !important;
          }
          .label-text {
            font-size: 16px;
            display: inline-block;
            width: 300px;
            height: 50px;
            text-align: left;
            line-height: 48px;
            padding-left:10px;
          }
          .input {
            position: relative;
            top: -47px;
            right: -77px;
          }
  
        }
      }
      .submit-btn {
        width:645rpx;
        height:72rpx;
        line-height:72rpx;
        -webkit-border-radius:60rpx;
        -moz-border-radius:60rpx;
        border-radius:60rpx;
        background-color:#ff5d5d;
        margin:60rpx 60rpx;
        font-size:35rpx;
        text-align:center;
        color:#fff;
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