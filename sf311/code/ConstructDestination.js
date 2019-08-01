module.exports.function = function constructDestination (spot) {

  return {
    name: spot.name,
    address: spot.address,
    point: {
      latitude: spot.Location.point.latitude,
      longitude: spot.Location.point.longitude,   
    }
  }
}