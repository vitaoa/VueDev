<template>
    <div>
        <div class="m-banner">
            <Slider ref="slider" :options="sliderOptions">
                <!-- slideritem wrapped package with the components you need -->
                <SliderItem v-for="(item,index) in bannerData" :key="index" :style="item.style" @click.native="jumpLink(item)" :title="item.title" :url="item.url">
                    <div v-if="item.html" v-html="item.html"></div>
                </SliderItem>
                <!-- Customizable loading -->
                <div slot="loading">loading...</div>
            </Slider>
        </div>
        <div class="topic-nav">
            <span v-for="(item,index) in topicDatas" :class="{active:index==defaultTabIndex}" @click="tabTopicNav(index,item.type)" :key="index">{{item.tab}}</span>
        </div>
        <div class="topic-list">
            <div v-for="(topics,index) in topicDatas" class="topic-sub-list" :class="{active:index==defaultTabIndex}" :key="index">
                <ul>
                    <li v-for="(topic,i) in topics.data" :key={i}>
                        <span class="list-num">{{i+1}}.</span>
                        <span class="txt-badge">置顶</span>
                        <div class="topic-title">{{topic.title}}</div>
                    </li>
                </ul>
                <template v-if="topics.data">
                    <Pagination :tabIndex="defaultTabIndex" :total="total" :perPages="perPages" :currentPage="topicDatas[index].currentPage" :pageSize="pageSize" @change="pageChange"/>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import Slider from '@/components/app/Slider'
import SliderItem from '@/components/app/SliderItem'
import Pagination from '@/components/app/Pagination'
export default {
    data() {
        return{
            defaultTabIndex:0,
            topicDatas:[
                {tab:'全部',type:'',data:'',currentPage:1},
                {tab:'精华',type:'good',data:'',currentPage:1},
                {tab:'分享',type:'share',data:'',currentPage:1},
                {tab:'问答',type:'ask',data:'',currentPage:1},
            ],
            pageSize:10,//每页显示数据条数
            total:100,
            perPages:5 //页面中的可见页码，其他的以...替代, 必须是奇数
        }
    },
    props: ["sliderOptions", "bannerData"],
    components: {
        Slider,
        SliderItem,
        Pagination
    },
    methods: {
        jumpLink(obj){
            this.$emit('jumpLink', obj)
        },
        getDatas(tabIndex){
            this.$ajaxFn({
                url: '/api/v1/topics',
                dataType: "json",
                data:{
                    page:this.topicDatas[tabIndex].currentPage,
                    limit:this.pageSize,
                    tab:this.topicDatas[tabIndex].type
                }
            }).then(res=>{
                if (res.data && typeof res.data == 'string') {
                    this.topicDatas[tabIndex].data = JSON.parse(res.data);
                }else {
                    this.topicDatas[tabIndex].data = res.data;
                }
                console.log("getDatas============>index,currentPage：",tabIndex,this.topicDatas[tabIndex].currentPage)
            });
        },
        tabTopicNav(tabIndex){
            this.defaultTabIndex=tabIndex;
            this.getDatas(tabIndex,this.topicDatas[tabIndex].type);
        },
        pageChange(page,tabIndex) {
            let index = tabIndex?tabIndex:0
            this.topicDatas[index].currentPage = page
            this.getDatas(index);
        }
    },
    mounted(){
        this.getDatas(0,'');
        console.log("mounted==========")
    },
    created(){
        this.$emit('curNumberRandom');
        console.log("created==========")
    }
}
</script>
<style scoped lang="scss">
.topic-nav{font-size: 14px;background:$bgc-default;color:$bgc-default-fc;margin-top: .2rem;padding:.1rem 0;
    span{display: inline-block;margin: 0 .1rem;}
    .active{color:$bgc-default-active-fc;}
}
.topic-list{padding: .2rem 0;
    .topic-sub-list{display: none;
        &.active{display: block;}
        ul{padding: 0 .2rem;}
    }
    ul{
        li{
            & + li{margin-top: .2rem;}
            span{float: left;margin-right: .1rem;}
        }
    }
    .list-num{}
    .txt-badge{border-radius: .03rem;background: $bgc-green-default;color:$bgc-green-default-fc;padding: 0 .1rem;}
    .topic-title{display: block;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}
}
</style>