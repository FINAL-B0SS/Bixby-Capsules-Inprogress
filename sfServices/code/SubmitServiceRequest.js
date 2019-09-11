var http = require('http')
var console = require('console')
//[{"token":"5d57c95be8969e867076606d"}]
// 5d632bb9195448dfebb788e4

function BuildnatureOfRequestCode(sc) {
  if (sc == "518d564b601827e38800002d")
    return "request_type"
  if (sc == "518d5cc9601827e388000183")
    return "details"
  if (sc == "5a6b5ac2d0521c1134854b01")
    return "Nature_of_request"
  return ("nature_of_request")
}

function BuildtypeCode(sc) {
  if (sc == "518d5c0d601827e388000156")
    return ("nature_of_request")
  return ("request_type")
}

module.exports = function SubmitServiceRequest (description, firstName, lastName, email, phone, object, natureOfRequest, howManyPeople, howManyTents, type, containsRacialSlursOrProfanity, wholeBlock, location, serviceInfo, signStatus, signType, poleStatus, poleType) {
  var url = "http://mobile311-dev.sfgov.org/open311/v2/requests.json"
  var ret = JSON.parse(http.getUrl(url, {format: 'text'}))
  var token = ""
  var options = {
    format: "json",
  }
  var request = {
    api_key: "a4cb845ebcb8c15b4fb2f79fdd28f0e6",
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

  console.log(request['attribute'])
  var postResponse = http.postUrl(url, request, options)
  if (Array.isArray(postResponse))
    token = postResponse[0].token
  else
    token = postResponse.token
  return (token)
}