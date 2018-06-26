skit.define("library.overlays.TitledOverlay:js", ["skit.browser.ElementWrapper:js","skit.browser.dom:js","skit.browser.layout:js","skit.platform.util:js","library.overlays.Overlay:js","library.overlays.TitledOverlay:html"], function() {  return ((function(skit_browser_ElementWrapper,skit_browser_dom,skit_browser_layout,skit_platform_util,library_overlays_Overlay,__module___html) { var module = {exports: {}}; var defined = null; function define() {   for (var i = 0; i < arguments.length; i++) {     if (typeof arguments[i] == 'function') { defined = arguments[i](); break; }   } } define.amd = true; var result = (function library_overlays_TitledOverlay_js() {'use strict';
/**
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

var ElementWrapper = skit_browser_ElementWrapper;
var dom = skit_browser_dom;
var layout = skit_browser_layout;
var util = skit_platform_util;

var Overlay = library_overlays_Overlay;

var html = __module___html;


function TitledOverlay(title, opt_options) {
  var options = opt_options || {};
  var $container = ElementWrapper.fromHtml(html({
    'title': title,
    'closeButtonTitle': !options.noCloseButton ? (options.closeButtonTitle || 'Close') : null,
    'className': options.className
  }));

  this.$titlebar = $container.get('.titlebar');
  this.$contentContainer = $container.get('.titled-overlay-content');
  if (options.content) {
    this.$contentContainer.append(options.content);
  }

  Overlay.call(this, $container, opt_options);
};
util.inherits(TitledOverlay, Overlay);


TitledOverlay.prototype.getContentContainer = function() {
  return this.$contentContainer;
};


TitledOverlay.prototype.position = function() {
  var outerContent = this.getContent().element;
  outerContent.style.height = 'auto';
  // This should be zero + padding + borders, if any, because
  // everything inside is position: absolute.
  var outerHeight = layout.height(outerContent);
  outerContent.style.height = '';

  var titleBarHeight = layout.height(this.$titlebar);

  var innerContent = this.getContentContainer().element;
  innerContent.style.position = 'static';
  var innerContentHeight = layout.height(innerContent);

  innerContent.style.position = 'absolute';
  innerContent.style.top = titleBarHeight + 'px';

  var totalHeight = innerContentHeight + titleBarHeight + outerHeight;
  outerContent.style.height = Math.min(totalHeight, layout.height(window)) + 'px';

  Overlay.prototype.position.call(this);
};


return TitledOverlay;
})(); return result || defined || module.exports; })).apply(this, arguments)});