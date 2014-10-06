angular.module('templates-main', ['../app/views/main.tpl.html']);

angular.module("../app/views/main.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/main.tpl.html",
    "<div>Main view</div>");
}]);
