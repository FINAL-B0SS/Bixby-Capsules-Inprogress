var http = require('http')

module.exports.function = function BuildHowManyTents(serviceInfo) {
  var url = "http://mobile311.sfgov.org/open311/v2/services/"+serviceInfo.serviceCode+".json"
  var data = JSON.parse(http.getUrl(url, {format: 'text'}))
  for (var i = 0; i < data.attributes.length; i += 1) {
    if (data.attributes[i].code.toLowerCase() == "how many tents, structures, or tarps?" || data.attributes[i].description.toLowerCase() == "how many tents, structures, or tarps?") {
      return (data.attributes[i].values)
    }
  }
  return ;
}