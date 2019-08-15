var console = require('console')

exports.function = function (artist, song) {
  var url = encodeURI("https://api.lyrics.ovh/v1/"+artist+"/"+song)
  var http = require('http')
  var console = require('console')
  var config = require('config')
  var data = http.getUrl(url, {format: 'text'})
  var ret = JSON.parse(data)
  return {
    Artist: artist,
    Song: song,
    Lyrics: ret.lyrics
  }
}