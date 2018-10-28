<template>
  <transition name="error">
    <div class="error-wrapper" v-if="error">
      <div class="error">
        <h1 class="error-title">Error!</h1>
        <p class="error-text">Oooops... Something went wrong.<br>Please try again.</p>
          <button class="close-error-btn" ref="button" @click.prevent="closeError">Close</button>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  methods: {
    closeError () {
      this.$store.dispatch('setError', false)
    }
  },
  computed: {
    error () {
      return this.$store.getters.isError
    }
  }
}
</script>

<style lang="scss">
  .error-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    background: rgba(0, 0, 0, 0.5);
  }

  .error {
    width: 90%;
    background: #ffffff;
    padding: 1rem 1rem 0.5rem;
    box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.8);
    color: #000000;
  }

  .error-title {
    font-weight: 700;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
  }

  .error-text {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .close-error-btn {
    display: block;
    width: 30%;
    border: none;
    cursor: pointer;
    text-transform: uppercase;
    font-family: inherit;
    font-weight: 700;
    font-size: 0.9rem;
    padding: 0.5rem 0;
    background: inherit;
    transition: background 0.3s;
    margin-left: auto;

    &:hover {
      background: #dddddd;
    }
  }

  .error-enter,
  .error-leave-to {
    opacity: 0;
  }

  .error-enter-active,
  .error-leave-active {
    transition: opacity .3s ease .3s;
  }

  .error-enter .error,
  .error-leave-to .error {
    transform: translateY(-100vh);
  }

  .error-enter-active .error {
    transition: transform .3s ease .3s;
  }

  .error-leave-active .error {
    transition: transform .3s ease;
  }
</style>
