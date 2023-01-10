<template>
  <main class="home">
    <h1 class="heading-title">Главная</h1>
    <button @click="increment">Увеличить счетчик</button>
    <p>{{ counter }}</p>
  </main>
</template>

<script setup>
import { useGetters, useMutations } from 'vuex-composition-helpers'
const { counter } = useGetters(['counter'])
const { increment } = useMutations(['increment'])
</script>
