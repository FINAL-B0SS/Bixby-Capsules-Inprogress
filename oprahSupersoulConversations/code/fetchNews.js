var http = require('http')
var console = require('console')
const HTMLCODES = require("./htmlCodes");

// Remove html from given text
function removeHTML(str) {
	if ((str === null) || (str === ''))
		return ;
	else
		str = str.toString();
	str = str.replace(/<[^>]*>/g, '')

	// Delete hyperlinks
	str = str.split('[&#8230;]')[0]
	// Replace SGML with ascii symbols
	for (var i = 0; i < HTMLCODES.length; i++)
		while (str.includes(HTMLCODES[i].key))
			str = str.replace(HTMLCODES[i].key, HTMLCODES[i].value)
	return str
}

// Build thumbnail image
function buildImage(item) {
	var ret = "icon.png"
	if ("enclosure" in item && item['itunes:image'])
		ret = item['itunes:image']['@href']
	else if (item['media:thumbnail'])
		ret = item['media:thumbnail']['@url']
	else if (item.image)
		ret = item.image
	else if ("enclosure" in item && item.enclosure['@type'] == "image/jpeg")
		ret = item.enclosure['@url']
	if (!ret)
		ret = "icon.png"
	return { url: ret }
}

// Builds an object with the tags shared between all types of RSS Feeds
function buildSharedtags(channel, i, search) {
	var ret = {}

	//console.log(channel.item[i])
	ret.urlText = search.urlText
	ret.tag = search.text
	if (channel.item[i].link)
		ret.link = channel.item[i].link
	if (channel.copyright)
		ret.copyright = removeHTML(channel.copyright)
	ret.image = buildImage(channel.item[i])
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