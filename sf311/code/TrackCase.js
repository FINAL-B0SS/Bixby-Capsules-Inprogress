var http = require('http')
var console = require('console')
var config = require('config')

module.exports.function = function trackCase (serviceRequestNumber) {
  var url = "http://mobile311-dev.sfgov.org/open311/v2/requests.json"
  var test = http.getUrl(url, {format: 'text'})
  var ret = JSON.parse(test)
  var cases = [];
  var caseInfo
  
  for (var i = 0; i < ret.length; i++) {
    caseInfo = {
      serviceRequestId: ret[i].service_request_id,
      status: ret[i].status,
      serviceName: ret[i].service_name,
      dateOpened: ret[i].requested_datetime.substring(0, 10),
      dateUpdated: ret[i].updated_datetime.substring(0, 10),
      address: ret[i].address,
    }
   if ((serviceRequestNumber && ret[i].service_request_id == serviceRequestNumber) || !serviceRequestNumber || serviceRequestNumber == 'all')
      cases.push(caseInfo)
  }
  return cases
}
