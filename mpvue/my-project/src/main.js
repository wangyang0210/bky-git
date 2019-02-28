import Vue from 'vue'
import App from './App'

//原生
import fly from './utils/fly'
Vue.prototype.$http = fly;


//fly
// import request from './utils/flywx'
// Vue.prototype.$fly = request;


Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()