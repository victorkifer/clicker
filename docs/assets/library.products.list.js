skit.define("library.products.list:js", ["library.products.products:js","library.api.LKAPIClient:js","library.products.list:html"], function() {  return ((function(library_products_products,library_api_LKAPIClient,__module___html) { var module = {exports: {}}; var defined = null; function define() {   for (var i = 0; i < arguments.length; i++) {     if (typeof arguments[i] == 'function') { defined = arguments[i](); break; }   } } define.amd = true; var result = (function library_products_list_js() {/**
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

var products = library_products_products;
var LKAPIClient = library_api_LKAPIClient;

var listHtml = __module___html;


return function(options) {
  var user = LKAPIClient.currentUser;

  return listHtml({
    user: user,
    publicProducts: products.publicProducts(),
    isOnboarding: options.isOnboarding
  });
};})(); return result || defined || module.exports; })).apply(this, arguments)});