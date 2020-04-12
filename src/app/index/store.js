import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: window.localStorage.token || '',
        unloaded: false,
        defaultTabIndex: 1,
        unloadedTopic: true,
        topicDatas: [
            { tab: '全部', type: '', data: [], currentPage: 1 },
            { tab: '精华', type: 'good', data: [], currentPage: 1 },
            { tab: '分享', type: 'share', data: [], currentPage: 1 },
            { tab: '问答', type: 'ask', data: [], currentPage: 1 },
        ],
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },
        SHOW_LOADING(state) {
            state.unloaded = true
        },
        HIDE_LOADING(state) {
            state.unloaded = false
        },
        GET_TOPICS: (state, res) => {
            // console.log('GET_TOPICS=====>state', state)
            // console.log('GET_TOPICS=====>res', res)
            res.tabIndex && (state.defaultTabIndex = res.tabIndex)
            let tabIndex = state.defaultTabIndex
            let currentDatas = state.topicDatas[tabIndex - 1]
            res.currentPage && (currentDatas.currentPage = res.currentPage)
            res.data && (currentDatas.data[currentDatas.currentPage - 1] = res.data)
            state.unloadedTopic = false
        },
    },
    actions: {
        getTopics({ commit, state }, opts) {
            const tabIndex = opts.tabIndex ? opts.tabIndex : state.defaultTabIndex
            const currentDatas = state.topicDatas[tabIndex - 1]
            const currentPage = opts.page ? opts.page : currentDatas.currentPage
            const topicDataExist = currentDatas.data[currentPage - 1]
            if (!!topicDataExist) {
                // console.log('store 已存在，直接读取', topicDataExist, opts)
                commit('GET_TOPICS', { data: topicDataExist, tabIndex: tabIndex, currentPage: currentPage })
            } else {
                state.unloadedTopic = true
                // console.log('store 不存在，actions getTopics============>opts：', opts)
                vm.$Axios('https://cnodejs.org/api/v1/topics', {
                    data: {
                        page: currentPage,
                        limit: opts.limit,
                        tab: currentDatas.type,
                    },
                }).then((res) => {
                    let resultData = res.data
                    if (resultData) {
                        if (typeof resultData == 'string') {
                            resultData = JSON.parse(res.data)
                        }
                        commit('GET_TOPICS', { data: resultData, tabIndex: tabIndex, currentPage: currentPage })
                    }
                })
            }
        },
    },
    getters: {},
})
