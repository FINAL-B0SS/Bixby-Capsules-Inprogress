var http = require('http')
var console = require('console')
var secret = require('secret')

function buildCaseInfo(info) {
  return {
    serviceRequestId: info.service_request_id,
    status: info.status,
    serviceName: info.service_name,
    dateOpened: String(info.requested_datetime).substring(0, 10),
    dateUpdated: String(info.updated_datetime).substring(0, 10),
    address: info.address,
    statusNotes: info.status_notes,
    location: {
      point: {
        latitude: info.lat,
        longitude: info.long,
      }
    },
    description: info.description,
  }
}

module.exports.function = function trackCase(serviceRequestNumber) {
  var url = secret.get('url.requests') + '.json'
  const ret = http.getUrl(url, { format: 'json' }).sort((a, b) => (a.dateUpdated < b.dateUpdated) ? 1 : -1)
  let key_list = ['service_request_id', 'service_name', 'status', 'address']
  var fallback = []

  var cases = ret.map(function (info) {
    caseInfo = buildCaseInfo(info)
    
    var matched = key_list.some(function (key) {
      return (String(info[key]).toLowerCase().includes(String(serviceRequestNumber).toLowerCase()));
    })

    if (matched || String(serviceRequestNumber).toLowerCase() == 'all')
      return caseInfo
  });

  var fallback = ret.map(function (info) {
    caseInfo = buildCaseInfo(info)
    return caseInfo
  });

  console.log(cases.length)
  return cases.length == 0 ? fallback : cases
}
