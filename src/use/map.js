import mapboxgl from 'mapbox-gl'

export function useMap(id) {
  return new mapboxgl.Map({
    container: id,
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [73.4167, 61.25],
    zoom: 13,
    pitch: 30,
  })
}
