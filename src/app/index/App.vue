<template>
    <div class="wrapper">
        <transition name="fade">
            <router-view :sliderOptions="sliderOptions" :bannerData="bannerData" @topicDatas="getTopicDatas" @curNumberRandom="getNumberRandom" @jumpLink="jumpLink" />
        </transition>
        <Bottom :footerNav=footerNav />
    </div>
</template>

<script>
import { mSiteUrl, weatherUrl } from './config'
import Bottom from '@/components/app/Bottom'

export default {
    name: 'app',
    data() {
        return {
            mSiteUrl,
            footerNav:[
                {name:"首页",icon:"icon-APPkaifa",path:"/home"},
                {name:"脚本",icon:"icon-js",path:"/js"},
                {name:"框架",icon:"icon-frame",path:"/frame"},
                {name:"全栈",icon:"icon-code",path:"/full"},
            ],
            bannerList: [],
            options: {
                loop: true,
                autoplay: 3000,
            },
            curNumber:12000
        }
    },
    computed: {
        sliderOptions() {
            let sliderSet = Object.assign({}, this.options)
            return sliderSet;
        },
        bannerData() {
            let bArray = [];
            this.bannerList.forEach(item => {
                let slideHtml = '';
                if (item.title == 'activity') {
                    slideHtml = `<div class="numberCount">activity<span>${this.curNumber}</span> </div>`
                }
                bArray.push({
                    style: `background-image:url(${item.cover});background-repeat:no-repeat;background-size:100%;`,
                    title: item.title,
                    html: slideHtml,
                    url: item.url
                })
            });
            return bArray;
        }
    },
    methods: {
        getData: function () {
            let _this = this;
            this.$ajaxFn({
                url: '/mock/getbannerlist',
                dataType: "json"
            }).then(res => {
                _this.bannerList = res.data.list;
                _this.bannerList.length > 1 && (_this.options.loop = true);
            })
        },
        init() {
            this.getData();
        },
        getNumberRandom(data) {
            //数字随机累加
            setInterval(() => {
                this.curNumber += this.randomNumBoth(1, 5)
            }, 3000)
        },
        jumpLink(item) {
            let url = item.url
            if (!!url) {
                window.open(url)
            }
        },
        randomNumBoth(Min, Max) {
            let Range = Max - Min;
            let Rand = Math.random();
            let num = Min + Math.round(Rand * Range);
            return num;
        }
    },
    created() {
        this.init();
    },
    mounted: function () {
        window["vm"] = this;
    },
    components: {
        Bottom
    },
}
</script>

<style lang="scss">
@import "/static/iconfont/iconfont.css";
@import "~@/scss/mixins/library";
@import "~@/scss/normalize";
html {
    font-size: 100px;
}
body {
    font: 13px/1.4 PingFang SC, Microsoft YaHei, simsun, "sans-serif", helvetica,
        arial;
    color: $c-default;
}
.wrapper {
    overflow: hidden;
}
//banner
.m-banner {
    height: 3.2rem;
    .numberCount {
        position: absolute;
        top: 0;
        left: 0.1rem;
        line-height: 0.36rem;
        .lottery-block {
            @include inline-block;
        }
    }
}
.numberCount {
    font-size: 0.2rem;
    color: $bgc-default-fc;background:$bgc-default;
    span {
        margin: 0 0.1rem;
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
button {
    &:focus {
        outline: none;
    }
}
.user-form-panel {
    padding: 0.2rem;
    a {
        color: $c-blue;
    }
    .form-submit {
        padding: 4px 10px;
    }
}
.user-form {
    padding: 0.3rem;
    .form-group {
        margin-top: 0.3rem;
        label {
            display: inline-block;
            width: 1.6rem;
            text-align: right;
        }
    }
    .input-form {
        border: 1px solid $borderc-default;
        padding: 2px 10px;
    }
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
</style>
