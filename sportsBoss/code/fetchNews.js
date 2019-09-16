var http = require('http')
var console = require('console')

module.exports.function = function fetchNews (tag, search) {

  var data = http.getUrl(search.url, {format: 'xmljs'})
  var ret = []
  console.log(data)
  for (var i = 0; i < data.rss.channel.item.length; i += 1) {
    var tmp = {}
    tmp.tag = search.text
    if (data.rss.channel.item[i].link)
      tmp.link = data.rss.channel.item[i].link
    if (data.rss.channel.copyright)
      tmp.copyright = data.rss.channel.copyright
    if (data.rss.channel.image)
      tmp.copyrightImage = {url: data.rss.channel.image.url}
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
      tmp.image = {url: data.rss.channel.item[i].image}
    else
      tmp.image = {url: "icon.png"}
    if (data.rss.channel.item[i].description && data.rss.channel.item[i].description != 'null')
      tmp.description = data.rss.channel.item[i].description
    else
      tmp.description = "No description"
    ret.push(tmp)
  }
  return ret
}