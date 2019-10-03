var console = require('console')
const FEEDS = require("./feeds");

module.exports.function = function fetchSportsList (tag) {
  var ret = []

  feeds = FEEDS

  for (var i = 0; i < feeds.length; i += 1)
    if (!tag)
        ret.push(feeds[i])
    else
      for (var j = 0; j < feeds[i].tags.length; j += 1)
        if (feeds[i].tags[j].toLowerCase().includes(tag.toLowerCase()))
          ret.push(feeds[i])
  if (ret.length == 0)
    ret = feeds

  return ret;
}