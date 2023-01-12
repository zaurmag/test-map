<template>
  <div class="objects__filter">
    <form-control
      id="street"
      v-model="street"
      class="form-control--inline"
      placeholder="Улица"
    />
    <form-select
      v-model="state"
      :options="optionsState"
      placeholder="Состояние"
    />
    <form-select v-model="mode" :options="optionsMode" placeholder="Режим" />
    <form-select v-model="type" :options="optionsType" placeholder="Тип" />

    <button
      v-if="isActive"
      class="btn btn--outline btn--danger"
      type="button"
      @click="reset"
    >
      &times;
    </button>
  </div>
</template>

<script setup>
import FormControl from '../form/FormControl.vue'
import FormSelect from '../form/FormSelect.vue'
import { ref, watch, computed } from 'vue'

const emit = defineEmits(['update:modelValue'])
defineProps({
  value: {
    type: Object,
    required: true,
  },
})

const street = ref()

// State
const state = ref('')
const optionsState = [
  {
    name: '1 - Кругом Красное',
    value: '1',
  },
  {
    name: '3 - Фаза (работает)',
    value: '3',
  },
  {
    name: '255 - Потеря связи',
    value: '255',
  },
]

// Mode
const mode = ref('')
const optionsMode = [
  {
    name: '1',
    value: '1',
  },
]

// Type
const type = ref()
const optionsType = [
  {
    name: 'Point',
    value: 'point',
  },
]

watch([street, state, mode, type], ([street, state, mode, type]) => {
  emit('input', { street, state, mode, type })
})

const isActive = computed(
  () => street.value || state.value || mode.value || type.value
)
const reset = () => {
  street.value = ''
  state.value = ''
  mode.value = ''
  type.value = ''
}
</script>

<style scoped lang="scss">
.objects {
  &__filter {
    margin-bottom: 15px;
    display: flex;
    align-items: center;

    .select {
      margin-left: 10px;
    }

    .btn {
      margin-left: 10px;
      width: 30px;
    }
  }
}
</style>
