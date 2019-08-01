function submitSpot (spotName, categories, description, location) {
  var url = "http://30a70366.ngrok.io/spots"
  var http = require('http')
  var console = require('console')
  var config = require('config')
  var test = http.getUrl(url, {format: 'text'})
  var ret = JSON.parse(test)
  var time = new Date
  
  var spot = {
    id: time.getTime(),
    spotName: spotName,
    distance: 0,
    categories: categories,
    description: description,
    latitude: location.point.latitude,
    longitude: location.point.longitude,
    Location: location
  };
  
  http.postUrl(url, spot, {format: 'json'})
  return spot
}

module.exports = submitSpot