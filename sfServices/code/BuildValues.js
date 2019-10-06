var http = require('http')
var console = require('console')

module.exports.function = function BuildValues(serviceInfo, valueKey) {
  var url = "http://mobile311.sfgov.org/open311/v2/services/" + serviceInfo.serviceCode + ".json"
  var data = http.getUrl(url, { format: 'json' })
  valueKey = valueKey.toLowerCase()
  for (var i = 0; i < data.attributes.length; i += 1)
    if (data.attributes[i].description.toLowerCase() == valueKey)
      return (data.attributes[i].values)
  return
}