var console = require('console')
var http = require('http')

function buildUrl(sport) {
  var ret = ''
  if (sport.includes('nfl') || sport == 'football')
    ret = 'NFL'
  if (sport.includes('nba') || sport == 'basketball')
    ret = 'NBA'
  if (sport.includes('mlb') || sport == 'baseball')
    ret = 'MLB'
  if (sport.includes('nhl') || sport == 'hockey')
    ret = 'NHL'
  if (sport.includes('golf'))
    ret = 'Golf'
  if (sport.includes('auto') || sport.includes('car') || sport.includes('racing'))
    ret = 'RPM'
  if (sport.includes('tennis'))
    ret = 'Tennis'
  if (sport.includes('box'))
    ret = 'Boxing'
  if (sport.includes('college basketball'))
    ret = 'NCB'
  if (sport.includes('college football'))
    ret = 'NCF'
  if (sport.includes('college sports'))
    ret = 'NCAA'
  if (sport.includes('olympic'))
    ret = 'oly'
  if (sport.includes('horse'))
    ret = 'Horse'
  if (sport.includes('soccer'))
    ret = 'Soccer'
  if (sport.includes('poker'))
    ret = 'Poker'
  if (sport.includes('top'))
    ret = ''
  return ret
}

module.exports.function = function fetchNews (sport) {
  sport = buildUrl(sport.toLowerCase())
  var slash = sport != '' ? '/' : ''
  var url = 'https://www.espn.com/espn/rss'+slash+sport.toLowerCase()+'/news'
  var data = http.getUrl(url, {format: 'xmljs'})
  var ret = []

  data = data.rss.channel.item
  
  if (sport == 'oly')
    sport = 'Olympic'
  if (sport == 'Horse')
    sport = 'Horse Racing'
  if (sport == '')
    sport = 'top'
  for (var i = 0; i < data.length; i += 1) {
    var tmp = {sport: sport}
    if (data[i].image)
      tmp.image = {url: data[i].image}
    if (data[i].link)
      tmp.link = data[i].link
    if (data[i].description)
      tmp.description = data[i].description
    if (data[i].pubDate)
      tmp.date = data[i].pubDate
    if (data[i].title)
      tmp.title = data[i].title
    ret.push(tmp)
  }
  return ret
}