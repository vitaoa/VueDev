// import '@/base/jquery-vender'
// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import setAxios from './setaxios'
setAxios()
import '@/data/mock/mock'
import common from '@/base/common';
Vue.use(common)
Vue.config.productionTip = true
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')