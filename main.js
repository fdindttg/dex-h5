import Vue from 'vue'
import App from './App.vue'
import i18n from "./i18n";
import '@/plugins'
import store from './store'

//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.prototype._i18n = i18n;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	i18n,
	store
})
app.$mount()

