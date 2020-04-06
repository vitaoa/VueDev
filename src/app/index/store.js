import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: window.localStorage.token || '',
        unloaded: false,
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        showLoading(state) {
            state.unloaded = true
        },
        hideLoading(state) {
            state.unloaded = false
        },
    },
    actions: {},
    getters: {},
})
