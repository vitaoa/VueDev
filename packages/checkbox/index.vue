<template>
    <div
        :id="id"
        class="checkbox"
        :class="[{ 'is-disabled': isDisabled }, { 'is-bordered': border }, { 'is-checked': isChecked } ]"
        @click="handleChange"
    >
        <input v-model="value" class="checkbox__input" x type="checkbox" :disabled="isDisabled" :name="name" />
        <label v-if="$slots.default" :for="id" class="checkbox__label">
            <slot />
        </label>
    </div>
</template>
<script>
export default {
    name: 'EfCheckbox',
    props: {
        value: Boolean,
        disabled: Boolean,
        name: String,
        id: String,
        border: Boolean
    },
    data() {
        return {
        }
    },
    computed: {
        isChecked() {
            return this.value
        },
        isDisabled() {
            return this.disabled
        }
    },
    methods: {
        handleChange(ev) {
            this.value = !this.value
            this.$emit('change', this.value)
        }
    }
}
</script>
<style scoped lang="scss">
.checkbox {
    &__input {
        vertical-align: middle;
    }
    &__label {
        margin-left: 0.1rem;
    }
}
</style>