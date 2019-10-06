var http = require('http')
var console = require('console')
var secret = require('secret')

module.exports.function = function viewMyRequests(serviceRequestId) {
  var requests = []
  for (var i = 0; i < serviceRequestId.length; i += 1) {
    try {
      var data = http.getUrl(secret.get('url.requests') + '/' + serviceRequestId[i] + ".json", { format: 'json' })
      request = {
        serviceRequestId: data[0].service_request_id,
        status: data[0].status,
        serviceName: data[0].service_name,
        dateOpened: String(data[0].requested_datetime).substring(0, 10),
        dateUpdated: String(data[0].updated_datetime).substring(0, 10),
        address: data[0].address,
        statusNotes: data[0].status_notes,
        location: {
          point: {
            latitude: data[0].lat,
            longitude: data[0].long,
          }
        },
        description: data[0].description
      }
      requests.push(request)
    } catch (error) {
      console.error(error)
    }
  }
  requests.sort((a, b) => (a.dateUpdated < b.dateUpdated) ? 1 : -1)
  return requests
}
