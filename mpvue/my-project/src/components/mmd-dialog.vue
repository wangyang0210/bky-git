<template>
  <transition name="dialog-fade">
    <div class="mmd-dialog-mask" :style="{'z-index': zIndex}" v-show="showMmdDialog">
      <div class="mmd-dialog-wrapper">
        <div class="mmd-dialog-header">
          <div class="mmd-dialog-title">{{title}}</div>
          <div class="mmd-dialog-close" @click="closeMmdDialog"></div>
        </div>
        <div class="mmd-dialog-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'MmdDialog',
  props: {
    value: {},
    title: {
      type: String,
      default: "提示信息"
    },
    zIndex: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      showMmdDialog: false
    }
  },
  mounted(){
    this.showMmdDialog = this.value;
  },
  watch:{
    value(newVal, oldVal){
      this.showMmdDialog = newVal;
    },
    showMmdDialog(val) {
      this.$emit("input", val);
      if(val === false){
        console.log("closeclosecloseclosecloseclose");
        this.$emit("close");
      }
    }
  },
  methods: {
    closeMmdDialog(){
      this.showMmdDialog = false;
    }
  }
}
</script>

<style scoped>
  .mmd-dialog-mask{
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mmd-dialog-wrapper{
    position: relative;
    background-color: #fff;
    color: #333;
    font-size: 0.6rem;
    min-width: 50%;
    max-width: 95%;
    -webkit-border-radius: 0.4rem;
    -moz-border-radius: 0.4rem;
    border-radius: 0.4rem;
    padding-top: 0.5rem;
    margin: auto;
  }
  .mmd-dialog-header{
    height: 1.5rem;
    line-height: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
  .mmd-dialog-title{
    flex-grow:1;
    font-size: 0.6666666666666666rem;
    padding: 0 0.2rem 0 1.3666666666666666rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .mmd-dialog-close{
    margin-right: 0.5rem;
    position: relative;
    height: 0.6666666666666666rem;
    width: 0.6666666666666666rem;
    min-width: 0.6666666666666666rem;
  }
  .mmd-dialog-close:after,.mmd-dialog-close:before{
    position: absolute;
    top: 50%;
    left: 0;
    content: "";
    height: 1px;
    width: 0.6666666666666666rem;;
    margin-top: -2px;
    background-color: #999;
    transform: rotate(45deg);
  }
  .mmd-dialog-close:before{
    transform: rotate(-45deg);
  }
  .mmd-dialog-body{
    padding: 0 0.5rem 0.5rem;
    text-align: left;
  }


  .dialog-fade-enter-active {
    animation: dialog-fade-in .3s;
  }

  .dialog-fade-leave-active {
    animation: dialog-fade-out .3s;
  }

  @keyframes dialog-fade-in {
    0% {
      /*transform: translate3d(0, -20px, 0);*/
      opacity: 0;
    }
    100% {
      /*transform: translate3d(0, 0, 0);*/
      opacity: 1;
    }
  }

  @keyframes dialog-fade-out {
    0% {
      /*transform: translate3d(0, 0, 0);*/
      opacity: 1;
    }
    100% {
      /*transform: translate3d(0, -20px, 0);*/
      opacity: 0;
    }
  }
</style>
