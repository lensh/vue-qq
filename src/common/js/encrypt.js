import hmacSHA512 from 'crypto-js/hmac-sha512'

// 密码加密
export default (pwd) => {
   return hmacSHA512(pwd, 'my-qq').toString().substr(20, 30)
}
