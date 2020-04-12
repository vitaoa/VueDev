<template>
    <div class="wrapper" :class="{'fixed-footer':footerNav}">
        <transition name="fade">
            <router-view />
        </transition>
        <Bottom :footerNav="footerNav" />
        <EfLoading v-if="unloaded" :fixed="true" :color="'#fff'" />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { mSiteUrl, weatherUrl } from './config'
import Bottom from '@/components/app/Bottom'
import EfLoading from '@/components/efui/load/Loading'

export default {
    name: 'app',
    data() {
        return {
            mSiteUrl,
            footerNav:[
                {name:"首页",icon:"icon-APPkaifa",path:"/home"},
                {name:"脚本",icon:"icon-js",path:"/js"},
                {name:"框架",icon:"icon-frame",path:"/frame"},
                {name:"进阶",icon:"icon-code",path:"/full"},
            ],
        }
    },
    computed: {
        ...mapState(['unloaded']),
    },
    methods: {
    },
    created() {
    },
    mounted: function () {
        window["vm"] = this;
    },
    components: {
        Bottom,
        EfLoading
    },
}
</script>

<style lang="scss">
@import "~@/assets/iconfont/iconfont.css";
@import "~@/scss/mixins/library";
@import "~@/scss/normalize";
@import "~@/scss/efui/components/docsheader";
html {
    font-size: 100px;
}
body {
    font: 12px/1.4 PingFang SC, Microsoft YaHei, simsun, "sans-serif", helvetica,
        arial;
    color: $c-default;
}
.wrapper {
    overflow: hidden;
    font-size: 0.24rem;
    &.fixed-footer {
        padding-bottom: 50px;
    }
}
//banner
.m-banner {
    height: 3.2rem;
    border-bottom: 1px solid $bgc-default;
    .numberCount {
        position: absolute;
        top: 0.1rem;
        left: 0.1rem;
        line-height: 2;
        .lottery-block {
            @include inline-block;
        }
    }
}
.numberCount {
    font-size: 0.2rem;
    padding: 0 0.08rem;
    color: $bgc-blue-default-fc;
    background: $bgc-blue-default;
    text-transform: uppercase;
    box-shadow: 0.04rem 0.04rem 0 rgba($c-default, 0.5);
    border-radius: 0.04rem;
    span {
        margin-left: 0.1rem;
    }
}
//common
.flex {
    display: flex;
    & > * {
        margin: auto;
    }
}
.tb-cell {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    & > * {
        display: inline-block;
    }
}
.al-c {
    text-align: center;
}
.fade-enter-active,
.fade-leave-acitve {
    transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.quote-list {
    padding: 0.2rem;
    ul {
        li {
            margin-top: 0.1rem;
        }
    }
    .badge-name {
        margin-right: 0.1rem;
        font-weight: bold;
    }
    .badge-content {
    }
}
.user-form-panel {
    padding-left: 30px;
    padding-right: 30px;
    .user-form {
        padding: 20px 0 30px;
    }
    .form-agreement {
        font-size: 14px;
        color: #4b4b4b;
        padding-top: 20px;
        a {
            color: #3b86c9;
        }
        input[type="checkbox"] {
            &:checked {
            }
        }
        &.checkdbox {
            input[type="checkbox"] {
            }
        }
    }
}
.page-loader {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 100000;
    text-align: center;
    background: rgba($background, 0.9);
    &--fixed {
        position: fixed;
        background: rgba($color: $bgc-blue-default, $alpha: 1);
    }
}

@keyframes widthFull {
    0% {
        width: 0;
    }
    100% {
        width: 100%;
    }
}
@keyframes scale-up {
    0% {
        opacity: 0;
        -webkit-transform: scale(0.2);
        transform: scale(0.2);
    }

    100% {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
}
.scale-up {
    animation: scale-up 0.5s ease-out both;
}
</style>
