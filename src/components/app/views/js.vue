<template>
    <div class="js">
        <div class="docs-header">
            <div class="container scale-up">
                <h2>JavaScript</h2>
                <ul>
                    <li>
                        <p>是一种解释性脚本语言（代码不进行预编译）</p>
                    </li>
                    <li>
                        <p>主要用来向HTML页面添加交互行为</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="note-lists">
            <ul>
                <li v-for="(item,index) in jsonLists" :key="index">
                    <h3 class="note-title" @click="toggleShow(jsonLists,index)">
                        {{item.title}}
                        <span class="iconfont icon-fangkuai-" v-if="item.show"></span>
                        <span class="iconfont icon-fangkuai" v-else></span>
                    </h3>
                    <ul class="note-content" v-show="item.show">
                        <li v-for="(content,i) in item.content" :key="i">
                            <h3 class="note-title-c" @click="toggleShow(item.content,i)">
                                {{content.title}}
                                <span class="iconfont icon-xiangxiazhanhang" v-if="content.show" v-show="content.list"></span>
                                <span class="iconfont icon-xiangshangzhanhang" v-else v-show="content.list"></span>
                            </h3>
                            <ul class="note-content-list" v-show="content.show && content.list">
                                <li v-for="(list,i) in content.list" :key="i" :class="{'mt2':list.list && i>0}">
                                    {{list.txt}}
                                    <h3 class="note-title-l" v-if="list.title" @click="toggleShow(content.list,i)">
                                        {{list.title}}
                                        <span class="iconfont icon-add" v-if="list.show" v-show="list.list">-</span>
                                        <span class="iconfont icon-reduce" v-else v-show="list.list">+</span>
                                    </h3>
                                    <ul class="note-content-list-list" v-show="list.show && list.list">
                                        <li v-for="(listsub,i) in list.list" :key="i">
                                            {{listsub.txt}}
                                            <h3 class="note-title-ll" v-if="listsub.title">{{listsub.title}}</h3>
                                            <ul class="note-content-list-list-list" v-if="listsub.list">
                                                <li v-for="(sub,i) in listsub.list" :key="i">
                                                    {{sub.txt}}
                                                    <ul v-if="sub.list">
                                                        <li v-for="(subtxt,i) in sub.list" :key="i">{{subtxt}}</li>
                                                    </ul>
                                                </li>
                                            </ul>
                                            <ul class="note-content-list-eg" v-if="listsub.eg">
                                                <li v-for="(eg,i) in listsub.eg" :key="i">
                                                    <pre class="note-eg" v-if="eg.type=='code'">{{eg.content}}</pre>
                                                    <p v-else class="note-eg" type="eg.type">{{eg.content}}</p>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <ul class="note-content-list-eg" v-if="list.eg">
                                        <li v-for="(eg,i) in list.eg" :key="i">
                                            <pre class="note-eg" v-if="eg.type=='code'">{{eg.content}}</pre>
                                            <p v-else class="note-eg" type="eg.type">{{eg.content}}</p>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            jsonLists: []
        }
    },
    methods: {
        toggleShow(list, index) {
            list[index].show = !list[index].show;
        }
    },
    created() {
        this.$Axios('/mock/notejs', { type: 'post' }).then((res) => {
            res.forEach(ele => {
                ele.show = false
                ele.content.forEach(e => {
                    e.show = true
                    if (e.list) {
                        e.list.forEach(l => {
                            l.show = false;
                        })
                    }
                })
            });
            this.jsonLists = res;
        })
    }
}
</script>
<style scoped lang="scss">
.note-lists {
    padding: 0.3rem;
    font-size: 0.3rem;
    & > ul {
        & > li {
            & + li {
                margin-top: 0.4rem;
            }
        }
    }
    .iconfont {
        position: absolute;
        right: 0;
        top: 0;
        font-weight: normal;
        color: $bgc-blue-default;
    }
    .icon-reduce,
    .icon-add {
        padding-right: 0.1rem;
    }
    .note-title {
        position: relative;
        &-c {
            font-size: 0.26rem;
            padding: 0.1rem 0;
            position: relative;
        }
        &-l {
            position: relative;
        }
    }
    .note-content {
        margin-top: 0.1rem;
        padding-left: 0.4rem;
        list-style: decimal;
        font-size: 0.24rem;
        .mt2 {
            margin-top: 0.2rem;
        }
        ul {
            & + ul:not(.note-content-list-eg) {
                margin-top: 0.2rem;
            }
        }
        & > li {
            & > ul:not(.note-content-list-eg) {
                background: rgba($bgc-blue-default, 0.1);
                list-style: disc;
                padding: 0.1rem 0 0.1rem 0.4rem;
                margin-bottom: 0.2rem;
                & > li {
                    & > ul:not(.note-content-list-eg) {
                        list-style: circle;
                        padding-left: 0.4rem;
                        & > li {
                            & > ul:not(.note-content-list-eg) {
                                list-style: lower-alpha;
                                padding-left: 0.4rem;
                                & > li {
                                    & > ul:not(.note-content-list-eg) {
                                        list-style: lower-greek;
                                        padding: 0.2rem;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .note-txt {
    }
    .note-eg {
        border-left: 2px solid rgba($bgc-blue-default, 0.8);
        background: rgba($bgc-blue-default-fc, 0.5);
        margin: 0.05rem 0.3rem 0.15rem 0;
        padding: 0.1rem;
        white-space: pre-wrap;
        font-family: sans-serif;
        box-shadow: -0.05rem 0.05rem 0.1rem rgba(14, 144, 210, 0.2);
    }
}
</style>