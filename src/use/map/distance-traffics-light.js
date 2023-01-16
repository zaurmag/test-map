import turfDistance from '@turf/distance'
import { toGeoJsonFeature } from '@/utils/to-geojson-feature'
import { toFeaturePoint } from '../../utils/to-feature-point'
import { ref, watch } from 'vue'

export const useDistanceTrafficsLight = (map) => {
  const from = ref([])
  const to = ref([])
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

  // Select points and calc distance
  map.on('click', LAYER_TRAFFIC_LIGHTS, (e) => {
    const coords = e.features[0].geometry.coordinates

    if (!from.value.length) {
      from.value = coords
    } else if (!to.value.length) {
      to.value = coords
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
          zoom: 16,
        })
      }, 1500)

      setSourceLayer()
    }
  })

  watch([from, to], ([from, to]) => {
    if (from.length && to.length) {
      map.on('style.load', setSourceLayer)
    }
  })

  return {
    from,
    to,
    distance,
  }
}
