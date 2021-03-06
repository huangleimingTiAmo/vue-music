import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './common/stylus/index.styl'
Vue.config.productionTip = false
import 'babel-polyfill'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'




fastclick.attach(document.body)

Vue.use(VueLazyLoad,{
    loading: require('./common/image/default.png')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
