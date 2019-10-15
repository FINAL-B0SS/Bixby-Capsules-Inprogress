var http = require('http')
var secret = require('secret')

function BuildnatureOfRequestCode(sc) {
  var requestCodes = {
    "518d564b601827e38800002d" : "request_type",
    "518d5cc9601827e388000183" : "details",
    "5a6b5ac2d0521c1134854b01" : "Nature_of_request"
  }
  return (sc in requestCodes ? requestCodes[sc] : "nature_of_request")
}

function BuildtypeCode(sc) {
  var typeCodes = { "518d5c0d601827e388000156" : "nature_of_request" }
  return (sc in typeCodes ? typeCodes[sc] : "request_type")
}

module.exports = function SubmitServiceRequest(description, firstName, lastName, email, phone, object, natureOfRequest, howManyPeople, howManyTents, type, containsRacialSlursOrProfanity, wholeBlock, location, serviceInfo, signStatus, signType, poleStatus, poleType) {
  var url = secret.get('url.requests') + '.json'
  var ret = http.getUrl(url, { format: 'json' })
  var token = ""
  var options = {
    format: "json",
  }
  var request = {
    api_key: secret.get('key'),
    lat: location.point.latitude,
    long: location.point.longitude,
    service_code: serviceInfo.serviceCode,
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone: phone,
    description: description,
    attribute: {}
  }

  var natureOfRequestCode = BuildnatureOfRequestCode(serviceInfo.serviceCode)
  var typeCode = BuildtypeCode(serviceInfo.serviceCode)

  if (object)
    request['attribute']['request_type'] = object.key
  if (natureOfRequest)
    request['attribute'][natureOfRequestCode] = natureOfRequest.key
  if (howManyPeople)
    request['attribute']['cmbpeople'] = howManyPeople.key
  if (howManyTents)
    request['attribute']['cmbstructures'] = howManyTents.key
  if (type)
    request['attribute'][typeCode] = type.key
  if (containsRacialSlursOrProfanity)
    request['attribute']['nature_of_request'] = containsRacialSlursOrProfanity.key
  if (wholeBlock)
    request['attribute']['whole_block'] = wholeBlock.key
  if (signType)
    request['attribute']['cmbtype'] = signType.key
  if (signStatus)
    request['attribute']['cmbnature'] = signStatus.key
  if (poleStatus)
    request['attribute']['cmbsupport'] = poleStatus.key
  if (poleType)
    request['attribute']['pole_type'] = poleType.key
  if (serviceInfo.serviceName)
    request.service_name = serviceInfo.serviceName.name

  var postResponse = http.postUrl(url, request, options)
  if (Array.isArray(postResponse))
    token = postResponse[0].token
  else
    token = postResponse.token
  return (token)
}