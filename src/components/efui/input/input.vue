<template>
    <div class="input" :class="{'is-disabled': disabled }" :id="id">
        <label class="input-label" v-if="$slots.default">
            <slot />
        </label>
        <div class="input-box" :class="{'border-active':borderActive}">
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
    </div>
</template>

<script>
export default {
    name: "EfInput",
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
        type: String
    },
    data() {
        return {
            focused: false,
            passwordVisible: false
        };
    },
    mounted() {
    },
    computed: {
        nativeInputValue() {
            return this.value === null || this.value === undefined ? '' : String(this.value);
        },
    },
    methods: {
        setNativeInputValue() {
            if (this.value === this.nativeInputValue) return;
            this.value = this.nativeInputValue;
        },
        handleBlur(ev) {
            this.focused = false;
            this.$emit('blur', ev);
        },
        handleFocus(ev) {
            this.focused = true;
            this.$emit('focus', ev);
        },
        handleInput(ev) {
            if (ev.target.value === this.nativeInputValue) return;
            this.$emit('input', ev.target.value);
            this.$nextTick(this.setNativeInputValue);
        },
        handleChange: function (ev) {
            this.$emit("change", ev);
        }
    },
    watch: {
        nativeInputValue(val) {
            this.setNativeInputValue();
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
    &.inputCorrect {
        .result-icon {
            display: block;
        }
        &.inputted {
            .result-icon {
                display: none;
            }
        }
    }
    &.inputError {
        .wrong-icon {
            &.wrong-icon-cuo {
                display: block;
            }
        }
        & ~ .inputError {
            .wrong-icon {
                &.wrong-icon-cuo {
                    display: none;
                }
            }
        }
    }
    &.inputting {
        .wrong-icon {
            &.wrong-icon-cuo {
                display: none;
            }
        }
        & ~ .input {
            .wrong-icon {
                &.wrong-icon-cuo {
                    display: none;
                }
            }
        }
        &.overlength {
            .wrong-icon {
                &.wrong-icon-cuo {
                    display: block;
                }
            }
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
    .result-icon {
        position: absolute;
        left: 100%;
        top: 8px;
        margin-left: 12px;
        display: none;
        .i-correct {
            display: inline-block;
        }
    }
    .result-msg {
        height: 27px;
        position: absolute;
        top: 0;
        left: 0;
        background: #fff;
    }
    .wrong-icon {
        line-height: 17px;
        color: #bcbcbc;
        padding-left: 10px;
        &.wrong-icon-cuo {
            display: none;
            color: #ef3232;
            font-size: 14px;
            padding-left: 0;
        }
        .jiant-icon {
            float: left;
            display: inline-block;
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
            border-bottom-color: #2e92fc;
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