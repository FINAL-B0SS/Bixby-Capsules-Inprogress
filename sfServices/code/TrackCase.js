var http = require('http')
var console = require('console')
var secret = require('secret')

module.exports.function = function trackCase(serviceRequestNumber) {
  var url = secret.get('url.requests') + '.json'
  var test = http.getUrl(url, { format: 'text' })
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
      statusNotes: ret[i].status_notes,
      location: {
        point: {
          latitude: ret[i].lat,
          longitude: ret[i].long,
        }
      },
      description: ret[i].description,
    }
    if ((String(ret[i].service_request_id).toLowerCase() == String(serviceRequestNumber).toLowerCase()
      || String(ret[i].service_name).toLowerCase().includes(String(serviceRequestNumber).toLowerCase())
      || String(ret[i].status).includes(String(serviceRequestNumber).toLowerCase())
      || String(ret[i].address).includes(String(serviceRequestNumber).toLowerCase()))
      || String(serviceRequestNumber).toLowerCase() == 'all')
      cases.push(caseInfo)
    fallback.push(caseInfo)
  }
  cases.sort((a, b) => (a.dateUpdated < b.dateUpdated) ? 1 : -1)
  fallback.sort((a, b) => (a.dateUpdated < b.dateUpdated) ? 1 : -1)
  if (cases.length == 0)
    return (fallback)
  return cases
}
