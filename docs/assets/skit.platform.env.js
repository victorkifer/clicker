skit.define("skit.platform.env:js", ["skit.platform.env:browser","skit.platform.env:server"], function() {  return ((function(__module___browser,__module___server) { var module = {exports: {}}; var defined = null; function define() {   for (var i = 0; i < arguments.length; i++) {     if (typeof arguments[i] == 'function') { defined = arguments[i](); break; }   } } define.amd = true; var result = (function skit_platform_env_js() {'use strict';

/**
 * @module
 * @license
 * (c) 2016 Cluster Labs, Inc. https://cluster.co/
 * License: MIT
 */

/** @ignore */
var browser = __module___browser;
/** @ignore */
var server = __module___server;



/**
 * @param {string} name Environment key name.
 * @return {object?} The env value, if present, or null.
 */
module.exports.get = function(name) {
  // Dummy function filled in by env_browser.js or env_server.js.
};


/* JSDoc, plz to ignore this. */
module.exports = browser || server;
})(); return result || defined || module.exports; })).apply(this, arguments)});