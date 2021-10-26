import Vue from 'vue'
import App from './App.vue'
// import Element from 'element-ui';
// 按需引入
import element from './plugin/elements.js'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/style.css'
import axios from 'axios'
import VueBus from './assets/EventBus/bus.js'
import VueTouch from 'vue-touch'
// axios.defaults.baseURL = ''
Vue.prototype.$http = axios
Vue.config.productionTip = false
// element-ui 全局配置
Vue.prototype.$message = element.other.Message
Vue.prototype.$confirm = element.other.MessageBox.confirm
// Vue.prototype.$notify = element.other.Notification
Vue.prototype.$loading = element.other.Loading.service
Vue.use(element)
Vue.use(VueBus)
Vue.use(VueTouch, {name: 'v-touch'})
new Vue({
  render: h => h(App),
}).$mount('#app')
