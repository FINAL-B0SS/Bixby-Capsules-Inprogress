var console = require('console')
var http = require('http')
var config = require('config')

module.exports.function = function GetServiceInfo() {
  var url = "http://mobile311-dev.sfgov.org/open311/v2/services.json"
  var test = http.getUrl(url, {format: 'text'})
  var ret = JSON.parse(test)
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