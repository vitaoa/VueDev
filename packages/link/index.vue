<template>
    <a
        :class="[ 'ef-link',type ? `ef-link--${type}` : '',disabled && 'is-disabled',underline && !disabled && 'is-underline']"
        :href="disabled ? null : href"
        v-bind="$attrs"
        @click="handleClick"
    >
        <i v-if="icon" :class="icon"></i>

        <span v-if="$slots.default" class="ef-link--inner">
            <slot></slot>
        </span>

        <template v-if="$slots.icon">
            <slot v-if="$slots.icon" name="icon"></slot>
        </template>
    </a>
</template>
<script>
export default {
    name: 'EfLink',
    props: {
        type: {
            type: String,
            default: 'default'
        },
        underline: {
            type: Boolean,
            default: true
        },
        disabled: Boolean,
        href: String,
        icon: String
    },
    methods: {
        handleClick(event) {
            if (!this.disabled) {
                if (!this.href) {
                    this.$emit('click', event)
                }
            }
        }
    }
}
</script>