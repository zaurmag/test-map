export const toGeoJsonFeature = (points) => {
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: points,
        },
      },
    ],
  }
}
