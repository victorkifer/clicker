skit.define("library.controllers.FloatingBox:js", ["skit.platform.Controller:js","skit.platform.navigation:js","library.controllers.App:js","library.misc.scripts:js","library.controllers.FloatingBox:html"], function() {  return ((function(skit_platform_Controller,skit_platform_navigation,library_controllers_App,library_misc_scripts,__module___html) { var module = {exports: {}}; var defined = null; function define() {   for (var i = 0; i < arguments.length; i++) {     if (typeof arguments[i] == 'function') { defined = arguments[i](); break; }   } } define.amd = true; var result = (function library_controllers_FloatingBox_js() {/**
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

var App = library_controllers_App;
var scripts = library_misc_scripts;

var html = __module___html;


module.exports = Controller.create(App, {
  showHelpButton: false,
  floatingBoxClass: '',

  __load__: function(child) {
    this.isOnboarding = navigation.url().indexOf('/onboard/') > 0;
  },

  __body__: function(childHtml) {
    return html({
      navItem: childHtml.navItem || null,
      body: childHtml.body || childHtml,

      floatingBoxClass: this.floatingBoxClass || '',
      user: this.user
    });
  }
});
})(); return result || defined || module.exports; })).apply(this, arguments)});