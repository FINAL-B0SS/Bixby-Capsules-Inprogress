var console = require('console')
const feeds = require("./feeds");

module.exports.function = function fetchSportsList(tag) {
  var ret = []

  feeds.forEach(function (feed) {
    feed.tags.forEach(function (tags) {
      (tag && tags.toLowerCase().includes(tag.toLowerCase())) ? ret.push(feed) : 0
    })
  })

  return ret.length > 0 ? ret : feeds;
}