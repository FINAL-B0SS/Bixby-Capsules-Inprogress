var http = require('http')
var console = require('console')
const HTMLCODES = require("./htmlCodes");

// Remove html from given text
function removeHTML(str) {
	if ((str === null) || (str === ''))
		return
	else
		str = str.toString();
	str = str.replace(/<[^>]*>/g, '')
	// Delete hyperlinks
	str = str.split('[&#8230;]')[0]
	// Replace SGML with ascii symbols
	HTMLCODES.forEach(function(code) {
		while (str.includes(code.key))
			str = str.replace(code.key, code.value)
	})
	return str
}

// Build thumbnail image
function buildImage(channel, i) {
	var ret = "icon.png"
	if ("enclosure" in channel.item[i] && channel.item[i]['itunes:image'])
		ret = channel.item[i]['itunes:image']['@href']
	else if (channel.item[i]['media:thumbnail'])
		ret = channel.item[i]['media:thumbnail']['@url']
	else if (channel.item[i].image)
		ret = channel.item[i].image
	else if ("enclosure" in channel.item[i] && channel.item[i].enclosure['@type'] == "image/jpeg")
		ret = channel.item[i].enclosure['@url']
	if (!ret)
		ret = "icon.png"
	if (ret == "icon.png" && channel.image)
		ret = channel.image.length > 1 ? channel.image[0].url : channel.image.url
	else if (channel['itunes:image'])
		ret = channel['itunes:image']['@href']
	return { url: ret }
}

// Builds an object with the tags shared between all types of RSS Feeds
function buildSharedtags(channel, i, search) {
	var ret = {}

	//console.log(channel.item[i])
	ret.urlText = search.urlText
	ret.tag = search.text
	ret.image = buildImage(channel, i)
	if (channel.item[i].link)
		ret.link = channel.item[i].link
	if (channel.copyright)
		ret.copyright = removeHTML(channel.copyright)
	else
		ret.copyright = search.copyright
	if (typeof channel.description == 'string' && channel.description)
		ret.feedDescription = removeHTML(channel.description)
	if (channel.item[i].title)
		ret.title = removeHTML(channel.item[i].title)
	else
		ret.title = "No title"
	if (channel.item[i].pubDate)
		ret.date = channel.item[i].pubDate
	else
		ret.date = "Unknown"
	if (typeof channel.item[i].description == 'string'
		&& channel.item[i].description
		&& channel.item[i].description != 'null')
		ret.description = removeHTML(channel.item[i].description)
	else
		ret.description = "No description"
	if (channel.item[i]['itunes:summary'])
		ret.description = removeHTML(channel.item[i]['itunes:summary'])
	return ret;
}

// Builds audioItem with given item from RSS feed
function buildAudioItem(data, i, image) {
	ret = {
		id: 1,
		stream: [
			{
				url: data.rss.channel.item[i]['enclosure']['@url'],
				format: "mp3"
			}
		],
		albumArtUrl: image
	}
	if (data.rss.channel.item[i].title)
		ret.title = data.rss.channel.item[i].title
	else
		ret.title = "No title"
	if (data.rss.channel.item[i]['itunes:subtitle'])
		ret.subtitle = data.rss.channel.item[i]['itunes:subtitle']
	else
		ret.subtitle = "No subtitle"
	if (data.rss.channel.item[i]['itunes:author'])
		ret.artist = data.rss.channel.item[i]['itunes:author']
	else
		ret.artist = "No artist"
	return (ret)
}

module.exports.function = function fetchNews(tag, search) {
	var data = http.getUrl(search.url, { format: 'xmljs' })
	var ret = []

	for (var i = 0; i < data.rss.channel.item.length; i += 1) {
		ret.push(buildSharedtags(data.rss.channel, i, search))
		if ("enclosure" in data.rss.channel.item[i]
			&& (data.rss.channel.item[i].enclosure['@type'] == "mp3" || data.rss.channel.item[i].enclosure['@type'].includes('audio'))) {
			ret[ret.length - 1].audioItem = buildAudioItem(data, i, ret[ret.length - 1].image.url)
		}
	}
	return ret
}