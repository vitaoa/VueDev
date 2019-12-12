<template>
    <div class="wrapper">
        <div class="m-banner">
            <Slider ref="slider" :options="sliderOptions">
                <!-- slideritem wrapped package with the components you need -->
                <SliderItem v-for="(item,index) in bannerData" :key="index" :style="item.style" @click.native="jumpLink(item)" :title="item.title"></SliderItem>
                <!-- Customizable loading -->
                <div slot="loading">loading...</div>
            </Slider>
        </div>
    </div>
</template>

<script>
import Slider from '@/components/app/Slider'
import SliderItem from '@/components/app/SliderItem'
import { mSiteUrl } from './config'

export default {
    name: 'app',
    data() {
        return {
            mSiteUrl,
            bannerList: [],
            listPagination: '',
            options: {
                loop: false,
                autoplay: 30000,
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
                    style: `background-image:url(${item.cover}?t=${new Date().getTime()});background-repeat:no-repeat;background-size:100%;`,
                    title: item.title,
                    html: slideHtml,
                    url: item.url
                })
            });
            return bArray;
        },
    },
    methods: {
        initData() {
            let _this = this;
            $.ajax({
                url: `${mSiteUrl}/fApi/APPbanner`,
                dataType: "jsonp",
                jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
                jsonpCallback: "jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
            }).done(function (res) {
                console.log("res->", res, _this.options)
                _this.bannerList = res.banner;
                _this.bannerList.length > 1 && (_this.options.loop = true);
                _this.bannerList.map(item => {
                    _this.listPagination += ('<span></span>')
                });
            }).fail(function () {
                console.log("error");
            }).always(function () {
                // console.log("complete");
            });
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
        this.initData();
    },
    mounted: function () {
        window["vm"] = this;

    },
    components: {
        Slider,
        SliderItem,
    },
}
</script>

<style lang="scss">
@import "~@/scss/mixins/library";
@import "~@/scss/normalize";
html {
    font-size: 100px;
}
body {
    font: 13px/1.4 PingFang SC, Microsoft YaHei, simsun, "sans-serif", helvetica,
        arial;
    color: #476174;
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
</style>
