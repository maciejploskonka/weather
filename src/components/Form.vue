<template>
  <div>
    <button class="show-form-btn" :class="{ 'show-form-btn--small': currentCard }" @click="toggleForm">Add location</button>
    <transition name="form">
      <div class="form-wrapper" v-if="formIsOpen">
        <form class="form" id="form">
          <div class="input-wrapper">
            <label class="input-label" for="name">Add New Location</label>
            <input class="input" placeholder="Type City name" type="text" name="city" required autocomplete="off" ref="input" v-model="inputValue">
            <div class="btn-wrapper">
              <button class="add-city-btn" @click.prevent="getWeather">Add</button>
              <button class="cancel-btn" @click.prevent="toggleForm">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  props: {
    currentCard: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      formIsOpen: false,
      inputValue: ''
    }
  },
  computed: {
    formIsNotEmpty () {
      return this.inputValue.trim() !== ''
    }
  },
  methods: {
    toggleForm () {
      if (!this.formIsOpen) {
        this.formIsOpen = true
        this.$nextTick(() => {
          this.$refs.input.focus()
        })
      } else if (this.formIsOpen) {
        this.formIsOpen = false
        this.inputValue = ''
        this.suggestedCity = ''
      }
    },
    getWeather () {
      if (!this.formIsNotEmpty) {
        return
      }
      this.$store.dispatch('getWeather', this.inputValue)
      this.toggleForm()
    }
  }
}
</script>

<style lang="scss">
  .show-form-btn {
    border: 0;
    position: absolute;
    bottom: 0;
    text-transform: uppercase;
    font-size: 0.9rem;
    width: calc(100% - 1rem);
    margin: 0.5rem;
    padding: 1rem 0;
    box-shadow: -3px 3px 4px 0px rgba(0, 0, 0, 0.5);
    background: #777777;
    color: #ffffff;
    text-align: center;
    cursor: pointer;
    transition: width 0.3s ease-in-out;

    &--small {
      width: calc(100% - 3rem - 1rem);
    }
  }

  .form-wrapper {
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
    z-index: 1;
    background: rgba(0, 0, 0, 0.5);
    transition: opacity .3s ease;
  }

  .form {
    width: 90%;
    background: #ffffff;
    padding: 1rem 1rem 0.5rem;
    box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.8);
    transition: transform .3s ease;
  }

  .input-wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .input-label {
    color: #000000;
    font-weight: 700;
    margin-bottom: 2rem;
  }

  .input {
    border: none;
      background: #dddddd;
    height: 2rem;
    font-size: 1rem;
    font-family: inherit;
    padding: 0 0.5rem;
    margin-bottom: 1.5rem;
    border-radius: 0;
    -webkit-appearance: none;
  }

  .btn-wrapper {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;
  }

  .add-city-btn, .cancel-btn {
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

    &:hover {
      background: #dddddd;
    }
  }

  .form-enter,
  .form-leave-to {
    opacity: 0;
  }

  .form-enter .form,
  .form-leave-to .form {
    transform: translateY(150%) scale(0);
  }
</style>
