<template>
    <!-- 对话框的遮罩 .self代表只有自己点击才触发 -->
    <transition name="dialog-fade">
        <div v-show="visible" class="dialog__wrapper" @click.self="handleClose">
            <div class="dialog" :style="{width,marginTop:top}">
                <div class="dialog__header">
                    <slot name="title">
                        <!-- 默认标题 -->
                        <span class="dialog__title">{{ title }}</span>
                    </slot>
                    <span class="dialog__headerbtn" @click="handleClose">
                        <i class="font icon-cuowukongxin"></i>
                    </span>
                </div>
                <div class="dialog__body">
                    <slot/>
                </div>
                <div v-if="$slots.footer" class="dialog__footer">
                    <slot name="footer" />
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'EfDailog',
    props: {
        title: {
            type: String,
            default: '提示'
        },
        width: {
            type: String,
            default: '30%'
        },
        visible: {
            type: Boolean,
            default: false
        },
        top: {
            type: String,
            default: '10vh'
        }
    },
    methods: {
        handleClose: function() {
            //
            this.$emit('update:visible', false)
        }
    }
}
</script>
<style scoped lang="scss">
.popup-tb{display: table;width:100%;height:100%;text-align: center;
    .popup-tb-cell{display: table-cell;vertical-align: middle;text-align: center;}
}
.dialog__wrapper{position:fixed;left:0;top:0;bottom:0;right:0;background:rgba(#000,.4);z-index:9999;
    .dialog{margin:0 auto;width:50%;position: relative;border-radius: 6px;background-color:#fff8f0;box-shadow:0 0 6px rgba(0, 0, 0, .5);
        &__header{padding: 20px;text-align:center;
            .dialog__title{font-size: 20px;color:#333;line-height:1.5;}
            .dialog__headerbtn{position: absolute;top:10px;right:10px;display: block;cursor: pointer;transition: all ease 0.6s;
                .font{font-size: 20px;color:#999;}
                &:hover{transform: rotate(-180deg);}
            }
        }
        &__body{padding:30px 20px;color:#555;font-size: 14px;}
        &__footer{text-align: right;padding:20px;
            /deep/{
                .btn{font-size: 16px;
                    & + .btn{margin-left: 10px;}
                }
            }
        }
    }
}
//transition过渡特效
.dialog-fade-enter-active{animation: fade .3s;}
.dialog-fade-leave-active{animation: fade .3s reverse;}
@keyframes fade {
    0%{opacity: 0;}
    100%{opacity: 1;}
}
</style>