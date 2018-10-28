<template>
  <div class="app" id="app">
    <Loader/>
    <Error/>
    <Labels :isMetric="this.isMetric"/>
    <Card :isMetric="this.isMetric" :currentCard="this.currentCard"/>
    <Form :currentCard="this.currentCard"/>
  </div>
</template>

<script>
import './assets/compiled-icons'
import Form from './components/Form.vue'
import Card from './components/Card.vue'
import Labels from './components/Labels.vue'
import Loader from './components/Loader.vue'
import Error from './components/Error.vue'

export default {
  name: 'app',
  components: {
    Form,
    Card,
    Labels,
    Loader,
    Error
  },
  computed: {
    isMetric () {
      return this.$store.getters.isMetric
    },
    currentCard () {
      return this.$store.getters.currentCard
    },
    cards () {
      return this.$store.getters.allCards
    }
  },
  methods: {
    fullWindowHeight () {
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
  },
  beforeMount () {
    this.fullWindowHeight()
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.fullWindowHeight)
    })
  },
  beforeDestroy () {

  }
}
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    background: #000000;
  }

  .app {
    font-family: 'Roboto', sans-serif;
    color: #ffffff;
    background-image: url('../static/background.jpg');
    background-color: #4b4b4b;
    background-blend-mode: overlay;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    padding-right: 3rem;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    margin: 0 auto;
    overflow: hidden;
    max-width: 350px;
  }

  .icon {
    width: 2.5rem;
    height: 2rem;
    fill: #ffffff;

    &--small {
      height: 1.5rem;
      width: 1.5rem;
    }

    &--big {
      height: 7rem;
      width: 10rem;
    }
  }
</style>
