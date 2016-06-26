var cheerio,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

cheerio = require("cheerio");

module.exports = function(html) {
  var $, junk, junkRegex, match, proxies, rows;
  junkRegex = /\.([a-zA-Z0-9_-]+){display:none}/g;
  junk = [];
  proxies = [];
  match = true;
  while (match) {
    match = junkRegex.exec(html);
    if (match) {
      junk.push(match[1]);
    }
  }
  $ = cheerio.load(html);
  rows = $("tbody > tr");
  rows.each(function() {
    var anonymity, connectionTime, country, element, ipBlock, ipSegments, port, protocol, speed, timestamp;
    element = $(this);
    timestamp = element.children(".timestamp").attr("rel");
    port = element.children("td:nth-of-type(3)").text().replace(/\n/g, "").trim();
    country = element.find("td.country").attr("rel");
    speed = element.find("td .progress-indicator").eq(0).attr("value");
    connectionTime = element.find("td .progress-indicator").eq(1).attr("value");
    protocol = element.children("td:nth-of-type(7)").text().replace(/\n/g, "").trim();
    anonymity = element.children("td:nth-of-type(8)").text().replace(/\n/g, "").trim();
    ipSegments = [];
    ipBlock = element.find("td:nth-of-type(2) > span");
    ipBlock.contents().each(function() {
      var className, classNames, ipElement, isJunk, _i, _len, _ref, _ref1, _ref2, _ref3;
      ipElement = $(this);
      if (this.tagName === null) {
        if ((_ref = ipElement.text().trim()) !== "." && _ref !== "") {
          return ipSegments.push(ipElement.text().trim().replace(".", ""));
        }
      } else if ((_ref1 = this.tagName) === "div" || _ref1 === "span") {
        isJunk = false;
        classNames = (_ref2 = ipElement.attr("class")) != null ? _ref2.split(" ") : void 0;
        if (classNames != null) {
          for (_i = 0, _len = classNames.length; _i < _len; _i++) {
            className = classNames[_i];
            if (__indexOf.call(junk, className) >= 0) {
              isJunk = true;
            } else {

            }
          }
        }
        if (ipElement.attr("style") != null) {
          if (ipElement.css("display") === "none") {
            isJunk = true;
          }
        }
        if (!isJunk && ((_ref3 = ipElement.text().trim()) !== "." && _ref3 !== "")) {
          return ipSegments.push(ipElement.text().trim().replace(".", ""));
        }
      }
    });
    return proxies.push({
      updateTimestamp: timestamp,
      ip: ipSegments.join("."),
      port: port,
      country: country,
      speed: speed,
      connectionTime: connectionTime,
      protocol: protocol,
      anonymity: anonymity
    });
  });
  return proxies;
};
