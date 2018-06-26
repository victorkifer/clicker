skit.define("library.controllers.Dashboard:js", ["skit.browser.layout:js","skit.platform.cookies:js","skit.platform.Controller:js","skit.platform.PubSub:js","skit.platform.iter:js","skit.platform.navigation:js","library.api.LKAPIClient:js","library.controllers.App:js","library.misc.scripts:js","library.overlays.AmbiguousProgressOverlay:js","library.overlays.ButtonOverlay:js","library.products.dashboardintro:html","library.products.products:js","library.controllers.Dashboard:html"], function() {  return ((function(skit_browser_layout,skit_platform_cookies,skit_platform_Controller,skit_platform_PubSub,skit_platform_iter,skit_platform_navigation,library_api_LKAPIClient,library_controllers_App,library_misc_scripts,library_overlays_AmbiguousProgressOverlay,library_overlays_ButtonOverlay,library_products_dashboardintro,library_products_products,__module___html) { var module = {exports: {}}; var defined = null; function define() {   for (var i = 0; i < arguments.length; i++) {     if (typeof arguments[i] == 'function') { defined = arguments[i](); break; }   } } define.amd = true; var result = (function library_controllers_Dashboard_js() {/**
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

var layout = skit_browser_layout;
var cookies = skit_platform_cookies;
var Controller = skit_platform_Controller;
var PubSub = skit_platform_PubSub;
var iter = skit_platform_iter;
var navigation = skit_platform_navigation;

var LKAPIClient = library_api_LKAPIClient;
var App = library_controllers_App;
var scripts = library_misc_scripts;
var AmbiguousProgressOverlay = library_overlays_AmbiguousProgressOverlay;
var ButtonOverlay = library_overlays_ButtonOverlay;
// required for better bundling.
var dashboardintro = library_products_dashboardintro;
var products = library_products_products;

var html = __module___html;


module.exports = Controller.create(App, {
  showHelpButton: false,
  fullWidthContent: false,

  __load__: function(child) {
    this.isOnboarding = navigation.url().indexOf('/onboard/') > 0;
  },

  __body__: function(child) {
    return html({
      content: (typeof child == 'string' ? child : (child.content || '')),
      sidebar: child.sidebar || '',

      currentProduct: this.product || '',
      isOnboarding: this.isOnboarding,
      fullWidthContent: this.fullWidthContent,
      user: this.user
    });
  },

  __ready__: function() {
    var query = navigation.query();

    var shown = false;
    PubSub.sharedPubSub().subscribe(LKAPIClient.SITE_READONLY_NOTIFICATION, function() {
      if (shown) {
        return;
      }
      shown = true;

      var overlay = new ButtonOverlay('Temporary Downtime',
          ['Sorry, the site is temporarily undergoing maintenance.',
           'This should last no longer than 30 minutes. Please try again in a moment.']);
      overlay.addButton('Okay', function() {
        shown = false;
      });
      overlay.show();
    });
  },

  isOnLastPage: function() {
    var windowHeight = layout.height(window);
    var currentPosition;
    var scrollHeight;
    if (!document.body.scrollTop) {
      currentPosition = windowHeight + document.documentElement.scrollTop;
      scrollHeight = document.documentElement.scrollHeight;
    } else {
      currentPosition = windowHeight + document.body.scrollTop;
      scrollHeight = document.body.scrollHeight;
    }
    return currentPosition > scrollHeight - windowHeight;
  }
});
})(); return result || defined || module.exports; })).apply(this, arguments)});