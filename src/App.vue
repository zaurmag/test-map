<script setup>
import TheNav from '@/components/TheNav.vue'
</script>

<template>
  <div class="page">
    <div class="container">
      <the-nav />

      <router-view />
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  height: 100%;
}
</style>
