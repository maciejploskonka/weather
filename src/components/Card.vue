<template>
<transition name="card">
  <div class="card" :class="{ 'card--closed': !cardIsVisible }" v-if="currentCard">
    <div class="card__header">
      <button class="header-btn" @click="toggleCard">
        <div class="header-btn__line"></div>
        <div class="header-btn__line"></div>
        <div class="header-btn__line"></div>
      </button>
      <span class="card__city">{{ currentCard.city }}, {{ currentCard.country}}</span>
      <div class="units-wrapper" id="unitsWrapper">
        <span class="unit" :class="{ active: isMetric }" @click="setUnits(true)">C</span> |
        <span class="unit" :class="{ active: !isMetric }" @click="setUnits(false)">F</span>
      </div>
    </div>
    <div class="card__weather">
      <svgicon :icon="currentCard.icon" class="icon icon--big"></svgicon>
      <span class="card__desc">{{ currentCard.currentDesc }}</span>
      <span class="card__temp">{{ currentCard.currentTemp | unit(isMetric) }}</span>
      <div class="conditions">
        <div class="conditions__item pressure">
          <span class="conditions__icon">
            <svgicon icon="thermometer" class="icon icon--small"></svgicon>
          </span>
          <span class="conditions__desc">{{ currentCard.pressure }} hpa</span>
        </div>
        <div class="conditions__item humidity">
          <span class="conditions__icon">
            <svgicon icon="humidity" class="icon icon--small"></svgicon>
          </span>
          <span class="conditions__desc">{{ currentCard.humidity }}</span>
        </div>
        <div class="conditions__item wind">
          <span class="conditions__icon">
            <svgicon icon="wind" class="icon icon--small"></svgicon>
          </span>
          <span class="conditions__desc">{{ currentCard.wind }} m/s</span>
        </div>
      </div>
    </div>
    <div class="forecast">
      <span class="forecast__desc">Next 5 Days</span>
      <ul class="forecast__list">
        <li class="forecast__item" v-for="forecastDay in currentCard.forecast" :key="forecastDay.weekday">
          <span class="forecast__day">{{ forecastDay.weekday | date('weekday') }}</span>
          <span class="forecast__icon">
            <svgicon :icon="forecastDay.icon" class="icon"></svgicon>
          </span>
          <span class="forecast__temp">{{ forecastDay.temp | unit(isMetric) }}</span>
        </li>
      </ul>
    </div>
    <span class="update">Last update {{ currentCard.updated | date('long') }}</span>
    <div class="sun">
      <div class="sun__item">
        <span class="sun__desc">{{ currentCard.sunrise | date('short') }}</span>
        <span class="sun__icon">
          <svgicon icon="sunrise" class="icon"></svgicon>
        </span>
      </div>
      <div class="sun__item">
        <span class="sun__desc">{{ currentCard.sunset | date('short') }}</span>
        <span class="sun__icon">
          <svgicon icon="sunset" class="icon"></svgicon>
        </span>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  props: {
    isMetric: {
      type: Boolean,
      required: true
    },
    currentCard: {
      type: Object,
      required: false
    }
  },
  methods: {
    toggleCard () {
      this.$store.dispatch('setIsOpen', !this.cardIsVisible)
    },
    setUnits (isMetric) {
      this.$store.dispatch('setUnits', isMetric)
    }
  },
  computed: {
    cardIsVisible () {
      return this.$store.getters.isOpen
    }
  }
}
</script>

<style lang="scss">
  .card {
    background: #03a9f4;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    transition: left .3s ease-in-out;
    z-index: 1;
    box-shadow: -3px 0px 4px 1px rgba(0, 0, 0, 0.5);

    &--closed {
      left: calc(100% - 3rem);
    }

    &__header {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 1rem;
    }

    &__name {
      margin: 0 auto;
      font-size: 1.2rem;
    }

    &__weather {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 1rem;
    }

    &__desc {
      text-transform: uppercase;
      font-size: 0.9rem;
      margin: 1rem 0;
    }

    &__temp {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;

      &::after {
        content: "\00b0";
      }
    }
  }

  .conditions {
    display: flex;
    width: 100%;
    justify-content: space-between;
    font-size: 0.8rem;

    &__item {
      display: flex;
      justify-content: center;
      align-items: center;

      &:last-of-type {
        margin-right: 0.5rem;
      }
    }
  }

  .forecast {
    margin-bottom: 1rem;

    &__desc {
      width: 100%;
      display: inline-block;
      padding-bottom: 0.4rem;
      margin-bottom: 0.5rem;
      text-align: center;
      font-size: 0.8rem;
      border-bottom: 1px solid #ffffff;
    }

    &__list {
      list-style-type: none;
      display: flex;
      justify-content: space-between;
    }

    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 0.8rem;
    }

    &__day {
      text-transform: uppercase;
    }

    &__icon {
      fill: #ffffff;
    }

    &__temp {

      &::after {
        content: "\00b0";
      }
    }
  }

  .update {
    text-align: center;
    font-size: 0.8rem;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  .sun {
    display: flex;
    justify-content: space-around;

    &__item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    &__desc {
      font-size: 0.8rem;
      margin-bottom: 0.5rem;
    }
  }

  .header-btn {
    border: none;
    background: transparent;
    cursor: pointer;
    margin-right: auto;

    &__line {
      width: 20px;
      height: 2px;
      border-radius: 1px;
      margin-bottom: .3rem;
      background: #ffffff;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .units-wrapper {
    margin-left: auto;
    color: #ffffff;
    font-size: 1.2rem;
    display: flex;
  }

  .unit {
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0.5;
    transition: all 0.2s;

    &::before {
      content: "\00b0";
    }

    &:first-child {
      padding-right: 0.2rem;
    }

    &:last-child {
      padding-left: 0.2rem;
    }

    &.active {
      opacity: 1;
      color: #ffffff;
    }
  }

  .card-enter,
  .card-leave-to {
    transform: translateX(200%);
  }

  .card-enter-active,
  .card-leave-active {
    transition: transform .3s ease-in-out .5s;
  }
</style>
