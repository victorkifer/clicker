skit.define("skit.platform.cookies:js", ["skit.platform.cookies:browser","skit.platform.cookies:server"], function() {  return ((function(__module___browser,__module___server) { var module = {exports: {}}; var defined = null; function define() {   for (var i = 0; i < arguments.length; i++) {     if (typeof arguments[i] == 'function') { defined = arguments[i](); break; }   } } define.amd = true; var result = (function skit_platform_cookies_js() {'use strict';

/**
 * @module
 * @license
 * (c) 2014 Cluster Labs, Inc. https://cluster.co/
 * License: MIT
 */

/** @ignore */
var browser = __module___browser;
/** @ignore */
var server = __module___server;


/**
 * Options passed to cookies.set(name, value, options).
 *
 * @class
 * @name CookieOptions
 * @property {Date} expires The date when the cookie should expire.
 * @property {string} path The path to set the cookie on.
 * @property {string} domain The domain to set the cookie on.
 * @property {boolean} secure Whether the cookie should only be sent over SSL.
 * @property {boolean} httpOnly Whether the cookie should only be available on
 *     the server side. This option is ignored when using cookies.set in the
 *     browser, so be careful.
 */


/**
 * @param {string} name Cookie name.
 * @return {string?} The cookie value, if it was present.
 */
module.exports.get = function(name) {
  // Dummy function filled in by cookies_browser.js or cookies_server.js.
};


/**
 * Set a cookie.
 *
 * @param {string} name The name of the cookie to set.
 * @param {string} value The value of the cookie to set.
 * @param {CookieOptions=} opt_options The cookie objects object to set along with the cookie.
 */
module.exports.set = function(name, value, opt_options) {
  // Dummy function filled in by cookies_browser.js or cookies_server.js.
};


/* JSDoc, plz to ignore this. */
module.exports = browser || server;
})(); return result || defined || module.exports; })).apply(this, arguments)});