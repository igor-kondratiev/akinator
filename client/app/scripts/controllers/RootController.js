angular.module('controllers')
    .controller('RootController', ['$rootScope','$stateParams', function($rootScope, $stateParams) {
        $rootScope.gameState = {
            sessionId : '',
            stage: 0,
            isStarted: false,
            isFinished: false,
            lastRequestSended: false
        };
        $rootScope.$on('$stateChangeSuccess', function() {
//            if($stateParams.stage) {
//                $scope.stage  = $stateParams.stage;
//                if($scope.gameIsStarted !== true) {
//                    $scope.gameIsStarted = true;
//                }
//            }
        });
    }]);