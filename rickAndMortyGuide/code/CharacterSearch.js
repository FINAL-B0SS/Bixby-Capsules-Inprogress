var http = require('http')
var console = require('console')

function build_episode(id) {
  var episodes = JSON.parse(http.getUrl("https://rickandmortyapi.com/api/episode/" + id, {format: 'text'}))
  var ret = {
    name: episodes.name,
    air_date: episodes.air_date,
    episode: episodes.episode,
  }
  
  ret.characters = []

 for (var i = 1; i < episodes.characters.length; i += 1) {
    ret.characters.push((build_character(Number(episodes.characters[i].match(/\d/g).join("")))))
  }
  return ret
}

function build_character(id) {
  var characters = JSON.parse(http.getUrl("https://rickandmortyapi.com/api/character/" + id, {format: 'text'}))
  var ret = {
      name: characters.name,
      status: characters.status,
      species: characters.species,
     // type: characters.type,
      gender: characters.gender,
      origin: build_location(Number(characters.origin.url.match(/\d/g))),
      location: build_location(Number(characters.location.url.match(/\d/g)))
  }
  ret.episodes = []
   for (var i = 1; i < characters.episode.length; i += 1) {
  //   ret.episodes.push((build_episode(Number(characters.episode[i].match(/\d/g).join("")))))
   }
  return ret
}

function build_location(id) {
  if (!id)
    return ;
  var locations = JSON.parse(http.getUrl("https://rickandmortyapi.com/api/location/" + id, {format: 'text'}))
  
  var ret = {
    name: locations.name,
    type: locations.type,
    dimension: locations.dimension    
  }
  
  ret.residents = []
 // for (var i = 1; i < locations.residents; i += 1) {
 //    ret.residents.push((build_character(Number(locations.residents[i].match(/\d/g).join("")))))
 //  }
  return ret
}

exports.function = function (text) {
  var ret = []
  for (var i = 1; i < 494; i += 1) {
    var characters = JSON.parse(http.getUrl("https://rickandmortyapi.com/api/character/" + i, {format: 'text'}))
    var person = build_character(i)
  //  if (person.name == text || text == 'all' || !text)
      ret.push(person)
  }
  console.log(ret)

  return ret
}