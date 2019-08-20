var http = require('http')
var console = require('console')
var config = require('config')

//here it should accept either id or a particular meaning
module.exports.function = function searchMeaning (meaning) {
  // If id is "1111", then this makes a GET call to /meanings?ids=1111
  options = { 
    format: 'json',
    query: {
      ids: meaning.id
    }
  };
  var response = http.getUrl(config.get('remote.url') + '/meanings', options);
  return response;
}

// module.exports.function = function searchMeaning (id) {
//   // If id is "1111", then this makes a GET call to /meanings?ids=1111
//   options = { 
//     format: 'json',
//     query: {
//       ids: id
//     }
//   };
//   var response = http.getUrl(config.get('remote.url') + '/meanings', options);
//   return response;
// }