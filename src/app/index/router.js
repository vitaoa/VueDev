// import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 定义路由
const routes = [
    {
        path: '/home',
        component: () => import(/* webpackChunkName: "home" */ '../../components/app/views/index.vue'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/js',
        component: () => import(/* webpackChunkName: "js" */ '../../components/app/views/js.vue'),
        meta: {
            title: '脚本'
        }
    },
    {
        path: '/frame',
        component: () => import(/* webpackChunkName: "frame" */ '../../components/app/views/frame.vue'),
        meta: {
            title: '框架'
        }
    },
    {
        path: '/full',
        component: () => import(/* webpackChunkName: "full" */ '../../components/app/views/full.vue'),
        meta: {
            title: '前端技能进阶'
        }
    },
    {
        path: '/register',
        component: () => import(/* webpackChunkName: "register" */ '../../components/app/views/Register.vue'),
        meta: {
            title: '注册'
        }
    },
    {
        path: '/login',
        component: () => import(/* webpackChunkName: "login" */ '../../components/app/views/Login.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/404',
        component: { template: '<div>404</div>' },
        alias: '*'
    },
    {
        path: '/',
        redirect:'/home'
    },
    {
        path: '/topic/:id',
        component: () => import(/* webpackChunkName: "topic" */ '../../components/app/views/Topic.vue')
    }
]

// 实例化
const router = new VueRouter({
    linkActiveClass: 'active',
    routes
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
    let token = window.localStorage.getItem('token')
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (!!token) {
        if (to.path === '/login' || to.path === '/register') {
            next('/home')
        } else {
            next()
        }
    } else {
        if (to.path === '/login' || to.path === '/home' || to.path === '/register' || to.path.indexOf('/topic/') !== -1) {
            next()
        } else {
            if (from.path === '/login') {
                document.title = '登录'
            }
            next(`/login?redirect=${to.path}`)
        }
    }
})

export default router
