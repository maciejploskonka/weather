import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueSVGIcon from 'vue-svgicon'
import DateFilter from './filters/date'
import UnitFilter from './filters/units'

Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.filter('unit', UnitFilter)

Vue.use(VueSVGIcon, {
  tagName: 'svgicon'
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
