<template>
  <div class="card">
    <div class="card__item card__item--id">#{{ object.id }}</div>
    <div class="card__item card__item--state">
      Состояние: {{ object.state }}
    </div>
    <div class="card__item card__item--type" v-if="object.geom.type">
      Тип: {{ object.geom.type }}
    </div>
    <div class="card__item card__item--mode" v-if="object.mode">
      Режим: {{ object.mode }}
    </div>
    <div class="card__item card__item--street" v-if="object.street1">
      Ул. 1: {{ object.street1 }}
    </div>
    <div class="card__item card__item--street" v-if="object.street2">
      Ул. 2: {{ object.street2 }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  object: {
    type: Object,
    required: true,
    default() {
      return {}
    },
  },
})
</script>

<style scoped lang="scss">
.card {
  padding: 15px;
  border-radius: 5px;
  background-color: var(--vt-c-text-dark-2);

  &__item {
    font-size: 15px;

    &--id {
      font-weight: 700;
    }

    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
}
</style>
