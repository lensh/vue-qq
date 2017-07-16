import hmacSHA512 from 'crypto-js/hmac-sha512'

/**
 * [加密]
 * @param  {[string]} pwd [密码]
 * @return {[string]}     [加密后的密码]
 */
export default (pwd) => {
	return hmacSHA512(pwd, 'my-qq').toString().substr(20, 30)
}