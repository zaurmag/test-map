<template>
  <div class="placeholder">
    <div v-for="i in +rows" :key="i" class="placeholder__row">
      <div v-for="n in +cols" :key="n" class="placeholder__col"></div>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef
defineProps({
  rows: {
    type: [Number, String],
    required: false,
    default: 10,
  },
  cols: {
    type: [Number, String],
    required: false,
    default: 8,
  },
})
</script>

<style scoped lang="scss">
.placeholder {
  width: 100%;

  &__row {
    display: flex;
    width: 100%;
  }

  &__col {
    margin: 0 5px 10px;
    width: calc(100% - 10px);
    height: 100px;
    border-radius: 5px;
    background-color: var(--vt-c-text-dark-2);
    animation: placeholder-glow 2s ease-in-out infinite;
  }
}

@keyframes placeholder-glow {
  0% {
    background-color: var(--vt-c-text-dark-2);
  }

  50% {
    background-color: var(--vt-l-gray);
  }

  100% {
    background-color: var(--vt-c-text-dark-2);
  }
}
</style>
