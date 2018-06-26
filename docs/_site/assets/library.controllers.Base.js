skit.define("library.controllers.Base:js", ["skit.browser.events:js","skit.platform.Controller:js","skit.platform.PubSub:js","skit.platform.cookies:js","skit.platform.iter:js","skit.platform.navigation:js","skit.platform.urls:js","skit.platform.util:js","skit.thirdparty.handlebars:runtime","library.api.LKAPIClient:js","library.products.products:js","library.misc.googleanalytics:js","library.misc.useragent:js","library.misc.scripts:js","library.misc.templatehelpers:js","library.misc.bootstrap:css","library.misc.fontawesome:css","library.controllers.Base:html","library.controllers.Base:meta.html"], function() {  return ((function(skit_browser_events,skit_platform_Controller,skit_platform_PubSub,skit_platform_cookies,skit_platform_iter,skit_platform_navigation,skit_platform_urls,skit_platform_util,skit_thirdparty_handlebars,library_api_LKAPIClient,library_products_products,library_misc_googleanalytics,library_misc_useragent,library_misc_scripts,library_misc_templatehelpers,library_misc_bootstrap,library_misc_fontawesome,__module___html,__module___meta_html) { var module = {exports: {}}; var defined = null; function define() {   for (var i = 0; i < arguments.length; i++) {     if (typeof arguments[i] == 'function') { defined = arguments[i](); break; }   } } define.amd = true; var result = (function library_controllers_Base_js() {/**
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

var events = skit_browser_events;
var Controller = skit_platform_Controller;
var PubSub = skit_platform_PubSub;
var cookies = skit_platform_cookies;
var iter = skit_platform_iter;
var navigation = skit_platform_navigation;
var urls = skit_platform_urls;
var util = skit_platform_util;
var Handlebars = skit_thirdparty_handlebars;

var LKAPIClient = library_api_LKAPIClient;
var products = library_products_products;
var googleanalytics = library_misc_googleanalytics;
var useragent = library_misc_useragent;
var scripts = library_misc_scripts;
var templatehelpers = library_misc_templatehelpers;
// Included for all pages.
var bootstrap = library_misc_bootstrap;
var fontawesome = library_misc_fontawesome;

var html = __module___html;
var meta = __module___meta_html;


// TODO: Set your analytics ID.
var GA_ID = 'UA-XXXXXXXX-1';

// Global template helpers
templatehelpers.registerAll();


module.exports = Controller.create({
  showHelpButton: false,
  dontLoadUser: false,
  gaId: GA_ID,

  __preload__: function(done) {
    this.user = null;
    this.wireUpClientSideHack();

    // No use looking this up if the cookie is not present.
    if (!cookies.get('lkauth') || this.dontLoadUser) {
      done();
      return;
    }

    LKAPIClient.user({
      onSuccess: function(me) {
        this.user = me;

        // update this.user in LKAPIClient.
        this.wireUpClientSideHack();
      },
      onComplete: done,
      context: this
    });
  },

  wireUpClientSideHack: function() {
    // This is a slight hack to fix client-side initial load of user object.
    LKAPIClient.setCurrentUser(this.user);
    // This must be done after setting this.products.
    this.product = products.findByUrl(navigation.url());
  },

  reloadWithUser: function() {
    LKAPIClient.user({
      onSuccess: function(me) {
        this.user = me;
        // update this.user in LKAPIClient.
        this.wireUpClientSideHack();
      },
      onComplete: function() {
        this.reload();
      },
      context: this
    });
  },

  __load__: function() {
    this.wireUpClientSideHack();
  },

  __title__: function(childTitle) {
    return childTitle;
  },

  __meta__: function(childMeta) {
    return childMeta + meta();
  },

  __body__: function(childHtml) {
    return html({
      childHtml: childHtml,
      showHelp: this.showHelpButton
    });
  },

  isDevelopment: function() {
    var parsed = urls.parse(window.location.href);
    return parsed.port && parsed.port != 80 && parsed.port != 443;
  },

  redirectUrl: function(opt_default) {
    var query = navigation.query();
    var redirect = query['redirect'] || query['next'];

    if (redirect && redirect.indexOf('/') == 0) {
      return redirect;
    }
    return opt_default || '/';
  },

  __ready__: function() {
    this.baseListeners_ = [];
    this.baseSubscriptions_ = [];

    // ontouchstart is null in mobilesafari, but undefined in other browsers.
    if (useragent.isMobile() && document.body.ontouchstart !== undefined) {
      // In the event that
      this.delegate(document.body, '[data-action]', 'touchstart', function(touchstartEvent) {
        var target = touchstartEvent.target;
        var currentTarget = touchstartEvent.currentTarget;
        var moved = false;
        var leaveid = events.bind(target, 'touchmove', function(touchLeaveEvent) {
          moved = true;
        });
        var endid = events.bind(target, 'touchend', function(touchendEvent) {
          if (!moved) {
            touchendEvent.currentTarget = currentTarget;
            this.onClickAction(touchendEvent);
          }
          // do this here, not in 'touchmove', in case the touch never moves.
          events.unbind(leaveid);
          events.unbind(endid);
        }, this);
      }, this);
    } else {
      // Just use click handlers.
      this.delegate(document.body, '[data-action]', 'click', this.onClickAction, this);
    }

    if (this.isDevelopment()) {
      return;
    }

    util.setTimeout(function() {
      // Google Analytics.
      googleanalytics.create(this.gaId);
      googleanalytics.trackPageview();
    }, 100, this);
  },

  __unload__: function() {
    var listeners = this.baseListeners_;
    this.baseListeners_ = [];
    iter.forEach(listeners, function(listener) {
      events.unbind(listener);
    });

    var subs = this.baseSubscriptions_;
    var pubsub = PubSub.sharedPubSub();
    this.baseSubscriptions_ = [];
    iter.forEach(subs, function(sub) {
      pubsub.unsubscribe(sub);
    });
  },

  bind: function() {
    this.baseListeners_.push(events.bind.apply(events, arguments));
  },
  delegate: function() {
    this.baseListeners_.push(events.delegate.apply(events, arguments));
  },
  subscribe: function() {
    var pubsub = PubSub.sharedPubSub();
    this.baseSubscriptions_.push(pubsub.subscribe.apply(pubsub, arguments));
  },

  onClickAction: function(evt) {
    evt.preventDefault();
    var name = evt.currentTarget.getData('action');
    this.handleAction(name, evt.currentTarget);
  },

  handleAction: function(name, $target) {
  }
});
})(); return result || defined || module.exports; })).apply(this, arguments)});