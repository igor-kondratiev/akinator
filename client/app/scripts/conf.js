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
                url: '/about',
                templateUrl: 'views/about.tpl.html',
                controller: 'AboutController'
            })
            .state('end', {
                url: '/end',
                templateUrl: 'views/end.tpl.html'
            })
            .state('rules', {
                url: '/rules',
                templateUrl: '../views/rules.tpl.html'
            })
            .state('game', {
                url: '/game/:stage',
                templateUrl: 'views/question.tpl.html'
            });
    }]);