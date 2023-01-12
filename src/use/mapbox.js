import mapboxgl from 'mapbox-gl'
import { loadCustomIcons } from '../utils/load-custom-icon'

mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN

export function useMapbox(geoJsonData) {
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
      generateId: true,
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
        'circle-radius': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          17,
          15,
        ],
        'circle-radius-transition': { duration: 1000 },
      },
    })

    // Show popup
    map.on('click', 'trafficLights', (e) => {
      map.flyTo({
        center: e.features[0].geometry.coordinates,
        zoom: 18,
      })

      // Copy coordinates array.
      const coordinates = e.features[0].geometry.coordinates.slice()
      const mode = e.features[0].properties.mode
      const state = e.features[0].properties.state
      const street1 = e.features[0].properties.street1
      const street2 = e.features[0].properties.street2

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
      }

      const html = `
        <p>Режим: ${mode}</p>
        <p>Состояние: ${state}</p>
        <p>Улица 1: ${street1}</p>
        ${street2 ? `<p>Улица 2: ${street2}</p>` : ''}      
      `

      new mapboxgl.Popup().setLngLat(coordinates).setHTML(html).addTo(map)
    })

    let trafficLightID = null

    // Hover state in object
    map.on('mousemove', 'trafficLights', (event) => {
      map.getCanvas().style.cursor = 'pointer'

      // Check whether features exist
      if (event.features.length === 0) return

      // If quakeID for the hovered feature is not null,
      // use removeFeatureState to reset to the default behavior
      if (trafficLightID) {
        map.removeFeatureState({
          source: 'trafficLightsSource',
          id: trafficLightID,
        })
      }

      trafficLightID = event.features[0].id

      // When the mouse moves over the earthquakes-viz layer, update the
      // feature state for the feature under the mouse
      map.setFeatureState(
        {
          source: 'trafficLightsSource',
          id: trafficLightID,
        },
        {
          hover: true,
        }
      )
    })
    map.on('mouseleave', 'trafficLights', () => {
      if (trafficLightID) {
        map.setFeatureState(
          {
            source: 'trafficLightsSource',
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
  })
}
