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
        };
    },
    data() {
        return {
            fields: []
        };
    },
    props: {
        classForm: String,
        model: Object,
        rules: Object
    }
};
</script>