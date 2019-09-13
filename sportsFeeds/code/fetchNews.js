var http = require('http')


module.exports.function = function fetchNews (tag, search) {

  var data = http.getUrl(search.url, {format: 'xmljs'})
  var ret = []

  data = data.rss.channel.item
  
  for (var i = 0; i < data.length; i += 1) {
    var tmp = {}
    tmp.tag = (tag ? tag : search.text.toLowerCase()).replace(/^\w/, c => c.toUpperCase())
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