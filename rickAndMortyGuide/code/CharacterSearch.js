var http = require('http')
var console = require('console')

function build_id(link) {
  var ret = ""
  for (var i = 0; i < link.length; i += 1) {
    if (link[i] >= '0' && link[i] <= '9')
    ret += link[i]
  }
  return ret
}

function build_character(id) {
  var characters = JSON.parse(http.getUrl("https://rickandmortyapi.com/api/character/" + id, {format: 'text'}))
  var origin = JSON.parse(http.getUrl("https://rickandmortyapi.com/api/location/" + build_id(characters.origin.url), {format: 'text'}))
  var location = JSON.parse(http.getUrl("https://rickandmortyapi.com/api/location/" + build_id(characters.location.url), {format: 'text'}))
  var ret = {
      name: characters.name,
      status: characters.status,
      species: characters.species,
      gender: characters.gender,
      origin: {
        name: origin.name,
        type: origin.type,
        dimension: origin.dimension,
        residents: []
      },
      location: {
        name: location.name,
        type: location.type,
        dimension: location.dimension,
        residents: []
      },
      picture: { url: characters.image },
      episodes: []
  }
  for (var i = 0; i < characters.episode.length; i += 1) {
    var episodes = JSON.parse(http.getUrl("https://rickandmortyapi.com/api/episode/" + build_id(characters.episode[i]), {format: 'text'}))
    e = {
      name: episodes.name,
      air_date: episodes.air_date,
      season: episodes.episode,
      characters: []
    }
    for (var j = 1; j < episodes.characters.length; j += 1) {
      var eCharacter = JSON.parse(http.getUrl("https://rickandmortyapi.com/api/character/" + build_id(episodes.characters[j]), {format: 'text'}))
      e.characters.push({ 
        name: eCharacter.name,
        picture: { url: eCharacter.image }
    })
   }
  ret.episodes.push(e)
  }
  for (var i = 1; i < origin.residents.length; i += 1) {
    var characters = JSON.parse(http.getUrl("https://rickandmortyapi.com/api/character/" + build_id(origin.residents[i]), {format: 'text'}))
     ret.origin.residents.push({
       name: characters.name,
       picture: { url: characters.image }
     })
  }
  for (var i = 1; i < location.residents.length; i += 1) {
    var characters = JSON.parse(http.getUrl("https://rickandmortyapi.com/api/character/" + build_id(location.residents[i]), {format: 'text'}))
     ret.location.residents.push({
       name: characters.name,
       picture: { url: characters.image }
     })
  }
  if (characters.type) {
    ret.type = characters.type
  }
  return ret
}

exports.function = function (text) {
  var ret = []
  
  return (build_character(1))
  // if (text) {
  //   for (var i = 1; i < 494; i += 1) {
  //    if (JSON.parse(http.getUrl("https://rickandmortyapi.com/api/character/" + i, {format: 'text'})).name.toLowerCase() == text) {
  //       // console.log(JSON.parse(http.getUrl("https://rickandmortyapi.com/api/character/" + i, {format: 'text'})).name.toLowerCase())
  //      return (build_character(i))
  //     }
  //   }
  //   // return ({
  //   //   name: "No character was found in the Rick and Morty multiverse named " + text,
  //   //   gender: "error"
  //   // })
  // } else {
  //   for (var i = 1; i < 5; i += 1) {
  //     ret.push(build_character(i))
  //   }
  // }
  return (ret)
}