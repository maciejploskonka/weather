<template>
  <transition-group name="label" tag="ul" class="labels-wrapper">
    <li class="label" v-for="card in cards" :key="card.id" @click="showCard(card)">
      <div class="label__weather">
        <span class="label__icon">
          <svgicon :icon="card.icon" class="icon"></svgicon>
        </span>
        <span class="label__temp">{{ card.currentTemp | unit(isMetric) }}</span>
      </div>
      <div class="label__text">
        <span class="label__city">{{ card.city }}, {{ card.country }}</span>
        <span class="label__desc">{{ card.currentDesc }}</span>
      </div>
      <button class="label__remove-btn" @click.stop="removeCard(card)"></button>
    </li>
  </transition-group>
</template>
<script>
export default {
  props: {
    isMetric: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    cards () {
      return this.$store.getters.allCards
    }
  },
  methods: {
    removeCard (card) {
      this.$store.dispatch('removeCard', card)
    },
    showCard (card) {
      this.$store.dispatch('setCurrentCard', card)
      this.$store.dispatch('setIsOpen', true)
    }
  }
}
</script>

<style lang="scss">
  .labels-wrapper {
    position: relative;
    height: calc(100% - 4rem);
    width: 100%;
    margin: 0 auto;
    padding: 0.5rem;
    list-style: none;
    display: inline-block;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar-track {
      border-radius: 6px;
    }

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #000000;
      border-radius: 6px;
    }
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 0.5rem;
    padding: 0.4rem;
    border-radius: 5px;
    background: green;
    box-shadow: -3px 3px 4px 0px rgba(0, 0, 0, 0.5);
    font-size: 0.8rem;
    cursor: pointer;

    &__weather {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
    }

    &__temp {
      text-align: center;

      &::after {
        content: "\00b0";
      }
    }

    &__text {
      margin-right: auto;
      margin-left: 0.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    &__city {
      margin: 0.2rem 0 0.6rem;
      font-weight: 700;
    }

    &__desc {
      font-weight: 200;
    }

    &__icon {
      fill: #ffffff;
    }

    &__remove-btn {
      border: none;
      margin-right: 0.3rem;
      cursor: pointer;
      background: transparent;
      position: relative;
      width: 2rem;
      height: 2rem;
      &:before, &:after {
        content:'';
        position: absolute;
        width: 100%;
        height: 1px;
        background: #ffffff;
      }
      &:before {
        transform: translate(-50%) rotate(45deg);
        top: 50%;
        left: 50%;
      }
      &:after {
        transform: translate(-50%) rotate(-45deg);
        top: 50%;
        left: 50%;
      }
    }
  }

  .label-enter-active,
  .label-move {
    transition: transform 0.3s ease-in-out;
  }

  .label-leave-active {
    position: absolute;
    transition: transform 0.3s ease-in-out;
  }

  .label-enter {
    transform: translateY(-100vh);
  }

  .label-leave-to {
    transform: translateX(-100vh);
  }
</style>
