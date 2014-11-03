angular.module('services')
    .service('GameStateService', ['ApiClient', '$state', '$rootScope', 'ChartService', function (ApiClient, $state, $rootScope, ChartService) {

        return {
            createGame: function () {
                return ApiClient.startSession().then(function (result) {
                    ApiClient.getStats({sessionId: result.sessionId, count: 5}).then(function (stats) {
                        $rootScope.gameState.stats = stats.entities;
                        ChartService.drawChart(stats.entities);
                    });
                    $rootScope.gameState.stage = 1;
                    $rootScope.gameState.isStarted = true;
                    $rootScope.gameState.sessionId = result.sessionId;
                    $rootScope.gameState.question = result.firstQuestion;
                    $state.go('game', {stage: 1});
                });
            }, 
            makeLastAnswer: function (params) {
                params.sessionId = $rootScope.gameState.sessionId;
                return ApiClient.makeLastAnswer(params).then(function () {
                    $rootScope.gameState.lastRequestSended = true;
                    $state.go('home');
                });
            },
            restartGame: function() {
                $rootScope.gameState.stage = 1;
                $rootScope.gameState.isStarted = false;
                $rootScope.gameState.isFinished = false;
                $rootScope.gameState.lastRequestSended = false;
                $state.go('rules');
            },
            makeAnswer: function (answerCode) {
                return ApiClient.getQuestion($rootScope.gameState.sessionId, answerCode).then(function (response) {
                    if (response.nextQuestion) {
                        ApiClient.getStats({sessionId: $rootScope.gameState.sessionId, count: 5}).then(function (stats) {
                            $rootScope.gameState.stats = stats.entities;
                            ChartService.drawChart(stats.entities);
                        });
                        $rootScope.gameState.question = response.nextQuestion;
                        $rootScope.gameState.stage += 1;
                        $state.go('game', {stage: $rootScope.gameState.stage});
                    } else if (response.result) {
                        $rootScope.gameState.result = response.result;
                        $rootScope.gameState.isFinished = true;
                        $state.go('end');
                    }
//                    else if(response.isReady === true) {
//                        gameState.result = response.result;
//                        $state.go('ready');
//                    } else {
//                        gameState.stage++;
//                        gameState.question = response.question;
//                        $state.go('game',{stage: gameState.stage});
//                    }
//                    gameState.isFinish = response.isFinish;
//                    gameState.isReady = response.isReady;
                    return $rootScope.gameState;
                });
            },
            submitBook: function (book, description) {
                return ApiClient.submitBook(book, description).then(function (response) {
                    if (response.result) {
                        return true;
                    }
                })
            }

        }
    }]);