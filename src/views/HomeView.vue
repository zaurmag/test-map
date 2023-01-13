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
    </div>

    <div id="map" class="map"></div>
  </main>
</template>

<script setup>
import FormSelect from '@/components/form/FormSelect.vue'
import { ref } from 'vue'
import { useData } from '../use/data'
import { jsonToGeojson } from '../utils/json-to-geojson'
import { useMapbox } from '../use/mapbox'
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css'

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
    useMapbox(geoJsonData, style)
  } catch (e) {
    console.error(e)

    throw new Error(e)
  }
}

mapTrafficLights()
</script>

<style scoped lang="scss">
.home {
  &__control {
    margin-bottom: 20px;

    &-item {
      display: flex;
      align-items: center;
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
