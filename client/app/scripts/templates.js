angular.module('templates-main', ['views/about.tpl.html', 'views/end.tpl.html', 'views/finish.tpl.html', 'views/header.tpl.html', 'views/home.tpl.html', 'views/question.tpl.html', 'views/rules.tpl.html', 'views/statistics.tpl.html']);

angular.module("views/about.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/about.tpl.html",
    "<div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">Про авторів</div>\n" +
    "    <div class=\"panel-body\">\n" +
    "        <h3>Kondratiev&Co production></h3>\n" +
    "        Слава Україні!\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("views/end.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/end.tpl.html",
    "<div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">Ви загадали: {{gameState.result.name}} ?</div>\n" +
    "    <div class=\"panel-body\">\n" +
    "        <p>\n" +
    "            {{gameState.result.description}}\n" +
    "        </p>\n" +
    "\n" +
    "        <form role=\"form\">\n" +
    "            <div class=\"form-group\" ng-show=\"lastAnswer.code == 4\">\n" +
    "                <button type=\"button\" class=\"btn btn-default\" ng-click=\"makeLastAnswer()\">Так</button>\n" +
    "                <button type=\"button\" class=\"btn btn-default\" ng-click=\"lastAnswer.code = 5\">Ні</button>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-show=\"lastAnswer.code == 5\">\n" +
    "                <p>\n" +
    "                    <span>Я загадав...</span>\n" +
    "                </p>\n" +
    "                <form class=\"form-horizontal\" role=\"form\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"col-sm-2 control-label\">Назва</label>\n" +
    "\n" +
    "                        <div class=\"col-sm-10\">\n" +
    "                            <input type=\"text\"\n" +
    "                                   class=\"form-control\"\n" +
    "                                   ng-model=\"lastAnswer.book.name\"\n" +
    "                                   placeholder=\"Назва книжки\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"col-sm-2 control-label\">Опис</label>\n" +
    "\n" +
    "                        <div class=\"col-sm-10\">\n" +
    "                            <textarea class=\"form-control\"\n" +
    "                                      style=\"resize:none\"\n" +
    "                                      ng-model=\"lastAnswer.book.description\"\n" +
    "                                      placeholder=\"Опис книжки\">\n" +
    "\n" +
    "                                      </textarea>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-click=\"makeLastAnswer()\">Відправити</button>\n" +
    "                </form>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("views/finish.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/finish.tpl.html",
    "<div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">{{finalMessage}}</div>\n" +
    "    <div class=\"panel-body\">\n" +
    "        <form class=\"form-horizontal\" role=\"form\" ng-show=\"!sended\">\n" +
    "            <div class=\"form-group\">\n" +
    "                <label class=\"col-sm-2 control-label\">Назва</label>\n" +
    "\n" +
    "                <div class=\"col-sm-10\">\n" +
    "                    <input type=\"email\" class=\"form-control\" ng-model=\"userBook.book\" placeholder=\"Назва книжки\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label class=\"col-sm-2 control-label\">Опис</label>\n" +
    "\n" +
    "                <div class=\"col-sm-10\">\n" +
    "                    <textarea class=\"form-control\" style=\"resize:none\" ng-model=\"userBook.description\" placeholder=\"Опис книжки\"></textarea>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <button type=\"button\" class=\"btn btn-default\" ng-click=\"submitBook()\">Відправити</button>\n" +
    "        </form>\n" +
    "        <div class=\"form-group\" ng-show=\"sended\">\n" +
    "            <p>\n" +
    "                Зіграємо ще раз?\n" +
    "            </p>\n" +
    "            <button type=\"button\" style=\"margin: 2px\" class=\"btn btn-default\" ng-click=\"\">Так, звісно</button>\n" +
    "            <button type=\"button\" style=\"margin: 2px\" class=\"btn btn-default\" ng-click=\"\">Ні, більше не хочу\n" +
    "            </button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("views/header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/header.tpl.html",
    "<div class=\"header\">\n" +
    "    <ul class=\"nav nav-pills pull-right\">\n" +
    "        <li ui-sref-active=\"active\"><a ui-sref=\"home\">На головну</a></li>\n" +
    "        <li ui-sref-active=\"active\"><a  ui-sref=\"statistics\">Статистика</a></li>\n" +
    "        <li ui-sref-active=\"active\"><a  ui-sref=\"about\">Про авторів</a></li>\n" +
    "\n" +
    "        <li ui-sref-active=\"active\"\n" +
    "            ng-if=\"gameState.isStarted && !gameState.isFinished && !gameState.lastRequestSended\">\n" +
    "            <a ui-sref=\"game({stage: gameState.stage})\">Питання : {{gameState.stage}}</a>\n" +
    "        </li>\n" +
    "        <li ui-sref-active=\"active\"\n" +
    "            ng-if=\"gameState.isFinished && !gameState.lastRequestSended\">\n" +
    "            <a ui-sref=\"end\">Кінець гри</a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "    <h3 class=\"text-muted\" ui-sref=\"home\">Акінатор</h3>\n" +
    "</div>");
}]);

angular.module("views/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/home.tpl.html",
    "<div>\n" +
    "    <div class=\"jumbotron\">\n" +
    "        <h1>Акінатор</h1>\n" +
    "        <p class=\"lead\">\n" +
    "            Книжки\n" +
    "        </p>\n" +
    "        <div ng-switch on=\"gameState.isStarted\">\n" +
    "\n" +
    "        <p ng-switch-when=\"true\">\n" +
    "            <a ng-if=\"!gameState.lastRequestSended\" class=\"btn btn-lg btn-success\" ui-sref=\"{{continueGameSref}}\">Продовжити гру</a>\n" +
    "            <a class=\"btn btn-lg btn-success\" ng-click=\"restartGame();\" ui-sref=\"rules\">Грати заново!</a>\n" +
    "        </p>\n" +
    "        <p ng-switch-when=\"false\">\n" +
    "            <a class=\"btn btn-lg btn-success\" ui-sref=\"rules\">Перейти до гри!</a>\n" +
    "        </p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row marketing\">\n" +
    "        <h4>Я знаю все...</h4>\n" +
    "        <p>\n" +
    "            ...про книжки\n" +
    "        </p>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("views/question.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/question.tpl.html",
    "<div>\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"panel-heading\">\n" +
    "            <h3 class=\"panel-title\">Питання: {{gameState.stage}}</h3>\n" +
    "        </div>\n" +
    "        <div class=\"panel-body\">\n" +
    "            <p>\n" +
    "                <span>{{gameState.question}}</span>\n" +
    "            </p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"panel-heading\">\n" +
    "            <h3 class=\"panel-title\">Варіанти відповідей</h3>\n" +
    "        </div>\n" +
    "        <div class=\"panel-body\">\n" +
    "            <form role=\"form\">\n" +
    "                <div class=\"form-group \">\n" +
    "                    <button ng-repeat=\"answer in answers\"\n" +
    "                            type=\"button\"\n" +
    "                            style=\"margin: 2px\"\n" +
    "                            class=\"btn btn-default\"\n" +
    "                            ng-click=\"makeAnswer(answer.code)\">{{answer.title}}\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div id=\"chartdiv\" ng-controller=\"ChartController\"></div>\n" +
    "</div>");
}]);

angular.module("views/rules.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/rules.tpl.html",
    "<div>\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"panel-heading\">\n" +
    "            <h3 class=\"panel-title\">Правила гри</h3>\n" +
    "        </div>\n" +
    "        <div class=\"panel-body\">\n" +
    "            <span>Я вгадаю вашу улюблену книжку.</span>\n" +
    "            <br>\n" +
    "            <button type=\"button\" class=\"btn btn-sm center-block\" ng-click=\"startGame()\" >Поїхали!</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("views/statistics.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/statistics.tpl.html",
    "<h2>Статистика</h2>\n" +
    "<div ng-controller=\"StatisticsController\">\n" +
    "    <div class=\"control-group\">\n" +
    "        <ul>\n" +
    "            <li>\n" +
    "                <span>Зіграно ігр: {{statistics.gamesCount}}</span>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <span>Виграно ігр: {{statistics.winRate}}</span>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <span>Середня тривалість гри: {{statistics.avgLength}}</span>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"update();\">Оновити статистику</button>\n" +
    "    </div>\n" +
    "</div>");
}]);
