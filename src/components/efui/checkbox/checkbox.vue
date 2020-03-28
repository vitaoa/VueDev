<template>
    <div
        class="checkbox"
        :class="[
      { 'is-disabled': isDisabled },
      { 'is-bordered': border },
      { 'is-checked': isChecked } 
    ]"
        :id="id"
        @click="handleChange"
    >
        <input class="checkbox__input" type="checkbox" :disabled="isDisabled" :name="name" v-model="value" />
        <label :for="id" v-if="$slots.default" class="checkbox__label">
            <slot></slot>
        </label>
    </div>
</template>
<script>
export default {
    name: 'EfCheckbox',
    data() {
        return {
        };
    },
    computed: {
        isChecked() {
            return this.value;
        },
        isDisabled() {
            return this.disabled;
        }
    },
    props: {
        value: Boolean,
        disabled: Boolean,
        name: String,
        id: String,
        border: Boolean
    },
    methods: {
        handleChange(ev) {
            this.value = !this.value;
            this.$emit("change", this.value);
        }
    }
};
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