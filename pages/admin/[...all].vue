<script setup>
const time = ref(0)
time.value = String(new Date())
</script>

<template>
  <div style="font-size: 1rem;">
    admin {{ time }}
  </div>
</template>

<style lang="scss" scoped>

</style>
