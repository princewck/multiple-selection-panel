angular.module('app').run(['$templateCache', function($templateCache) {$templateCache.put('home/home.html','<div>this is home2</div>');
$templateCache.put('readme/readme.html','<div class="readme">\n    <h1>\u5173\u4E8E\u7EC4\u5EFA</h1>\n</div>');
$templateCache.put('select-panel/template.html','<div>\u6307\u4EE4</div>');}]);