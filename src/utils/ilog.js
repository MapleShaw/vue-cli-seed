import loadJS from '@/utils/loadJS'
const IlogJs = 'https://xxx.com/xxx.js'

export default(() => {
  loadJS(IlogJs, () => {
    function init () {
      if (window._za && window._za.logZoneInit) {
        window
          ._za
          .logZoneInit('[data-ilogasync]', 'data-ilogasync')
      } else {
        setTimeout(init, 300)
      }
    }
    setTimeout(init, 300)
  })
})()
