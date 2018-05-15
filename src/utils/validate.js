const MOBILE_REG = /^1[3|4|5|6|8|7|9][0-9]\d{8}$/
const EMAIL_REG = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/
const MONEY_REG = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/
const NAME_REG = /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/
const CH_NAME_REG = /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/
const PWD_REG = /(\d(?!\d{5})|[A-Za-z](?![A-Za-z]{5})){6}/
const HKMACAO_REG = /^[CHMhm]{1}([0-9]{10}|[0-9]{8})$/
const TAIWAN_REG = /^[0-9]{8,10}$/
const BIRTH_REG = /^[A-Z]{1}\d{9}$/
const PASSPORT_REG = /^[a-zA-Z0-9]{5,17}$/
const BANK_CARD_REG = /^[0-9]{10,21}$/
const SPACE_REG = /\s+/g
const UA = window.navigator.userAgent.toLowerCase()

function isRule (regText, value) {
  if (!value || value.length === 0) return true

  const reg = new RegExp(regText)
  if (!reg.test(value)) {
    return false
  }
  return true
}

module.exports = {
  /**
   * 是否IOS
   */
  isIos: () => {
    let userAgent = navigator.userAgent
    let IsiOS = !!userAgent.match(/\(i[^]+( U)? CPU.+Mac OS X/) // ios终端
    return IsiOS
  },
  /**
   * 是否包含空格
   */
  includeSpace: (text) => {
    return isRule(SPACE_REG, text)
  },
  /**
   * 是否微信
   */
  isFromWeixin: () => {
    return UA.match(/MicroMessenger/i)
  },
  isCardNo: (cardNo) => {
    return isRule(BANK_CARD_REG, cardNo)
  },

  isFromZA: () => {
    return UA.match(/ZhongAnWebView/i)
  },

  isMobile: (mobile) => {
    return isRule(MOBILE_REG, mobile)
  },

  isEmail: (email) => {
    return isRule(EMAIL_REG, email)
  },

  isMoney: (money) => {
    return isRule(MONEY_REG, money)
  },
  isChName: (name) => isRule(CH_NAME_REG, name),
  isUsername: (name) => {
    return isRule(NAME_REG, name)
  },

  isEmpty: (data) => {
    return !(data && (data.length > 0))
  },

  isPwd: (pwd) => {
    return isRule(PWD_REG, pwd)
  },
  isSame: (data1, data2) => {
    return data1 === data2
  },
  isHKMacao: (val) => {
    return isRule(HKMACAO_REG, val)
  },
  isTaiwan: (val) => {
    return isRule(TAIWAN_REG, val)
  },
  isPassport: (val) => {
    return isRule(PASSPORT_REG, val)
  },
  isBirth: (val) => isRule(BIRTH_REG, val),

  isIdCard: (card) => {
    if (!card) return true
    var num = card.toUpperCase()
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
      return false
    }
    // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 下面分别分析出生日期和校验位
    var len,
      re
    var birthday,
      sex
    len = num.length
    if (len === 15) {
      // 获取出生日期
      birthday = '19' + card.substring(6, 8) + '-' + card.substring(8, 10) + '-' + card.substring(10, 12)
      // 获取性别
      sex = parseInt(card.substr(14, 1)) % 2 === 1
        ? 'M'
        : 'F'

      re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/)
      let arrSplit = num.match(re)

      // 检查生日日期是否正确
      var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
      var bGoodDay
      bGoodDay = (dtmBirth.getYear() === Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) === Number(arrSplit[3])) && (dtmBirth.getDate() === Number(arrSplit[4]))
      if (!bGoodDay) {
        return false
      } else {
        // 将15位身份证转成18位 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        let arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
        let nTemp = 0
        let i

        num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6)
        for (i = 0; i < 17; i++) {
          nTemp += num.substr(i, 1) * arrInt[i]
        }
        num += arrCh[nTemp % 11]
      }
    } else if (len === 18) {
      // 获取出生日期
      birthday = card.substring(6, 10) + '-' + card.substring(10, 12) + '-' + card.substring(12, 14)
      // 获取性别
      sex = parseInt(card.substr(16, 1)) % 2 === 1
        ? 'M'
        : 'F'

      re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/)
      let arrSplit = num.match(re)

      // 检查生日日期是否正确
      let dtmBirth = new Date(arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
      let bGoodDay = (dtmBirth.getFullYear() === Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) === Number(arrSplit[3])) && (dtmBirth.getDate() === Number(arrSplit[4]))
      if (!bGoodDay) {
        return false
      } else {
        // 检验18位身份证的校验码是否正确。 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        let valnum
        let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        let arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
        let nTemp = 0
        for (let i = 0; i < 17; i++) {
          nTemp += num.substr(i, 1) * arrInt[i]
        }
        valnum = arrCh[nTemp % 11]
        if (valnum !== num.substr(17, 1)) {
          return false
        }
      }
    }
    return {birthday: birthday, sex: sex}
  }

}
