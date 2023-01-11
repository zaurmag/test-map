export function calcObjectState(items) {
  const state1 = []
  const state3 = []
  const state255 = []

  items.value.forEach((item) => {
    switch (item.state) {
      case 1:
        state1.push(item.state)
        break

      case 3:
        state3.push(item.state)
        break

      case 255:
        state255.push(item.state)
        break

      default:
    }
  })

  return [state1.length, state3.length, state255.length]
}
