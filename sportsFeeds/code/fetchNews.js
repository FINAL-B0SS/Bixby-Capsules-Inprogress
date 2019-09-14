var http = require('http')


module.exports.function = function fetchNews (tag, search) {

  var data = http.getUrl(search.url, {format: 'xmljs'})
  var ret = []

  data = data.rss.channel.item
  
  for (var i = 0; i < data.length; i += 1) {
    var tmp = {}
    tmp.tag = search.text
    if (data[i].image)
      tmp.image = {url: data[i].image}
    else
      tmp.image = {url: "icon.png"}
    if (data[i].link)
      tmp.link = data[i].link
    if (data[i].description)
      tmp.description = data[i].description
    else
      tmp.description = "No description"
    if (data[i].pubDate)
      tmp.date = data[i].pubDate
    else
      tmp.date = "Unknown"
    if (data[i].title)
      tmp.title = data[i].title
    else
      tmp.title = "No title"
    ret.push(tmp)
  }
  return ret
}