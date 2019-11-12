var http = require('http')
var console = require('console')
var g_item = 0

function removeHTML(str) {
	if (str && str !== '') {
		// Remove html tags and hyperlinks
		str = str.replace(/<[^>]*>/g, '').split('[&#8230;]')[0];
		// Replace SGML with ascii symbols
		require('./htmlCodes').forEach(code => {
			while (str.includes(code.key))
				str = str.replace(code.key, code.value)
		})
		return str
	}
}

function parseCDATA(search, key) {
	const regexList = {
		img: /<img[^>]*src='([^']*)/g,
		p: /<\s*p[^>]*>([^<]*)<\s*\/\s*p\s*>/g,
		description: /<description>(.*?)<\/description>/g
	}
	// Pull xml data as text and remove all whitespaces
	var data = http.getUrl(search.url, { format: 'text' }).replace(/\s/g, ' ')
	// Pull <description> tags
	var descriptions = data.match(regexList['description'])
	// Pull <p> or <img> tag from description
	var tag = regexList[key].exec(descriptions[g_item].match(regexList[key]))
	// Pull and return text from tag
	return tag && tag[1] ? tag[1] : null
}

function fetchThumbnail(channel, item, search) {
	var ret = null

	if (item.image)
		ret = item.image
	else if ('enclosure' in item) {
		if (item['itunes:image'])
			ret = item['itunes:image']['@href']
		else if (item['media:thumbnail'])
			ret = item['media:thumbnail']['@url']
		else if (item.enclosure['@type'] == 'image/jpeg')
			ret = item.enclosure['@url']
	}
	if (!ret)
		ret = parseCDATA(search, 'img')
	if (!ret) {
		if (channel.image)
			ret = channel.image.length > 1 ? channel.image[0].url : channel.image.url
		else if (channel['itunes:image'])
			ret = channel['itunes:image']['@href']
	}
	return { url: ret ? ret : 'icon.png' }
}

function fetchDescription(item, search) {
	var ret = null

	if (item.description && typeof item.description == 'string' && item.description != 'null')
		ret = item.description
	else if (item['itunes:summary'])
		ret = item['itunes:summary']
	else if (!ret)
		ret = parseCDATA(search, 'p')
	return ret ? removeHTML(ret) : 'No description'
}

function fetchVideoInfo(item, search, channel) {
	return {
		videoUrl: item['enclosure']['@url'],
		videoThumbnail: fetchThumbnail(channel, item, search).url
	}
}

function fetchAudioInfo(item, search, channel) {
	return {
		id: 1,
		title: item.title ? item.title : 'No title',
		albumArtUrl: fetchThumbnail(channel, item, search).url,
		stream: [{ url: item['enclosure']['@url'], format: 'mp3' }],
		artist: item['itunes:author'] ? item['itunes:author'] : 'No artist',
		subtitle: item['itunes:subtitle'] ? item['itunes:subtitle'] : 'No subtitle'
	}
}

function buildSharedtags(channel, item, search) {
	var places = ['first', 'second', 'third', 'fourth', 'fifth']
	return {
		tag: search.text,
		urlText: search.urlText,
		link: item.link ? item.link : null,
		date: item.pubDate ? item.pubDate : null,
		description: fetchDescription(item, search),
		image: fetchThumbnail(channel, item, search),
		title: item.title ? removeHTML(item.title) : 'No title',
		copyright: channel.copyright ? removeHTML(channel.copyright) : search.copyright,
		place: places[g_item == 5 || g_item % 5 == 0 ? 4 : (g_item % 5) - 1],
		feedDescription: typeof channel.description == 'string' && channel.description ? removeHTML(channel.description) : null,
		videoItem: 'enclosure' in item && (item.enclosure['@type'] == 'mp4' || item.enclosure['@type'].includes('video')) ? fetchVideoInfo(item, search, channel) : null,
		audioItem: 'enclosure' in item && (item.enclosure['@type'] == 'mp3' || item.enclosure['@type'].includes('audio')) ? fetchAudioInfo(item, search, channel) : null
	}
}

module.exports.function = function fetchNews(tag, search) {
	try {
		return http.postUrl('https://rss-template-api.herokuapp.com/rss', search, { format: 'json' }).newsData
	} catch (e) {
		console.log(e)
		const data = http.getUrl(search.url, { format: 'xmljs' })
		if (data.rss.channel.item.length > 0) {
			return data.rss.channel.item.map(item => {
				g_item++
				return buildSharedtags(data.rss.channel, item, search)
			})
		}
	}
}