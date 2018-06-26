skit.define("public.login.Login:js", ["skit.browser.dom:js","skit.platform.Controller:js","skit.platform.navigation:js","skit.platform.urls:js","skit.platform.util:js","library.controllers.FloatingBox:js","library.api.LKAPIClient:js","library.overlays.ButtonOverlay:js","public.login.Login:html"], function() {  return ((function(skit_browser_dom,skit_platform_Controller,skit_platform_navigation,skit_platform_urls,skit_platform_util,library_controllers_FloatingBox,library_api_LKAPIClient,library_overlays_ButtonOverlay,__module___html) { var module = {exports: {}}; var defined = null; function define() {   for (var i = 0; i < arguments.length; i++) {     if (typeof arguments[i] == 'function') { defined = arguments[i](); break; }   } } define.amd = true; var result = (function public_login_Login_js() {/**
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
var navigation = skit_platform_navigation;
var urls = skit_platform_urls;
var util = skit_platform_util;

var FloatingBox = library_controllers_FloatingBox;
var LKAPIClient = library_api_LKAPIClient;
var ButtonOverlay = library_overlays_ButtonOverlay;

var html = __module___html;


module.exports = Controller.create(FloatingBox, {
  enableLoggedOut: true,

  __preload__: function(loaded) {
    if (this.user) {
      navigation.navigate(this.redirectUrl());
    }
    loaded();
  },

  __body__: function() {
    var email = navigation.query()['email'];
    var signupUrl = urls.appendParams('/signup/', {'redirect': this.redirectUrl()});
    return html({
      signupUrl: signupUrl,
      email: email
    });
  },

  __ready__: function() {
    var form = dom.get('form');
    this.bind(form, 'submit', this.onSubmitLoginForm, this);
  },

  onSubmitLoginForm: function(evt) {
    evt.preventDefault();

    var form = evt.target;
    var email = form.get('input[name=email]');
    var password = form.get('input[name=password]');
    var button = form.get('button[type=submit]');

    var emailValue = email.value();
    var passwordValue = password.value();

    email.disable();
    password.disable();
    button.disable();

    LKAPIClient.login(emailValue, passwordValue, {
      onSuccess: function() {
        navigation.navigate(this.redirectUrl());
      },
      onError: function(code, response) {
        var message = 'Could not find user';
        var wrongPassword = false;
        if (response && response['error_field'] == 'password') {
          message = 'Incorrect password';
          wrongPassword = true;
        }
        var overlay = new ButtonOverlay(message, 'Please try again.');
        overlay.addDidDismissListener(function() {
          var el = wrongPassword ? password.element : email.element;
          el.focus();
          el.select();
        });
        overlay.addButton('Okay');
        overlay.show();

        email.enable();
        password.enable();
        button.enable();
      },
      context: this
    })
  }
});
})(); return result || defined || module.exports; })).apply(this, arguments)});