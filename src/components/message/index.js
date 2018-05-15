import Vue from 'vue'
import Main from './message'
import loading from '../Loading'

let MessageConstructor = Vue.extend(Main)

export default (options) => {
  loading(false)
  let instance = new MessageConstructor({
    el: document.createElement('div'),
    data: options
  })
  document.body.appendChild(instance.$el)
}
