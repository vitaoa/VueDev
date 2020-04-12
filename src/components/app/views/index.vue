<template>
    <div>
        <div class="m-banner">
            <Slider ref="slider" :options="sliderOptions" :bannerData="bannerData">
                <!-- slideritem wrapped package with the components you need -->
                <SliderItem v-for="(item,index) in bannerData" :key="index" :style="item.style" @click.native="jumpLink(item)" :title="item.title" :url="item.url">
                    <div v-if="item.html" v-html="item.html"></div>
                </SliderItem>
                <!-- Customizable loading -->
                <div slot="loading">loading...</div>
            </Slider>
        </div>
        <div class="quote-list">
            <ul>
                <li v-for="(item,i) in quoteList" :key="i">
                    <span class="badge-name">{{item.mrname}}</span>
                    <p class="badge-content">{{item.content}}</p>
                </li>
            </ul>
        </div>
        <div class="topic-nav">
            <span v-for="(item,index) in topicDatas" :class="{active:index==defaultTabIndex-1}" @click="tabTopicNav(index+1,item.type)" :key="index">{{item.tab}}</span>
        </div>
        <div class="topic-list">
            <div v-for="(topics,index) in topicDatas" class="topic-sub-list" :class="{active:index==(defaultTabIndex-1)}" :key="index">
                <ul>
                    <li v-for="(topic,i) in topics.data[topics.currentPage-1]" :key="i">
                        <EfLink @click="toPage(topic.id)">
                            <span class="list-num">{{i+1}}.</span>
                            <span class="txt-badge" v-if="topic.top">置顶</span>
                            <div class="topic-title">{{topic.title}}</div>
                        </EfLink>
                    </li>
                </ul>
                <template v-if="topics.data.length>0">
                    <Pagination :tabIndex="defaultTabIndex" :total="total" :perPages="perPages" :currentPage="topicDatas[index].currentPage" :pageSize="pageSize" @change="pageChange"/>
                </template>
            </div>
            <EfLoading v-if="unloadedTopic" :fixed="false" :color="'#0e90d2'" />
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Slider from '@/components/app/Slider'
import SliderItem from '@/components/app/SliderItem'
import Pagination from '@/components/app/Pagination'
import EfLink from '@/components/efui/link/link'
import EfLoading from '@/components/efui/load/Loading'
export default {
    data() {
        return {
            bannerList: [],
            options: {
                loop: true,
                autoplay: 3000,
            },
            curNumber: 12000,
            pageSize:10,//每页显示数据条数
            total:100,
            perPages:5, //页面中的可见页码，其他的以...替代, 必须是奇数
            quoteList: []
        }
    },
    computed: {
        ...mapState(['defaultTabIndex', 'topicDatas', 'unloadedTopic']),
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
        },
    },
    components: {
        Slider,
        SliderItem,
        Pagination,
        EfLink,
        EfLoading
    },
    methods: {
        ...mapActions(['getTopics']),
        getBannerData: function () {
            let _this = this;
            this.$ajaxFn({
                url: '/mock/getbannerlist',
                dataType: "json"
            }).then(res => {
                _this.bannerList = res.data.list;
                _this.bannerList.length > 1 && (_this.options.loop = true);
            })
        },
        getNumberRandom(data) {
            //数字随机累加
            setInterval(() => {
                this.curNumber += this.randomNumBoth(1, 5)
            }, 2000)
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
        },
        tabTopicNav(tabIndex) {
            this.$store.dispatch("getTopics", {
                tabIndex: tabIndex,
                limit: this.pageSize
            });
        },
        pageChange(page, tabIndex) {
            this.$store.dispatch("getTopics", {
                tabIndex: tabIndex ? tabIndex : this.defaultTabIndex,
                limit: this.pageSize,
                page: page
            });
        },
        toPage(id) {
            this.$router.push({ path: '/topic/' + id })
        }
    },
    mounted(){
        console.log("mounted==========")
    },
    created(){
        this.getNumberRandom();
        this.getBannerData();
        this.getTopics({
            tabIndex: this.defaultTabIndex,
            limit: this.pageSize
        })
        this.$Axios("/mock/quotes", { type: 'post', data: { "num": "1", key: "冈察洛夫" } }).then(res => {
            this.quoteList = res
        });
        console.log("created==========")
    }
}
</script>
<style scoped lang="scss">
.topic-nav {
    font-size: 0.28rem;
    background: $bgc-default;
    color: $bgc-default-fc;
    margin-top: 0.2rem;
    padding: 0.1rem 0;
    span {
        display: inline-block;
        cursor: pointer;
        margin: 0 0.1rem;
    }
    .active {
        color: $bgc-blue-default;
    }
}
.topic-list {
    padding: 0.2rem 0;
    position: relative;
    min-height: 5rem;
    .topic-sub-list {
        display: none;
        &.active {
            display: block;
        }
        ul {
            padding: 0 0.2rem;
        }
    }
    ul {
        li {
            & + li {
                margin-top: 0.2rem;
            }
            span {
                float: left;
                margin-right: 0.1rem;
            }
        }
    }
    .list-num {
    }
    .txt-badge {
        border-radius: 0.03rem;
        background: $bgc-blue-default;
        color: $bgc-blue-default-fc;
        padding: 0 0.1rem;
    }
    .topic-title {
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}
</style>