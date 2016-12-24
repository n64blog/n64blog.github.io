
// Based on this: https://docs.google.com/spreadsheets/d/1dwRRP-ORkYkSUpGlSLGrBASY69ZafJNZlBV5ARYEYSw/edit?ts=5819eb06#gid=0
// Use this as an example: https://github.com/n64blog/n64blog.github.io/edit/master/_games/Super-Mario-64.md

var fs = require("fs")
var https = require("https")
var hb = require("handlebars")
var source = fs.readFileSync("./views/sample.hb", "utf8")
var template = hb.compile(source)
https.get("https://docs.google.com/spreadsheets/d/1dwRRP-ORkYkSUpGlSLGrBASY69ZafJNZlBV5ARYEYSw/pub?gid=0&single=true&output=tsv", (res) => {
	const statusCode = res.statusCode;
	const contentType = res.headers['content-type']

	var error
	if (statusCode !== 200) {
		error = new Error(`Request Failed.\nStatus Code: ${statusCode}`)
	} else if (!/^text\/tab-separated-values/.test(contentType)) {
		error = new Error(`Invalid content-type. Expected text/tab-separated-values but received ${contentType}`)
	}
	if (error) {
		console.log(error.message)
		// consume response data to free up memory
		res.resume()
		return
	}

	res.setEncoding("utf8")
	var rawData = ""
	res.on("data", (chunk) => rawData += chunk)
	res.on("end", () => {
		try {
			var rawArray = rawData.split(/\r\n/)
			var headers = (Array.isArray(rawArray) && rawArray[0])
				? rawArray.shift().split("\t")
				: null
			if (headers) {
				rawArray.forEach(row => {
					var values = row.split("\t")
					var data = {}
					values.forEach((datum, index) => data[headers[index]] = datum)
					if (data.hasOwnProperty("md-filename") && data["md-filename"] && data.hasOwnProperty("description") && data["description"]) {
						data.description = data.description.replace(/\ \ /g, "\n\n")
						var fileContents = template(data)
						fs.writeFile(`../_games/${data["md-filename"]}.md`, fileContents, "utf8", e => {
							if (e) throw e
							console.log("Generated:", data["md-filename"])
						})
					}
				})
			}
		} catch (e) {
			console.log(e.message)
		}
	})
})
