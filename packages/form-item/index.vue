<template>
    <form class="form-item">
        <label class="form-item__Label" :style="labelStyle">{{ label }}</label>
        <div class="form-item__content">
            <slot></slot>
        </div>
    </form>
</template>
<script>
export default {
    name: 'EfFormItem',
    props: {
        label: {
            type: String,
            default: ''
        }
    },
    inject: ['efForm'],
    computed: {
        labelStyle() {
            return {
                width: this.efForm.labelWidth
            }
        }
    }
}
</script>
<style scoped lang="scss">
$input-height:40px;
.form-item{margin-bottom: 25px;
    &__Label{text-align: right;vertical-align: middle;float: left;font-size: 14px;color:#666;line-height:$input-height;padding: 0 12px 0 0;box-sizing: border-box;}
    &__content{line-height:$input-height;position: relative;font-size: 14px;overflow: hidden;}
}
</style>