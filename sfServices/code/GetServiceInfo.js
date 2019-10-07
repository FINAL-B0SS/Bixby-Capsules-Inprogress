var http = require('http')
var secret = require('secret')

module.exports.function = function GetServiceInfo() {
  var url = secret.get('url.services')
  var ret = http.getUrl(url, { format: 'json' })

  return ret.map(function(info) {
    return {
      serviceName: info.service_name,
      group: info.group,
      description: String(info.description).replace(/<[^>]*>?/gm, ''),
      serviceCode: info.service_code
    }
  })
}