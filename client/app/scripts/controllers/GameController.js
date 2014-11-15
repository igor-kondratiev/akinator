angular.module('controllers')
    .controller('GameController', ['$scope', '$stateParams', 'ApiClient', 'GameStateService', 'ChartService',
        function ($scope, $stateParams, ApiClient, GameStateService, ChartService) {
            $scope.startGame = function () {
                GameStateService.createGame().then(function (stats) {
                });
            }
            $scope.answers = [
                {title: 'Так', code: 0},
                {title: 'Ні', code: 1},
                {title: 'Можливо', code: 2},
                {title: 'Не знаю', code: 3}
            ];
            $scope.lastAnswers = [
                {title: 'Так, це моя книга', code: 4},
                {title: 'Ні, це не моя книга', code: 5}
            ];
            $scope.lastAnswer = {
                code : 4,
                book: {
                    name: '',
                    description: ''
                }
            };
            $scope.continueGameSref = 'game({stage: gameState.stage})';
            var unregWatch = $scope.$watch(function(){
                return $scope.gameState.isFinished;
            }, function() {
                if($scope.gameState.isFinished) {
                    $scope.continueGameSref = 'end';
                    unregWatch();
                }
            });
            $scope.restartGame = function() {
                GameStateService.restartGame();
            }
            $scope.makeLastAnswer = function() {
                var lastAnswerParams = {
                    answer: $scope.lastAnswer.code
                };
                if($scope.lastAnswer.code == 5) {
                    lastAnswerParams.name = $scope.lastAnswer.book.name;
                    lastAnswerParams.description = $scope.lastAnswer.book.description;
                }
                GameStateService.makeLastAnswer(lastAnswerParams);
            }
            $scope.makeAnswer = function (answerCode) {
                GameStateService.makeAnswer(answerCode).then(function (response) {
                    ChartService.drawChart(response.stats);
                });
            }

        }]);