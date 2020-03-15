<template>
    <div class="wrapper">
        <transition name="fade">
            <router-view :sliderOptions="sliderOptions" :bannerData="bannerData" />
        </transition>
        <Bottom />
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
            bannerList: [],
            // listPagination: '',
            options: {
                loop: true,
                autoplay: 3000,
            }
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
                // if (item.title == 'activity') {
                //     slideHtml = `<div class="numberCount din">Dibagikan <span>${this.curNumber}</span> </div>`
                // }
                bArray.push({
                    style: `background-image:url(${item.cover});background-repeat:no-repeat;background-size:100%;`,
                    title: item.title,
                    html: slideHtml,
                    url: item.url
                })
            });
            return bArray;
        },
    },
    methods: {
        getData: function () {
            let _this = this;
            var url = "/api/getbannerlist";
            $.ajax({
                url: url,
                dataType: "json",
            }).done(function (res) {
                _this.bannerList = res.data.list;
                _this.bannerList.length > 1 && (_this.options.loop = true);
            })
        },
        initData() {
            // let _this = this;
            // $.ajax({
            //     url: `${mSiteUrl}/fApi/APPbanner`,
            //     dataType: "jsonp",
            //     jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
            //     jsonpCallback: "jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
            // }).done(function (res) {
            //     console.log("res->", res, _this.options)
            //     _this.bannerList = res.banner;
            //     _this.bannerList.length > 1 && (_this.options.loop = true);
            //     _this.bannerList.map(item => {
            //         _this.listPagination += ('<span></span>')
            //     });
            // }).fail(function () {
            //     console.log("error");
            // }).always(function () {
            //     // console.log("complete");
            // });
        },
        init() {
            this.getData();
            // $.ajax({
            //     url: '/api/' + weatherUrl,
            //     data: {
            //         cityname: "深圳"
            //     }
            // }).done(function (res) {
            //     console.log(res)
            // })
        },
        jumpLink(item) {
            let url = item.url
            if (url != '') {
                console.log("jumpLink->", url)
                window.location.herf = url
            }
        },
        randomNumBoth(Min, Max) {
            let Range = Max - Min;
            let Rand = Math.random();
            let num = Min + Math.round(Rand * Range);
            return num;
        },
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
    color: #ffe16a;
    span {
        margin: 0 0.1rem;
    }
}
.fade-enter-active,
.fade-leave-acitve {
    transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
