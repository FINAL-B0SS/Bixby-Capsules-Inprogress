var http = require('http')
var console = require('console')

module.exports.function = function fetchNews(tag, search) {

  var data = http.getUrl(search.url, { format: 'xmljs' })
  var ret = []
  var tmp = {}

  console.log(data)
  if ("enclosure" in data.rss.channel.item[0]) {
    tmp = {}
    var i = 0;
    tmp.tag = search.text
    if (data.rss.channel.item[i].link)
      tmp.link = data.rss.channel.item[i].link
    if (data.rss.channel.copyright)
      tmp.copyright = data.rss.channel.copyright
    if (data.rss.channel.image)
      tmp.copyrightImage = { url: data.rss.channel.image.url }
    if (data.rss.channel.item[i].title)
      tmp.title = data.rss.channel.item[i].title
    else
      tmp.title = "No title"
    if (data.rss.channel.item[i].pubDate)
      tmp.date = data.rss.channel.item[i].pubDate
    else
      tmp.date = "Unknown"
    if (data.rss.channel.item[i]['itunes:image'])
      tmp.image = { url: data.rss.channel.item[i]['itunes:image']['@href'] }
    else
      tmp.image = { url: "icon.png" }
    if (typeof data.rss.channel.item[i].description == 'string'
      && data.rss.channel.item[i].description
      && data.rss.channel.item[i].description != 'null')
      tmp.description = data.rss.channel.item[i].description
    else
      tmp.description = "No description"
    tmp.audioItem = {
      id: 1,
      stream: [
        {
          url: "https://storage.googleapis.com/bixby-audio-player-example/meows/203121_777645-lq.mp3",
          format: "mp3"
        }
      ],
      title: "Cat-ch Phrase",
      subtitle: data.rss.channel.item[i]['itunes:subtitle'],
      artist: "Cool Cat",
      albumName: "Catatonic",
      albumArtUrl: data.rss.channel.item[i]['itunes:image']['@href']
    }
    temp = tmp
    return ([temp, tmp])
  } else {
    for (var i = 0; i < data.rss.channel.item.length; i += 1) {
      tmp = {}
      tmp.tag = search.text
      if (data.rss.channel.item[i].link)
        tmp.link = data.rss.channel.item[i].link
      if (data.rss.channel.copyright)
        tmp.copyright = data.rss.channel.copyright
      if (data.rss.channel.image)
        tmp.copyrightImage = { url: data.rss.channel.image.url }
      if (data.rss.channel.description)
        tmp.feedDescription = data.rss.channel.description
      if (data.rss.channel.item[i].title)
        tmp.title = data.rss.channel.item[i].title
      else
        tmp.title = "No title"
      if (data.rss.channel.item[i].pubDate)
        tmp.date = data.rss.channel.item[i].pubDate
      else
        tmp.date = "Unknown"
      if (data.rss.channel.item[i].image)
        tmp.image = { url: data.rss.channel.item[i].image }
      else
        tmp.image = { url: "icon.png" }
      if (data.rss.channel.item[i].description && data.rss.channel.item[i].description != 'null')
        tmp.description = data.rss.channel.item[i].description
      else
        tmp.description = "No description"
      ret.push(tmp)
    }
  }
  return ret
}