skit.define("skit.platform.net:js", ["skit.platform.urls:js","skit.platform.util:js","skit.platform.net:server","skit.platform.net:browser","skit.platform.net:Response"], function() {  return ((function(skit_platform_urls,skit_platform_util,__module___server,__module___browser,__module___Response) { var module = {exports: {}}; var defined = null; function define() {   for (var i = 0; i < arguments.length; i++) {     if (typeof arguments[i] == 'function') { defined = arguments[i](); break; }   } } define.amd = true; var result = (function skit_platform_net_js() {'use strict';

/**
 * @module
 * @license
 * (c) 2014 Cluster Labs, Inc. https://cluster.co/
 * License: MIT
 */


/** @ignore */
var urls = skit_platform_urls;
/** @ignore */
var util = skit_platform_util;

/** @ignore */
var server = __module___server;
/** @ignore */
var browser = __module___browser;
/** @ignore */
var Response = __module___Response;

/** @ignore */
var environment = server || browser;


/**
 * Issue an HTTP request to the given URL.
 * @param {string} url The URL where to send the request.
 * @param {SendOptions=} opt_options Options for the request, see the
 *     {SendOptions} documentation for more details.
 */
module.exports.send = function(url, opt_options) {
  var options = opt_options || {}; 

  var startTime = +(new Date());
  var method = (options.method || 'GET').toUpperCase();
  var body = options.body || '';
  var contentType = '';
  if (options.params) {
    if (method == 'GET') {
      url = urls.appendParams(url, options.params);
    } else if (options.params) {
      if (typeof options.params == 'string') {
        body = options.params;
      } else {
        body = urls.toFormEncodedString(options.params);
      }
      contentType = 'application/x-www-form-urlencoded';
    }
  }

  var headers = options.headers || {};
  if (contentType) {
    headers['Content-Type'] = contentType;
  }

  var sender = options.proxy || environment.send;
  sender(method, url, headers, body, function(status, headers, body) {
    // Don't log proxied requests because they'll get logged twice.
    if (options.noisy) {
      util.log('[skit.platform.net] ' + method + ' ' + url + ' - ' + status + ' - ' + (+(new Date()) - startTime) + 'ms');
    }

    var response = new Response(status, headers, body);

    if (response.status == 200) {
      if (options.success) {
        options.success.call(options.context, response);
      }
    } else {
      if (options.error) {
        options.error.call(options.context, response);
      }
    }

    if (options.complete) {
      options.complete.call(options.context, response);
    }
  });
};
})(); return result || defined || module.exports; })).apply(this, arguments)});