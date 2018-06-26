skit.define("public.websites.dashboard.WebsitesDashboard:js", ["skit.browser.dom:js","skit.platform.Controller:js","skit.platform.iter:js","skit.platform.navigation:js","skit.thirdparty.handlebars:runtime","library.api.LKAPIClient:js","library.controllers.Dashboard:js","library.websites.WebsiteRenderer:js","library.products.dashboardintro:html","public.websites.dashboard.WebsitesDashboard:html"], function() {  return ((function(skit_browser_dom,skit_platform_Controller,skit_platform_iter,skit_platform_navigation,skit_thirdparty_handlebars,library_api_LKAPIClient,library_controllers_Dashboard,library_websites_WebsiteRenderer,library_products_dashboardintro,__module___html) { var module = {exports: {}}; var defined = null; function define() {   for (var i = 0; i < arguments.length; i++) {     if (typeof arguments[i] == 'function') { defined = arguments[i](); break; }   } } define.amd = true; var result = (function public_websites_dashboard_WebsitesDashboard_js() {/**
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

var dom = skit_browser_dom;
var Controller = skit_platform_Controller;
var iter = skit_platform_iter;
var navigation = skit_platform_navigation;
var Handlebars = skit_thirdparty_handlebars;

var LKAPIClient = library_api_LKAPIClient;
var Dashboard = library_controllers_Dashboard;
var WebsiteRenderer = library_websites_WebsiteRenderer;
var introHtml = library_products_dashboardintro;

var html = __module___html;


module.exports = Controller.create(Dashboard, {
  __preload__: function(done) {
    LKAPIClient.getAllWebsites({
      onSuccess: function(websites) {
        this.websites = websites;
      },
      onComplete: function() {
        done();
      },
      context: this
    });
  },

  __title__: function() {
    return this.product.name + ' Dashboard';
  },

  __body__: function() {
    var bodyHtml;

    if (this.websites.length) {
      var tweetUpsell = navigation.query()['saved'];

      bodyHtml = html({
        tweetUpsell: tweetUpsell,
        websites: this.websites
      });
    } else {
      bodyHtml = introHtml({product: this.product});
    }

    return {
      content: bodyHtml
    };
  },

  __ready__: function() {
    var websitesById = {};
    iter.forEach(this.websites, function(website) {
      websitesById[website['id']] = website;
    });

    var iframes = dom.find('iframe[data-website-id]');
    iter.forEach(iframes, function($iframe) {
      var website = websitesById[$iframe.getData('website-id')];

      var renderer = new WebsiteRenderer(website);
      renderer.renderInIframe($iframe);
    });
  }
});
})(); return result || defined || module.exports; })).apply(this, arguments)});