<template>
  <div class="stat">
    <h1 class="heading-title">Статистика</h1>
    <div class="stat__chart">
      <canvas ref="chart" class="stat__chart-embed"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import Chart from 'chart.js/auto'
import { useData } from '../use/data'
import { calcObjectState } from '../utils/calc-object-state'

const chart = ref()
const chartInstance = ref()

const loadChart = async () => {
  try {
    const items = await useData()
    const data = calcObjectState(items)

    chartInstance.value = new Chart(chart.value, {
      type: 'doughnut',
      data: {
        labels: [
          `${data[0]} - Недоступно`,
          `${data[1]} - Работает`,
          `${data[2]} - Потеря связи`,
        ],
        datasets: [
          {
            label: 'Состояние',
            data,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(106,215,56)',
              'rgb(177,177,177)',
            ],
            hoverOffset: 10,
          },
        ],
      },
    })
  } catch (e) {
    throw new Error(e)
  }
}

loadChart()

onUnmounted(() => {
  if (chartInstance.value) {
    chartInstance.value.destroy()
  }
})
</script>

<style scoped lang="scss">
.stat {
  &__chart {
    margin: 0 auto;
    max-width: 700px;

    &-embed {
      overflow: visible;
    }
  }
}
</style>
