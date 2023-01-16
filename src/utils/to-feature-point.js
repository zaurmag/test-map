export const toFeaturePoint = (coordinates) => {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates,
    },
  }
}
