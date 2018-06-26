skit.define("public.Home:js", ["skit.platform.Controller:js","skit.platform.cookies:js","library.controllers.Marketing:js","library.products.products:js","public.Home:meta.html","public.Home:billboard.html","public.Home:body.html"], function() {  return ((function(skit_platform_Controller,skit_platform_cookies,library_controllers_Marketing,library_products_products,__module___meta_html,__module___billboard_html,__module___body_html) { var module = {exports: {}}; var defined = null; function define() {   for (var i = 0; i < arguments.length; i++) {     if (typeof arguments[i] == 'function') { defined = arguments[i](); break; }   } } define.amd = true; var result = (function public_Home_js() {/**
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

var Controller = skit_platform_Controller;
var cookies = skit_platform_cookies;

var Marketing = library_controllers_Marketing;
var products = library_products_products;

var meta = __module___meta_html;
var billboard = __module___billboard_html;
var body = __module___body_html;


module.exports = Controller.create(Marketing, {
  __meta__: function(childMeta) {
    return meta();
  },

  __title__: function() {
    return 'Useful Tools for Mobile App Creators';
  },

  __body__: function() {
    return {
      homepage: true,
      billboard: billboard({
        user: this.user
      }),
      body: body({
        products: products.publicProducts()
      })
    };
  }
});
})(); return result || defined || module.exports; })).apply(this, arguments)});