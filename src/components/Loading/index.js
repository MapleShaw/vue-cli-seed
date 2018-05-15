import Loading from './loading'
import Vue from 'vue'
const Mask = Vue.extend(Loading)
const vue = new Vue()

export default (options) => {
  let opts
  if (typeof options === 'boolean') {
    opts = {
      isVisible: options,
      text: ''
    }
  } else {
    opts = options
  }
  if (opts.isVisible && !vue.loading) {
    const mask = new Mask({
      el: document.createElement('div'),
      data: opts
    })
    Vue.prototype.loading = mask
    document.body.appendChild(mask.$el)
  } else if (!opts.isVisible && vue.loading) {
    vue.loading.isVisible = false
    Vue.prototype.loading = null
  }
}
