var http = require('http')
var console = require('console')

exports.function = function () {
  var url = "https://randomuser.me/api/"
  var ret = http.getUrl(url, {format: 'json'})

  console.log(ret)
  var name = ret.results[0].name.first + " " + ret.results[0].name.last
  name = name.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
  return {
    Gender: ret.results[0].gender,
    Name: name,
    Street: ret.results[0].location.street.number + " " + ret.results[0].location.street.name,
    City: ret.results[0].location.city,
    State: ret.results[0].location.state,
    Postcode: ret.results[0].location.postcode,
    Email: ret.results[0].email,
    Username: ret.results[0].login.username,
    Password: ret.results[0].login.password,
    DOB: String(ret.results[0].dob.date).substring(0, 10),
    Age: ret.results[0].dob.age,
    Phone: ret.results[0].phone,
    Cell: ret.results[0].cell,
  }
}