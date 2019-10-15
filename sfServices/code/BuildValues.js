var http = require('http')
var console = require('console')

module.exports.function = function BuildValues(serviceInfo, valueKey, voiceKey) {
  var url = "http://mobile311.sfgov.org/open311/v2/services/" + serviceInfo.serviceCode + ".json"
  var data = http.getUrl(url, { format: 'json' })
  valueKey = valueKey.toLowerCase()
  for (var i = 0; i < data.attributes.length; i += 1)
    if (data.attributes[i].description.toLowerCase() == valueKey) {
      for (var j = 0; j < data.attributes[i].values.length; j++) {
        if (data.attributes[i].values[j].name.toLowerCase().replace('-', ' ') == voiceKey)
          return data.attributes[i].values[j]
      }
      return data.attributes[i].values
    }
}