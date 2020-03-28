<template lang="html">
    <button ref="btn" v-bind="$attrs" :type="nativeType" :disabled="buttonDisabled || loading" :class="[`btn-${isColor()?color:'default'}`,`btn-${type}`,{
      'isActive':isActive,
      'includeIcon':icon,
      'includeIconOnly':icon && !$slots.default,
      'radius':radius,
      'round':round
    }]" class="component btn" name="button" v-on="listeners">
        <span v-if="$slots.default" class="btn-text"><slot/></span>
    </button>
</template>

<script>
import _color from '@/utils/color.js'
export default {
    name: 'EfButton',
    inheritAttrs: false,
    props: {
        type: {
            default: null,
            type: String
        },
        color: {
            default: 'primary',
            type: String
        },
        icon: {
            type: String,
            default: null
        },
        nativeType: {
            type: String,
            default: 'button'
        },
        loading: Boolean,
        disabled: Boolean,
        radius: {
            default: false,
            type: Boolean
        },
        round: {
            default: false,
            type: Boolean
        },
        to: {
            default: false,
            type: String | Object
        },
        href: {
            default: '',
            type: String | Object
        },
        target: {
            default: false,
            type: [Boolean, String]
        }
    },
    data() {
        return {
            isActive: false
        }
    },
    computed: {
        buttonDisabled() {
            return this.disabled;
        },
        listeners() {
            // console.log(this.$listeners)
            return {
                ...this.$listeners,
                click: (event) => this.clickButton(event),
                blur: (event) => this.blurButton(event)
            }
        }
    },
    methods: {
        routerPush() {
            this.$router.push(this.to)
        },
        blurButton(event) {
            this.$emit('blur', event)
        },
        clickButton(event) {
            this.$emit('click', event)
            if (this.isActive) {
                return
            }
            if (this.to) {
                this.routerPush()
            }
            if (this.href) {
                if (typeof (this.href) == 'string') {
                    this.target ? window.open(this.href) : window.location.href = this.href
                } else {
                    this.target ? window.open(this.href.url) : window.location.href = this.href.url
                }
            }
            this.isActive = true
        },
        isColor() {
            return _color.isColor(this.color)
        }
    }
}
</script>
<style scoped lang="scss">
@import "~@/scss/efui/components/button";
</style>