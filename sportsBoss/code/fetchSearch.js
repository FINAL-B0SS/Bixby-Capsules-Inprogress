var console = require('console')
const feeds = require('./feeds');
var http = require('http')

module.exports.function = function fetchSportsList(tag) {

  // Build proper image object for each feed
  feeds.forEach(feed => {
    feed.image = feed.image ? { url: feed.image } : { url: 'icon.png' }
    feed.description = feed.description ? feed.description : http.getUrl(feed.url, { format: 'xmljs' }).rss.channel.description
  })

  // Build array of feeds that match the user's request
  var ret = []
  feeds.forEach(feed => {
    feed.tags.forEach(tags => {
      (tag && tags.toLowerCase().includes(tag.toLowerCase())) ? ret.push(feed) : 0
    })
  })

  return ret.length ? ret : feeds
}