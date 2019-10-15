var http = require('http')
var secret = require('secret')

module.exports.function = function GetServiceInfo() {

  return http.getUrl(secret.get('url.services'), { format: 'json' }).map(function(info) {
    return {
      serviceName: info.service_name,
      group: info.group,
      description: String(info.description).replace(/<[^>]*>?/gm, ''),
      serviceCode: info.service_code
    }
  })
}