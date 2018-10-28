import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import helpers from '@/utils/helpers'
import apiData from '@/utils/apiData'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
  reducer: state => ({
    isMetric: state.isMetric,
    cards: state.cards,
    currentCard: state.currentCard
  })
})

export default new Vuex.Store({
  state: {
    isMetric: true,
    isOpen: false,
    cards: [],
    currentCard: null,
    loading: false,
    error: false
  },
  mutations: {
    setUnits (state, payload) {
      state.isMetric = payload
    },
    addCard (state, payload) {
      state.cards.push(payload)
    },
    removeCard (state, payload) {
      const cardIndex = state.cards.indexOf(payload)
      state.cards.splice(cardIndex, 1)
    },
    setCurrentCard (state, payload) {
      state.currentCard = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setIsOpen (state, payload) {
      state.isOpen = payload
    }
  },
  actions: {
    setUnits ({ commit }, payload) {
      commit('setUnits', payload)
    },
    getWeather ({ commit }, payload) {
      commit('setLoading', true)
      const currentWeatherHttp = apiData.currentWeatherHttp + payload + apiData.weatherApiKey
      const forecastWeatherHttp = apiData.forecastWeatherHttp + payload + apiData.weatherApiKey

      axios.all([
        axios.get(currentWeatherHttp),
        axios.get(forecastWeatherHttp)
      ])
        .then(
          axios.spread((current, forecast) => {
            const forecastArray = []
            forecast.data.list.forEach((weather) => {
              if (weather.dt_txt.substring(weather.dt_txt.length, weather.dt_txt.length - 8) === '12:00:00') {
                const forecastDay = {
                  temp: weather.main.temp,
                  icon: helpers.iconId(weather.weather[0].icon),
                  weekday: weather.dt
                }
                forecastArray.push(forecastDay)
              }
            })
            const weatherObj = {
              id: helpers.randomId(),
              city: current.data.name,
              country: current.data.sys.country,
              icon: helpers.iconId(current.data.weather[0].icon),
              currentTemp: current.data.main.temp,
              currentDesc: current.data.weather[0].description,
              pressure: current.data.main.pressure,
              humidity: current.data.main.humidity,
              wind: current.data.wind.speed,
              sunrise: current.data.sys.sunrise,
              sunset: current.data.sys.sunset,
              updated: current.data.dt,
              forecast: forecastArray
            }
            commit('addCard', weatherObj)
            commit('setCurrentCard', weatherObj)
            setTimeout(() => { commit('setIsOpen', true) }, 500)
          })
        )
        .catch(() => {
          commit('setError', true)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    removeCard ({ commit, state }, payload) {
      commit('removeCard', payload)
      commit('setCurrentCard', state.cards[0])
    },
    setCurrentCard ({ commit }, payload) {
      commit('setCurrentCard', payload)
    },
    setError ({ commit }, payload) {
      commit('setError', payload)
    },
    setIsOpen ({ commit }, payload) {
      commit('setIsOpen', payload)
    }
  },
  getters: {
    isMetric (state) {
      return state.isMetric
    },
    allCards (state) {
      return state.cards
    },
    currentCard (state) {
      return state.currentCard
    },
    loading (state) {
      return state.loading
    },
    isError (state) {
      return state.error
    },
    isOpen (state) {
      return state.isOpen
    }
  },
  plugins: [vuexLocalStorage.plugin]
})
