skit.define("skit.platform.netproxy:js", ["skit.platform.urls:js","skit.platform.netproxy:server","skit.platform.netproxy:browser"], function() {  return ((function(skit_platform_urls,__module___server,__module___browser) { var module = {exports: {}}; var defined = null; function define() {   for (var i = 0; i < arguments.length; i++) {     if (typeof arguments[i] == 'function') { defined = arguments[i](); break; }   } } define.amd = true; var result = (function skit_platform_netproxy_js() {'use strict';

/**
 * @module
 * @ignore
 * @license
 * (c) 2014 Cluster Labs, Inc. https://cluster.co/
 * License: MIT
 */

var urls = skit_platform_urls;

var server = __module___server;
var browser = __module___browser;

var PROXIES = {};

var environment = server || browser;
var sendProxied = environment.sendProxied;


function __register__(name, proxyObject) {
  PROXIES[name] = proxyObject;
}


function getProxyNamed(name) {
  var proxyObject = PROXIES[name];
  if (!proxyObject) {
    throw new Error('Improperly configured: no proxy named ' + name);
  }

  return function() {
    // The arguments here are the same as skit.platform.net:send(),
    // we are adding the given proxy object to the front.
    var args = Array.prototype.slice.apply(arguments);
    args.unshift(proxyObject);
    sendProxied.apply(null, args);
  }
}


module.exports = {
  __register__: __register__,
  getProxyNamed: getProxyNamed
};
})(); return result || defined || module.exports; })).apply(this, arguments)});