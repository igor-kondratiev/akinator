angular.module('controllers')
    .controller('GameController', ['$scope','$stateParams', 'ApiClient', function($scope, $stateParams, ApiClient) {
        $scope.stage = $stateParams.stage;
        ApiClient.startSession().success(function(result) {
            $scope.question = result.question;
            $scope.sessionId = result.sessionId;
        });
    }]);