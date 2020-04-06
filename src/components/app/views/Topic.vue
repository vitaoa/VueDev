<template>
    <div class="topic" v-if="flag">
        <div class="docs-header">
            <div class="container scale-up">
                <h2>{{topicItem.title}}</h2>
                <p class="changes">
                    <span>发布于{{createMonth}}</span>
                    <span>作者{{topicItem.author.loginname}}</span>
                    <span>{{topicItem.visit_count}}次浏览</span>
                    <span>来自{{topicTypes[topicItem.tab]}}</span>
                </p>
            </div>
        </div>
        <div class="topic_content" v-html="$options.filters.contentFormat(topicItem.content)"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            flag: false,
            topicTypes: {
                'good': '精华',
                'share': '分享',
                'ask': '问答',
            },
            topicItem: ''
        }
    },
    computed: {
        topicId() {
            return this.$route.params.id
        },
        createMonth() {
            var _curMonth = new Date().getMonth();
            var _curDate = new Date().getDate();
            var _createMonth = new Date(this.topicItem.create_at).getMonth();
            var _createDate = new Date(this.topicItem.create_at).getDate();
            if (_curMonth - _createMonth > 0) {
                return _curMonth - _createMonth + '个月前';
            } else if (_curDate - _createDate > 0) {
                return _curDate - _createDate + '天前';
            } else {
                return new Date(this.topicItem.create_at).toTimeString().split(' ')[0];
            }
        }
    },
    filters: {
        contentFormat: function (content) {
            var _reg = new RegExp("<img([^>]*)?>", "g");
            var _replaceImg = content.replace(_reg, '');
            var _replaceLink = _replaceImg.replace(/href=(.*[^"|'])?["|']/g, 'href="javascript:;"');
            return _replaceLink.replace(/<([^>]*)?><([^>]*)?>/g, '')
        }
    },
    created() {
        this.$store.commit('showLoading')
        this.getTopicItem();
    },
    methods: {
        getTopicItem() {
            this.$Axios('https://cnodejs.org/api/v1/topic/' + this.$route.params.id).then(res => {
                if (res.data && typeof res.data == 'string') {
                    this.topicItem = JSON.parse(res.data);
                } else {
                    this.topicItem = res.data;
                }
                this.flag = true;
                this.$store.commit('hideLoading')
            })
        }
    }
}
</script>
<style scoped lang="scss">
.topic_header {
    padding: 0.2rem;
}
.topic_content {
    margin: 0.2rem;
    /deep/ {
        h1 {
            font-size: 0.32rem;
            padding: 0.1rem 0;
        }
        h2 {
            font-size: 0.28rem;
            padding: 0.1rem 0;
        }
        p {
            margin: 0.1rem 0;
        }
        ul {
            list-style: disc;
            li {
                margin-left: 20px;
            }
        }
        blockquote {
            background: #eee;
            margin: 0.1rem 0;
            padding: 0.1rem;
        }
    }
}
</style>