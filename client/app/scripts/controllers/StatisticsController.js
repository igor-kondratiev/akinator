angular.module('controllers')
    .controller('StatisticsController',['$scope', 'ApiClient', function($scope, ApiClient) {
        ApiClient.getStatistics().then(function(data) {
            $scope.statistics = data;
        });
        $scope.update = function() {
            ApiClient.getStatistics().then(function(data) {
                $scope.statistics = data;
            });
        }
    }]);