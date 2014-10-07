angular.module('templates-main', ['views/about.tpl.html', 'views/game.tpl.html', 'views/home.tpl.html', 'views/question.tpl.html', 'views/statistics.tpl.html']);

angular.module("views/about.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/about.tpl.html",
    "<h1>About</h1>");
}]);

angular.module("views/game.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/game.tpl.html",
    "<div>\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"panel-heading\">\n" +
    "            <h3 class=\"panel-title\">Правила игры</h3>\n" +
    "        </div>\n" +
    "        <div class=\"panel-body\">\n" +
    "            <span>Я угадаю Вашу любимую книгу.</span>\n" +
    "            <br>\n" +
    "            <button type=\"button\" class=\"btn btn-sm center-block\" ui-sref=\"stage({stage: 1})\" >Поехали!</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("views/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/home.tpl.html",
    "<div class=\"jumbotron\">\n" +
    "    <h1>Akinator</h1>\n" +
    "    <p class=\"lead\">\n" +
    "        <img src=\"images/book.png\" alt=\"I'm Yeoman\"><br>\n" +
    "        I know all.\n" +
    "    </p>\n" +
    "    <p><a class=\"btn btn-lg btn-success\" ui-sref=\"game\">Start game! <span class=\"glyphicon glyphicon-ok\"></span></a></p>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row marketing\">\n" +
    "    <h4>I know all..</h4>\n" +
    "    <p>\n" +
    "        ...about all\n" +
    "    </p>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("views/question.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/question.tpl.html",
    "<div ng-controller=\"GameController\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"panel-heading\">\n" +
    "            <h3 class=\"panel-title\">Вопрос: {{stage}}</h3>\n" +
    "        </div>\n" +
    "        <div class=\"panel-body\">\n" +
    "            <p>\n" +
    "                <span>{{question}}</span>\n" +
    "\n" +
    "            </p>\n" +
    "            <br>\n" +
    "            <form role=\"form\">\n" +
    "                <div class=\"form-group \">\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ui-sref=\"stage({stage: 1})\">Да</button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ui-sref=\"stage({stage: 1})\">Нет</button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ui-sref=\"stage({stage: 1})\">Возможно частично</button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" i-sref=\"stage({stage: 1})\">Не знаю</button>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("views/statistics.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/statistics.tpl.html",
    "<h2>Statistics</h2>");
}]);
