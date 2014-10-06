angular.module('templates-main', ['views/about.tpl.html', 'views/home.tpl.html', 'views/statistics.tpl.html']);

angular.module("views/about.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/about.tpl.html",
    "<h1>About</h1>");
}]);

angular.module("views/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/home.tpl.html",
    "<div class=\"jumbotron\">\n" +
    "    <h1>'Allo, 'Allo!</h1>\n" +
    "    <p class=\"lead\">\n" +
    "        <img src=\"images/yeoman.png\" alt=\"I'm Yeoman\"><br>\n" +
    "        Always a pleasure scaffolding your apps.\n" +
    "    </p>\n" +
    "    <p><a class=\"btn btn-lg btn-success\" ng-href=\"#\">Splendid!<span class=\"glyphicon glyphicon-ok\"></span></a></p>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row marketing\">\n" +
    "    <h4>HTML5 Boilerplate</h4>\n" +
    "    <p>\n" +
    "        HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.\n" +
    "    </p>\n" +
    "\n" +
    "    <h4>Angular</h4>\n" +
    "    <p>\n" +
    "        AngularJS is a toolset for building the framework most suited to your application development.\n" +
    "    </p>\n" +
    "\n" +
    "    <h4>Karma</h4>\n" +
    "    <p>Spectacular Test Runner for JavaScript.</p>\n" +
    "</div>\n" +
    "");
}]);

angular.module("views/statistics.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/statistics.tpl.html",
    "<h2>Statistics</h2>");
}]);
