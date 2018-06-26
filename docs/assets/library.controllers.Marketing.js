skit.define("library.controllers.Marketing:js", ["skit.browser.dom:js","skit.platform.Controller:js","skit.platform.cookies:js","skit.platform.env:js","skit.platform.iter:js","skit.platform.navigation:js","skit.platform.urls:js","skit.thirdparty.handlebars:runtime","library.controllers.Base:js","library.misc.scripts:js","library.marketing.marketingmeta:html","library.marketing.marketingbillboard:html","library.marketing.marketingbody:html","library.misc.templatehelpers:js","library.products.products:js","library.controllers.Marketing:html"], function() {  return ((function(skit_browser_dom,skit_platform_Controller,skit_platform_cookies,skit_platform_env,skit_platform_iter,skit_platform_navigation,skit_platform_urls,skit_thirdparty_handlebars,library_controllers_Base,library_misc_scripts,library_marketing_marketingmeta,library_marketing_marketingbillboard,library_marketing_marketingbody,library_misc_templatehelpers,library_products_products,__module___html) { var module = {exports: {}}; var defined = null; function define() {   for (var i = 0; i < arguments.length; i++) {     if (typeof arguments[i] == 'function') { defined = arguments[i](); break; }   } } define.amd = true; var result = (function library_controllers_Marketing_js() {/**
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
var cookies = skit_platform_cookies;
var env = skit_platform_env;
var iter = skit_platform_iter;
var navigation = skit_platform_navigation;
var urls = skit_platform_urls;
var Handlebars = skit_thirdparty_handlebars;

var Base = library_controllers_Base;
var scripts = library_misc_scripts;
var meta = library_marketing_marketingmeta;
var billboard = library_marketing_marketingbillboard;
var body = library_marketing_marketingbody;
var templatehelpers = library_misc_templatehelpers;
var products = library_products_products;

var html = __module___html;



Handlebars.registerHelper('otherCol', function(value, options) {
  var colSize = 5;
  if (value) {
    colSize = 12 - parseInt(value, 10);
  }
  if (colSize == 0) {
    colSize = 12;
  }
  return colSize;
});

Handlebars.registerHelper('ifShowSlider', function(opts) {
  if (navigation.query()['slider'] == '1') {
    return opts.fn();
  }
  return '';
});


module.exports = Controller.create(Base, {
  showHelpButton: false,

  __preload__: function(done) {
    if (!this.constructor.prototype.hasOwnProperty('__body__') && !this.product) {
      navigation.notFound();
    }

    done();
  },

  __meta__: function(childMeta) {
    // Inject optimizely here so we include it on homepage as well.
    if (!env.get('debug')) {
      childMeta += '\n<script src="//cdn.optimizely.com/js/5016490019.js"></script>\n';
    }

    if (!this.product) {
      return childMeta;
    }

    return childMeta + meta({
      product: this.product
    });
  },

  __title__: function(childTitle) {
    if (childTitle) {
      return childTitle;
    }
    if (this.product) {
      return this.product.name + ' - ' + this.product.tagline;
    }
    return '';
  },

  __body__: function(childHtml) {
    return html({
      user: this.user,
      product: this.product,
      publicProducts: products.publicProducts(),
      homepage: childHtml.homepage ? childHtml.homepage : false,
      billboard: childHtml.billboard ? childHtml.billboard : billboard({product: this.product}),
      body: childHtml.body ? childHtml.body : (childHtml ? childHtml : body({product: this.product}))
    });
  },

  __ready__: function() {
    var containers = dom.find('.pricing-container');
    iter.forEach(containers, function(container) {
      var $slider = container.get('.pricing-slider');
      var $amount = container.get('.pricing-amount');
      var updateAmount = function() {
        this.updateAmount($slider, $amount);
      };
      this.bind($slider, 'input', updateAmount, this);
      this.bind($slider, 'change', updateAmount, this);
      updateAmount.call(this);
    }, this);
  },

  updateAmount: function($slider, $amount) {
    var count = +($slider.value());
    var amount = '<span class="plan-price-users pull-left" style="color: #333;">' + templatehelpers.formatNumber(count, 0) + ' MAUs</span>';
    if (count <= 10000) {
      amount += '<span class="plan-price-dollars pull-right">FREE!</span>';
    } else if (count >= 1000000) {
      amount += '<span class="plan-price-dollars pull-right">Contact Us!</span>';
    } else {
      var dollars = templatehelpers.formatCurrency((count - 10000) / 1000.0, 2);
      amount += '<span class="plan-price-dollars pull-right">' + dollars + ' / mo.</span>';
    }
    $amount.element.innerHTML = amount;
  }
});
})(); return result || defined || module.exports; })).apply(this, arguments)});