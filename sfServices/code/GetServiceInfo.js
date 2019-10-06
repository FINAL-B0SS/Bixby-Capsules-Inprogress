var console = require('console')
var http = require('http')
var secret = require('secret')

module.exports.function = function GetServiceInfo() {
  var url = secret.get('url.services')
  var ret = http.getUrl(url, { format: 'json' })
  var services = []
  var template

  for (var i = 0; i < ret.length; i++) {
    template = {
      serviceName: ret[i].service_name,
      group: ret[i].group,
      description: String(ret[i].description).replace(/<[^>]*>?/gm, ''),
      serviceCode: ret[i].service_code
    }
    services.push(template)
  }
  return services
}