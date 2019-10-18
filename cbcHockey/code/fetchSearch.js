var console = require('console')
const feeds = require("./feeds");

module.exports.function = function fetchSportsList(tag) {

  // Build proper image object for each feed
  feeds.forEach(feed => {
    feed.image ? feed.image = { url: feed.image } : 0
  })

  // Build array of feeds that match the user's request
  var ret = []
  feeds.forEach(function (feed) {
    feed.tags.forEach(function (tags) {
      (tag && tags.toLowerCase().includes(tag.toLowerCase())) ? ret.push(feed) : 0
    })
  })

  return ret.length ? ret : feeds
}