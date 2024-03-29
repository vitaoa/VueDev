<template>
    <form class="form" :class="classForm">
        <slot></slot>
    </form>
</template>
<script>
export default {
    name: 'EfForm',
    provide() {
        return {
            efForm: this
        }
    },
    props: {
        classForm: String,
        model: {
            type: Object,
            required: true
        },
        labelWidth: {
            type: String,
            default: '120px'
        },
        rules: Object
    },
    data() {
        return {
            fields: []
        }
    }
}
</script>