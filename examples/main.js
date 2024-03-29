import Vue from 'vue'
import EfUI from '../packages'
Vue.use(EfUI)
import App from './App.vue'

Vue.config.productionTip = true
new Vue({
    render: (h) => h(App)
}).$mount('#app')
