import mapboxgl from 'mapbox-gl'
import { loadCustomIcons } from '../utils/load-custom-icon'
import { watch } from 'vue'
import router from '../router'

mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN

export function useMapbox(geoJsonData, style) {
  const { query } = router.currentRoute
  const red = '#c61010'
  const green = '#229c04'
  const gray = '#7b7b7b'
  const violet = '#e834c9'
  const LAYER_TRAFFIC_LIGHTS = 'trafficLights'
  const LAYER_TRAFFIC_LIGHTS_CIRCLE = 'trafficLightsCircle'
  const SOURCE_TRAFFIC_LIGHTS = 'trafficLightsSource'

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [73.4167, 61.25],
    zoom: 13,
    pitch: 30,
  })

  const zoomObject = (e = {}) => {
    const object = e?.features ? e?.features[0] : e

    map.flyTo({
      center: object.geometry.coordinates,
      zoom: 18,
    })

    // Copy coordinates array.
    const coordinates = object.geometry.coordinates.slice()
    const id = object.properties.id
    const mode = object.properties.mode
    const state = object.properties.state
    const street1 = object.properties.street1
    const street2 = object.properties.street2

    while (Math.abs(object?.lngLat?.lng - coordinates[0]) > 180) {
      coordinates[0] += object?.lngLat?.lng > coordinates[0] ? 360 : -360
    }

    const html = `
        <p>ID: ${id}</p>
        ${street2 ? `<p>Режим: ${mode}</p>` : ''}
        <p>Состояние: ${state}</p>
        <p>Улица 1: ${street1}</p>
        ${street2 ? `<p>Улица 2: ${street2}</p>` : ''}
      `

    new mapboxgl.Popup().setLngLat(coordinates).setHTML(html).addTo(map)
  }

  map.on('load', () => {
    // Show popup and zoom
    map.on('click', LAYER_TRAFFIC_LIGHTS, zoomObject)

    // Hover state in object
    let trafficLightID = null
    map.on('mousemove', LAYER_TRAFFIC_LIGHTS, (event) => {
      map.getCanvas().style.cursor = 'pointer'

      // Check whether features exist
      if (event.features.length === 0) return

      // If quakeID for the hovered feature is not null,
      // use removeFeatureState to reset to the default behavior
      if (trafficLightID) {
        map.removeFeatureState({
          source: SOURCE_TRAFFIC_LIGHTS,
          id: trafficLightID,
        })
      }

      trafficLightID = event.features[0].id

      // When the mouse moves over the earthquakes-viz layer, update the
      // feature state for the feature under the mouse
      map.setFeatureState(
        {
          source: SOURCE_TRAFFIC_LIGHTS,
          id: trafficLightID,
        },
        {
          hover: true,
        }
      )
    })
    map.on('mouseleave', LAYER_TRAFFIC_LIGHTS, () => {
      if (trafficLightID) {
        map.setFeatureState(
          {
            source: SOURCE_TRAFFIC_LIGHTS,
            id: trafficLightID,
          },
          {
            hover: false,
          }
        )
      }
      trafficLightID = null

      // Reset the cursor style
      map.getCanvas().style.cursor = ''
    })

    // If isset query zoom and popup current object
    if (query.id) {
      const currentObject = geoJsonData.features.find(
        (object) => object.properties.id === +query.id
      )

      zoomObject(currentObject)
    }
  })

  watch(style, (theme) => {
    map.setStyle(`mapbox://styles/mapbox/${theme}-v11`)
  })

  map.on('style.load', () => {
    loadCustomIcons(map, [
      { name: 'trafficLight', url: './traffic-light.svg', sdf: true },
    ])

    // Add source
    map.addSource(SOURCE_TRAFFIC_LIGHTS, {
      type: 'geojson',
      data: geoJsonData,
      generateId: true,
    })

    // Add layer trafficLights
    map.addLayer({
      id: LAYER_TRAFFIC_LIGHTS,
      type: 'symbol',
      source: SOURCE_TRAFFIC_LIGHTS,
      paint: {
        'icon-color': [
          'case',
          ['==', ['get', 'id'], +query.id],
          violet,
          ['==', ['get', 'state'], 1],
          red,
          ['==', ['get', 'state'], 3],
          green,
          gray,
        ],
      },
      layout: {
        'icon-image': 'trafficLight',
        'icon-allow-overlap': true,
        'icon-size': 0.4,
      },
    })

    // Add layer trafficLightsCircle
    map.addLayer({
      id: LAYER_TRAFFIC_LIGHTS_CIRCLE,
      type: 'circle',
      source: SOURCE_TRAFFIC_LIGHTS,
      paint: {
        'circle-stroke-color': [
          'case',
          ['==', ['get', 'id'], +query.id],
          violet,
          ['==', ['get', 'state'], 1],
          red,
          ['==', ['get', 'state'], 3],
          green,
          gray,
        ],
        'circle-stroke-width': 3,
        'circle-color': 'transparent',
        'circle-radius': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          17,
          15,
        ],
        'circle-radius-transition': { duration: 300 },
      },
    })
  })
}
