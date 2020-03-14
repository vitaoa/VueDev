// import '@/base/jquery-vender'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/data/mock/mock'

Vue.config.productionTip = true

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
