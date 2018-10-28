<template>
  <div class="loader" v-if="loading">
    <div class="loader__dot loader__dot--one"></div>
    <div class="loader__dot loader__dot--two"></div>
    <div class="loader__dot loader__dot--three"></div>
  </div>
</template>

<script>
export default {
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style lang="scss">
  .loader {
    position: absolute;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;

    &__dot {
      width: 1rem;
      height: 1rem;
      background: #03a9f4;
      margin: 0 0.5rem;
      border-radius: 50%;
      animation: pulse 0.9s ease-in-out infinite;

      &--two {
        animation-delay: 0.15s;
      }

      &--three {
        animation-delay: 0.3s;
      }
    }
  }

  @keyframes pulse {
      0% {
      -webkit-transform: scale(0);
      transform: scale(0);
    } 40%, 100% {
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
    }
  }
</style>
