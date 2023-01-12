import { onMounted } from 'vue'
import { useGetters, useActions } from 'vuex-composition-helpers'

export function useData() {
  return new Promise((resolve) => {
    const { data } = useGetters(['data'])
    const { loadData } = useActions(['loadData'])

    onMounted(async () => {
      await loadData()
      resolve(data)
    })
  })
}
