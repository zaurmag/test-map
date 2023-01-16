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

      <div class="home__control-item">
        <p v-if="from && to" class="home__control-label">
          Расстояние от светофора 1 до светофора 2 — {{ distance }} км.
        </p>
        <p v-else-if="from || to">
          Выберите второй светофор для измерения расстояния между ними.
        </p>
      </div>
    </div>

    <div id="map" class="map"></div>
  </main>
</template>

<script setup>
import FormSelect from '@/components/form/FormSelect.vue'
import { ref, reactive } from 'vue'
import { useData } from '../use/data'
import { jsonToGeojson } from '../utils/json-to-geojson'
import { useMapbox } from '../use/mapbox'
import { useDistanceTrafficsLight } from '../use/map/distance-traffics-light'
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css'
// import turfDistance from '@turf/distance'
// import { toFeaturePoint } from '../utils/to-feature-point'

// const from = ref([])
// const to = ref([])
// const distance = ref(0)

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

const mapTrafficLights = async () => {
  try {
    const data = await useData()
    const geoJsonData = jsonToGeojson(data.value)
    const map = useMapbox(geoJsonData, style)
    const { from, to, distance } = useDistanceTrafficsLight(map)
    // distanceFields = reactive(distanceFields)

    // from.value = distanceFields.from
    // to.value = distanceFields.to
    // distance.value = distanceFields.distance

    // const dataTrajectory = {
    //   type: 'FeatureCollection',
    //   features: [
    //     {
    //       type: 'Feature',
    //       geometry: {
    //         type: 'LineString',
    //         coordinates: [from.value, to.value],
    //       },
    //     },
    //   ],
    // }

    return {
      from,
      to,
      distance,
      aa: '3333',
    }
  } catch (e) {
    console.error(e)

    throw new Error(e)
  }
}

const { from, to, distance, aa } = mapTrafficLights()
console.log(aa)
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
