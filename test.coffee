hmaProxyParse = require "./"
bhttp = require "bhttp"
Promise = require "bluebird"

Promise.try ->
	bhttp.get "http://proxylist.hidemyass.com/"
.then (response) ->
	console.log hmaProxyParse(response.body.toString())
