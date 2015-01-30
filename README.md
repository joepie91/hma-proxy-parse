# hma-proxy-parse

Good game, HideMyAss, but I win :)

This module extracts (parses) proxy details including the IP address from [http://proxylist.hidemyass.com/](http://proxylist.hidemyass.com/) and anything else using the same system, despite their (rather heavy) CSS-based obfuscation.

Note that this module only does the parsing; you're responsible for fetching the source HTML yourself.

## Caution!

Public proxies are [not](https://blog.haschek.at/post/fd9bc) [safe](http://blog.daviddworken.com/post/107949776854/scanning-for-malicious-proxies) [to use](https://github.com/ddworken/maliciousProxyScanner). They can see your IP address and the traffic you send. You are effectively giving the proxy operator full control and knowledge over your browsing, and they may even inject malware in the responses.

If you need to browse the internet privately, consider using [Tor](https://www.torproject.org/index.html.en) instead - however, please make sure to read the [caveats](https://www.torproject.org/download/download-easy.html.en#warning) that you need to keep in mind. Even with these caveats, Tor is vastly more secure than a public proxy.

## License

[WTFPL](http://www.wtfpl.net/txt/copying/) or [CC0](https://creativecommons.org/publicdomain/zero/1.0/), whichever you prefer. A donation and/or attribution are appreciated, but not required.

## Donate

My income consists entirely of donations for my projects. If this module is useful to you, consider [making a donation](http://cryto.net/~joepie91/donate.html)!

You can donate using Bitcoin, PayPal, Gratipay, Flattr, cash-in-mail, SEPA transfers, and pretty much anything else.

Bitcoins can also be sent to `1KafMHn6YEDFkUSoHK6pKkqqmfJUF5Wd1C` directly :)

## Contributing

Pull requests welcome. Please make sure your modifications are in line with the overall code style, and ensure that you're editing the `.coffee` files, not the `.js` files.

Build tool of choice is `gulp`; simply run `gulp` while developing, and it will watch for changes.

Be aware that by making a pull request, you agree to release your modifications under the licenses stated above.

## Usage

You can input HTML from any source, but this example uses [`bhttp`](https://www.npmjs.com/package/bhttp) in Promises mode.

```javascript
var hmaProxyParse = require("hma-proxy-parse");
var bhttp = require("bhttp");
var Promise = require("bluebird");

Promise.try(function(){
	return bhttp.get("http://proxylist.hidemyass.com/");
}).then(function(response){
	console.log(hmaProxyParse(response.body.toString()));
});
```

## API

### hmaProxyParse(html)

Parses the specified `html`, and returns an array of objects with proxy information. The objects look something like this:

```javascript
{
	updateTimestamp: '1422645602',
	ip: '187.108.223.204',
	port: '8080',
	country: 'br',
	speed: '2441',
	connectionTime: '235',
	protocol: 'HTTP',
	anonymity: 'Low'
}
```

It doesn't attempt to parse the actual data provided - all data is directly as specified in the list, and you'll have to figure out what to do with it. I have no idea, for example, what the bounds on `speed` or `connectionTime` are, or what the possible options for `anonymity` are.

If this helped you, don't forget to donate ;)
