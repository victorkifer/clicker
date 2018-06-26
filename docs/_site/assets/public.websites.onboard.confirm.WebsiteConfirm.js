skit.define("public.websites.onboard.confirm.WebsiteConfirm:js", ["skit.browser.dom:js","skit.platform.Controller:js","skit.platform.iter:js","skit.platform.navigation:js","skit.platform.object:js","skit.platform.util:js","skit.platform.urls:js","library.api.LKAPIClient:js","library.controllers.Dashboard:js","library.overlays.ButtonOverlay:js","library.misc.colors:js","library.screenshots.fonts:js","library.screenshots.uploadui:js","third_party.ColorThief:js","public.websites.onboard.confirm.WebsiteConfirm:html"], function() {  return ((function(skit_browser_dom,skit_platform_Controller,skit_platform_iter,skit_platform_navigation,skit_platform_object,skit_platform_util,skit_platform_urls,library_api_LKAPIClient,library_controllers_Dashboard,library_overlays_ButtonOverlay,library_misc_colors,library_screenshots_fonts,library_screenshots_uploadui,third_party_ColorThief,__module___html) { var module = {exports: {}}; var defined = null; function define() {   for (var i = 0; i < arguments.length; i++) {     if (typeof arguments[i] == 'function') { defined = arguments[i](); break; }   } } define.amd = true; var result = (function public_websites_onboard_confirm_WebsiteConfirm_js() {/**
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
var object = skit_platform_object;
var util = skit_platform_util;
var urls = skit_platform_urls;

var LKAPIClient = library_api_LKAPIClient;
var Dashboard = library_controllers_Dashboard;
var ButtonOverlay = library_overlays_ButtonOverlay;
var colors = library_misc_colors;
var fonts = library_screenshots_fonts;
var uploadui = library_screenshots_uploadui;
var ColorThief = third_party_ColorThief;

var html = __module___html;


var showErrorMessage = function() {
  var okay = new ButtonOverlay('Whoops!', 'There are some errors with the input, please correct the red fields.');
  okay.addButton('Okay');
  okay.show();
};


module.exports = Controller.create(Dashboard, {
  enableLoggedOut: true,

  __preload__: function(done) {
    var query = navigation.query();
    this.itunesId = query['itunesId'];
    this.country = query['country'];

    LKAPIClient.getExampleWebsite(this.itunesId, this.country, {
      onSuccess: function(website) {
        this.website = website;

        if (query['template']) {
          this.website['template'] = query['template'];
        }
      },
      onError: function() {
        navigation.notFound();
      },
      onComplete: function() {
        done();
      },
      context: this
    });
  },

  __title__: function() {
    return 'Edit ' + this.website['appName'] + ' Website';
  },

  __body__: function() {

    return {
      content: html({
        'fonts': fonts.FONTS,
        'website': this.website
      })
    };
  },

  __ready__: function() {
    this.$form = dom.get('#app-website-confirm-form');
    this.bind(this.$form, 'submit', this.onSubmitForm, this);

    this.$primaryColorInput = dom.get('#primary-color-input');
    this.$primaryColorLabel = dom.get('#primary-color-label');
    this.bind(this.$primaryColorInput, 'input', this.onPrimaryColorChange, this);

    var ct = new ColorThief();
    var image = new Image();
    image.crossOrigin = 'Anonymous';
    image.onload = util.bind(function() {
      var color = colors.rgbToHex(ct.getPalette(image, 6)[0]);
      this.$primaryColorInput.setValue(color);
      this.$primaryColorLabel.element.style.backgroundColor = color;
    }, this);
    image.src = this.website.images.icon.url;
  },

  onPrimaryColorChange: function() {
    var primaryColor = colors.humanInputToHex(this.$primaryColorInput.value());
    if(!primaryColor) {
      return;
    }

    this.$primaryColorLabel.element.style.backgroundColor = primaryColor;
  },

  showErrors: function(errors) {
    iter.forEach(Object.keys(errors), function(field) {
      dom.get('input[name=' + field + ']').addClass('has-error');
    });
    showErrorMessage();
  },

  onSubmitForm: function(evt) {
    evt.preventDefault();

    var errors = dom.find('.has-error');
    if(errors.length > 0) {
      iter.forEach(errors, function(error) {
        error.removeClass('has-error');
      });
    }

    var formData = this.$form.serializeForm();

    if (formData['primary_color']) {
      var primaryColor = colors.humanInputToHex(formData['primary_color']);
      if(!primaryColor) {
        this.showErrors({'primary_color': ['Enter a valid value.']});
        return;
      }
      formData['primary_color'] = primaryColor;
    }

    var params = object.copy(formData);
    params['itunesId'] = this.itunesId;
    params['country'] = this.country;
    navigation.navigate(urls.appendParams('/websites/dashboard/example/templates/', params));
  }

});
})(); return result || defined || module.exports; })).apply(this, arguments)});