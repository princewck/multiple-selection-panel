"use strict";function _toConsumableArray(n){if(Array.isArray(n)){for(var a=0,s=Array(n.length);a<n.length;a++)s[a]=n[a];return s}return Array.from(n)}var app=angular.module("app",["ui.router","ngAnimate","ck.directives"]);angular.module("app").run(["$templateCache",function(n){n.put("home/home.html",'<div class="page-home">\n    <div class="demo-group dropdown-mode">\n        <h3>下拉菜单显示</h3>\n        <div class="left">\n            <h4>指令区域：</h4>\n            <select-panel ng-model="selectItems" pick-items-from="categories" array-keys="subGroups=>tags" cascade="true" track-by="id" />\n        </div>\n        <div class="right">\n            <h4>指令外部：</h4>\n            <ul>\n                <li ng-repeat="item in selectItems">{{ item.name }} <button ng-click="delete($index)">删除</button></li>\n            </ul>\n        </div>\n    </div>\n    <hr>\n    <div class="demo-group static-mode">\n        <h3>嵌入页面显示</h3>\n        <div class="left">\n            <h4>指令区域：</h4>\n            <select-panel \n                ng-model="selectItems2" \n                pick-items-from="tags" \n                array-keys="subGroups=>tags" \n                name-keys="groupName,subGroupName,tagName"\n                cascade="true" \n                track-by="id" static />\n        </div>\n        <div class="right">\n            <h4>指令外部：</h4>\n            <ul>\n                <li ng-repeat="item in selectItems2">{{ item.tagName }} <button ng-click="deleteTag($index)">删除</button></li>\n            </ul>\n        </div>\n    </div>\n</div>'),n.put("readme/readme.html",'<!DOCTYPE html><html><head><meta charset="utf-8"><style>@font-face {\n  font-family: octicons-anchor;\n  src: url(data:font/woff;charset=utf-8;base64,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) format(\'woff\');\n}\n\n* {\n    box-sizing: border-box;\n}\n/*\nbody {\n    width: 100%;\n    margin-right: auto;\n    margin-left: auto;\n}\n\nbody .markdown-body {\n    padding: 45px;\n    border: 1px solid #ddd;\n    border-radius: 3px;\n    word-wrap: break-word;\n}*/\n\npre {\n    font: 12px Consolas, "Liberation Mono", Menlo, Courier, monospace;\n}\n\n.markdown-body {\n  -webkit-text-size-adjust: 100%;\n  text-size-adjust: 100%;\n  color: #333;\n  font-family: "Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";\n  font-size: 16px;\n  line-height: 1.6;\n  word-wrap: break-word;\n}\n\n.markdown-body a {\n  background-color: transparent;\n}\n\n.markdown-body a:active,\n.markdown-body a:hover {\n  outline: 0;\n}\n\n.markdown-body strong {\n  font-weight: bold;\n}\n\n.markdown-body h1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n.markdown-body img {\n  border: 0;\n}\n\n.markdown-body hr {\n  box-sizing: content-box;\n  height: 0;\n}\n\n.markdown-body pre {\n  overflow: auto;\n}\n\n.markdown-body code,\n.markdown-body kbd,\n.markdown-body pre {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\n.markdown-body input {\n  color: inherit;\n  font: inherit;\n  margin: 0;\n}\n\n.markdown-body html input[disabled] {\n  cursor: default;\n}\n\n.markdown-body input {\n  line-height: normal;\n}\n\n.markdown-body input[type="checkbox"] {\n  box-sizing: border-box;\n  padding: 0;\n}\n\n.markdown-body table {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n.markdown-body td,\n.markdown-body th {\n  padding: 0;\n}\n\n.markdown-body input {\n  font: 13px / 1.4 Helvetica, arial, nimbussansl, liberationsans, freesans, clean, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";\n}\n\n.markdown-body a {\n  color: #4078c0;\n  text-decoration: none;\n}\n\n.markdown-body a:hover,\n.markdown-body a:active {\n  text-decoration: underline;\n}\n\n.markdown-body hr {\n  height: 0;\n  margin: 15px 0;\n  overflow: hidden;\n  background: transparent;\n  border: 0;\n  border-bottom: 1px solid #ddd;\n}\n\n.markdown-body hr:before {\n  display: table;\n  content: "";\n}\n\n.markdown-body hr:after {\n  display: table;\n  clear: both;\n  content: "";\n}\n\n.markdown-body h1,\n.markdown-body h2,\n.markdown-body h3,\n.markdown-body h4,\n.markdown-body h5,\n.markdown-body h6 {\n  margin-top: 15px;\n  margin-bottom: 15px;\n  line-height: 1.1;\n}\n\n.markdown-body h1 {\n  font-size: 30px;\n}\n\n.markdown-body h2 {\n  font-size: 21px;\n}\n\n.markdown-body h3 {\n  font-size: 16px;\n}\n\n.markdown-body h4 {\n  font-size: 14px;\n}\n\n.markdown-body h5 {\n  font-size: 12px;\n}\n\n.markdown-body h6 {\n  font-size: 11px;\n}\n\n.markdown-body blockquote {\n  margin: 0;\n}\n\n.markdown-body ul,\n.markdown-body ol {\n  padding: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n}\n\n.markdown-body ol ol,\n.markdown-body ul ol {\n  list-style-type: lower-roman;\n}\n\n.markdown-body ul ul ol,\n.markdown-body ul ol ol,\n.markdown-body ol ul ol,\n.markdown-body ol ol ol {\n  list-style-type: lower-alpha;\n}\n\n.markdown-body dd {\n  margin-left: 0;\n}\n\n.markdown-body code {\n  font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;\n  font-size: 12px;\n}\n\n.markdown-body pre {\n  margin-top: 0;\n  margin-bottom: 0;\n  font: 12px Consolas, "Liberation Mono", Menlo, Courier, monospace;\n}\n\n.markdown-body .select::-ms-expand {\n  opacity: 0;\n}\n\n.markdown-body .octicon {\n  font: normal normal normal 16px/1 octicons-anchor;\n  display: inline-block;\n  text-decoration: none;\n  text-rendering: auto;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.markdown-body .octicon-link:before {\n  content: \'\\f05c\';\n}\n\n.markdown-body:before {\n  display: table;\n  content: "";\n}\n\n.markdown-body:after {\n  display: table;\n  clear: both;\n  content: "";\n}\n\n.markdown-body>*:first-child {\n  margin-top: 0 !important;\n}\n\n.markdown-body>*:last-child {\n  margin-bottom: 0 !important;\n}\n\n.markdown-body a:not([href]) {\n  color: inherit;\n  text-decoration: none;\n}\n\n.markdown-body .anchor {\n  display: inline-block;\n  padding-right: 2px;\n  margin-left: -18px;\n}\n\n.markdown-body .anchor:focus {\n  outline: none;\n}\n\n.markdown-body h1,\n.markdown-body h2,\n.markdown-body h3,\n.markdown-body h4,\n.markdown-body h5,\n.markdown-body h6 {\n  margin-top: 1em;\n  margin-bottom: 16px;\n  font-weight: bold;\n  line-height: 1.4;\n}\n\n.markdown-body h1 .octicon-link,\n.markdown-body h2 .octicon-link,\n.markdown-body h3 .octicon-link,\n.markdown-body h4 .octicon-link,\n.markdown-body h5 .octicon-link,\n.markdown-body h6 .octicon-link {\n  color: #000;\n  vertical-align: middle;\n  visibility: hidden;\n}\n\n.markdown-body h1:hover .anchor,\n.markdown-body h2:hover .anchor,\n.markdown-body h3:hover .anchor,\n.markdown-body h4:hover .anchor,\n.markdown-body h5:hover .anchor,\n.markdown-body h6:hover .anchor {\n  text-decoration: none;\n}\n\n.markdown-body h1:hover .anchor .octicon-link,\n.markdown-body h2:hover .anchor .octicon-link,\n.markdown-body h3:hover .anchor .octicon-link,\n.markdown-body h4:hover .anchor .octicon-link,\n.markdown-body h5:hover .anchor .octicon-link,\n.markdown-body h6:hover .anchor .octicon-link {\n  visibility: visible;\n}\n\n.markdown-body h1 {\n  padding-bottom: 0.3em;\n  font-size: 2.25em;\n  line-height: 1.2;\n  border-bottom: 1px solid #eee;\n}\n\n.markdown-body h1 .anchor {\n  line-height: 1;\n}\n\n.markdown-body h2 {\n  padding-bottom: 0.3em;\n  font-size: 1.75em;\n  line-height: 1.225;\n  border-bottom: 1px solid #eee;\n}\n\n.markdown-body h2 .anchor {\n  line-height: 1;\n}\n\n.markdown-body h3 {\n  font-size: 1.5em;\n  line-height: 1.43;\n}\n\n.markdown-body h3 .anchor {\n  line-height: 1.2;\n}\n\n.markdown-body h4 {\n  font-size: 1.25em;\n}\n\n.markdown-body h4 .anchor {\n  line-height: 1.2;\n}\n\n.markdown-body h5 {\n  font-size: 1em;\n}\n\n.markdown-body h5 .anchor {\n  line-height: 1.1;\n}\n\n.markdown-body h6 {\n  font-size: 1em;\n  color: #777;\n}\n\n.markdown-body h6 .anchor {\n  line-height: 1.1;\n}\n\n.markdown-body p,\n.markdown-body blockquote,\n.markdown-body ul,\n.markdown-body ol,\n.markdown-body dl,\n.markdown-body table,\n.markdown-body pre {\n  margin-top: 0;\n  margin-bottom: 16px;\n}\n\n.markdown-body hr {\n  height: 4px;\n  padding: 0;\n  margin: 16px 0;\n  background-color: #e7e7e7;\n  border: 0 none;\n}\n\n.markdown-body ul,\n.markdown-body ol {\n  padding-left: 2em;\n}\n\n.markdown-body ul ul,\n.markdown-body ul ol,\n.markdown-body ol ol,\n.markdown-body ol ul {\n  margin-top: 0;\n  margin-bottom: 0;\n}\n\n.markdown-body li>p {\n  margin-top: 16px;\n}\n\n.markdown-body dl {\n  padding: 0;\n}\n\n.markdown-body dl dt {\n  padding: 0;\n  margin-top: 16px;\n  font-size: 1em;\n  font-style: italic;\n  font-weight: bold;\n}\n\n.markdown-body dl dd {\n  padding: 0 16px;\n  margin-bottom: 16px;\n}\n\n.markdown-body blockquote {\n  padding: 0 15px;\n  color: #777;\n  border-left: 4px solid #ddd;\n}\n\n.markdown-body blockquote>:first-child {\n  margin-top: 0;\n}\n\n.markdown-body blockquote>:last-child {\n  margin-bottom: 0;\n}\n\n.markdown-body table {\n  display: block;\n  width: 100%;\n  overflow: auto;\n  word-break: normal;\n  word-break: keep-all;\n}\n\n.markdown-body table th {\n  font-weight: bold;\n}\n\n.markdown-body table th,\n.markdown-body table td {\n  padding: 6px 13px;\n  border: 1px solid #ddd;\n}\n\n.markdown-body table tr {\n  background-color: #fff;\n  border-top: 1px solid #ccc;\n}\n\n.markdown-body table tr:nth-child(2n) {\n  background-color: #f8f8f8;\n}\n\n.markdown-body img {\n  max-width: 100%;\n  box-sizing: content-box;\n  background-color: #fff;\n}\n\n.markdown-body code {\n  padding: 0;\n  padding-top: 0.2em;\n  padding-bottom: 0.2em;\n  margin: 0;\n  font-size: 85%;\n  background-color: rgba(0,0,0,0.04);\n  border-radius: 3px;\n}\n\n.markdown-body code:before,\n.markdown-body code:after {\n  letter-spacing: -0.2em;\n  content: "\\00a0";\n}\n\n.markdown-body pre>code {\n  padding: 0;\n  margin: 0;\n  font-size: 100%;\n  word-break: normal;\n  white-space: pre;\n  background: transparent;\n  border: 0;\n}\n\n.markdown-body .highlight {\n  margin-bottom: 16px;\n}\n\n.markdown-body .highlight pre,\n.markdown-body pre {\n  padding: 16px;\n  overflow: auto;\n  font-size: 85%;\n  line-height: 1.45;\n  background-color: #f7f7f7;\n  border-radius: 3px;\n}\n\n.markdown-body .highlight pre {\n  margin-bottom: 0;\n  word-break: normal;\n}\n\n.markdown-body pre {\n  word-wrap: normal;\n}\n\n.markdown-body pre code {\n  display: inline;\n  max-width: initial;\n  padding: 0;\n  margin: 0;\n  overflow: initial;\n  line-height: inherit;\n  word-wrap: normal;\n  background-color: transparent;\n  border: 0;\n}\n\n.markdown-body pre code:before,\n.markdown-body pre code:after {\n  content: normal;\n}\n\n.markdown-body kbd {\n  display: inline-block;\n  padding: 3px 5px;\n  font-size: 11px;\n  line-height: 10px;\n  color: #555;\n  vertical-align: middle;\n  background-color: #fcfcfc;\n  border: solid 1px #ccc;\n  border-bottom-color: #bbb;\n  border-radius: 3px;\n  box-shadow: inset 0 -1px 0 #bbb;\n}\n\n.markdown-body .pl-c {\n  color: #969896;\n}\n\n.markdown-body .pl-c1,\n.markdown-body .pl-s .pl-v {\n  color: #0086b3;\n}\n\n.markdown-body .pl-e,\n.markdown-body .pl-en {\n  color: #795da3;\n}\n\n.markdown-body .pl-s .pl-s1,\n.markdown-body .pl-smi {\n  color: #333;\n}\n\n.markdown-body .pl-ent {\n  color: #63a35c;\n}\n\n.markdown-body .pl-k {\n  color: #a71d5d;\n}\n\n.markdown-body .pl-pds,\n.markdown-body .pl-s,\n.markdown-body .pl-s .pl-pse .pl-s1,\n.markdown-body .pl-sr,\n.markdown-body .pl-sr .pl-cce,\n.markdown-body .pl-sr .pl-sra,\n.markdown-body .pl-sr .pl-sre {\n  color: #183691;\n}\n\n.markdown-body .pl-v {\n  color: #ed6a43;\n}\n\n.markdown-body .pl-id {\n  color: #b52a1d;\n}\n\n.markdown-body .pl-ii {\n  background-color: #b52a1d;\n  color: #f8f8f8;\n}\n\n.markdown-body .pl-sr .pl-cce {\n  color: #63a35c;\n  font-weight: bold;\n}\n\n.markdown-body .pl-ml {\n  color: #693a17;\n}\n\n.markdown-body .pl-mh,\n.markdown-body .pl-mh .pl-en,\n.markdown-body .pl-ms {\n  color: #1d3e81;\n  font-weight: bold;\n}\n\n.markdown-body .pl-mq {\n  color: #008080;\n}\n\n.markdown-body .pl-mi {\n  color: #333;\n  font-style: italic;\n}\n\n.markdown-body .pl-mb {\n  color: #333;\n  font-weight: bold;\n}\n\n.markdown-body .pl-md {\n  background-color: #ffecec;\n  color: #bd2c00;\n}\n\n.markdown-body .pl-mi1 {\n  background-color: #eaffea;\n  color: #55a532;\n}\n\n.markdown-body .pl-mdr {\n  color: #795da3;\n  font-weight: bold;\n}\n\n.markdown-body .pl-mo {\n  color: #1d3e81;\n}\n\n.markdown-body kbd {\n  display: inline-block;\n  padding: 3px 5px;\n  font: 11px Consolas, "Liberation Mono", Menlo, Courier, monospace;\n  line-height: 10px;\n  color: #555;\n  vertical-align: middle;\n  background-color: #fcfcfc;\n  border: solid 1px #ccc;\n  border-bottom-color: #bbb;\n  border-radius: 3px;\n  box-shadow: inset 0 -1px 0 #bbb;\n}\n\n.markdown-body .plan-price-unit {\n  color: #767676;\n  font-weight: normal;\n}\n\n.markdown-body .task-list-item {\n  list-style-type: none;\n}\n\n.markdown-body .task-list-item+.task-list-item {\n  margin-top: 3px;\n}\n\n.markdown-body .task-list-item input {\n  margin: 0 0.35em 0.25em -1.6em;\n  vertical-align: middle;\n}\n\n.markdown-body .plan-choice {\n  padding: 15px;\n  padding-left: 40px;\n  display: block;\n  border: 1px solid #e0e0e0;\n  position: relative;\n  font-weight: normal;\n  background-color: #fafafa;\n}\n\n.markdown-body .plan-choice.open {\n  background-color: #fff;\n}\n\n.markdown-body .plan-choice.open .plan-choice-seat-breakdown {\n  display: block;\n}\n\n.markdown-body .plan-choice-free {\n  border-radius: 3px 3px 0 0;\n}\n\n.markdown-body .plan-choice-paid {\n  border-radius: 0 0 3px 3px;\n  border-top: 0;\n  margin-bottom: 20px;\n}\n\n.markdown-body .plan-choice-radio {\n  position: absolute;\n  left: 15px;\n  top: 18px;\n}\n\n.markdown-body .plan-choice-exp {\n  color: #999;\n  font-size: 12px;\n  margin-top: 5px;\n}\n\n.markdown-body .plan-choice-seat-breakdown {\n  margin-top: 10px;\n  display: none;\n}\n\n.markdown-body :checked+.radio-label {\n  z-index: 1;\n  position: relative;\n  border-color: #4078c0;\n}\n</style><title>readme</title></head><body><article class="markdown-body"><p>[TOC]</p>\n<h1>\n<a id="user-content-select-panel" class="anchor" href="#select-panel" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Select-panel</h1>\n<p>a muti-select panel build with angular1.* directive weigh at a 7kb js and a 15kb css files.</p>\n<p>demo: <a href="https://princewck.github.io/select-panel/#!/" target="_blank">princewck.github.io/select-panel</a></p>\n<h2>\n<a id="user-content-dependencies" class="anchor" href="#dependencies" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Dependencies</h2>\n<p>angularJs  @v1.5+</p>\n<h2>\n<a id="user-content-usage" class="anchor" href="#usage" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Usage</h2>\n<p>To use the directive, include the select-panel or minified version javascript and css files in your web page:</p>\n<div class="highlight highlight-text-html-basic"><pre>&lt;!DOCTYPE HTML&gt;\n&lt;<span class="pl-ent">html</span>&gt;\n&lt;<span class="pl-ent">head</span>&gt;\n  &lt;<span class="pl-ent">link</span> <span class="pl-e">href</span>=<span class="pl-s"><span class="pl-pds">"</span>vendor/select-panel/select-panel.css<span class="pl-pds">"</span></span> <span class="pl-e">rel</span>=<span class="pl-s"><span class="pl-pds">"</span>stylesheet<span class="pl-pds">"</span></span> <span class="pl-e">type</span>=<span class="pl-s"><span class="pl-pds">"</span>text/css<span class="pl-pds">"</span></span> /&gt;\n&lt;/<span class="pl-ent">head</span>&gt;\n&lt;<span class="pl-ent">body</span> <span class="pl-e">ng-app</span>=<span class="pl-s"><span class="pl-pds">"</span>app<span class="pl-pds">"</span></span>&gt;\n  <span class="pl-c"><span class="pl-c">&lt;!--</span>...<span class="pl-c">--&gt;</span></span>\n  &lt;<span class="pl-ent">script</span> <span class="pl-e">src</span>=<span class="pl-s"><span class="pl-pds">"</span>src/select-panel/select-panel.js<span class="pl-pds">"</span></span>&gt;<span class="pl-s1">&lt;</span>/<span class="pl-ent">script</span>&gt;\n&lt;/<span class="pl-ent">body</span>&gt;\n&lt;/<span class="pl-ent">html</span>&gt;</pre></div>\n<p>Then, add module dependency in ur angular app:</p>\n<div class="highlight highlight-source-js"><pre><span class="pl-smi">angular</span>.<span class="pl-en">module</span>(<span class="pl-s"><span class="pl-pds">\'</span>app<span class="pl-pds">\'</span></span>, [<span class="pl-s"><span class="pl-pds">\'</span>ck.directives<span class="pl-pds">\'</span></span>]);</pre></div>\n<p>Finally, all this directive anywhere in your app</p>\n<div class="highlight highlight-text-html-basic"><pre>&lt;<span class="pl-ent">select-panel</span> <span class="pl-e">ng-model</span>=<span class="pl-s"><span class="pl-pds">"</span>selectItems<span class="pl-pds">"</span></span> <span class="pl-e">pick-items-from</span>=<span class="pl-s"><span class="pl-pds">"</span>categories<span class="pl-pds">"</span></span> \n              <span class="pl-e">array-keys</span>=<span class="pl-s"><span class="pl-pds">"</span>subGroups=&gt;tags<span class="pl-pds">"</span></span>\n              <span class="pl-e">cascade</span> = <span class="pl-s"><span class="pl-pds">"</span>true<span class="pl-pds">"</span></span>\n              <span class="pl-e">track-by</span> = <span class="pl-s"><span class="pl-pds">"</span>id<span class="pl-pds">"</span></span>\n              <span class="pl-e">static</span>/&gt;</pre></div>\n<h2>\n<a id="user-content-doc" class="anchor" href="#doc" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>DOC</h2>\n<table>\n<thead>\n<tr>\n<th align="left">Option</th>\n<th align="center">Restrict</th>\n<th align="center">Default</th>\n<th align="center">Description</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td align="left">ng-model</td>\n<td align="center">required</td>\n<td align="center">/</td>\n<td align="center">model bind to your select items array</td>\n</tr>\n<tr>\n<td align="left">pick-items-from</td>\n<td align="center">required</td>\n<td align="center">/</td>\n<td align="center">the dictionery item tree</td>\n</tr>\n<tr>\n<td align="left">track-by</td>\n<td align="center">required</td>\n<td align="center">/</td>\n<td align="center">track and identify  leaf items by this key</td>\n</tr>\n<tr>\n<td align="left">array-keys</td>\n<td align="center">required</td>\n<td align="center">/</td>\n<td align="center">specify the array keys form level two, split with \'=&gt;\', eg: \'subgroups=&gt;tags\'</td>\n</tr>\n<tr>\n<td align="left"></td>\n<td align="center"></td>\n<td align="center"></td>\n<td align="center"></td>\n</tr>\n<tr>\n<td align="left">name-keys</td>\n<td align="center">optional</td>\n<td align="center">\'name,…name\'</td>\n<td align="center">specify the name keys for each level of your tree</td>\n</tr>\n<tr>\n<td align="left">cascade</td>\n<td align="center">optional</td>\n<td align="center"></td>\n<td align="center">default show <code>direct mode</code>or <code>cascade mode</code>\n</td>\n</tr>\n<tr>\n<td align="left">static</td>\n<td align="center">optional</td>\n<td align="center"></td>\n<td align="center">show as <code>static mode</code> which the panel nested in the dom otherwise the select  panel will present with a dropdown menu.</td>\n</tr>\n</tbody>\n</table>\n<h2>\n<a id="user-content-example" class="anchor" href="#example" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Example</h2>\n<div class="highlight highlight-text-html-basic"><pre>&lt;<span class="pl-ent">div</span> <span class="pl-e">class</span>=<span class="pl-s"><span class="pl-pds">"</span>container<span class="pl-pds">"</span></span> <span class="pl-e">ng-controller</span>=<span class="pl-s"><span class="pl-pds">"</span>panelContoller<span class="pl-pds">"</span></span>&gt;\n  &lt;<span class="pl-ent">select-panel</span> <span class="pl-e">ng-model</span>=<span class="pl-s"><span class="pl-pds">"</span>selectItems<span class="pl-pds">"</span></span> \n               <span class="pl-e">pick-items-from</span>=<span class="pl-s"><span class="pl-pds">"</span>categories<span class="pl-pds">"</span></span> \n               <span class="pl-e">array-keys</span>=<span class="pl-s"><span class="pl-pds">"</span>subGroups=&gt;tags<span class="pl-pds">"</span></span>\n               <span class="pl-e">name-keys</span>=<span class="pl-s"><span class="pl-pds">"</span>groupName,subGroupName,tagName<span class="pl-pds">"</span></span>\n               <span class="pl-e">cascade</span> = <span class="pl-s"><span class="pl-pds">"</span>true<span class="pl-pds">"</span></span>\n               <span class="pl-e">track-by</span> = <span class="pl-s"><span class="pl-pds">"</span>id<span class="pl-pds">"</span></span>\n               <span class="pl-e">static</span>/&gt;\n&lt;/<span class="pl-ent">div</span>&gt;</pre></div>\n<p>controller:</p>\n<div class="highlight highlight-source-js"><pre><span class="pl-smi">app</span>.<span class="pl-en">controller</span>(<span class="pl-s"><span class="pl-pds">\'</span>panelContoller<span class="pl-pds">\'</span></span>, [<span class="pl-s"><span class="pl-pds">\'</span>$scope<span class="pl-pds">\'</span></span>, <span class="pl-k">function</span>() {\n\t<span class="pl-c"><span class="pl-c">//</span>here we track by `id`, so `id` must specified and with id we know its real item in the panel item list.</span>\n  \t<span class="pl-smi">$scope</span>.<span class="pl-smi">selectItems</span> <span class="pl-k">=</span> [\n      {id<span class="pl-k">:</span> <span class="pl-c1">5</span>},\n      {id<span class="pl-k">:</span> <span class="pl-c1">10</span>}\n\t];\n    \n  \t<span class="pl-c"><span class="pl-c">//</span>test data</span>\n    <span class="pl-smi">$scope</span>.<span class="pl-smi">categories</span> <span class="pl-k">=</span> [\n      {\n        id<span class="pl-k">:</span> <span class="pl-c1">1</span>,\n        groupName<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">\'</span>group1<span class="pl-pds">\'</span></span>,\n        subGroups<span class="pl-k">:</span> [\n          {\n            id<span class="pl-k">:</span><span class="pl-c1">1</span>,\n            subGroupName<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">\'</span>sb1<span class="pl-pds">\'</span></span>,\n            tags<span class="pl-k">:</span> [\n              {\n                id<span class="pl-k">:</span> <span class="pl-c1">1</span>,\n                tagName<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">\'</span>tag1<span class="pl-pds">\'</span></span>\n              },\n              {\n                id<span class="pl-k">:</span> <span class="pl-c1">2</span>,\n                tagName<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">\'</span>tag2<span class="pl-pds">\'</span></span>\n              }\n            ]\n          },\n          {\n            id<span class="pl-k">:</span><span class="pl-c1">2</span>,\n            subGroupName<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">\'</span>sb2<span class="pl-pds">\'</span></span>,\n            tags<span class="pl-k">:</span> [\n              {\n                id<span class="pl-k">:</span> <span class="pl-c1">3</span>,\n                tagName<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">\'</span>tag3<span class="pl-pds">\'</span></span>\n              },\n              {\n                id<span class="pl-k">:</span> <span class="pl-c1">4</span>,\n                tagName<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">\'</span>tag4<span class="pl-pds">\'</span></span>\n              }\n            ]\n          }          \n        ]\n      },\n      {\n        id<span class="pl-k">:</span> <span class="pl-c1">2</span>,\n        groupName<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">\'</span>group2<span class="pl-pds">\'</span></span>,\n        subGroups<span class="pl-k">:</span> [\n          {\n            id<span class="pl-k">:</span><span class="pl-c1">3</span>,\n            subGroupName<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">\'</span>sb3<span class="pl-pds">\'</span></span>,\n            tags<span class="pl-k">:</span> [\n              {\n                id<span class="pl-k">:</span> <span class="pl-c1">5</span>,\n                tagName<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">\'</span>tag5<span class="pl-pds">\'</span></span>\n              },\n              {\n                id<span class="pl-k">:</span> <span class="pl-c1">6</span>,\n                tagName<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">\'</span>tag6<span class="pl-pds">\'</span></span>\n              }\n            ]\n          },\n          {\n            id<span class="pl-k">:</span><span class="pl-c1">4</span>,\n            subGroupName<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">\'</span>sb4<span class="pl-pds">\'</span></span>,\n            tags<span class="pl-k">:</span> [\n              {\n                id<span class="pl-k">:</span> <span class="pl-c1">7</span>,\n                tagName<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">\'</span>tag7<span class="pl-pds">\'</span></span>\n              },\n              {\n                id<span class="pl-k">:</span> <span class="pl-c1">8</span>,\n                tagName<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">\'</span>tag8<span class="pl-pds">\'</span></span>\n              }\n            ]\n          }          \n        ]\n      }      \n    ];\n  \n}])</pre></div>\n</article></body></html>'),n.put("select-panel/template.html",'<div class="select-panel-wrapper" ng-init="__directiveId = $index" ng-cloak>\n    <div class="select-panel">\n        <p class="select-panel-type" ng-click="noHide($event)">\n            内容标签：\n            <a ng-click="toggleMode(false)" ng-class="{mute: cascade == false}">直接选择</a> \n            <span class="divider"></span>\n            <a ng-click="toggleMode(true)" ng-class="{mute: cascade == true}">级联选择</a>\n        </p>\n        <div class="select-panel-input" ng-click="togglePanelVisiblity($event)">\n            <span class="select-panel-selected-items">\n                <span ng-repeat="tag in getCheckedItems() track by $index">\n                    {{ tag[nameKeys[nameKeys.length-1]] }}\n                    <span class="del-item" ng-click="uncheck(tag, $event)">&times;</span>\n                </span>\n                <span class="placeholder" ng-hide="getCheckedItems().length">\n                    选择标签\n                </span>\n            </span>\n            <div class="arrow-right-wrapper">\n                <span class="arrow-right" ng-hide="staticMode()" ng-class="{active: !searchPanelVisible}"></span>\n            </div>\n        </div>\n        <div class="select-panel-selector" ng-style="panelPositionStyle()" ng-show="searchPanelVisible" ng-click="noHide($event)">\n            <div class="select-panel-search">\n                <input type="text" ng-model="_searchQuery" placeholder="搜索" />\n                <span ng-show="_searchQuery" ng-click="_searchQuery=\'\'" class="reset-query">&times;</span>\n            </div>\n\n            <div class="select-panel-list-wrapper">\n                <ul class="select-panel-list" ng-repeat="column in getColumns() track by $index" ng-init="_outerIndex=$index" ng-style="{width: 100/(getColumns().length || 1) + \'%\'}">\n                    <li ng-repeat="item in column track by $index" \n                        class="select-panel-list-item" \n                        ng-class="{active: (getSelectedIndex(_outerIndex) == $index)&&(_outerIndex != getColumns().length - 1)}"\n                        ng-click="clickItem(_outerIndex, $index)"\n                        ng-show="rowVisible(item, _outerIndex, $index)"\n                        >\n                        <input ng-model="item.checked" ng-if="_outerIndex == getColumns().length - 1" id="{{ directiveId + \'_item_\' + _outerIndex + \'_\' + $index }}" type="checkbox" />\n                        <label ng-if="_outerIndex == getColumns().length - 1" for="{{ directiveId + \'_item_\' + _outerIndex + \'_\' + $index }}">{{ cascade ? item[nameKeys[_outerIndex]] : item[nameKeys[nameKeys.length - 1]] }}</label>\n                        <label ng-if="_outerIndex != getColumns().length - 1" >{{ cascade ? item[nameKeys[_outerIndex]] : item[nameKeys[nameKeys.length - 1]] }} </label>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n</div>')}]),app.config(["$stateProvider","$urlRouterProvider",function(n,a){a.otherwise("/"),n.state("home",{url:"/",templateUrl:"home/home.html",controller:"homeController",controllerAs:"home"}).state("readme",{url:"/readme",templateUrl:"readme/readme.html"})}]),angular.module("ck.directives",[]).directive("selectPanel",["$parse","$timeout",function(n,a){return{restrict:"E",require:"ngModel",templateUrl:"select-panel/template.html",link:function(s,e,o,l){s.directiveId=s.$id;var t="true"==o.cascade;s.cascade=t||!1,s.searchPanelVisible=o.hasOwnProperty("static")||!1,s.togglePanelVisiblity=function(n){n.stopPropagation(),o.hasOwnProperty("static")||(s.searchPanelVisible=!s.searchPanelVisible)};var p=function(n){n.stopPropagation(),s.searchPanelVisible&&s.$apply(s.searchPanelVisible=!1)};s.noHide=function(n){n.stopPropagation()},s.staticMode=function(){return o.hasOwnProperty("static")},o.hasOwnProperty("static")||(document.addEventListener("click",p),s.$on("$destory",function(){document.removeEventListener("click",p)}));for(var r=angular.isString(o.arrayKeys)?o.arrayKeys.trim().split("=>"):[],d=r.length+1,c=[],i=0;i<d;i++)c.push("name");s.nameKeys=o.hasOwnProperty("nameKeys")?o.nameKeys.split(","):c;n(o.ngModel)(s.$parent);s.selectedItems={};var m=[],h=s.data,b=function(n){for(var a={},e=h,o=0;o<n;o++){if(!(a=e[s.selectedItems[o]||0]))return m;e=a[r[o]]||m}return e};s.flatItems=[],s.$watch("data",function(n,a){h=angular.copy(n),s.flatItems=g(h)});var g=function(n){for(var a=n,s=0;s<d-1;s++)!function(n){var s=[];a.forEach(function(a,e){a.tree=a.tree||[],a.tree.push(n+","+e),a.tree=[].concat(_toConsumableArray(new Set(a.tree)));var o=a[r[n]]||[];o.forEach(function(s){s.tree=a.tree||[],s.tree.push(n+","+e),s.tree=[].concat(_toConsumableArray(new Set(s.tree)))}),s.push.apply(s,o)}),a=s}(s);return a};s.visibleColumnRowMatches=[],s.$watch("_searchQuery",function(n,e){var o=new Set;n&&s.flatItems.forEach(function(a){a._match=!1,new RegExp(String(n).trim().split("").join("(.)*"),"ig").test(a[s.nameKeys[s.nameKeys.length-1]])?(a._match=!0,(a.tree||[]).forEach(function(n){o.add(n)})):a._match=!1}),s.visibleColumnRowMatches=[].concat(_toConsumableArray(o)),a(function(){var n=document.createEvent("MouseEvents");n.initMouseEvent("click");var a=document.getElementsByClassName("select-panel-list-wrapper")[0].getElementsByClassName("select-panel-list");Array.prototype.forEach.call(a,function(a,s){setTimeout(function(){var s=a.getElementsByTagName("li");Array.prototype.some.call(s,function(a,s){if(a.className.indexOf("ng-hide")<0)return a.dispatchEvent(n),!0})},80*s)})},100)}),s.rowVisible=function(n,a,e){return!s._searchQuery||(n.hasOwnProperty("_match")?n._match:(n.tree=n.tree||[],s.visibleColumnRowMatches.filter(function(n){return 0==n.indexOf(a+"")}).some(function(a){return n.tree.some(function(n){return a==n})})))},s.toggleMode=function(n){s.selectedItems={},s.cascade=Boolean(n)},s.uncheck=function(n,a){a.stopPropagation(),delete n.checked},s.getColumns=function(){var n=[],a=s.cascade,e=[],o=[];return function(){if(a==s.cascade&&e==s.flatItems&&o==s.selectedItems)return n;if(a=s.cascade,e=s.flatItems,o=s.selectedItems,n.splice(0,n.length),!s.cascade)return n.push(s.flatItems),n;for(var l=0;l<d;l++)n.push(b(l));return n}}(),s.$on("$destory",function(){columns=lastCascade=lastData=lastSelectedItems=null}),s.getSelectedIndex=function(n){return s.selectedItems[n]?s.selectedItems[n]:0},s.clickItem=function(n,a){if(s.selectedItems[n]!=a){var e={};e[n]=Number(a),s.selectedItems=Object.assign({},s.selectedItems,e),Object.keys(s.selectedItems).forEach(function(a){a>n&&delete s.selectedItems[a]})}},s.getCheckedItems=function(){var n=[],a=[];return function(){if(!angular.isArray(s.flatItems))return n;a.splice(0,a.length);var e=s.flatItems.filter(function(n){return n.checked});return a.push.apply(a,e),a}}(),s.getModelValues=function(){return n(o.ngModel)(s.$parent).map(function(n){return n[o.trackBy]}).join(",")};var k=function(a,e){var t=n(o.ngModel)(s.$parent).map(function(n){return n[o.trackBy]});s.flatItems.forEach(function(n){t.indexOf(n[o.trackBy])>=0?n.checked=!0:n.checked=!1}),s.flatItems.length&&l.$setViewValue(s.getCheckedItems())};s.$watchGroup(["getModelValues()","flatItems"],k),s.panelPositionStyle=function(){var n=o.hasOwnProperty("static"),a=180*s.nameKeys.length;return n?{position:"static",width:"100%"}:{position:"absolute",width:s.cascade?a+"px":"300px",zIndex:1e3}}},scope:{data:"=pickItemsFrom"}}}]);var homeController=function(n,a){function s(s,e){a.get(s).then(function(a){angular.isArray(a.data)&&(n[e]=a.data)})}n.categories=[],s("./api/home/tagCategories.json","categories"),n.selectItems=[{id:1},{id:5}],n.tags=[],s("./api/home/tags.json","tags"),n.selectItems2=[{id:5}],n.delete=function(a){n.selectItems=n.selectItems.slice(0,a).concat(n.selectItems.slice(a+1,n.selectItems.length))},n.deleteTag=function(a){n.selectItems2=n.selectItems2.slice(0,a).concat(n.selectItems2.slice(a+1,n.selectItems2.length))}};homeController.$inject=["$scope","$http"],app.controller("homeController",homeController);