<template>
    <div class="wrapper">
        <div class="m-banner">
            <Slider ref="slider" :options="sliderOptions">
                <!-- slideritem wrapped package with the components you need -->
                <SliderItem v-for="(item,index) in bannerData" :key="index" :style="item.style" @click.native="jumpLink(item)">{{item.html}}</SliderItem>
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
            this.bannerList.sort(function (a, b) {
                var va, vb;
                va = isNaN(parseInt(a.sort)) ? null : parseInt(a.sort);
                vb = isNaN(parseInt(b.sort)) ? null : parseInt(b.sort);
                return (vb != null) - (va != null) || va - vb;
            });

            this.bannerList.forEach(item => {
                bArray.push({
                    style: `background-image:url(${item.cover}?t=${new Date().getTime()});background-repeat:no-repeat;background-size:100%;`,
                    html: "",
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
                console.log("complete");
            });
        },
        jumpLink(item) {
            let url = item.url
            if (url != '') {
                console.log("jumpLink->", url)
                window.location.herf = url
            }
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
.m-banner {
    height: 3.2rem;
}
.wrapper {
    overflow: hidden;
}
</style>
