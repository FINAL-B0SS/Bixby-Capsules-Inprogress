var http = require('http')
var console = require('console')

module.exports.function = function BuildNatureOfRequest(serviceInfo, voiceKey) {
  var url = "http://mobile311.sfgov.org/open311/v2/services/" + serviceInfo.serviceCode + ".json"
  var data = JSON.parse(http.getUrl(url, { format: 'text' }))

  for (var i = 0; i < data.attributes.length; i += 1) {
    if (data.attributes[i].description.toLowerCase() == "nature of request") {
      var voiceMatches = []
      for (var j = 0; j < data.attributes[i].values.length; j++) {
        if (voiceKey && data.attributes[i].values[j].name.toLowerCase().includes(voiceKey.toLowerCase())) {
          voiceMatches.push(data.attributes[i].values[j])
        }
      }
      return voiceMatches.length > 0 ? voiceMatches : data.attributes[i].values
    }
  }
  return
}