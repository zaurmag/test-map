import turfDistance from '@turf/distance'
import { toGeoJsonFeature } from '@/utils/to-geojson-feature'
import { toFeaturePoint } from '../../utils/to-feature-point'
import { ref, watch } from 'vue'

export const useDistanceTrafficsLight = (map) => {
  const from = ref([])
  const fromID = ref(null)
  const to = ref([])
  const toID = ref(null)
  const distance = ref(0)
  const LAYER_TRAFFIC_LIGHTS = 'trafficLights'
  const SOURCE_TRAJECTORY = 'sourceTrajectory'
  const LAYER_TRAJECTORY = 'layerTrajectory'

  const setSourceLayer = () => {
    // Add layer trajectory
    if (!map.getSource(SOURCE_TRAJECTORY)) {
      map.addSource(SOURCE_TRAJECTORY, {
        type: 'geojson',
        data: toGeoJsonFeature([from.value, to.value]),
      })
    }

    if (!map.getLayer(LAYER_TRAJECTORY)) {
      map.addLayer({
        id: LAYER_TRAJECTORY,
        type: 'line',
        source: 'sourceTrajectory',
        paint: {
          'line-color': '#16c772',
          'line-width': 5,
        },
      })
    }
  }

  const clickTLHandler = (e) => {
    const object = e.features[0]
    const coords = object.geometry.coordinates

    if (!from.value.length) {
      from.value = coords
      fromID.value = object.properties.id
    } else if (!to.value.length) {
      to.value = coords
      toID.value = object.properties.id
    }

    if (from.value.length && to.value.length) {
      distance.value = +turfDistance(
        toFeaturePoint(from.value),
        toFeaturePoint(to.value)
      ).toFixed(2)

      // Zoom and center between points
      setTimeout(() => {
        map.flyTo({
          // center: object.geometry.coordinates,
          zoom: 14,
        })
      }, 1500)

      // setSourceLayer()
    }
  }

  // Select points and calc distance
  map.on('click', LAYER_TRAFFIC_LIGHTS, clickTLHandler)

  watch([from, to], ([from, to]) => {
    if (from.length && to.length) {
      setSourceLayer()
    }
  })

  map.on('style.load', setSourceLayer)

  const reset = () => {
    map.flyTo({
      zoom: 13,
    })

    if (map.getLayer(LAYER_TRAJECTORY)) {
      map.removeLayer(LAYER_TRAJECTORY)
    }

    if (map.getSource(SOURCE_TRAJECTORY)) {
      map.removeSource(SOURCE_TRAJECTORY)
    }

    from.value = []
    to.value = []
    distance.value = 0
    fromID.value = null
    toID.value = null

    map.fire('closeAllPopups')

    // Remove click listener
    map.off('click', LAYER_TRAFFIC_LIGHTS, clickTLHandler)

    // Remove style listener
    map.off('style.load', setSourceLayer)
  }

  return {
    from,
    to,
    distance,
    fromID,
    toID,
    reset,
  }
}
