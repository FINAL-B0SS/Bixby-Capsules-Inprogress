function distanceFind(lat1, lon1, lat2, lon2, unit) {
  
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
    dist = Math.round(dist * 10) / 10
		return dist;
	}
}

module.exports.function = function findSpot (categories, location, distance) {
  var url = "http://30a70366.ngrok.io/spots"
  var http = require('http')
  var console = require('console')
  var config = require('config')
  var test = http.getUrl(url, {format: 'text'})
  var ret = JSON.parse(test)
  var spots = [];
  var template
  
  if (!distance) {
    distance = 5
  }
for (var i = 0; i < ret.length; i++) {
    if (ret[i].categories == categories) {
      ret[i].distance = distanceFind(ret[i].latitude,ret[i].longitude, location.point.latitude, location.point.longitude, "M")
      if (ret[i].distance <= distance) {
        template = {
          spotName: ret[i].spotName,
          categories: ret[i].categories,
          description: ret[i].description,
          distance: ret[i].distance,
          Location: {
            point: {
              latitude: ret[i].latitude,
              longitude: ret[i].longitude,
            }
          }
        }
        spots.push(template)
      }
    }
  }
  return spots
}