skit.define("public.websites.__id__.__slug__.WebsitePage:js", ["skit.platform.Controller:js","skit.platform.navigation:js","library.api.LKAPIClient:js","library.websites.WebsiteRenderer:js","library.misc.templatehelpers:js"], function() {  return ((function(skit_platform_Controller,skit_platform_navigation,library_api_LKAPIClient,library_websites_WebsiteRenderer,library_misc_templatehelpers) { var module = {exports: {}}; var defined = null; function define() {   for (var i = 0; i < arguments.length; i++) {     if (typeof arguments[i] == 'function') { defined = arguments[i](); break; }   } } define.amd = true; var result = (function public_websites___id_____slug___WebsitePage_js() {/**
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
var navigation = skit_platform_navigation;

var LKAPIClient = library_api_LKAPIClient;
var WebsiteRenderer = library_websites_WebsiteRenderer;
var templatehelpers = library_misc_templatehelpers;


templatehelpers.registerAll();


module.exports = Controller.create({
  __preload__: function(done) {
    var id = this.params['__id__'];
    var slug = this.params['__slug__'];

    var query = navigation.query();
    var templateOverride = query['template'];

    LKAPIClient.getWebsitePage(id, slug, {
      onSuccess: function(website, page) {
        this.website = website;
        this.page = page;

        if (templateOverride) {
          this.website['template'] = templateOverride;
        }
      },
      onError: function() {
        navigation.notFound();
      },
      onComplete: done,
      context: this
    });
  },

  __load__: function() {
    this.renderer = new WebsiteRenderer(this.website, this.page);
  },

  __title__: function() {
    return this.renderer.title();
  },

  __meta__: function() {
    return this.renderer.meta();
  },

  __body__: function() {
    return this.renderer.body();
  }
});
})(); return result || defined || module.exports; })).apply(this, arguments)});