<template>
    <div :id="id" class="input" :class="{'is-disabled': disabled,'actived':focused ,'inputting':inputting,'input-suffix':showSuffix}">
        <label v-if="$slots.default" class="input-label">
            <slot />
        </label>
        <input
            :type="showPassword ? (passwordVisible ? 'text': 'password') : type"
            class="inp-font"
            :placeholder="placeholder"
            :readonly="readonly"
            :disabled="disabled"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
        />
        <div v-if="isShowMes" class="wrong-icon">
            <i class="iconfont icon-cuowukongxin"></i>
            {{ message }}
        </div>
        <!-- clearable属性：显示一个清空的按钮 -->
        <!-- show-password属性：显示一个用于切换密码显示的处理 -->
        <span v-if="showSuffix" class="input__suffix">
            <i v-if="clearable && value" class="font icon-cuowukongxin" @click="clear"></i>
            <i v-if="showPassword" class="font" :class="{'icon-view-active':passwordVisible,'icon-miwen':!passwordVisible,'icon-icon_yulan':passwordVisible}" @click="handlePassword"></i>
        </span>
    </div>
</template>

<script>
import AsyncValidator from 'async-validator'
export default {
    name: 'EfInput',
    inject: {
        efForm: {
            default: ''
        }
    },
    props: {
        value: [String, Number],
        readonly: Boolean,
        disabled: Boolean,
        clearable: {
            type: Boolean,
            default: false
        },
        showPassword: {
            type: Boolean,
            default: false
        },
        id: String,
        placeholder: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        name: {
            type: String,
            default: ''
        },
        prop: String
    },
    data() {
        return {
            focused: false,
            inputting: false,
            passwordVisible: false, // 用于控制是否显示密码框
            isRequired: false,
            isShowMes: false,
            message: ''
        }
    },
    computed: {
        fieldValue() {
            console.log('fieldValue', this.efForm.model, this.prop)
            return this.prop ? (this.efForm ? this.efForm.model[this.prop] : this.prop) : ''
        },
        showSuffix() {
            return this.clearable || this.showPassword
        }
    },
    mounted() {
        console.log(this)
        if (this.prop) {
            this.setRules()
        }
    },
    methods: {
        getRules() {
            let formRules = this.efForm ? this.efForm.rules : ''
            if (this.prop) {
                formRules = formRules ? formRules[this.prop] : []
            }
            console.log('getRules', formRules)
            return formRules
        },
        setRules() {
            const rules = this.getRules()
            if (rules.length) {
                rules.forEach(rule => {
                    if (rule.required !== undefined) this.isRequired = rule.required
                })
            }
        },
        // 过滤出符合要求的 rule 规则
        getFilteredRule(trigger) {
            const rules = this.getRules()
            if (!rules || rules.length === 0) return true
            return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
        },
        validate(trigger, cb) {
            const rules = this.getFilteredRule(trigger)
            if (!rules || rules.length === 0) return true
            // 使用 async-validator
            const validator = new AsyncValidator({ [this.prop]: rules })
            const model = { [this.prop]: this.fieldValue }
            validator.validate(model, { firstFields: true }, errors => {
                this.isShowMes = !!errors
                this.message = errors ? errors[0].message : ''
                if (cb) cb(this.message)
            })
        },
        handleBlur(ev) {
            this.focused = false
            this.inputting = false
            this.$emit('blur', ev)
            this.validate('blur')
        },
        handleFocus(ev) {
            this.focused = true
            this.$emit('focus', ev)
        },
        handleInput(ev) {
            this.inputting = true
            // console.log('handleInput this.value=>', this.value, !this.value)
            this.$emit('input', ev.target.value)
            this.validate('change')
        },
        handleChange: function (ev) {
            this.$emit('change', ev)
        },
        handlePassword() {
            this.passwordVisible = !this.passwordVisible
        },
        clear() {
            this.$emit('input', '')
        }
    }
}
</script>
<style scoped  lang="scss">
$input-height:40px;
.input {
    position: relative;display: inline-block;
    &__suffix{
        position: absolute;
        height: 100%;
        right:10px;
        top:0;
        line-height:$input-height;
        text-align: center;
        color:#c0c4cc;
        transition: all .3s;
        z-index: 900;
        i{font-size: 14px;cursor: pointer;transition: color .2s cubic-bezier(.645,.045,.355,1);}
        .icon-view-active{color:blue;}
    }
    &.actived {
        .input-label {
            visibility: visible;
            transition: top 0.3s;
            top: 0;
        }
    }
    .input-label {
        color: #7e7e7e;
        font-size: 14px;
        display: block;
        margin-bottom: 6px;
        visibility: hidden;
        position: relative;
        top: 30px;
    }
    .wrong-icon {
        line-height: 1;
        color: red;
        font-size: 12px;
        padding-top: 0.1rem;
        .iconfont {
            vertical-align: top;
        }
    }
    .get-code {
        background: none;
        cursor: pointer;
        margin: 0;
        line-height:$input-height;
        color: #246bbb;
        font-size: 14px;
        position: absolute;
        right: 2px;
        top: 0;
        bottom: 0;
    }
    [class*="eye"] {
        position: absolute;
        right: 5px;
        top: 50%;
        margin-top: -10px;
        display: block;
        z-index: 2;
    }
    .ac-tip {
        font-size: 12px;
        color: #a5a5a5;
        padding-top: 6px;
        text-align: left;
        a {
            color: #246bbb;
        }
    }
}
.inp-font {
    padding: 8px 0;
    display: block;
    width: 80%;
    line-height: 20px;
}
</style>
