import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 定义路由
const routes = [
    {
        path: '/',
        component: () => import(/* webpackChunkName: "home" */ '../../components/app/views/index.vue')
    },
    {
        path: '/js',
        component: { template: '<div>jsjjjj</div>' }
    },
    {
        path: '/frame',
        component: { template: '<div>frameframeframeframe</div>' }
    },
    {
        path: '/full',
        component: { template: '<div>fullfullfull</div>' }
    },
    {
        path: '/404',
        component: { template: '<div>404</div>' },
        alias: '*'
    },
    {
        path: '*'
    }
]

// 实例化
const router = new VueRouter({
    linkExactActiveClass: 'active',
    routes
})
export default router