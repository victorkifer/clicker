skit.define("library.controllers.App:js", ["skit.browser.dom:js","skit.platform.cookies:js","skit.platform.navigation:js","skit.platform.urls:js","skit.platform.util:js","skit.platform.Controller:js","library.controllers.Base:js"], function() {  return ((function(skit_browser_dom,skit_platform_cookies,skit_platform_navigation,skit_platform_urls,skit_platform_util,skit_platform_Controller,library_controllers_Base) { var module = {exports: {}}; var defined = null; function define() {   for (var i = 0; i < arguments.length; i++) {     if (typeof arguments[i] == 'function') { defined = arguments[i](); break; }   } } define.amd = true; var result = (function library_controllers_App_js() {/**
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
var cookies = skit_platform_cookies;
var navigation = skit_platform_navigation;
var urls = skit_platform_urls;
var util = skit_platform_util;
var Controller = skit_platform_Controller;

var Base = library_controllers_Base;


module.exports = Controller.create(Base, {
  // Overrideable by children.
  enableLoggedOut: false,

  redirectToLogin: function() {
    var loginOrSignup = this.preferSignupNotLogin ? '/signup/' : '/login/';
    var redirectUrl = urls.appendParams(loginOrSignup, {'redirect': navigation.relativeUrl()});
    navigation.navigate(redirectUrl);
  },

  __preload__: function(loaded) {
    if (!this.user && !this.enableLoggedOut && !this.dontLoadUser) {
      this.redirectToLogin();
    }

    loaded();
  }
});
})(); return result || defined || module.exports; })).apply(this, arguments)});