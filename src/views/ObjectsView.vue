<template>
  <main class="objects">
    <h1 class="heading-title">Объекты</h1>

    <app-placeholder-loader v-if="loader" rows="5" cols="5" />

    <template v-else>
      <objects-filter v-model="filter" />
      <div class="objects__grid">
        <app-card v-for="object in items" :key="object.id" :object="object" />
      </div>
    </template>
  </main>
</template>

<script setup>
import AppCard from '@/components/objects/ObjectsCard.vue'
import AppPlaceholderLoader from '@/components/ui/AppPlaceholderLoader.vue'
import ObjectsFilter from '@/components/objects/ObjectsFilter.vue'
import { ref, computed } from 'vue'
import { useData } from '../use/data'

const items = ref()
const loader = ref(true)
const filter = ref({})

useData().then((data) => {
  loader.value = false

  items.value = computed(() => {
    return data.value
      .filter((req) => {
        if (filter.value.street) {
          const street1 = req.street1 || ''
          const street2 = req.street2 || ''

          return (street1 + street2)
            .trim()
            .toLowerCase()
            .includes(filter.value.street.toLowerCase())
        }

        return req
      })
      .filter((req) => {
        if (filter.value.state) {
          return req.state.toString().includes(filter.value.state)
        }

        return req
      })
      .filter((req) => {
        if (filter.value.mode && req.mode) {
          return req.mode.toString().includes(filter.value.mode)
        }

        return req
      })
      .filter((req) => {
        if (filter.value.type && req.type) {
          return req.type.includes(filter.value.type)
        }

        return req
      })
  })
})
</script>

<style scoped lang="scss">
.objects {
  &__grid {
    margin: 0 -5px;
    display: flex;
    flex-wrap: wrap;

    .card {
      margin: 0 5px 10px;
      width: calc(20% - 10px);
    }
  }
}
</style>
