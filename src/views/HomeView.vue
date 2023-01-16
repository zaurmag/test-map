<template>
  <main class="home">
    <h1 class="heading-title">Карта светофоров г. Сургут</h1>

    <div class="home__control">
      <div class="home__control-item">
        <p class="home__control-label">Переключить тему:</p>
        <form-select
          v-model="style"
          :options="optionsStyle"
          placeholder="Переключить тему" />
      </div>

      <div class="home__control-item home__control-item--measure-distance">
        <button
          v-if="!distanceFields?.from?.length"
          class="btn btn--blue btn--s30"
          type="button"
          @click="measureDistance = true">
          Измерить расстояние между светофорами
        </button>

        <p v-if="measureDistance && !distanceFields?.from?.length">
          Выберите первый светофор
        </p>

        <template v-if="isKeysObject(distanceFields)">
          <p
            v-if="distanceFields.from.length && distanceFields.to.length"
            class="home__control-label">
            Расстояние от светофора
            <strong>#{{ distanceFields.fromID }}</strong> до светофора
            <strong>#{{ distanceFields.toID }}</strong> —
            {{ distanceFields.distance }}
            км.
          </p>

          <p v-else-if="distanceFields.from.length || distanceFields.to.length">
            Выберите второй светофор.
          </p>

          <button
            v-if="distanceFields?.from?.length"
            class="btn btn--outline btn--danger btn--s30"
            type="button"
            @click="measureDistanceReset">
            &times;
          </button>
        </template>
      </div>
    </div>

    <div id="map" class="map"></div>
  </main>
</template>

<script setup>
import FormSelect from '@/components/form/FormSelect.vue'
import { ref, watch } from 'vue'
import { useData } from '../use/data'
import { jsonToGeojson } from '../utils/json-to-geojson'
import { useMapbox } from '../use/mapbox'
import { useDistanceTrafficsLight } from '../use/map/distance-traffics-light'
import { isKeysObject } from '@/utils/helpers'
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css'

const distanceFields = ref({})
const style = ref('streets')
const optionsStyle = [
  {
    name: 'Стандартная',
    value: 'streets',
  },
  {
    name: 'Светлая',
    value: 'light',
  },
  {
    name: 'Темная',
    value: 'dark',
  },
]
const measureDistance = ref(false)

const mapTrafficLights = async () => {
  try {
    const data = await useData()
    const geoJsonData = jsonToGeojson(data.value)
    const map = useMapbox(geoJsonData, style)
    watch(measureDistance, (val) => {
      if (val) {
        distanceFields.value = useDistanceTrafficsLight(map)
      }
    })
  } catch (e) {
    console.error(e)

    throw new Error(e)
  }
}

const measureDistanceReset = () => {
  measureDistance.value = false
  distanceFields.value.reset()
  distanceFields.value = {}
}

mapTrafficLights()
</script>

<style scoped lang="scss">
.home {
  &__control {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    &-item {
      display: flex;
      align-items: center;

      &--measure-distance {
        p {
          margin-left: 15px;
        }

        .btn {
          &:last-child {
            margin-left: 15px;
          }
        }
      }

      &:not(:last-child) {
        margin-right: 20px;
      }
    }

    &-label {
      color: var(--vt-c-black-mute);
      margin-right: 15px;
    }

    .select {
      max-width: 180px;
    }
  }

  .map {
    width: 100%;
    height: 700px;
  }
}
</style>
