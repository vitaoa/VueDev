import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: window.localStorage.token || ''
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        }
    },
    actions: {},
    getters: {}
})
