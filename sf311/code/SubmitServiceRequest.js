var http = require('http')
var console = require('console')

module.exports = function SubmitServiceRequest (description, makeModel, licensePlate, color, firstName, lastName, email, phone, objectID, object, natureOfRequest, howManyPeople, howManyTents, poleType, type, containsRacialSlursOrProfanity, wholeBlock, location, serviceCode, serviceName) {
  var url = "http://mobile311-dev.sfgov.org/open311/v2/requests.json"
  var data = http.getUrl(url, {format: 'text'})
  var ret = JSON.parse(data)
  var api_key = 'a4cb845ebcb8c15b4fb2f79fdd28f0e6'
  var request = {
    status: 'open',
    latitude: location.point.latitude,
    longitude: location.point.longitude,
    service_code: serviceCode,
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone: phone,
    description: description,
  }
  //PLEASE IGNORE - testing app for reporting graffiti in sf
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
  if (serviceName)
   request.service_name = serviceName

  return http.postUrl(url, request, {api_key: api_key}, {format: 'json'})
}