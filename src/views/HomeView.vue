<template>
  <main class="home">
    <h1 class="heading-title">Карта светофоров г. Сургут</h1>

    <div id="map" class="map"></div>
  </main>
</template>

<script setup>
import { useData } from '../use/data'
import { jsonToGeojson } from '../utils/json-to-geojson'
import { loadCustomIcons } from '../utils/load-custom-icon'
import mapboxgl from 'mapbox-gl'
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN

const mapTrafficLights = async () => {
  try {
    const data = await useData()
    const geoJsonData = jsonToGeojson(data.value)

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [73.4167, 61.25],
      zoom: 13,
      pitch: 30,
    })

    map.on('load', () => {
      loadCustomIcons(map, [
        { name: 'trafficLight', url: './traffic-light.svg', sdf: true },
      ])
      map.addSource('trafficLightsSource', {
        type: 'geojson',
        data: geoJsonData,
      })

      const red = '#c61010'
      const green = '#229c04'
      const gray = '#7b7b7b'

      map.addLayer({
        id: 'trafficLights',
        type: 'symbol',
        source: 'trafficLightsSource',
        paint: {
          'icon-color': [
            'case',
            ['==', ['get', 'state'], 1],
            red,
            ['==', ['get', 'state'], 3],
            green,
            gray,
          ],
        },
        layout: {
          'icon-image': 'trafficLight',
          'icon-size': 0.4,
        },
      })

      map.addLayer({
        id: 'trafficLightsCircle',
        type: 'circle',
        source: 'trafficLightsSource',
        paint: {
          'circle-stroke-color': [
            'case',
            ['==', ['get', 'state'], 1],
            red,
            ['==', ['get', 'state'], 3],
            green,
            gray,
          ],
          'circle-stroke-width': 3,
          'circle-color': 'transparent',
          'circle-radius': 15,
        },
      })

      map.on('click', 'trafficLightsCircle', (e) => {
        map.flyTo({
          center: e.features[0].geometry.coordinates,
        })
      })
    })
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
