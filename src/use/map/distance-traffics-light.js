import turfDistance from '@turf/distance'
import { toGeoJsonFeature } from '@/utils/to-geojson-feature'
import { toFeaturePoint } from '../../utils/to-feature-point'
import { ref } from 'vue'

export const useDistanceTrafficsLight = (map) => {
  const from = ref([])
  const to = ref([])
  const distance = ref(0)
  const LAYER_TRAFFIC_LIGHTS = 'trafficLights'

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

      // Add layer trajectory
      map.addSource('sourceTrajectory', {
        type: 'geojson',
        data: toGeoJsonFeature([from.value, to.value]),
      })

      map.addLayer({
        id: 'layerTrajectory',
        type: 'line',
        source: 'sourceTrajectory',
        paint: {
          'line-color': '#16c772',
          'line-width': 3,
        },
      })
    }
  })

  return {
    from,
    to,
    distance,
  }
}
