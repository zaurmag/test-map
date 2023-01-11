<template>
  <div :class="['select', { 'is-open': isOpen }]">
    <div
      ref="selectText"
      :class="[
        'select__text',
        'btn',
        'btn-light',
        { 'text-secondary': text === 'Выберите...' },
      ]"
      @click="toggle"
    >
      {{ text }}
    </div>

    <div class="select__dropdown">
      <ul class="select__list shadow-sm">
        <li
          v-for="option in options"
          :key="option.name"
          :class="['select__item', { 'is-selected': text === option.name }]"
          :data-value="option.value"
          :title="option.name"
          @click="select(option)"
        >
          {{ option.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Выберите...',
  },
})

const selectText = ref()
const text = ref(props.placeholder)
const isOpen = ref(false)
const mValue = computed(() => props.value)

watch(mValue, (value) => {
  if (value === '') {
    text.value = props.placeholder
  }
})

const toggle = () => {
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}

const select = (option) => {
  text.value = option.name
  emit('input', option.value)
  close()
}

const clickHandler = (event) => {
  if (event.target !== selectText.value) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', clickHandler, true)
})

onUnmounted(() => {
  document.removeEventListener('click', clickHandler, true)
})
</script>

<style scoped lang="scss">
.select {
  $self: &;

  position: relative;
  font-size: 14px;
  height: 30px;

  &__text {
    align-items: center;
    display: flex;
    color: var(--vt-c-text-light-2);
    cursor: pointer;
    justify-content: space-between;
    height: 100%;
    background-color: var(--vt-c-text-dark-2);
    border-radius: 4px;
    padding: 0 15px;

    &::after {
      border-top: 1px solid #000;
      border-right: 1px solid #000;
      content: '';
      transform: rotate(135deg);
      transition: transform 0.2s ease;
      margin-left: 10px;
      display: block;
      height: 6px;
      width: 6px;
    }
  }

  &__dropdown {
    display: none;
    position: absolute;
    top: 35px;
    left: 0;
    right: 0;
    z-index: 10;
    min-width: 120px;
  }

  &.is-open {
    #{$self} {
      &__dropdown {
        display: block;
      }

      &__text {
        &::after {
          transition: transform 0.2s ease;
          transform: rotate(-45deg);
        }
      }
    }
  }

  &.is-invalid {
    border-color: red;
  }

  &__list {
    background-color: #fff;
    border: 1px solid var(--vt-c-text-dark-2);
    border-radius: 5px;
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;

    li {
      padding: 5px 15px;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;

      &:hover {
        background-color: var(--vt-c-text-dark-2);
      }

      &.is-selected {
        background-color: hsla(160, 100%, 37%, 0.2);
      }
    }
  }

  &--bordered {
    border: 1px solid var(--vt-c-text-dark-2);
    border-radius: 5px;
    height: auto;

    #{$self} {
      &__text {
        padding: 13px 20px;
        background-color: transparent !important;
      }
      &__dropdown {
        top: 50px;
      }
    }
  }

  &--styled {
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 4px;
    height: 35px;

    &:hover,
    &.is-open {
      background-color: var(--vt-primary);
      transition: background-color 0.2s ease;
    }
  }
}
</style>
