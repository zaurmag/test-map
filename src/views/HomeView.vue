<template>
  <main class="home">
    <h1 class="heading-title">Карта светофоров г. Сургут</h1>

    <div id="map" class="map"></div>
  </main>
</template>

<script setup>
import { useData } from '../use/data'
import { jsonToGeojson } from '../utils/json-to-geojson'
import { useMapbox } from '../use/mapbox'
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css'

const mapTrafficLights = async () => {
  try {
    const data = await useData()
    const geoJsonData = jsonToGeojson(data.value)
    useMapbox(geoJsonData)
  } catch (e) {
    console.error(e)

    throw new Error(e)
  }
}

mapTrafficLights()
</script>

<style scoped lang="scss">
.map {
  width: 100%;
  height: 700px;
}
</style>
