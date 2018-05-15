// import Axios from 'axios'
/**
 * 向leanCloud上报日志
 *
 */
const LEAN_CLOUD_APP_ID = ''
const LEAN_CLOUD_APP_KEY = ''

export const leanCloudsLogs = (options) => {
  let { url, data } = options
  let opts = {
    // ...others,
    method: 'post',
    headers: {
      'X-Avoscloud-Application-Id': LEAN_CLOUD_APP_ID,
      'X-Avoscloud-Application-Key': LEAN_CLOUD_APP_KEY,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  if (['POST', 'PUT'].indexOf(opts.method.toUpperCase()) >= 0) {
    let _data = Object.assign({}, data, {
      openid: (sessionStorage.getItem('token') || ''), // token
      ENV: location.origin, // 环境 - 从域名来区分
      userAgent: navigator.userAgent,
      all_cookie: document.cookie,
      url: location.href
    })
    opts.params = _data
  }
  fetch('https://leancloud.cn/1.1/classes/' + `${url}`, opts)
}

// 异常日志上报
export const DebugLogs = (interfaces, detail) => {
  leanCloudsLogs({
    url: 'DEBUG',
    data: {
      interfaces,
      detail
    }
  })
}

// 错误日志上报
export const ErrorLogs = (interfaces, detail) => {
  leanCloudsLogs({
    url: 'ERROR',
    data: {
      interfaces,
      detail
    }
  })
}
