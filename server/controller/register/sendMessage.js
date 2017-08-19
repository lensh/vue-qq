const TopClient = require('../../common/sdk-phone/topClient').TopClient

//阿里大于的接口，目前的appkey还用不了
export default (code, phone) => {
  return new Promise((resolve, reject) => {
    const client = new TopClient({
      'appkey': '24331978',
      'appsecret': 'b987aeab458e94191c3f164e38830e6e',
      'REST_URL': 'http://gw.api.taobao.com/router/rest'
    })

    client.execute('alibaba.aliqin.fc.sms.num.send', {
      'extend': phone,
      'sms_type': 'normal',
      'sms_free_sign_name': '随心聊',
      'sms_param': {
        "code": code
      },
      'rec_num': phone,
      'sms_template_code': 'SMS_71025228'
    }, (error, response)=>{
      if (!error)
        resolve(response)
      else
        reject(error)
    })

  })
}