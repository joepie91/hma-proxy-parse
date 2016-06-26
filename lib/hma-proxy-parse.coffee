cheerio = require "cheerio"

module.exports = (html) ->
	junkRegex = /\.([a-zA-Z0-9_-]+){display:none}/g

	junk = []
	proxies = []

	match = true # Kickstarting the loop...
	while match
		match = junkRegex.exec html
		if match
			junk.push match[1]

	$ = cheerio.load html

	rows = $("tbody > tr")

	rows.each ->
		element = $(this)
		timestamp = element.children(".timestamp").attr("rel")
		port = element.children("td:nth-of-type(3)").text().replace(/\n/g, "").trim()
		country = element.find("td.country").attr("rel")
		speed = element.find("td .progress-indicator").eq(0).attr("value")
		connectionTime = element.find("td .progress-indicator").eq(1).attr("value")
		protocol = element.children("td:nth-of-type(7)").text().replace(/\n/g, "").trim()
		anonymity = element.children("td:nth-of-type(8)").text().replace(/\n/g, "").trim()

		ipSegments = []

		ipBlock = element.find("td:nth-of-type(2) > span")

		ipBlock.contents().each ->
			ipElement = $(this)

			if this.tagName == null
				if ipElement.text().trim() not in [".", ""]
					ipSegments.push ipElement.text().trim().replace(".", "")
			else if this.tagName in ["div", "span"]
				isJunk = false

				classNames = ipElement.attr("class")?.split(" ")

				if classNames?
					for className in classNames
						if className in junk
							isJunk = true
						else

				if ipElement.attr("style")?
					if ipElement.css("display") == "none"
						isJunk = true

				if not isJunk and ipElement.text().trim() not in [".", ""]
					ipSegments.push ipElement.text().trim().replace(".", "")

		proxies.push
			updateTimestamp: timestamp
			ip: ipSegments.join(".")
			port: port
			country: country
			speed: speed
			connectionTime: connectionTime
			protocol: protocol
			anonymity: anonymity

	return proxies
