var http = require('http')
var console = require('console')
//[{"token":"5d57c95be8969e867076606d"}]
// 5d632bb9195448dfebb788e4
module.exports = function SubmitServiceRequest (description, makeModel, licensePlate, color, firstName, lastName, email, phone, objectID, object, natureOfRequest, howManyPeople, howManyTents, poleType, type, containsRacialSlursOrProfanity, wholeBlock, location, serviceInfo) {
  var url = "http://mobile311-dev.sfgov.org/open311/v2/requests.json"
  var data = http.getUrl(url, {format: 'text'})
  var ret = JSON.parse(data)
  var options = {
    format: "json",
    query: {
      api_key: "a4cb845ebcb8c15b4fb2f79fdd28f0e6",
      // service_code: serviceInfo.serviceCode,
      // lat: location.point.latitude,
      // long: location.point.longitude,
      // first_name: firstName,
      // last_name: lastName,
      // email: email,
      // phone: phone,
      // description: description,
    }
  }
  var request = {
    api_key: "a4cb845ebcb8c15b4fb2f79fdd28f0e6",
    jurisdiction_id: "sfgov.org",
    lat: location.point.latitude,
    long: location.point.longitude,
    service_code: serviceInfo.serviceCode,
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone: phone,
    description: description,
  }
  if (makeModel)
    request.make_model = makeModel
  if (licensePlate)
   request.license_plate = licensePlate
  if (color)
   request.color = color
  if (objectID)
   request.object_id = objectID
  if (object)
   request.object = object
  if (natureOfRequest)
   request.nature_of_request = natureOfRequest
  if (howManyPeople)
   request.how_many_people = howManyPeople
  if (howManyTents)
   request.how_many_tents = howManyTents
  if (poleType)
   request.pole_type = poleType
  if (type)
   request.type = type
  if (containsRacialSlursOrProfanity)
   request.contains_racialSlurs_or_profanity = containsRacialSlursOrProfanity
  if (wholeBlock)
   request.whole_block = wholeBlock
  if (serviceInfo.serviceName)
   request.service_name = serviceInfo.serviceName

  http.postUrl(url, request, options)
  return "2"
}