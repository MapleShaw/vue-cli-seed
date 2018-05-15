/**
 * var LOCAL_STORE = new Storage();
 * LOCAL_STORE.get(key);
 * LOCAL_STORE.get(key,value,time);
 * var SESSION_STORE = new Storage(sessionStorage);
 * 
 */
class Storage {
  constructor(props) {
    this.props = props || {}
    this.source = this.props.source || window.sessionStorage
  }

  get (key) {
    function isJSON(str) {
      if (typeof str == 'string') {
        try {
          JSON.parse(str)
          return true
        } catch(e) {
          return false
        }
      }
    }
    const data = this.source,
          timeout = data[`${key}__expires__`]

    // 过期失效
    if (new Date().getTime() >= timeout) {
      this.remove(key)
      return
    }
    
    var reg = /^{\w+}$/i
    const value =  isJSON(data[key])?JSON.parse(data[key]):data[key]
    return value
  }

  // 设置缓存
  // timeout：过期时间（分钟）
  set (key, value, timeout=50) {
    let data = this.source
    data[key] = typeof value=='object'?JSON.stringify(value):value
    if (timeout)
      data[`${key}__expires__`] = new Date().getTime() + 1000*60*timeout
    return value
  }

  remove (key) {
    let data = this.source,
        value = data[key]
    delete data[key]
    delete data[`${key}__expires__`]
    return value
  }
  getCookie (name){
    let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"))
    if(arr != null)
      return unescape(arr[2])
    return null
  }
}
  
export default Storage