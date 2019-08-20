var http = require('http')
var console = require('console')

function build_episode(id) {
var episodes = JSON.parse(http.getUrl("https://rickandmortyapi.com/api/episode/" + id, {format: 'text'}))
var ret = {
  name: episodes.name,
  air_date: episodes.air_date,
  season: episodes.episode,
  characters: []
}

for (var i = 0; i < episodes.characters.length; i += 1) {
  var characters = JSON.parse(http.getUrl("https://rickandmortyapi.com/api/character/" + Number(episodes.characters[i].match(/\d+/), {format: 'text'})))
  ret.characters.push({ 
    name: characters.name,
    picture: { url: characters.image }
    })
 }
  return ret
}

function build_character(id) {
  var characters = JSON.parse(http.getUrl("https://rickandmortyapi.com/api/character/" + id, {format: 'text'}))

  var ret = {
      name: characters.name,
      status: characters.status,
      species: characters.species,
      gender: characters.gender,
      origin: build_location(Number(characters.origin.url.match(/\d/g))),
      location: build_location(Number(characters.location.url.match(/\d+/))),
      picture: { url: characters.image },
      episodes: []
  }
  if (characters.type) {
    ret.type = characters.type
  }
  for (var i = 0; i < characters.episode.length; i += 1) {
    ret.episodes.push((build_episode(Number(characters.episode[i].match(/\d+/)))))
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
    dimension: locations.dimension,
    residents: []    
  }
 for (var i = 1; i < locations.residents.length; i += 1) {
  var characters = JSON.parse(http.getUrl("https://rickandmortyapi.com/api/character/" + i, {format: 'text'}))
  ret.residents.push({ 
    name: characters.name,
    picture: { url: characters.image }
    })
 }
  return ret
}

exports.function = function (text) {
  var characters = JSON.parse(http.getUrl("https://rickandmortyapi.com/api/character/1", {format: 'text'}))
  var ret = []

  for (var i = 1; i < 3/*494*/; i += 1) {
    var person = build_character(i)
    if (person.name == text || text == 'all' || !text) {
      ret.push(person)
    }
    
  }
  return ret
}