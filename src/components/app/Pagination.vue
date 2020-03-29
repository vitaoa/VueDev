<template>
    <div class="pagination">
        <ul>
            <!-- prev -->
            <li class="btn btn--prev" :class="{'btn--disabled' : index === 1}" @click="prev">上一页</li>

            <!-- first -->
            <li class="btn btn--first" :calsss="{'btn--disabled' : index === 1}" @click="first">第一页</li>

            <li class="btn btn--more" v-if="showPrevMore">...</li>

            <li class="btn" :class="{'btn--current' : index === pager}" v-for="pager in pagers" @click="go(pager)">{{ pager }}</li>

            <li class="btn btn--more" v-if="showNextMore">...</li>

            <!-- next -->
            <li class="btn btn--next" :class="{'btn--disabled' : index === pages}" @click="next">下一页</li>
            <!-- last -->
            <li class="btn btn--last" :class="{'btn--disabled' : index === pages}" @click="last">最后页</li>

        </ul>
    </div>
</template>
<script>
export default {
    name:"Pagination",
    props:["pageSize","currentPage","total","perPages","tabIndex"],
    data(){
        return{
            index : this.currentPage, //当前页码
            limit : this.pageSize, //每页显示条数
            size : this.total || 1, //总记录数
            showPrevMore : false,
            showNextMore : false
        }
    },
    methods:{
        prev(){
            if (this.index > 1) {
                this.go(this.index - 1)
            }
        },
        next(){
            if (this.index < this.pages) {
                this.go(this.index + 1)
            }
        },
        first(){
            if (this.index !== 1) {
                this.go(1)
            }
        },
        last(){
            if (this.index != this.pages) {
                this.go(this.pages)
            }
        },
        go (page) {
            if (this.index !== page) {
                this.index = page
                this.$emit('change', this.index,this.tabIndex)
            }
        }
    },
    computed:{
        //计算总页码
        pages(){
            return Math.ceil(this.size/this.limit)
        },
        //计算页码，当count等变化时自动计算
        pagers () {
            const array = []
            const perPages = this.perPages
            const pageCount = this.pages
            let current = this.index
            const _offset = (perPages - 1) / 2

            const offset = {
                start : current - _offset,
                end   : current + _offset
            }

            if (offset.start < 1) {
                offset.end = offset.end + (1 - offset.start)
                offset.start = 1
            }
            if (offset.end > pageCount) {
                offset.start = offset.start - (offset.end - pageCount)
                offset.end = pageCount
            }
            if (offset.start < 1) offset.start = 1

            this.showPrevMore = (offset.start > 1)
            this.showNextMore = (offset.end < pageCount)

            for (let i = offset.start; i <= offset.end; i++) {
                array.push(i)
            }
            return array
        }
    },
    watch:{
        currentPage(val) {
            this.index = val || 1
        },
        pageSize(val) {
            this.limit = val || 10
        }
    }
}
</script>
<style scoped lang="scss">
.pagination {
    font-size: 0.24rem;
    background: $bgc-default;
    padding: 0.12rem;
    margin-top: 0.2rem;
    .btn {
        display: inline-block;
        padding: 0.08rem 0.15rem;
        line-height: 1;
        border: 1px solid $borderc-default;
        margin-left: -1px;
        &.radius {
            border-radius: 2px;
        }
        &--disabled,
        &--more {
            background-color: #fff;
            color: $bgc-default-fc;
        }
        //禁用
        &--disabled {
            cursor: not-allowed;
            opacity: .75;
        }
        &--more,
        &--current {
            cursor: default;
        }
        //选中
        &--current {
            background-color: $bgc-blue-default;
            color:$bgc-blue-default-fc;
            position: relative;
            z-index: 1;
            border-color: $bgc-blue-default;
        }
        &:hover {
            background-color: $bgc-blue-default-fc;
            color: $bgc-blue-default;
        }
    }
}
</style>