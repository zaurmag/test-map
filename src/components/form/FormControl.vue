<template>
  <div>
    <label
      v-if="label"
      :class="['form-control__label', classListLabel]"
      :for="id"
      >{{ label }}</label
    >

    <input
      :id="id"
      :class="['form-control__input', classListInput]"
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const emit = defineEmits(['input'])
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
    default: 'text',
  },
  value: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  classListInput: {
    type: String,
    default: '',
  },
  classListLabel: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const model = computed({
  get() {
    return props.value
  },
  set(value) {
    emit('input', value)
  },
})
</script>

<style scoped lang="scss">
.form-control {
  $self: &;

  &__label {
    display: block;
    color: var(--vt-c-text-light-2);
  }

  &__input {
    padding: 0 10px;
    border-radius: 3px;
    border: 1px solid #999;
    height: 30px;
    transition: border-color 0.3s ease;
    color: var(--vt-c-black-mute);

    &:focus {
      outline: none;
      border-color: var(--vt-primary);
    }
  }

  &--inline {
    display: flex;
    align-items: center;

    #{$self} {
      &__label {
        margin-right: 12px;
      }
    }
  }
}
</style>
