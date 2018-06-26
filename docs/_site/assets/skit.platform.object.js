skit.define("skit.platform.object:js", [], function() {  return ((function() { var module = {exports: {}}; var defined = null; function define() {   for (var i = 0; i < arguments.length; i++) {     if (typeof arguments[i] == 'function') { defined = arguments[i](); break; }   } } define.amd = true; var result = (function skit_platform_object_js() {'use strict';

/**
 * @module
 * @license
 * (c) 2014 Cluster Labs, Inc. https://cluster.co/
 * License: MIT
 */


/**
 * Shallow copy an Object's keys to a new object.
 *
 * @param {Object} obj The object to copy, eg. {'a': 'b'}.
 * @return {Object} A new object containing the same keys, eg. {'a': 'b'}.
 */
module.exports.copy = function copy(obj) {
  var newObj = {};
  for (var k in obj) {
    newObj[k] = obj[k];
  }
  return newObj;
};
})(); return result || defined || module.exports; })).apply(this, arguments)});