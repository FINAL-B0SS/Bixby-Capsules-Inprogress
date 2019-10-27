var http = require('http')

module.exports.function = function fetchNews(tag, search) {
	return http.postUrl('https://rss-template-api.herokuapp.com/rss', search, { format: 'json' }).newsData
}