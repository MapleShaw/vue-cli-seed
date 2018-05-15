import Vue from 'vue'
import App from './App'
import router from './router'

router.beforeEach(async (to, from, next) => {
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
  // components: { App },
  // template: '<App/>'
})
