<template>
  <div class="card">
    <div class="card__item card__item--id">#{{ object.id }}</div>
    <div class="card__item card__item--state">
      Состояние: {{ object.state }}
    </div>
    <div v-if="object.geom.type" class="card__item card__item--type">
      Тип: {{ object.geom.type }}
    </div>
    <div v-if="object.mode" class="card__item card__item--mode">
      Режим: {{ object.mode }}
    </div>
    <div v-if="object.street1" class="card__item card__item--street">
      Ул. 1: {{ object.street1 }}
    </div>
    <div v-if="object.street2" class="card__item card__item--street">
      Ул. 2: {{ object.street2 }}
    </div>

    <div class="card__item card__item--btn">
      <router-link
        class="btn btn--primary"
        :to="{
          name: 'home',
          query: {
            id: object.id,
            coords: JSON.stringify(object.geom.coordinates),
          },
        }"
        >Перейти к объекту</router-link
      >
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
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 5px;
  background-color: var(--vt-c-text-dark-2);

  &__item {
    font-size: 15px;

    &--id {
      font-weight: 700;
    }

    &--btn {
      margin-top: auto;

      .btn {
        width: 100%;
      }
    }

    &:not(:last-child) {
      margin-bottom: 5px;
    }

    &:nth-last-child(2) {
      margin-bottom: 15px;
    }
  }
}
</style>
