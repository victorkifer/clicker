skit.define("library.websites.WebsiteRenderer:js", ["skit.browser.dom:js","skit.platform.iter:js","skit.platform.navigation:js","skit.platform.urls:js","skit.thirdparty.handlebars:runtime","library.api.LKAPIClient:js","library.misc.bootstrap:css","library.misc.fontawesome:css","library.misc.useragent:js","library.websites.templates:js","third_party.marked:js","library.websites.WebsiteRenderer:meta.html","library.websites.WebsiteRenderer:html","library.websites.WebsiteRenderer:page.html"], function() {  return ((function(skit_browser_dom,skit_platform_iter,skit_platform_navigation,skit_platform_urls,skit_thirdparty_handlebars,library_api_LKAPIClient,library_misc_bootstrap,library_misc_fontawesome,library_misc_useragent,library_websites_templates,third_party_marked,__module___meta_html,__module___html,__module___page_html) { var module = {exports: {}}; var defined = null; function define() {   for (var i = 0; i < arguments.length; i++) {     if (typeof arguments[i] == 'function') { defined = arguments[i](); break; }   } } define.amd = true; var result = (function library_websites_WebsiteRenderer_js() {/**
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
var iter = skit_platform_iter;
var navigation = skit_platform_navigation;
var urls = skit_platform_urls;
var Handlebars = skit_thirdparty_handlebars;

var LKAPIClient = library_api_LKAPIClient;
var bootstrap = library_misc_bootstrap;
var fontawesome = library_misc_fontawesome;
var useragent = library_misc_useragent;
var templates = library_websites_templates;
var markdown = third_party_marked;

var meta = __module___meta_html;
var html = __module___html;
var pageHtml = __module___page_html;


Handlebars.registerHelper('frameByDevice', function(screenshotPath, color) {
  if (!screenshotPath) {
    screenshotPath = '/__static__/images/pixel.gif';
  }

  if (color == 'no') {
    return new Handlebars.SafeString(
        '<img src="' + Handlebars.Utils.escapeExpression(screenshotPath) + '" class="framed-screenshot">');
  }

  var phoneUrl;
  if (color == 'black') {
    phoneUrl = '/__static__/devices/iPhone6Black.png';
  } else {
    phoneUrl = '/__static__/devices/iPhone6White.png';
  }

  var style = {
    'background-image':
        'url(' + Handlebars.Utils.escapeExpression(screenshotPath) + '), url(' + phoneUrl + ')',
    'background-size': '79.5%, 100%',
    'background-position': '50% 51%, center',
    'background-repeat': 'no-repeat, no-repeat'
  };
  var styleStr = '';
  for (var k in style) {
    styleStr += k + ':' + style[k] + ';';
  }
  return new Handlebars.SafeString('<img src="/__static__/devices/iPhoneBlank.png"' +
      ' class="framed-screenshot" style="' + styleStr + '">');
});

Handlebars.registerHelper('ifShowPlatform', function(website, targetPlatform, opts) {
  var userPlatform = useragent.findCompatibleMobilePlatform();
  if (targetPlatform == 'android' && website['playStoreId'] && userPlatform != 'iphone' && userPlatform != 'ipad') {
    return opts.fn(this);
  } else if (targetPlatform == 'ios' && website['itunesId'] && userPlatform != 'android') {
    return opts.fn(this);
  }
  return opts.inverse(this);
});

Handlebars.registerHelper('storeLink', function(website, targetPlatform, opts) {
  if (targetPlatform == 'android') {
    return urls.appendParams('https://play.google.com/store/apps/details', {
      'id': website['playStoreId']
    });
  }

  var proCampaignToken = (website['itunesCampaignToken']) ? website['itunesCampaignToken'] : null;
  var proProviderToken = (website['itunesProviderToken']) ? website['itunesProviderToken'] : null;

  var query = navigation.query();
  var itunesCampaignToken = query['ct'] || proCampaignToken;
  var itunesProviderToken = query['pt'] || proProviderToken;

  var params = {'mt': '8'};
  if (itunesCampaignToken) {
    params['ct'] = itunesCampaignToken;
  }
  if (itunesProviderToken) {
    params['pt'] = itunesProviderToken;
  }
  return urls.appendParams('https://itunes.apple.com/app/id' + website['itunesId'], params);
});

Handlebars.registerHelper('ifShowWaitingList', function(website, opts) {
  if (!website['playStoreId'] && !website['itunesId'] && website['waitingListLink']) {
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
});

Handlebars.registerHelper('markdown', function(content) {
  return markdown(Handlebars.Utils.escapeExpression(content));
});

Handlebars.registerHelper('hasMenuItems', function(website, opts) {
  if (website.id == 'example' || website.blogLink || website.support || website.supportLink || website.customLink || website.loginLink) {
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
});

Handlebars.registerHelper('subpathUrl', function(website, subpath) {
  var parsed = urls.parse(navigation.url());
  if (parsed && parsed.path && parsed.path.indexOf(website.id) > 0) {
    var parts = parsed.path.split(website.id);
    var prefix = parts[0];
    return prefix + website.id + '/' + subpath;
  }

  return '/' + subpath;
});

function WebsiteRenderer(website, opt_page) {
  this.website = website;
  this.page = opt_page || null;
  this.contentOnly = !!navigation.query()['content-only'];
  this.template = iter.find(templates.TEMPLATES, function(t) {
    return t.id == this.website['template'];
  }, this) || templates.TEMPLATES[0];

  this.website.homeUrl = '/';
  var host = navigation.host();
  if (host.match('localhost') || host.match('yourdomain.com')) {
    this.website.homeUrl = '/websites/'+this.website.id;
  }
}


WebsiteRenderer.prototype.title = function() {
  var pageTitle = this.website['appName'] + ' - ';

  if (this.page) {
    pageTitle += this.page['title'];
  } else {
    pageTitle += this.website['tagline'];
  }

  return pageTitle;
};


WebsiteRenderer.prototype.meta = function() {
  return meta({
    website: this.website
  });
};


WebsiteRenderer.prototype.body = function() {
  if (this.page) {
    return pageHtml({
      website: this.website,
      template: this.template,
      contentOnly: this.contentOnly,
      page: this.page
    });

  } else {
    return html({
      website: this.website,
      template: this.template
    });
  }
};


WebsiteRenderer.prototype.renderInIframe = function($iframe) {
  var iframe = $iframe.element || $iframe;
  var doc = iframe.contentWindow.document;
  var styleUrls = iter.map(dom.get('head').find('link[rel=stylesheet]'), function($style) {
    return $style.element.getAttribute('href');
  });
  var esc = Handlebars.Utils.escapeExpression;

  doc.open();
  doc.write('<!DOCTYPE HTML><html><head>');
  iter.forEach(styleUrls, function(url) {
    doc.write('<link rel="stylesheet" href="' + esc(url) + '">');
  });
  doc.write(this.meta());
  doc.write('</head><body>');
  doc.write(this.body());
  doc.write('</body>');
  doc.close();
};


module.exports = WebsiteRenderer;})(); return result || defined || module.exports; })).apply(this, arguments)});