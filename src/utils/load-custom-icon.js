export const loadCustomIcons = (mapgl, array) => {
  const MAP_ICON_SIZE = 64

  return array.map((item) => {
    return new Promise((resolve) => {
      const image = new Image(MAP_ICON_SIZE, MAP_ICON_SIZE)
      image.crossOrigin = 'Anonymous'
      image.style.backgroundPosition = '50%, 50%'
      image.style.backgroundSize = '100%'
      image.addEventListener('load', () => {
        if (!mapgl.hasImage(item.name)) {
          mapgl.addImage(item.name, image, { sdf: item.sdf })
        }
        resolve()
      })

      image.src = item.url
    })
  })
}
