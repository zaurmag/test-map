export const jsonToGeojson = (json, geomField = 'geom') => {
  const features = []
  const len = json.length

  for (let i = len - 1; i >= 0; --i) {
    const coordinates = json[i][geomField]?.coordinates
    const type = json[i][geomField]?.type
    const properties = { ...json[i] }
    delete properties[geomField]
    const geometry =
      coordinates && type
        ? {
            coordinates,
            type,
          }
        : null

    features.push({
      type: 'Feature',
      properties,
      geometry,
    })
  }

  return {
    type: 'FeatureCollection',
    features,
  }
}
