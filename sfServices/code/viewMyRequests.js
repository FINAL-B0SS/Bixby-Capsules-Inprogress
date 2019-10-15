var http = require('http')
var console = require('console')
var secret = require('secret')

function parseCaseInfo(data) {
  return {
    serviceRequestId: data.service_request_id,
    status: data.status,
    serviceName: data.service_name,
    dateOpened: String(data.requested_datetime).substring(0, 10),
    dateUpdated: String(data.updated_datetime).substring(0, 10),
    address: data.address,
    statusNotes: data.status_notes,
    location: {
      point: {
        latitude: data.lat,
        longitude: data.long,
      }
    },
    description: data.description
  }
}

module.exports.function = function viewMyRequests(serviceRequestId) {
  return serviceRequestId.map(serviceRequestId => {
    try {
      var data = http.getUrl(secret.get('url.requests') + '/' + serviceRequestId + ".json", { format: 'json' })
      return parseCaseInfo(data[0])
    } catch (error) {
      console.error(error)
    }
  }).sort((a, b) => (a.dateUpdated < b.dateUpdated) ? 1 : -1)
}
