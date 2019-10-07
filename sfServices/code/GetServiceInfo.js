var console = require('console')
var http = require('http')
var secret = require('secret')

module.exports.function = function GetServiceInfo(voiceName) {
  var url = secret.get('url.services')
  var ret = http.getUrl(url, { format: 'json' })
  var services = []
  var voiceServices = []
  var template

  for (var i = 0; i < ret.length; i++) {
    template = {
      serviceName: ret[i].service_name,
      group: ret[i].group,
      description: String(ret[i].description).replace(/<[^>]*>?/gm, ''),
      serviceCode: ret[i].service_code
    }
    if (voiceName && ret[i].service_name.toLowerCase().replace('&', 'and').includes(voiceName.toLowerCase()))
      voiceServices.push(template)
    services.push(template)
  }
  return voiceServices.length > 0 ? voiceServices : services
}