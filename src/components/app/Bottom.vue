<template>
    <div class="footer-fixed flex">
        <router-link v-for="menu in footerNav" :to="menu.path" v-gtm:bottomNav="menu">
            <span v-if="menu.icon" class="iconfont" :class="menu.icon"></span> {{menu.name}}
        </router-link>
    </div>
</template>
<script>
export default {
    props: ["footerNav"]
}
</script>
<style scoped lang="scss">
.footer-fixed {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    line-height: 1;
    background: linear-gradient($bgc-bar-1, $bgc-bar-2);
    font-size: 12px;
    text-align: center;
    a {
        color: $bgc-bar-fc2;
        display: inline-block;
        span {
            display: block;
            margin-bottom: 2px;
        }
    }
    .iconfont {
        font-size: 20px;
    }
    .active {
        color: $bgc-bar-fc1;
    }
}
</style>