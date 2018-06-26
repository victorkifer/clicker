skit.define("library.controllers.onboarding.iTunesAppSearch:js", ["skit.browser.dom:js","skit.platform.Controller:js","skit.platform.navigation:js","skit.platform.iter:js","skit.platform.util:js","library.api.LKAPIClient:js","library.controllers.Dashboard:js","library.overlays.ButtonOverlay:js","library.overlays.AmbiguousProgressOverlay:js","library.misc.itunessearch:js","library.misc.scripts:js","library.products.navitem:html","library.controllers.onboarding.iTunesAppSearch:result.html","library.controllers.onboarding.iTunesAppSearch:start.html"], function() {  return ((function(skit_browser_dom,skit_platform_Controller,skit_platform_navigation,skit_platform_iter,skit_platform_util,library_api_LKAPIClient,library_controllers_Dashboard,library_overlays_ButtonOverlay,library_overlays_AmbiguousProgressOverlay,library_misc_itunessearch,library_misc_scripts,library_products_navitem,__module___result_html,__module___start_html) { var module = {exports: {}}; var defined = null; function define() {   for (var i = 0; i < arguments.length; i++) {     if (typeof arguments[i] == 'function') { defined = arguments[i](); break; }   } } define.amd = true; var result = (function library_controllers_onboarding_iTunesAppSearch_js() {/**
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
var iter = skit_platform_iter;
var util = skit_platform_util;

var LKAPIClient = library_api_LKAPIClient;
var Dashboard = library_controllers_Dashboard;
var ButtonOverlay = library_overlays_ButtonOverlay;
var AmbiguousProgressOverlay = library_overlays_AmbiguousProgressOverlay;
var itunessearch = library_misc_itunessearch;
var scripts = library_misc_scripts;

var navItemHtml = library_products_navitem;
var resultHtml = __module___result_html;
var startHtml = __module___start_html;


module.exports = Controller.create(Dashboard, {
  // TO OVERRIDE THESE:

  headlineText: '',
  subheadText: '',
  skipUrl: null,
  getResultUrl: function(result, country) {
    return '';
  },
  resultAction: null,

  // END SUBCONTROLLER OVERRIDES

  enableLoggedOut: true,

  __body__: function() {
    return {
      content: startHtml({
        headlineText: this.headlineText,
        subheadText: this.subheadText,
        skipUrl: this.skipUrl,
        countries: itunessearch.COUNTRIES
      })
    };
  },

  __ready__: function() {
    this.searchForm = dom.get('#itunes-search-form');
    if (!this.searchForm) {
      // Child controller, this confusingly behaves as a parent.
      return;
    }

    this.bind(this.searchForm, 'submit', this.onSubmitSearch, this);

    this.$country = dom.get('#itunes-country-select');
    this.bind(this.$country, 'change', this.onSubmitSearch, this);

    this.results = dom.get('#itunes-search-results');

    var $input = this.searchForm.get('input[type=text]');
    setTimeout(function() {
      $input.element.focus();
      $input.element.select();
    }, 250);

    // Hitting back, you end up here.
    if ($input.value()) {
      this.onSubmitSearch();
    }
  },

  onSubmitSearch: function(opt_evt) {
    if (opt_evt) {
      opt_evt.preventDefault();
    }

    var button = this.searchForm.get('button.btn-primary');
    if (button) {
      button.removeClass('btn-primary');
    }

    this.results.addClass('loading');
    this.results.removeChildren();

    var query = this.searchForm.get('input[type=text]').value();
    this.lastQuery = query;

    var country = this.$country.value();
    itunessearch.findApps(country, query, function(resultsQuery, results) {
      if (resultsQuery != this.lastQuery) {
        return;
      }

      var filteredResults = iter.map(results, function(result) {
        result['url'] = this.getResultUrl(result, country);
        result['action'] = this.resultAction;
      }, this);

      this.results.removeClass('loading');
      this.results.element.innerHTML = iter.map(results, function(r) {
        r.country = country;
        return resultHtml(r);
      }).join('');
    }, this, {ipad: false, mac: false});
  }
});
})(); return result || defined || module.exports; })).apply(this, arguments)});