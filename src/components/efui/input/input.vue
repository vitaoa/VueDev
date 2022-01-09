<template>
    <div class="input" :class="{'is-disabled': disabled,'actived':focused ,'inputting':inputting}" :id="id">
        <label class="input-label" v-if="$slots.default">
            <slot />
        </label>
        <div class="input-box" :class="{'border-active':borderActive,'border-actived':borderActived}">
            <slot name="inpt" />
            <input
                :type="showPassword ? (passwordVisible ? 'text': 'password') : type"
                class="inp-font"
                :placeholder="placeholder"
                :readonly="readonly"
                :disabled="inputDisabled"
                @input="handleInput"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
            />
        </div>
        <div v-if="isShowMes" class="wrong-icon">
            <i class="iconfont icon-cuowukongxin"></i>
            {{message}}
        </div>
    </div>
</template>

<script>
import AsyncValidator from 'async-validator';
export default {
    name: "EfInput",
    inject: ['efForm'],
    props: {
        value: [String, Number],
        readonly: Boolean,
        disabled: Boolean,
        showPassword: {
            type: Boolean,
            default: false
        },
        borderActive: String,
        class: String,
        id: String,
        placeholder: String,
        type: String,
        prop: String
    },
    data() {
        return {
            focused: false,
            inputting: false,
            borderActived: false,
            passwordVisible: false,
            isRequired: false,
            isShowMes: false,
            message: ''
        };
    },
    mounted() {
        if (this.prop) {
            this.setRules();
        }
    },
    computed: {
        fieldValue() {
            return this.efForm.model[this.prop]
        }
    },
    methods: {
        getRules() {
            let formRules = this.efForm.rules;
            formRules = formRules ? formRules[this.prop] : [];
            return formRules;
        },
        setRules() {
            let rules = this.getRules();
            if (rules.length) {
                rules.forEach(rule => {
                    if (rule.required !== undefined) this.isRequired = rule.required
                });
            }
        },
        // 过滤出符合要求的 rule 规则
        getFilteredRule(trigger) {
            const rules = this.getRules();
            return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
        },
        validate(trigger, cb) {
            let rules = this.getFilteredRule(trigger);
            if (!rules || rules.length === 0) return true;
            // 使用 async-validator
            const validator = new AsyncValidator({ [this.prop]: rules });
            let model = { [this.prop]: this.fieldValue };
            validator.validate(model, { firstFields: true }, errors => {
                this.isShowMes = errors ? true : false;
                this.message = errors ? errors[0].message : '';
                if (cb) cb(this.message);
            })
        },
        handleBlur(ev) {
            this.focused = false;
            this.inputting = false;
            this.$emit('blur', ev);
            this.validate('blur');
        },
        handleFocus(ev) {
            this.focused = true;
            this.$emit('focus', ev);
        },
        handleInput(ev) {
            this.inputting = true;
            this.value = ev.target.value;
            this.borderActived = !!this.value;
            // console.log("this.value=>", this.value, !this.value)
            this.$emit('input', ev.target.value);
            this.validate('change');
        },
        handleChange: function (ev) {
            this.$emit("change", ev);
        }
    }
};
</script>
<style scoped  lang="scss">
@import "~@/scss/efui/mixins/library/placeholder";
.input {
    position: relative;
    margin-top: 18px;
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
        color: $c-red;
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
        line-height: 40px;
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
    .eye-show {
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

.input-box {
    font-size: 16px;
    position: relative;
    padding-left: 0;
    background: #fff;
    z-index: 1;
    &.border-active {
        border-bottom: 1px solid #dcdcdc;
        &.border-actived {
            border-bottom-color: $bgc-blue-default;
            transition: all 0.3s;
        }
    }
    input {
        @include placeholders(#bababa, 16px);
        font-size: 16px;
    }
    .i-phone,
    .i-vcode,
    .i-password {
        display: block;
        position: absolute;
        left: -40px;
        top: 50%;
        margin-top: -16px;
    }
}

.inp-font {
    padding: 8px 0;
    display: block;
    width: 80%;
    line-height: 20px;
}
</style>