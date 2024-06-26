<template>
    <button
        :type="nativeType"
        :disabled="buttonDisabled || loading"
        class="btn"
        :class="[`btn-${isColor()?color:'default'}`,`${!!type?'btn-'+type:''}`,{'active':isActive,'includeIcon':icon,'includeIconOnly':icon && !$slots.default,'radius':radius,'round':round,'circle':circle}]"
        v-on="listeners"
    >
        <i v-if="icon" :class="icon"></i>
        <span v-if="$slots.default" class="btn-text">
            <slot />
        </span>
    </button>
</template>
<script>
export default {
    name: 'EfButton',
    inheritAttrs: false,
    props: {
        type: {
            default: '',
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
        circle: {
            default: false,
            type: Boolean
        },
        href: {
            default: '',
            type: String || Object
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
            return this.disabled
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
            return ['primary', 'info', 'success', 'danger', 'warning', 'default', 'link'].includes(this.color)
        }
    }
}
</script>
<style scoped lang="scss">
/* ============ Button ============ */
.btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    & + .btn{margin-left: 4px;
        &.btn-block{margin-left: auto;margin-top:4px;}
    }
}
.btn.active,
.btn:active {
    outline: 0;
    -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.15);
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.15);
}
button[disabled],
input[disabled] {
    cursor: default;
}

.btn.disabled,
.btn[disabled] {
    cursor: not-allowed;
    filter: alpha(opacity=65);
    -webkit-box-shadow: none;
    box-shadow: none;
    opacity: 0.2;
}

.btn.radius {
    border-radius: 4px;
}

.btn.round {
    border-radius: 1000px;
}
.btn.circle{
    border-radius: 50%;
}

.btn-default {
    color: #333;
    background-color: #fff;
    border-color: #ccc;
}

.btn-default.disabled.active,
.btn-default.disabled:active,
.btn-default.disabled:focus,
.btn-default.disabled:hover,
.btn-default[disabled].active,
.btn-default[disabled]:active,
.btn-default[disabled]:focus,
.btn-default[disabled]:hover {
    background-color: #fff;
    border-color: #ccc;
}

.btn-default:hover {
    background-color: #e6e6e6;
    border-color: #adadad;
}

.btn-primary {
    color: #fff;
    background-color: #0e90d2;
    border-color: #087fbb;
}

.btn-primary.disabled.active,
.btn-primary.disabled:active,
.btn-primary.disabled:focus,
.btn-primary.disabled:hover,
.btn-primary[disabled].active,
.btn-primary[disabled]:active,
.btn-primary[disabled]:focus,
.btn-primary[disabled]:hover {
    background-color: #0e90d2;
    border-color: #0e90d2;
}

.btn-primary:hover {
    background-color: #0c79b1;
    border-color: #0a6999;
}

.btn-info {
    color: #fff;
    background-color: #3bb4f2;
    border-color: #3caae2;
}

.btn-info.disabled.active,
.btn-info.disabled:active,
.btn-info.disabled:focus,
.btn-info.disabled:hover,
.btn-info[disabled].active,
.btn-info[disabled]:active,
.btn-info[disabled]:focus,
.btn-info[disabled]:hover {
    background-color: #3bb4f2;
    border-color: #3bb4f2;
}

.btn-info:hover {
    background-color: #19a7f0;
    border-color: #0f9ae0;
}

.btn-success {
    color: #fff;
    background-color: #5eb95e;
    border-color: #5eb95e;
}

.btn-success.disabled.active,
.btn-success.disabled:active,
.btn-success.disabled:focus,
.btn-success.disabled:hover,
.btn-success[disabled].active,
.btn-success[disabled]:active,
.btn-success[disabled]:focus,
.btn-success[disabled]:hover {
    background-color: #5eb95e;
    border-color: #5eb95e;
}

.btn-success:hover {
    background-color: #4aaa4a;
    border-color: #429842;
}

.btn-warning {
    color: #fff;
    background-color: #f37b1d;
    border-color: #f37b1d;
}

.btn-warning.disabled.active,
.btn-warning.disabled:active,
.btn-warning.disabled:focus,
.btn-warning.disabled:hover,
.btn-warning[disabled].active,
.btn-warning[disabled]:active,
.btn-warning[disabled]:focus,
.btn-warning[disabled]:hover {
    background-color: #f37b1d;
    border-color: #f37b1d;
}

.btn-warning:hover {
    background-color: #e0690c;
    border-color: #c85e0b;
}

.btn-danger {
    color: #fff;
    background-color: #dd514c;
    border-color: #dd514c;
}

.btn-danger.disabled.active,
.btn-danger.disabled:active,
.btn-danger.disabled:focus,
.btn-danger.disabled:hover,
.btn-danger[disabled].active,
.btn-danger[disabled]:active,
.btn-danger[disabled]:focus,
.btn-danger[disabled]:hover {
    background-color: #dd514c;
    border-color: #dd514c;
}

.btn-danger:hover {
    background-color: #d7342e;
    border-color: #c62b26;
}

.btn-link {
    color: #0e90d2;
    font-weight: 400;
    cursor: pointer;
    padding-left: 0;
    padding-right: 0;
    border-radius: 0;
    background-color: transparent;
}

.btn-link.disabled.active,
.btn-link.disabled:active,
.btn-link.disabled:focus,
.btn-link.disabled:hover,
.btn-link[disabled].active,
.btn-link[disabled]:active,
.btn-link[disabled]:focus,
.btn-link[disabled]:hover {
    color: #0e90d2;
    text-decoration: none;
}

.btn-link.active,
.btn-link:active,
.btn-link:focus,
.btn-link:hover {
    background-color: transparent;
    border-color: transparent;
    outline: none;
    -webkit-box-shadow: none;
    box-shadow: none;
}

.btn-block {
    display: block;
    width: 100%;
    padding-left: 0;
    padding-right: 0;
}

.btn-block + .btn-block {
    margin-top: 0.5em;
}

.btn-default.active,
.btn-default:active {
    background-color: #e6e6e6;
    border-color: #adadad;
}

.btn-default.active:focus,
.btn-default.active:hover,
.btn-default:active:focus,
.btn-default:active:hover {
    background-color: #d4d4d4;
    border-color: #8c8c8c;
}

.btn-primary.active,
.btn-primary:active {
    background-color: #337ab7;
    border-color: #2e6da4;
}

.btn-primary.active:focus,
.btn-primary.active:hover,
.btn-primary:active:focus,
.btn-primary:active:hover {
    background-color: #204d74;
    border-color: #122b40;
}

.btn-success.active,
.btn-success:active {
    background-color: #449d44;
    border-color: #398439;
}

.btn-success.active:focus,
.btn-success.active:hover,
.btn-success:active:focus,
.btn-success:active:hover {
    background-color: #398439;
    border-color: #255625;
}

.btn-info.active,
.btn-info:active {
    background-color: #31b0d5;
    border-color: #269abc;
}

.btn-info.active:focus,
.btn-info.active:hover,
.btn-info:active:focus,
.btn-info:active:hover {
    background-color: #269abc;
    border-color: #1b6d85;
}

.btn-warning.active,
.btn-warning:active {
    background-color: #ec971f;
    border-color: #d58512;
}

.btn-warning.active:focus,
.btn-warning.active:hover,
.btn-warning:active:focus,
.btn-warning:active:hover {
    background-color: #d58512;
    border-color: #985f0d;
}

.btn-danger.active,
.btn-danger:active {
    background-color: #c9302c;
    border-color: #ac2925;
}

.btn-danger.active:focus,
.btn-danger.active:hover,
.btn-danger:active:focus,
.btn-danger:active:hover {
    background-color: #ac2925;
    border-color: #761c19;
}

.btn-group {
    position: relative;
    display: inline-block;
    vertical-align: middle;
}

.btn-group > .btn {
    position: relative;
    float: left;
}

.btn-group > .btn:not(:first-child):not(:last-child) {
    border-radius: 0;
}

.btn-group > .btn:first-child {
    margin-left: 0;
}

.btn-group > .btn:first-child:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.btn-group > .btn:last-child:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.btn-group > .btn.active,
.btn-group > .btn:active,
.btn-group > .btn:focus,
.btn-group > .btn:hover {
    z-index: 2;
}

.btn-group .btn + .btn,
.btn-group .btn + .btn-group,
.btn-group .btn-group + .btn,
.btn-group .btn-group + .btn-group {
    margin-left: -1px;
}

.btn-group-vertical {
    position: relative;
    display: inline-block;
    vertical-align: middle;
}

.btn-group-vertical > .btn,
.btn-group-vertical > .btn-group,
.btn-group-vertical > .btn-group > .btn {
    display: block;
    float: none;
    width: 100%;
    max-width: 100%;
}

.btn-group-vertical > .btn-group > .btn {
    float: none;
}

.btn-group-vertical > .btn + .btn,
.btn-group-vertical > .btn + .btn-group,
.btn-group-vertical > .btn-group + .btn,
.btn-group-vertical > .btn-group + .btn-group {
    margin-top: -1px;
    margin-left: 0;
}

.btn-group-vertical > .btn:not(:first-child):not(:last-child) {
    border-radius: 0;
}

.btn-group-vertical > .btn:first-child:not(:last-child) {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.btn-group-vertical > .btn:last-child:not(:first-child) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn {
    border-radius: 0;
}

.btn-group-vertical
    > .btn-group:first-child:not(:last-child)
    > .btn:last-child {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.btn-group-vertical
    > .btn-group:last-child:not(:first-child)
    > .btn:first-child {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

.btn-group-vertical > .btn.active,
.btn-group-vertical > .btn:active,
.btn-group-vertical > .btn:focus,
.btn-group-vertical > .btn:hover {
    z-index: 2;
}

.btn-group-vertical > .btn {
    position: relative;
}

.btn-group-justify {
    display: table;
    width: 100%;
    table-layout: fixed;
    border-collapse: separate;
}

.btn-group-justify > .btn,
.btn-group-justify > .btn-group {
    display: table-cell;
    float: none;
    width: 1%;
}

.btn-group-justify > .btn-group .btn {
    width: 100%;
}

.caret {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 2px;
    vertical-align: middle;
    border-top: 4px dashed;
    border-top: 4px solid \9;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
}

.dropdown,
.dropup {
    position: relative;
}

.dropdown-toggle:focus {
    outline: 0;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    display: none;
    float: left;
    min-width: 160px;
    padding: 5px 0;
    margin: 2px 0 0;
    font-size: 14px;
    text-align: left;
    list-style: none;
    background-color: #fff;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid #ccc;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
}

.dropdown-menu .divider {
    height: 1px;
    margin: 9px 0;
    overflow: hidden;
    background-color: #e5e5e5;
}

.dropdown-menu > li > a {
    display: block;
    padding: 3px 20px;
    clear: both;
    font-weight: 400;
    line-height: 1.42857143;
    color: #333;
    white-space: nowrap;
}

.dropdown-menu > li > a:focus,
.dropdown-menu > li > a:hover {
    color: #262626;
    text-decoration: none;
    background-color: #f5f5f5;
}

.open > .dropdown-menu {
    display: block;
}

.open > a {
    outline: 0;
}

.dropup .caret,
.navbar-fixed-bottom .dropdown .caret {
    content: "";
    border-top: 0;
    border-bottom: 4px dashed;
    border-bottom: 4px solid \9;
}

.dropup .dropdown-menu,
.navbar-fixed-bottom .dropdown .dropdown-menu {
    top: auto;
    bottom: 100%;
    margin-bottom: 2px;
}
</style>