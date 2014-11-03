angular.module('services')
    .service('ApiClient', ['$http', function ($http) {
        return {
            getStats: function (params) {
                return $http.get('/api/game/stats/',
                    {
                        params: {
                            sessionId: params.sessionId,
                            count: params.count

                        }
                    }).success(function () {

                    })
                    .then(function (result) {
                        return result.data;
                    });
            },
            getStatistics: function (params) {
                return $http.get('/api/statistics')
                    .success(function () {

                    }).then(function (result) {
                        return result.data;
                    });
            },
            startSession: function () {
                return $http.get('/api/game/start').success(function () {

                }).then(function (result) {
                    return result.data;
                });
            },
            getQuestion: function (sessionId, answer) {
                return $http.post('/api/game/next/', {
                    sessionId: sessionId,
                    answer: answer
                }).success(function () {

                }).then(function (result) {
                    return result.data;
                })
            },
            makeLastAnswer: function (params) {
                return $http.post('/api/game/end/', params)
                    .success(function () {

                    }).then(function (result) {
                        return result.data;
                    })
            }
        }
    }]);