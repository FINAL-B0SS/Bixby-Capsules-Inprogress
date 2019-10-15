var http = require('http')
var console = require('console')
var secret = require('secret')

function parseCaseInfo(caseInfo) {
  return {
    serviceRequestId: caseInfo.service_request_id,
    status: caseInfo.status,
    serviceName: caseInfo.service_name,
    dateOpened: String(caseInfo.requested_datetime).substring(0, 10),
    dateUpdated: String(caseInfo.updated_datetime).substring(0, 10),
    address: caseInfo.address,
    statusNotes: caseInfo.status_notes,
    location: {
      point: {
        latitude: caseInfo.lat,
        longitude: caseInfo.long,
      }
    },
    description: caseInfo.description,
  }
}

module.exports.function = function trackCase(serviceRequestNumber) {
  var url = secret.get('url.requests') + '.json'
  let key_list = ['service_request_id', 'service_name', 'status', 'address']
  const data = http.getUrl(url, { format: 'json' }).sort((a, b) => (a.dateUpdated < b.dateUpdated) ? 1 : -1)
  var fallback = []
  var ret = []

  data.forEach(caseInfo => {
    temp = parseCaseInfo(caseInfo)
    var matched = key_list.some(key => {
      return (String(caseInfo[key]).toLowerCase().includes(String(serviceRequestNumber).toLowerCase()));
    })
    if (matched || String(serviceRequestNumber).toLowerCase() == 'all')
      ret.push(temp)
    fallback.push(temp)
  })

  return ret.length == 0 ? fallback : ret
}
