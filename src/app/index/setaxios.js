import axios from 'axios'
import router from './router'
import store from './store'

//http全局拦截
export default function setAxios() {
    //添加请求拦截器，在请求头中加token
    axios.interceptors.request.use(
        config => {
            if (store.state.token) {
                config.headers.token = store.state.token
            }
            console.log('request->', config)
            return config
        },
        error => {
            return Promise.reject(error)
        }
    )
    axios.interceptors.response.use(
        response => {
            console.log('response->', response)
            if (response == 200) {
                const data = response.data
                if (data.code == -1) {
                    //登录过期 需要重新登录  清空token
                    store.commit('setToken', '')
                    localStorage.removeItem('token')
                    router.replace({ path: '/login' })
                }
            }
            return response
        },
        error => {
            return Promise.reject(error)
        }
    )
}
