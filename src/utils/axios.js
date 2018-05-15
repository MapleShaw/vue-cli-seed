import Vue from 'vue'
import fetch from 'axios'
import Loading from '@/components/Loading'
import {
  DebugLogs,
  ErrorLogs
} from '@/utils/logs'

/**
 * 发起json形式的fetch请求
 * @param {Object} options
 */
export const axios = (options) => {
  let {
    url,
    type,
    // data,
    loading,
    headers,
    loadingText
    // credentials
  } = options

  if (loading) {
    Loading({
      isVisible: true,
      text: loadingText || '加载中...'
    })
  }

  let opts = {
    loading,
    // mode,
    method: type || 'get',
    _url: url,
    headers: headers || {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': Vue.cookie.get('token')
    }
  }

  if (['post', 'put'].indexOf(opts.method) >= 0) {
    opts.data = options.data
  }

  return new Promise(function (resolve, reject) {
    fetch(url, opts).then(resData => {
      return toJson(resData, opts)
    })
      .then(resData => resHandler(resData, opts, resolve, reject))
  })
}

function toJson (resData, options) {
  if (resData.status >= 400) {
    return errorHandler(null, options, resData.status)
  }
  resData = typeof resData === 'string' ? JSON.parse(resData) : resData
  return resData
}

// 请求成功处理
function resHandler (resData, options, resolve, reject) {
  if (options.loading) Loading(false)

  let {
    errorCode
    // message,
    // respCode,
    // respMessage
  } = resData

  if (errorCode !== undefined) {
    if ((errorCode === 0 || options.noLog) && !(errorCode === 1 || errorCode === 3 || errorCode === 20001)) {
      options.success && options.success(resData)
    } else if (errorCode === 1 || errorCode === 3 || errorCode === 20001) {
      if (errorCode === 3) {
        return
      }
      // 重新认证
      if (errorCode === 20001) {
        sessionStorage.clear()
        // auth()
      }
    } else {
      DebugLogs(options._url, resData)
    }
  } else {
    return resolve(resData)
  }
}

// 异常处理
function errorHandler (error, options, status) {
  options.error && options.error(error)
  Loading(false)
  ErrorLogs(options._url, {
    status,
    error
  })
}
