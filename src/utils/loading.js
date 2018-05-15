export default function Loading (IsShow) {
  var loading = document.querySelector('#loadTips')
  if (!loading && !IsShow) {
    return
  }
  if (loading) {
    loading.className = !IsShow
      ? 'wb-fix hide'
      : 'wb-fix'
  } else {
    var str = '<div class="ui-loading ui-loading-open" ><div class="ui-loading-container"><div ' +
      'class="ui-loading-items" ><div class="ui-loading-item" ></div><div class="ui-loa' +
      'ding-item" ></div><div class="ui-loading-item" ></div><div class="ui-loading-ite' +
      'm" ></div><div class="ui-loading-item" ></div><div class="ui-loading-item" ></di' +
      'v><div class="ui-loading-item" ></div><div class="ui-loading-item" ></div><div c' +
      'lass="ui-loading-item" ></div><div class="ui-loading-item" ></div><div class="ui' +
      '-loading-item"></div><div class="ui-loading-item"></div></div></div><div class="' +
      'ui-mask transparent"></div></div>'
    var CreateLoad = document.createElement('div')
    CreateLoad.id = 'loadTips'
    CreateLoad.className = !IsShow
      ? 'wb-fix hide'
      : 'wb-fix'
    CreateLoad.innerHTML = (str)
    document
      .body
      .appendChild(CreateLoad)
  }
}
