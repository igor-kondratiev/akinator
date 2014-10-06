angular.module('app')
    .config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'views/home.tpl.html',
                controller: 'HomeController'
            })
            .state('statistics', {
                url: '/statistics',
                templateUrl: 'views/statistics.tpl.html',
                controller: 'StatisticsController'
            })
            .state('about', {
                url: '/statistics',
                templateUrl: 'views/about.tpl.html',
                controller: 'AboutController'
            })
            .state('game', {
                url: '/game/:stage',
                templateUrl: 'views/game.tpl.html',
                controller: 'GameController'
            })
    }]);