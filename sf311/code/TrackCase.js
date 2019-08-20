var http = require('http')
var console = require('console')
var config = require('config')

module.exports.function = function trackCase (serviceRequestNumber) {
  var url = "http://mobile311-dev.sfgov.org/open311/v2/requests.json"
  var test = http.getUrl(url, {format: 'text'})
  var ret = JSON.parse(test)
  var cases = []
  var fallback = []
  var caseInfo
  
  
  for (var i = 0; i < ret.length; i++) {
    caseInfo = {
      serviceRequestId: ret[i].service_request_id,
      status: ret[i].status,
      serviceName: ret[i].service_name,
      dateOpened: String(ret[i].requested_datetime).substring(0, 10),
      dateUpdated: String(ret[i].updated_datetime).substring(0, 10),
      address: ret[i].address,
    }
    if (( String(ret[i].service_request_id).toLowerCase() == String(serviceRequestNumber).toLowerCase()
     ||  String(ret[i].service_name).toLowerCase() ==  String(serviceRequestNumber).toLowerCase()
     ||  String(ret[i].status) ==  String(serviceRequestNumber).toLowerCase()
     ||  String(ret[i].address) ==  String(serviceRequestNumber).toLowerCase()))
      cases.push(caseInfo)
    fallback.push(caseInfo)
  }
  if (cases.length == 0)
    return (fallback)
  return cases
}
