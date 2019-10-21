var http = require('http')
var console = require('console')
const HTMLCODES = require("./htmlCodes");
var g_item = 0

function removeHTML(str) {
	if (!str || (str === ''))
		return
	// Remove html tags and hyperlinks
	str = str.toString().replace(/<[^>]*>/g, '').split('[&#8230;]')[0];
	// Replace SGML with ascii symbols
	HTMLCODES.forEach(code => {
		while (str.includes(code.key))
			str = str.replace(code.key, code.value)
	})
	return str
}

function pullCDATA(search, key) {
	var rawText = http.getUrl(search.url, { format: 'text' }).split('item', 50)
	var matches = []
	var text = null
	const regexList = {
		image: /<img[^>]*src='([^']*)/g,
		description: /<\s*p[^>]*>([^<]*)<\s*\/\s*p\s*>/g
	}

	for (var i = 0; i < rawText.length; i++)
		rawText.splice(i, 1)
	while (matches = regexList[key].exec(rawText[g_item]))
		text = matches[1]
	return text
}

function fetchThumbnailImage(channel, item, search) {
	var ret = null
	
	if (item.image)
		ret = item.image
	else if ("enclosure" in item) {
		if (item['itunes:image'])
			ret = item['itunes:image']['@href']
		else if (item['media:thumbnail'])
			ret = item['media:thumbnail']['@url']
		else if (item.enclosure['@type'] == "image/jpeg")
			ret = item.enclosure['@url']
	}
	if (!ret)
		ret = pullCDATA(search, 'image')
	if (!ret) {
		if (channel.image)
			ret = channel.image.length > 1 ? channel.image[0].url : channel.image.url
		else if (channel['itunes:image'])
			ret = channel['itunes:image']['@href']
	}
	return { url: ret ? ret : 'icon.png' }
}

function fetchItemDescription(item, search) {
	var ret = null

	if (typeof item.description == 'string' && item.description && item.description != 'null')
		ret = item.description
	else if (item['itunes:summary'])
		ret = item['itunes:summary']
	else if (!ret)
		ret = pullCDATA(search, 'description')
	return ret ? removeHTML(ret) : "No description"
}

function returnPlacement(num) {
	var places = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh','eighth', 'ninth', 'tenth']
	return places[num]
}

function buildSharedtags(channel, item, search) {
	return {
		urlText: search.urlText,
		tag: search.text,
		image: fetchThumbnailImage(channel, item, search),
		link: item.link ? item.link : null,
		copyright: channel.copyright ? removeHTML(channel.copyright) : search.copyright,
		feedDescription: typeof channel.description == 'string' && channel.description ? removeHTML(channel.description) : null,
		title: item.title ? removeHTML(item.title) : "No title",
		date: item.pubDate ? item.pubDate : "Unknown",
		description: fetchItemDescription(item, search),
		place: returnPlacement(g_item == 4 || (g_item + 1) % 5 == 0 ? 4 : ((g_item + 1) % 5) - 1)
	}
}

function fetchAudioInfo(item, image) {
	return {
		id: 1,
		stream: [{ url: item['enclosure']['@url'], format: "mp3" }],
		albumArtUrl: image,
		title: item.title ? item.title : "No title",
		subtitle: item['itunes:subtitle'] ? item['itunes:subtitle'] : "No subtitle",
		artist: item['itunes:author'] ? item['itunes:author'] : "No artist",
	}
}

module.exports.function = function fetchNews(tag, search) {
	const data = http.getUrl(search.url, { format: 'xmljs' })
	var ret = []
	data.rss.channel.item.forEach(item => {
		ret.push(buildSharedtags(data.rss.channel, item, search))
		if ("enclosure" in item && (item.enclosure['@type'] == "mp3" || item.enclosure['@type'].includes('audio')))
			ret[ret.length - 1].audioItem = fetchAudioInfo(item, ret[ret.length - 1].image.url)
		g_item++
	})
	return ret
}