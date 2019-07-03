exports.findContent = findContent

function findContent (items, searchTerm) {
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  var matches = []
  searchTerm = day;

  for (var i = 0; i < items.length; i++) {
    if (items[i].tags) {
      for (var j = 0; j < items[i].tags.length; j++) {
        if (searchTerm == items[i].tags[j]) {
          matches.push(items[i])
          break
        }
      }
    }
  }
  return matches
}