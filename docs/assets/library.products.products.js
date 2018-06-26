skit.define("library.products.products:js", ["skit.platform.iter:js","skit.platform.object:js","skit.platform.navigation:js","skit.platform.urls:js","library.products.products:json"], function() {  return ((function(skit_platform_iter,skit_platform_object,skit_platform_navigation,skit_platform_urls,__module___json) { var module = {exports: {}}; var defined = null; function define() {   for (var i = 0; i < arguments.length; i++) {     if (typeof arguments[i] == 'function') { defined = arguments[i](); break; }   } } define.amd = true; var result = (function library_products_products_js() {/**
 * @license
 * Copyright 2016 Cluster Labs, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var iter = skit_platform_iter;
var object = skit_platform_object;
var navigation = skit_platform_navigation;
var urls = skit_platform_urls;

var productsObject = __module___json;


module.exports = {
  findByUrl: function(url) {
    var parsed = urls.parse(url);
    return iter.find(productsObject['products'], function(product) {
      return parsed.path.indexOf(product.path) == 0;
    });
  },

  findById: function(id) {
    return iter.find(productsObject['products'], function(product) {
      return id == product.id;
    });
  },

  publicProducts: function() {
    return iter.map(productsObject['products'], function(product) {
      return object.copy(product);
    });
  }
};})(); return result || defined || module.exports; })).apply(this, arguments)});