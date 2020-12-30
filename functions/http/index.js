// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise');
cloud.init()
// 云函数入口函数 请求参数 method url param
exports.main = async (event, context) => {
  let option = null
  if (event.method == 'get') {
    option = {
      uri: event.url,
      qs: event.param,
      json: true
    }
  } else if (event.method == 'post') {
    option = {
      method: 'POST',
      uri: event.url,
      body: event.param,
      json: true
    }
  }
  return await rp(option).then((res) => {
    return res
  }).catch((error) => {
    return error
  })
}