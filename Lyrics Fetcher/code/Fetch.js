var http = require('http')

exports.function = function (artist, song) {
  var url = encodeURI("https://api.lyrics.ovh/v1/"+artist+"/"+song)
  var ret = http.getUrl(url, {format: 'json'})
  
  return {
    Artist: artist,
    Song: song,
    Lyrics: ret.lyrics
  }
}