skit.define("skit.browser.dom:js", ["skit.browser.ElementWrapper:js","skit.platform.iter:js","skit.thirdparty.sizzle:js"], function() {  return ((function(skit_browser_ElementWrapper,skit_platform_iter,skit_thirdparty_sizzle) { var module = {exports: {}}; var defined = null; function define() {   for (var i = 0; i < arguments.length; i++) {     if (typeof arguments[i] == 'function') { defined = arguments[i](); break; }   } } define.amd = true; var result = (function skit_browser_dom_js() {'use strict';
'browser-only';

/**
 * Find and manipulate DOM nodes.
 *
 * @module
 * @license
 * (c) 2014 Cluster Labs, Inc. https://cluster.co/
 * License: MIT
 */


/** @ignore */
var ElementWrapper = skit_browser_ElementWrapper;
/** @ignore */
var iter = skit_platform_iter;
/** @ignore */
var sizzle = skit_thirdparty_sizzle;


/**
 * @return {Array} An array of elements wrapped in ElementWrapper objects that
 *     match a given DOM query selector.
 */
module.exports.find = function(selector) {
  return iter.map(sizzle(selector), function(el) {
    return new ElementWrapper(el);
  });
};


/**
 * @return {ElementWrapper?} The first element that matches a given query,
 *     wrapped in an ElementWrapper object.
 */
module.exports.get = function(selector) {
  return module.exports.find(selector)[0];
};

})(); return result || defined || module.exports; })).apply(this, arguments)});