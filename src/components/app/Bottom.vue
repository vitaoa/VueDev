<template>
    <div class="footer-fixed flex">
        <router-link to="/">
            <span class="iconfont icon-APPkaifa"></span> 首页
        </router-link>
        <router-link to="/js">
            <span class="iconfont icon-js"></span> 脚本
        </router-link>
        <router-link to="/frame">
            <span class="iconfont icon-frame"></span> 框架
        </router-link>
        <router-link to="/full">
            <span class="iconfont icon-code"></span> 全栈
        </router-link>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    props: []
}
</script>
<style scoped lang="scss">
.footer-fixed {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 0.88rem;
    line-height: 0.88rem;
    background: $bgc-1;
    font-size: 0.3rem;
    text-align: center;
    a {
        color: rgba($c-blue, 0.5);
        margin: 0 0.2rem;
    }
    .iconfont {
        font-size: 0.4rem;
    }
    .active {
        color: $c-blue;
    }
}
.flex {
    display: flex;
    align-items: center;
    line-height: 1;
    height: auto;
    a {
        flex: 1;
        margin: 0;
        padding: 0.15rem 0;
        span {
            display: block;
            margin-bottom: 0.04rem;
        }
    }
    .active {
        background: $c-default;
    }
}
</style>