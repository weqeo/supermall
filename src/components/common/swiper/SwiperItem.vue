<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "Slide"
  }
</script>

<style lang="scss" scoped>
  .slde {
    width: 100%;
    flex-shrink: 0;
  }

  .slde img {
    width: 100%;
  }

</style>